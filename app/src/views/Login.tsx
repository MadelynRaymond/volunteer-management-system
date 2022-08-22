import { Box, Text, Flex, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import React from 'react'

export default function Login() {
  return (
    <>
        <Flex w="100vw" mt="2rem" justifyContent="center">
    
            <Box w="700px">
                <Stack spacing="1.25rem">
                    <Text fontSize="3xl">Admin Login</Text>
                    <FormControl isRequired>
                        <FormLabel>Username:</FormLabel>
                        <Input type="text" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password:</FormLabel>
                        <Input type="text" />
                    </FormControl>
                </Stack>
            </Box>
        </Flex>

    </>
  )
}
