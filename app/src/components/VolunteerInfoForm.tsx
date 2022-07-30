import React from "react";
import axios from "axios";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink, useLocation } from "react-router-dom";
import MultiSelect from "./MultiSelect";
import { PersonalInfo } from "./PersonalInfoForm";
import { availabilityOptions } from "../assets/availability";
import { interests } from "../assets/interests";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Link,
  Progress,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export type VolunteerInfo = {
  availability: {id: number, value: string}[],
  preferredCenters: {id: number, value: string}[],
  skills: {id: number, value: string}[],
  currentLicenses: string,
  approvalStatus: string,
  education: string,
  driversLicenseOnFile: boolean,
  socialSecurityOnFile: boolean
}

export default function VolunteerInfoForm() {
  const { state } = useLocation();

  const [submitted, setSubmitted] = React.useState(false)
  const personalInfo = React.useRef<PersonalInfo>();
  const [centers, setCenters] = React.useState<Array<{ id: number; name: string }>>();
  const [volunteerInfo, setVolunteerInfo] = React.useState<VolunteerInfo>({
    availability: [],
    preferredCenters: [],
    skills: [],
    currentLicenses: '',
    approvalStatus: '',
    education: '',
    driversLicenseOnFile: false,
    socialSecurityOnFile: false
  })


  const getCenters = async () => {
    const { data } = await axios.get<{ id: number; name: string }[]>(
      "http://localhost:8080/Centers"
    );
    setCenters(data);
  };

  const hasPersonalInfo = (state: unknown): state is PersonalInfo => {
    //TODO: construct better typeguard
    const isObject = (state: unknown): state is Object =>
      typeof state === "object";
    if (isObject(state)) return true;
    return false;
  };

  const hasErrors = (field: unknown[] | string) => {
    if(typeof field === 'string'){
      return field === '' && submitted
    }
    else {
      return field.length === 0 && submitted
    }
  }

  const submit = (e: any) => {
    setSubmitted(true)
    const {availability, preferredCenters, education, approvalStatus} = volunteerInfo

    const hasErrors = availability.length === 0 || 
                      preferredCenters.length === 0 || 
                      education === '' || 
                      approvalStatus === ''

    if(hasErrors) e.preventDefault()
    const timeout = setTimeout(() => {
      setSubmitted(false)
      clearInterval(timeout)
    }, 5000)

  }

  React.useEffect(() => {
    getCenters();

    if (hasPersonalInfo(state)) {
      personalInfo.current = state;
    }
  }, []);

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="800px">
        <Stack spacing="1.25rem">
          <Flex gap="5" alignItems={"end"}>
            <FormControl isInvalid={hasErrors(volunteerInfo.availability)} isRequired>
              <FormLabel>Availability:</FormLabel>
              <MultiSelect
                value={volunteerInfo.availability}
                onSelect={(selected) => setVolunteerInfo({...volunteerInfo, availability: selected})}
                placeholder="Select Available Times"
                options={availabilityOptions}
              />
            </FormControl>

            <FormControl isInvalid={hasErrors(volunteerInfo.preferredCenters)} isRequired>
              <FormLabel>Preferred Center(s):</FormLabel>
              {centers && (
                <MultiSelect
                  value={volunteerInfo.preferredCenters}
                  onSelect={(selected) => setVolunteerInfo({...volunteerInfo, preferredCenters: selected})}
                  placeholder="Select Center(s)"
                  options={centers.map((center) => ({
                    id: center.id,
                    value: center.name,
                  }))}
                />
              )}
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>Skills/Interests:</FormLabel>
            <MultiSelect
              value={volunteerInfo.skills}
              onSelect={(selected) => setVolunteerInfo({...volunteerInfo, skills: selected})}
              placeholder="Select Skills/Interests"
              options={interests}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Current Licenses:</FormLabel>
            <Textarea placeholder="List any certifications that the volunteer currently holds." />
          </FormControl>

          <Flex gap="5">
            <FormControl isInvalid={hasErrors(volunteerInfo.approvalStatus)} isRequired>
              <FormLabel>Approval Status:</FormLabel>
              <Stack spacing={3}>
                <Select variant="filled" placeholder="Select Current Status">
                  <option value="option1">Pending Approval</option>
                  <option value="option1">Approved</option>
                  <option value="option1">Not Approved</option>
                </Select>
              </Stack>
            </FormControl>

            <FormControl isInvalid={hasErrors(volunteerInfo.education)} isRequired>
              <FormLabel>Educational Background:</FormLabel>
              <Stack spacing={3}>
                <Select
                  variant="filled"
                  placeholder="Select Highest Level Completed"
                >
                  <option value="No Response">No Response</option>
                  <option value="Less than High School Diploma">
                    Less than High School Diploma
                  </option>
                  <option value="High School Diploma">
                    High School Diploma
                  </option>
                  <option value="Some College">Some College</option>
                  <option value="Associate'\s Degree">
                    Associate's Degree
                  </option>
                  <option value="Bachelor\'s Degree">Bachelor's Degree</option>
                  <option value="Master'\s Degree">Master's Degree</option>
                  <option value="Doctorate or Professional Degree">
                    Doctorate or Professional Degree
                  </option>
                </Select>
              </Stack>
            </FormControl>
          </Flex>
          <FormControl>
            <FormLabel>Additional Information:</FormLabel>
            <Stack
              border="1px solid lightgray"
              borderRadius="0.25rem"
              p={2}
              spacing={5}
              direction="row"
            >
              <Checkbox>Florida Driver's License on File</Checkbox>
              <Checkbox>SSN on File</Checkbox>
            </Stack>
          </FormControl>
        </Stack>
        <Progress hasStripe value={66} size="lg" colorScheme="purple" />

        <Flex gap="5" justifyContent="center">
          <NavLink state={personalInfo.current} to="/CreateVolunteer/1">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="purple"
              variant="solid"
            >
              Previous
            </Button>
          </NavLink>
          <NavLink state={{personalInfo, volunteerInfo}} onClick={(e) => submit(e)} to="/CreateVolunteer/3">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="purple"
              variant="solid"
            >
              Next
            </Button>
          </NavLink>
        </Flex>
      </Box>
    </Flex>
  );
}
