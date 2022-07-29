import React from 'react'
import { Box, Text, Checkbox, Flex, FormControl, FormLabel, Input, Progress, Stack } from "@chakra-ui/react";
import MultiSelect from './MultiSelect';


export default function PersonalInfoForm() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
      <Text fontSize='4xl'>Volunteer Personal Info</Text>

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

            <FormLabel>Username</FormLabel>
            <Input type='text' />
  
            <FormLabel>Password</FormLabel>
            <Input type='password' />

          <FormLabel>Email Address</FormLabel>
          <Input type='email' />

          <Flex gap='5'>
            <Box w='100%'>
              <FormLabel>Home Phone Number</FormLabel>
              <Input type='text' />
            </Box>
            <Box w='100%'>
              <FormLabel>Cell Phone Number</FormLabel>
              <Input type='text' />
            </Box>
            <Box w='100%'>
              <FormLabel>Work Phone Number</FormLabel>
              <Input type='text' />
            </Box>
          </Flex>

          <FormLabel>Address</FormLabel>
          <Input type='text' />
          <Progress hasStripe value={33} />
        </Stack>
      </Box>
    </Flex>

  )
}
