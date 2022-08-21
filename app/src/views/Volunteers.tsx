
import { Box, Center, Flex, Input, Select, Stack, Button } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import BaseTable from '../components/BaseTable'
import { NavLink } from 'react-router-dom'

export default function Volunteers() {

  const [searchQuery, setSearchQuery] = React.useState('')
  const [approvalFilter, setApprovalFilter] = React.useState('ALL')

  return (
    <Box w='100vw' >
        <Center mt={10} >
          <Stack minW={'1200px'} spacing={'16px'}>
            <Flex justifyContent={'flex-end'}>
              <NavLink to='/CreateVolunteer/1'><Button w={'150px'}>Add Volunteer</Button></NavLink>
            </Flex>
            <Flex>
              <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='Search by name: ' type="text"></Input>
              <Select value={approvalFilter} onChange={e => setApprovalFilter(e.target.value)}>
                <option value="ALL">ALL</option>
                <option value="APPROVED">Approved</option>
                <option value="PENDING APPROVAL">Pending Approval</option>
                <option value="NOT APPROVED">Disapproved</option>
                <option value="INACTIVE">Inactive</option>
              </Select>
            </Flex>
            <BaseTable approvalFilter={approvalFilter} searchQuery={searchQuery} />
          </Stack>
        </Center>
    </Box>
  )
}
