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
import MultiSelect from "./MultiSelect";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { NavLink, useLocation } from "react-router-dom";

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

  const { state } = useLocation();

  const hasPersonalInfo = (state: unknown): state is PersonalInfo => {
    //TODO: construct better typeguard
    const isObject = (state: unknown): state is Object =>
      typeof state === "object";
    if (isObject(state)) return true;
    return false;
  };

  React.useEffect(() => {
    if (state && hasPersonalInfo(state)) {
      setPersonalInfo({ ...state });
    }
  }, []);

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <Text fontSize="4xl">Volunteer Personal Info</Text>
        <Stack spacing="1.25rem">
          <Flex gap="5">
            <Box w="100%">
              <FormControl isRequired>
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
              <FormControl isRequired>
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

          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              value={personalInfo.username}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, username: e.target.value })
              }
              type="text"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              value={personalInfo.password}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, password: e.target.value })
              }
              type="password"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              value={personalInfo.email}
              onChange={(e) =>
                setPersonalInfo({ ...personalInfo, email: e.target.value })
              }
              type="email"
            />
          </FormControl>

          <FormControl isRequired>
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
              <FormControl isRequired>
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
            <NavLink state={personalInfo} to="/CreateVolunteer/2">
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="purple"
                variant="solid"
              >
                Next
              </Button>
            </NavLink>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}
