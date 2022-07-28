import React from 'react'
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Select,
    Stack
  } from '@chakra-ui/react'

export default function App() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
        <Box w="600px">
            <Stack>
              <Flex gap="3">
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input type='text' />
                </FormControl>

                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input type='text' />
                </FormControl>

              </Flex>
              <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='email' />
              </FormControl>
            </Stack>
        </Box>
    </Flex>
  )
}
