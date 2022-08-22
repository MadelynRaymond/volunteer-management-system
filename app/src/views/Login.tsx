import { Box, Text, Flex, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react'
import React from 'react'

export default function Login() {
  return (
    <>
        <Flex w="100vw" mt="2rem" justifyContent="center">
    
            <Box w="400px" boxShadow={'base'} p='2rem' borderRadius={'2xl'} mt='8rem'>
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
                    <Button colorScheme='purple'>Login</Button>
                    <Flex justifyContent={'center'}>
                      <Text color={'blue.600'}>Please contact IT Help Desk with any admin login issues: (904) 233-5555</Text>
                    </Flex>
                </Stack>
            </Box>
        </Flex>

    </>
  )
}
