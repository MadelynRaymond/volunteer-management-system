import React from 'react'
import { Box, Checkbox, Flex, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import MultiSelect from './MultiSelect';


export default function PersonalInfoForm() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <Stack spacing='1.25rem'>
          <Flex gap='5'>
            <Box w='100%'>
              <FormLabel>First Name</FormLabel>
              <Input type='text' />
            </Box>
            <Box w='100%'>
              <FormLabel>Last Name</FormLabel>
              <Input type='text' />
            </Box>
          </Flex>

          <Flex gap='3'>
            <Box w='100%'>
              <FormLabel>Username</FormLabel>
              <Input type='text' />
            </Box>
            <Box w='100%'>
              <FormLabel>Password</FormLabel>
              <Input type='password' />
            </Box>
          </Flex>

          <FormLabel>Email Address</FormLabel>
          <Input type='email' />

          <Flex gap='5'>
            <Box w='100%'>
              <FormLabel>Home Phone Number</FormLabel>
              <Input type='password' />
            </Box>
            <Box w='100%'>
              <FormLabel>Cell Phone Number</FormLabel>
              <Input type='password' />
            </Box>
            <Box w='100%'>
              <FormLabel>Work Phone Number</FormLabel>
              <Input type='password' />
            </Box>
          </Flex>

          <FormLabel>Address</FormLabel>
          <Input type='text' />

        </Stack>
      </Box>
    </Flex>

  )
}
