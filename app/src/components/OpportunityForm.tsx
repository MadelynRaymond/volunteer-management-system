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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { interests } from "../assets/interests";
import MultiSelect from "./MultiSelect";

interface FormProps {
  existingOpportunity?: any
}

export default function OpportunityForm(props: FormProps) {
  const navigate = useNavigate();
  const location = useLocation()

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

    if(props.existingOpportunity) {
      const opportunity = props.existingOpportunity
      const tags = opportunity.tags.map((tag: any) => ({id: tag.skill.id, value: tag.skill.name}))
      setTags(tags)
      setCenter(opportunity.center.id)
      setName(opportunity.name)
      setAddress(opportunity.location)
      const asDate = new Date(opportunity.date)
      const formatted = `${asDate.getFullYear()}-${`0${asDate.getMonth() + 1}`}-${asDate.getDate()}`
      setDate(formatted)
      setStartTime(opportunity.startTime)
      setEndTime(opportunity.endTime)
      setDesc(opportunity.description)
    }
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

    if(location.pathname.includes('Edit')){
      const id = location.pathname.split('/')[2]
      console.log(id)
      await axios.delete(`http://localhost:8080/Opportunities/${id}`)
    }

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
            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
          </FormControl>

          <Flex gap="5" alignItems="end">
            <Box w="100%">
              <FormLabel>Tags:</FormLabel>
              <MultiSelect
                value={[...tags]}
                onChange={(selected) => setTags(selected)}
                placeholder="Select Skills/Interests"
                options={interests.map(entry => ({id: entry.id, value: entry.value}))}/>
            </Box>
            <Box w="100%">
              <FormControl isInvalid={hasError(center)} isRequired>
                <FormLabel>Associated Center</FormLabel>
                <Stack spacing={3}>
                  <Select
                    value={center}
                    onChange={(e) => setCenter(e.target.value)}
                    variant="filled"
                  >
                    <option value="">Select Center</option>
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
                  value={startTime}
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
                  value={endTime}
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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="117 W. Duval St., Suite 210, Jacksonville, FL 32202"
            />
          </FormControl>

          <FormControl isInvalid={hasError(desc)} isRequired>
            <FormLabel>Description:</FormLabel>
            <Textarea
              value={desc}
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
