import React from "react";
import {
  Box,
  Text,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Progress,
  Stack,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/store";
import { emptyVolunteer } from "../utils/volunteer";

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  address: string;
  homePhoneNumber?: string;
  cellPhoneNumber: string;
  workPhoneNumber?: string;
};

export default function PersonalInfoForm() {

  const navigate = useNavigate()
  const location = useLocation()

  const {volunteer, updatePersonalInfo, updateVolunteer} = React.useContext(StoreContext) as StoreContext
  const [submitted, setSubmitted] = React.useState(false)
  const [personalInfo, setPersonalInfo] = React.useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    address: "",
    homePhoneNumber: "",
    cellPhoneNumber: "",
    workPhoneNumber: "",
  });

  React.useEffect(() => {
    if(location.state === 'create'){
      updateVolunteer(null)
    }
    else if(volunteer && volunteer.personalInfo){
      const safeUpdate = Object.assign(personalInfo, volunteer.personalInfo)
      setPersonalInfo({...safeUpdate})
    }
  }, [])

  const hasError = (field: string) => field === '' && submitted


  const submit = (e: any) => {
    setSubmitted(true)
    //check if all required fields are populated
    const hasErrors = Object.keys(personalInfo).some((key) => {
      if(key === 'homePhoneNumber' || key === 'workPhoneNumber'){
        return false
      }
      if(personalInfo[key as keyof PersonalInfo] === ''){
        return true
      }

      return false
    })

    if(hasErrors){
      e.preventDefault()
      const timeout = setTimeout(() => {
        setSubmitted(false)
        clearInterval(timeout)
      }, 5000)
    }
    else {
      updatePersonalInfo(personalInfo)
      let newPath = location.pathname.split('/')
      newPath.pop()
      navigate(newPath.join('/') + '/2')
    }
  }


  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <Flex justifyContent={'flex-end'}>
          <NavLink to="/Volunteers">
                <Button
                  leftIcon={<CloseIcon />}
                  colorScheme="red"
                  variant="solid"
                >
                  Cancel
                </Button>
          </NavLink>
        </Flex>
        <Text fontSize="4xl">Volunteer Personal Info</Text>
        <Stack spacing="1.25rem">
          <Flex gap="5">
            <Box w="100%">
              <FormControl isInvalid={hasError(personalInfo.firstName)} isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      firstName: e.target.value,
                    })
                  }
                  type="text"
                />
              </FormControl>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={hasError(personalInfo.lastName)} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  value={personalInfo.lastName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      lastName: e.target.value,
                    })
                  }
                  type="text"
                />
              </FormControl>
            </Box>
          </Flex>

          <FormControl isInvalid={hasError(personalInfo.username)} isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={personalInfo.username}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, username: e.target.value })
              }
              type="text"
            />
          </FormControl>

          <FormControl isInvalid={hasError(personalInfo.password)} isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              value={personalInfo.password}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, password: e.target.value })
              }
              type="password"
            />
          </FormControl>

          <FormControl isInvalid={hasError(personalInfo.email)} isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              value={personalInfo.email}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, email: e.target.value })
              }
              type="email"
            />
          </FormControl>

          <FormControl isInvalid={hasError(personalInfo.address)} isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              value={personalInfo.address}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, address: e.target.value })
              }
              type="text"
            />
          </FormControl>

          <Flex gap="5">
            <Box w="100%">
              <FormControl>
                <FormLabel>Home Phone Number</FormLabel>
                <Input
                  value={personalInfo.homePhoneNumber}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      homePhoneNumber: e.target.value,
                    })
                  }
                  type="text"
                />
              </FormControl>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={hasError(personalInfo.cellPhoneNumber)} isRequired>
                <FormLabel>Cell Phone Number</FormLabel>
                <Input
                  value={personalInfo.cellPhoneNumber}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      cellPhoneNumber: e.target.value,
                    })
                  }
                  type="text"
                />
              </FormControl>
            </Box>
            <Box w="100%">
              <FormControl>
                <FormLabel>Work Phone Number</FormLabel>
                <Input
                  value={personalInfo.workPhoneNumber}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      workPhoneNumber: e.target.value,
                    })
                  }
                  type="text"
                />
              </FormControl>
            </Box>
          </Flex>
          <Progress hasStripe value={33} size="lg" colorScheme="purple" />

          <Flex gap="5" justifyContent="center">
            <Button
              leftIcon={<ArrowBackIcon />}
              disabled={true}
              colorScheme="purple"
              variant="solid"
            >
              Previous
            </Button>

            <Button
              onClick={(e) => submit(e)}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="purple"
              variant="solid"
            >
              Next
            </Button>

          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}
