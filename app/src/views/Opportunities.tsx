import { Box, Center, Stack } from '@chakra-ui/react'
import React from 'react'
import OpportunitiesTable from '../components/OpportunitiesTable'

export default function Opportunities() {
  return (
    <>
      <Box w='100vw' >
        <Center mt={10} >
          <Stack minW={'1200px'} spacing={'16px'}>
            <OpportunitiesTable />
          </Stack>
        </Center>
    </Box>
    </>
  )
}
