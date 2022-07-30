import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Progress,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function EmergencyContactForm() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <FormLabel>Emergency Contact Name</FormLabel>
        <Input type="text"></Input>

        <FormLabel>Emergency Contact Email</FormLabel>
        <Input type="email"></Input>

        <FormLabel>Emergency Contact Address</FormLabel>
        <Input type="text"></Input>

        <FormLabel>Home Phone Number</FormLabel>
        <Input type="text"></Input>

        <FormLabel>Work Phone Number</FormLabel>
        <Input type="text"></Input>

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
          <Button colorScheme="pink" variant="solid">
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
