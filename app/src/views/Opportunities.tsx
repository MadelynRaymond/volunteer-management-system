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
            <OpportunitiesTable />
            <Flex justifyContent={'flex-end'}>
              <NavLink to='/'>
                <Button>Back</Button>
              </NavLink>
            </Flex>
          </Stack>
        </Center>
    </Box>
    </>
  )
}
