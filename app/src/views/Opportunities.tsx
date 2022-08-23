import { AddIcon, ArrowBackIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Text, Button, Center, Flex, Stack, Input, Select } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom'
import OpportunitiesTable from '../components/OpportunitiesTable'



export default function Opportunities() {

  const [searchQuery, setSearchQuery] = React.useState('')
  const [centerFilter, setCenterFilter] = React.useState(-1)
  const [centers, setCenters] = React.useState<any[]>()

  const getCenters = async () => {
    const {data} = await axios.get('http://localhost:8080/Centers')
    setCenters(data)
  }

  React.useEffect(() => {
    getCenters()
  }, [])

  return (
    <>
      <Box w='100vw' >
        <Center mt={10} >
          <Stack minW={'1200px'} spacing={'16px'}>
            <Flex justifyContent={'space-between'} gap={'1rem'}>
              <Text fontSize={'3xl'}>Opportunities</Text>
              <Flex gap={'1rem'}>
                <NavLink to='/'><Button leftIcon={<CloseIcon />} colorScheme={'red'}>Back</Button></NavLink>
                <NavLink to='/CreateOpportunity'><Button w={'170px'} rightIcon={<AddIcon />}  colorScheme={'purple'}>Add Opportunity</Button></NavLink>
              </Flex>
            </Flex>
            <Flex>
              <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder='Search by Name: ' type="text"></Input>
              {centers && 
                <Select value={centerFilter} onChange={e => setCenterFilter(parseInt(e.target.value))}>
                  <option value="-1">Select center</option>
                  {centers.map(center => <option key={center.id} value={center.id}>{center.name}</option>)}
                </Select>}
            </Flex>
            <OpportunitiesTable centerFilter={centerFilter} searchQuery={searchQuery} />
          </Stack>
        </Center>
    </Box>
    </>
  )
}
