import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Progress,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/store";
import NewVolunteer from "../views/NewVolunteer";
import { PersonalInfo } from "./PersonalInfoForm";
import { VolunteerInfo } from "./VolunteerInfoForm";

export type EmergencyInfo = {
  contactName: string,
  contactEmail?: string,
  contactAddress?: string,
  contactHomePhoneNumber: string,
  contactWorkPhoneNumber?: string
}

type NewVolunteer = {
  personalInfo: PersonalInfo,
  volunteerInfo: VolunteerInfo,
  emergencyInfo: EmergencyInfo
}

export default function EmergencyContactForm() {

  const location = useLocation()
  const navigate = useNavigate()

  const {volunteer, updateEmergencyInfo} = React.useContext(StoreContext) as StoreContext
  const [submitted, setSubmitted] = React.useState(false)

  const [emergencyInfo, setEmergencyInfo] = React.useState<EmergencyInfo>({
    contactName: '',
    contactEmail: '',
    contactAddress: '',
    contactHomePhoneNumber: '',
    contactWorkPhoneNumber: ''
  })

  React.useEffect(() => {
    updateEmergencyInfo({...emergencyInfo})
  }, [emergencyInfo])

  const previous = () => {
    let newPath = location.pathname.split('/')
    newPath.pop()
    navigate(newPath.join('/') + '/2')
  }

  const hasErrors = (field: string) => {
  
    const result = (field === '' && submitted)
    return result
  }

  const submit = (e: any) => {
    setSubmitted(true)
    
    const errors = hasErrors(emergencyInfo.contactName)

    if(volunteer && volunteer.emergencyInfo) createVolunteer(volunteer as NewVolunteer)

  }

  const createVolunteer = async (newVolunteer: NewVolunteer) => {
    const {personalInfo, volunteerInfo, emergencyInfo} = newVolunteer
    const volunteer = {
      accountInfo: {
        username: personalInfo.username,
        password: personalInfo.password
      },
      personalInfo: {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        address: personalInfo.address,
        email: personalInfo.email,
        driversLicenseOnFile: volunteerInfo.driversLicenseOnFile,
        socialSecurityOnFile: volunteerInfo.socialSecurityOnFile,
        approvalStatus: volunteerInfo.approvalStatus,
        homePhoneNumber: personalInfo.homePhoneNumber,
        cellPhoneNumber: personalInfo.cellPhoneNumber,
        workPhoneNumber: personalInfo.workPhoneNumber,
        preferredCenters: volunteerInfo.preferredCenters,
        availability: volunteerInfo.availability,
        skills: volunteerInfo.skills,
        education: volunteerInfo.education
      },
      emergencyInfo: {
        contactName: emergencyInfo.contactName,
        contactHomePhoneNumber: emergencyInfo.contactHomePhoneNumber,
        contactEmail: emergencyInfo.contactEmail,
        contactWorkPhoneNumber: emergencyInfo.contactWorkPhoneNumber,
        contactAddress: emergencyInfo.contactAddress
      }
    }

    //sometimes you gotta do what you gotta do. ):
    const id = location.pathname.split('/')[2]

    if(location.pathname.includes('Edit')){
      await axios.delete(`http://localhost:8080/Volunteers/${id}`)
      await axios.post("http://localhost:8080/Volunteers", volunteer)
    }
    else {
      await axios.post("http://localhost:8080/Volunteers", volunteer)
    }
    navigate('/')
    
  }

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
      <Flex justifyContent={'flex-end'}>
          <NavLink to="/">
                <Button
                  leftIcon={<CloseIcon />}
                  colorScheme="red"
                  variant="solid"
                >
                  Cancel
                </Button>
          </NavLink>
        </Flex>
        <p>{emergencyInfo.contactName}</p>
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

        <p>{emergencyInfo.contactHomePhoneNumber}</p>
        <FormControl isInvalid={hasErrors(emergencyInfo.contactHomePhoneNumber)} isRequired>
          <FormLabel>Home Phone Number</FormLabel>
          <Input onChange={(e) => setEmergencyInfo({...emergencyInfo, contactHomePhoneNumber: e.target.value})} type="text"></Input>
        </FormControl>

        <FormControl>
          <FormLabel>Work Phone Number</FormLabel>
          <Input onChange={(e) => setEmergencyInfo({...emergencyInfo, contactWorkPhoneNumber: e.target.value})} type="text"></Input>
        </FormControl>

        <Progress hasStripe value={66} size="lg" colorScheme="purple" />

        <Flex mt={"1rem"} gap="5" justifyContent="center">
          <Button
            onClick={previous}
            leftIcon={<ArrowBackIcon />}
            colorScheme="purple"
            variant="solid"
          >
            Previous
          </Button>
            <Button onClick={submit} colorScheme="pink" variant="solid">
              Submit
            </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
