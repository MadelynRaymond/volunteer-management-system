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
import { PersonalInfo } from "./PersonalInfoForm";
import { VolunteerInfo } from "./VolunteerInfoForm";

export type EmergencyInfo = {
  contactName: string,
  contactEmail: string,
  contactAddress: string,
  contactHomeNumber: string,
  contactWorkNumber: string

}

type Volunteer = {
  personalInfo: PersonalInfo,
  volunteerInfo: VolunteerInfo,
  emergencyInfo: EmergencyInfo
}

export default function EmergencyContactForm() {

  const [submitted, setSubmitted] = React.useState(false)
  const [volunteer, setVolunteer] = React.useState<Volunteer>()
  const previousInfo = React.useRef<{personalInfo: PersonalInfo, 
                                     volunteerInfo: VolunteerInfo}>()

  const [emergencyInfo, setEmergencyInfo] = React.useState<EmergencyInfo>({
    contactName: '',
    contactEmail: '',
    contactAddress: '',
    contactHomeNumber: '',
    contactWorkNumber: ''
  })

  const hasPreviousInfo = (state: unknown): state is {personalInfo: PersonalInfo, volunteerInfo: VolunteerInfo} => {
    const isObject = (state: unknown): state is Object =>
      typeof state === "object";
    
    if(isObject(state) && state.hasOwnProperty('personalInfo') && state.hasOwnProperty('volunteerInfo')){
      return true
    }
    return false
  }

  const hasErrors = (field: string) => field === '' && submitted

  const submit = () => {
    console.log(volunteer)
  }

  React.useEffect(() => {
    if(state && hasPreviousInfo(state)){
      setVolunteer({...volunteer, 
        personalInfo: state.personalInfo as PersonalInfo, 
        volunteerInfo: state.volunteerInfo as VolunteerInfo,
        emergencyInfo: emergencyInfo})
    }
  }, [])

  const { state } = useLocation();

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <FormControl isInvalid={hasErrors(emergencyInfo.contactName)} isRequired>
          <FormLabel>Emergency Contact Name</FormLabel>
          <Input type="text"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Emergency Contact Email</FormLabel>
          <Input type="email"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Emergency Contact Address</FormLabel>
          <Input type="text"></Input>
        </FormControl>

        <FormControl isInvalid={hasErrors(emergencyInfo.contactHomeNumber)} isRequired>
          <FormLabel>Home Phone Number</FormLabel>
          <Input type="text"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Work Phone Number</FormLabel>
          <Input type="text"></Input>
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
