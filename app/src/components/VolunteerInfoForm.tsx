import React from "react";
import axios from "axios";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Link,
  Progress,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import MultiSelect from "./MultiSelect";
import { PersonalInfo } from "./PersonalInfoForm";
import { availabilityOptions } from "../assets/availability";
import { interests } from "../assets/interests";

export default function VolunteerInfoForm() {
  const { state } = useLocation();
  const personalInfo = React.useRef<PersonalInfo>();
  const [centers, setCenters] =
    React.useState<Array<{ id: number; name: string }>>();
  const [availability, setAvailability] = React.useState<
    { id: number; value: string }[]
  >([]);

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
  React.useEffect(() => {
    getCenters();

    if (hasPersonalInfo(state)) {
      personalInfo.current = state;
    }
  }, []);

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="800px">
        <Box>{personalInfo.current && personalInfo.current.firstName}</Box>
        <Stack spacing="1.25rem">
          <Flex gap="5" alignItems={"end"}>
            <Box w="100%">
              <FormLabel>Availability:</FormLabel>
              <MultiSelect
                onSelect={(selected) => setAvailability(selected)}
                placeholder="Select Available Times"
                options={availabilityOptions}
              />
            </Box>
            <Box w="100%">
              <FormLabel>Preferred Center(s):</FormLabel>
              {centers && (
                <MultiSelect
                  placeholder="Select Center(s)"
                  options={centers.map((center) => ({
                    id: center.id,
                    value: center.name,
                  }))}
                />
              )}
            </Box>
          </Flex>
          <FormLabel>Skills/Interests:</FormLabel>
          <MultiSelect
            placeholder="Select Skills/Interests"
            options={interests}
          />
          <FormLabel>Current Licenses:</FormLabel>
          <Textarea placeholder="List any certifications that the volunteer currently holds." />
          <Flex gap="5">
            <Box w="100%">
              <FormLabel>Approval Status:</FormLabel>
              <Stack spacing={3}>
                <Select variant="filled" placeholder="Select Current Status">
                  <option value="option1">Pending Approval</option>
                  <option value="option1">Approved</option>
                  <option value="option1">Not Approved</option>
                </Select>
              </Stack>
            </Box>
            <Box w="100%">
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
            </Box>
          </Flex>
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
          <NavLink to="/CreateVolunteer/3">
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
