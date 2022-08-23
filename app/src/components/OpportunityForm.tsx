import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { interests } from "../assets/interests";
import MultiSelect from "./MultiSelect";

export default function OpportunityForm() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = React.useState(false);
  const [centers, setCenters] = React.useState<Array<{ id: number; name: string }>>();
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [tags, setTags] = React.useState<Array<{ id: number; value: string }>>([]);
  const [center, setCenter] = React.useState("");
  const [date, setDate] = React.useState('')

  const getCenters = async () => {
    const { data } = await axios.get<{ id: number; name: string }[]>(
      "http://localhost:8080/Centers"
    );
    setCenters(data);
  };
  React.useEffect(() => {
    getCenters();
  }, []);

  const postOpportunity = async () => {
    const opportunity = {
      name: name,
      startTime: startTime,
      endTime: endTime,
      centerId: parseInt(center),
      location: address,
      description: desc,
      tags,
      date
    };

    console.log(opportunity)
    const { data } = await axios.post(
      "http://localhost:8080/Opportunities",
      opportunity
    );
  };

  const submit = () => {
    setSubmitted(true);

    const timeout = setTimeout(() => {
      setSubmitted(false);
      clearInterval(timeout);
    }, 1000 * 5);

    const hasErrors = [name, center, address, desc, startTime, endTime].some(
      (field) => field === ""
    );

    if (!hasErrors) {
      postOpportunity();
      navigate("/");
    }
  };

  const hasError = (input: string) => submitted && input === "";

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <Stack spacing="1.25rem">
          <FormControl isInvalid={hasError(name)} isRequired>
            <FormLabel>Opportunity Name:</FormLabel>
            <Input onChange={(e) => setName(e.target.value)} type="text" />
          </FormControl>

          <Flex gap="5" alignItems="end">
            <Box w="100%">
              <FormLabel>Tags:</FormLabel>
              <MultiSelect
                value={tags}
                onChange={(selected) => setTags(selected)}
                placeholder="Select Skills/Interests"
                options={interests}/>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={hasError(center)} isRequired>
                <FormLabel>Associated Center</FormLabel>
                <Stack spacing={3}>
                  <Select
                    onChange={(e) => setCenter(e.target.value)}
                    variant="filled"
                    placeholder="Select Center"
                  >
                    {centers &&
                      centers.map((center) => (
                        <option value={center.id} key={center.id}>
                          {center.name}
                        </option>
                      ))}
                  </Select>
                </Stack>
              </FormControl>
            </Box>
          </Flex>
          <Flex gap="5" alignItems="center">
            <Box w="100%">
              <FormControl isInvalid={hasError(startTime)} isRequired>
                <FormLabel>Start Time</FormLabel>
                <Input
                  onChange={(e) => setStartTime(e.target.value)}
                  type="text"
                  placeholder="8AM"
                />
              </FormControl>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={hasError(endTime)} isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                  onChange={(e) => setEndTime(e.target.value)}
                  type="text"
                  placeholder="12PM"
                />
              </FormControl>
            </Box>
          </Flex>
          <FormControl isInvalid={hasError(date)} isRequired>
            <FormLabel>Date: {date}</FormLabel>
            <Input value={date} onChange={(e) => setDate(e.target.value)} type={'date'} size={'md'}/>
          </FormControl>
          <FormControl isInvalid={hasError(address)} isRequired>
            <FormLabel>Location Address:</FormLabel>
            <Input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="117 W. Duval St., Suite 210, Jacksonville, FL 32202"
            />
          </FormControl>

          <FormControl isInvalid={hasError(desc)} isRequired>
            <FormLabel>Description:</FormLabel>
            <Textarea
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Please give a brief description of the opportunity for prospective volunteers."
            />
          </FormControl>

          <Flex mt={"1rem"} gap="5" justifyContent="center">
            <NavLink to="/Opportunities">
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="red"
                variant="solid"
              >
                Cancel
              </Button>
            </NavLink>

            <Button
              onClick={submit}
              colorScheme="purple"
              leftIcon={<CheckIcon />}
              variant="solid"
            >
              Submit
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
}
