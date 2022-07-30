import React from 'react'
import { Box, Text, Checkbox, Flex, FormControl, FormLabel, Input, Progress, Stack, Button } from "@chakra-ui/react";
import MultiSelect from './MultiSelect';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';

export type PersonalInfo = {
  firstName: string, 
  lastName: string,
  username: string,
  password: string,
  email: string,
  address: string,
  homePhoneNumber?: string
  cellPhoneNumber: string,
  workPhoneNumber?: string
}

export default function PersonalInfoForm() {
  const [personalInfo, setPersonalInfo] = React.useState({} as PersonalInfo)

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
      <Text fontSize='4xl'>Volunteer Personal Info</Text>
        <Stack spacing='1.25rem'>
          <Flex gap='5'>
            <Box w='100%'>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})} type='text' />
              </FormControl>
            </Box>
            <Box w='100%'>
              <FormLabel>Last Name</FormLabel>
              <Input onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})} type='text' />
            </Box>
          </Flex>

        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input onChange={(e) => setPersonalInfo({...personalInfo, username: e.target.value})} type='text' />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input onChange={(e) => setPersonalInfo({...personalInfo, password: e.target.value})} type='password' />
        </FormControl>

          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})} type='email' />
          </FormControl>

          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})} type='text' />
          </FormControl>

          <Flex gap='5'>
            <Box w='100%'>
              <FormLabel>Home Phone Number</FormLabel>
              <Input onChange={(e) => setPersonalInfo({...personalInfo, homePhoneNumber: e.target.value})} type='text' />
            </Box>
            <Box w='100%'>
              <FormLabel>Cell Phone Number</FormLabel>
              <Input onChange={(e) => setPersonalInfo({...personalInfo, cellPhoneNumber: e.target.value})} type='text' />
            </Box>
            <Box w='100%'>
              <FormLabel>Work Phone Number</FormLabel>
              <Input onChange={(e) => setPersonalInfo({...personalInfo, workPhoneNumber: e.target.value})} type='text' />
            </Box>
          </Flex>
          <Progress hasStripe value={33} size='lg' colorScheme='purple' />
            
            <Flex gap='5' justifyContent='center'>
                <Button leftIcon={<ArrowBackIcon />} disabled={true} colorScheme='purple' variant='solid'>
                Previous
                </Button>
                <NavLink state={personalInfo} to="/CreateVolunteer/2"><Button rightIcon={<ArrowForwardIcon />} colorScheme='purple' variant='solid'>
                Next
                </Button></NavLink>
            </Flex>
 
        </Stack>
      </Box>
    </Flex>

  )
}
