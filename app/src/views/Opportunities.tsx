import { AddIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Stack } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import OpportunitiesTable from '../Components/OpportunitiesTable'


export default function Opportunities() {
  return (
    <>
      <Box w='100vw' >
        <Center mt={10} >
          <Stack minW={'1200px'} spacing={'16px'}>
            <Flex justifyContent={'space-between'} gap={'1rem'}>
                <NavLink to='/'><Button leftIcon={<ArrowBackIcon />} colorScheme={'red'}>Back</Button></NavLink>
                  <NavLink to='/CreateOpportunity'><Button w={'170px'} rightIcon={<AddIcon />}  colorScheme={'purple'}>Add Opportunity</Button></NavLink>
            </Flex>
            <OpportunitiesTable />
          </Stack>
        </Center>
    </Box>
    </>
  )
}
