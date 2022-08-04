import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Progress,
} from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { StoreContext } from "../context/store";
import NewVolunteer from "../views/NewVolunteer";
import { PersonalInfo } from "./PersonalInfoForm";
import { VolunteerInfo } from "./VolunteerInfoForm";

export type EmergencyInfo = {
  contactName: string,
  contactEmail: string,
  contactAddress: string,
  contactHomeNumber: string,
  contactWorkNumber: string
}

type NewVolunteer = {
  personalInfo: PersonalInfo,
  volunteerInfo: VolunteerInfo,
  emergencyInfo: EmergencyInfo
}

export default function EmergencyContactForm() {
  const {volunteer, updateEmergencyInfo} = React.useContext(StoreContext) as StoreContext
  const [submitted, setSubmitted] = React.useState(false)

  const [emergencyInfo, setEmergencyInfo] = React.useState<EmergencyInfo>({
    contactName: '',
    contactEmail: '',
    contactAddress: '',
    contactHomeNumber: '',
    contactWorkNumber: ''
  })

  const hasErrors = (field: string) => field === '' && submitted

  const submit = (e: any) => {
    setSubmitted(true)

    const errors = hasErrors(emergencyInfo.contactName) || hasErrors(emergencyInfo.contactHomeNumber)

    if(errors){
      e.preventDefault()
      const timeout = setTimeout(() => {
        setSubmitted(false)
        clearInterval(timeout)
      }, 5000)
    }
    else {
      updateEmergencyInfo(emergencyInfo)
      if(volunteer) createVolunteer(volunteer as NewVolunteer)
    }

  }

  const createVolunteer = (newVolunteer: NewVolunteer) => {
    console.log(newVolunteer)
  }

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <FormControl isInvalid={hasErrors(emergencyInfo.contactName)} isRequired>
          <FormLabel>Emergency Contact Name</FormLabel>
          <Input onChange={(e) => setEmergencyInfo({...emergencyInfo, contactName: e.target.value})} type="text"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Emergency Contact Email</FormLabel>
          <Input onChange={(e) => setEmergencyInfo({...emergencyInfo, contactEmail: e.target.value})} type="email"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Emergency Contact Address</FormLabel>
          <Input onChange={(e) => setEmergencyInfo({...emergencyInfo, contactAddress: e.target.value})} type="text"></Input>
        </FormControl>

        <FormControl isInvalid={hasErrors(emergencyInfo.contactHomeNumber)} isRequired>
          <FormLabel>Home Phone Number</FormLabel>
          <Input onChange={(e) => setEmergencyInfo({...emergencyInfo, contactHomeNumber: e.target.value})} type="text"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Work Phone Number</FormLabel>
          <Input onChange={(e) => setEmergencyInfo({...emergencyInfo, contactWorkNumber: e.target.value})} type="text"></Input>
        </FormControl>

        <Progress hasStripe value={66} size="lg" colorScheme="purple" />

        <Flex gap="5" justifyContent="center">
          <NavLink to="/CreateVolunteer/2">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="purple"
              variant="solid"
            >
              Previous
            </Button>
          </NavLink>
          <Button onClick={submit} colorScheme="pink" variant="solid">
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
