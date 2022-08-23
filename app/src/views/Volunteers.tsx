
import { AddIcon, ArrowBackIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Center, Flex, Text, Input, Select, Stack, Button } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom'
import VolunteerTable from '../components/VolunteerTable'


export default function Volunteers() {

  const [searchQuery, setSearchQuery] = React.useState('')
  const [approvalFilter, setApprovalFilter] = React.useState('ALL')

  return (
    <Box w='100vw' >
        <Center mt={10} >
          <Stack minW={'1200px'} spacing={'16px'}>
            <Flex justifyContent={'space-between'} gap={'1rem'}>
            <Text fontSize={'3xl'}>Volunteers</Text>
              <Flex gap={'1rem'}>
                <NavLink to='/'><Button leftIcon={<CloseIcon />} colorScheme={'red'}>Exit</Button></NavLink>
                <NavLink to='/CreateVolunteer/1'><Button w={'150px'} rightIcon={<AddIcon />}  colorScheme={'purple'}>Add Volunteer</Button></NavLink>
              </Flex>
            </Flex>
            <Flex>
              <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='Search by Name: ' type="text"></Input>
              <Select value={approvalFilter} onChange={e => setApprovalFilter(e.target.value)}>
                <option value="ALL">ALL</option>
                <option value="APPROVED/PENDING APPROVAL">APPROVED/PENDING APPROVAL</option>
                <option value="APPROVED">Approved</option>
                <option value="PENDING APPROVAL">Pending Approval</option>
                <option value="NOT APPROVED">Disapproved</option>
                <option value="INACTIVE">Inactive</option>
              </Select>
            </Flex>
            <VolunteerTable approvalFilter={approvalFilter} searchQuery={searchQuery} />
          </Stack>
        </Center>
    </Box>
  )
}
