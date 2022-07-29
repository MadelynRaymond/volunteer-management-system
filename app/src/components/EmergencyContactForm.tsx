import { Box, Flex, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

export default function EmergencyContactForm() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
        <Box w="700px">
            <FormLabel>Emergency Contact Name</FormLabel>
            <Input type="text"></Input>
        </Box>
    </Flex>
  )
}
