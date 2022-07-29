import axios from 'axios'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Button, Checkbox, Flex, FormLabel, Link, Progress, Select, Stack, Textarea } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import MultiSelect from './MultiSelect'

export default function VolunteerInfoForm() {

  const [centers, setCenters] = React.useState<Array<{id: number, name: string}>>()
  const [availability, setAvailability] = React.useState<{id: number, value: string}[]>([])

  const getCenters = async () => {
    const {data} = await axios.get<{id: number, name: string}[]>('http://localhost:8080/Centers')
    setCenters(data)
  }
  React.useEffect(() => {
    getCenters()

  }, [])

  
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
        <Box w="800px">
            <Stack spacing='1.25rem'>
                <Flex gap='5' alignItems={'end'}>
                    <Box w='100%'>
                    <FormLabel>Availability:</FormLabel>
                    <MultiSelect
                        onSelect={(selected) => setAvailability(selected)}
                        placeholder="Select Available Times"
                        options={[
                        {id: 1, value: "Weekdays: 8AM-10AM"},
                        {id: 2, value: "Weekdays: 10AM-12PM"},
                        {id: 3, value: "Weekdays: 12PM-2PM"},
                        {id: 4, value: "Weekdays: 2PM-4PM"},
                        {id: 5, value: "Weekdays: 4PM-6PM"},
                        {id: 6, value: "Weekends: 8AM-10AM"},
                        {id: 7, value: "Weekends: 10AM-12PM"},
                        {id: 8, value: "Weekends: 12PM-2PM"},
                        {id: 9, value: "Weekends: 2PM-4PM"},
                        {id: 10, value: "Weekends: 4PM-6PM"},
                        ]}
                    />
                    </Box>
                    <Box w="100%">
                    <FormLabel>Preferred Center(s):</FormLabel>
                    {
                        centers && <MultiSelect
                        placeholder="Select Center(s)"
                        options={centers.map((center) => ({id: center.id, value: center.name}))}
                    />
                    }
                    </Box>
                </Flex>
                <FormLabel>Skills/Interests:</FormLabel>
                <MultiSelect
                        placeholder="Select Skills/Interests"
                        options={[
                            {id: 1, value: "Animal Care",},
                            {id: 2, value: "Event Planning"},
                            {id: 3, value: "Technology"},
                            {id: 4, value: "Working with Children"},
                            {id: 5, value: "Sports"},
                            {id: 6, value: "Healthcare"},
                            {id: 7, value: "Community Development"},
                            {id: 8, value: "Education"},
                            {id: 9, value: "Baking"},
                            {id: 10, value: "Environmental Issues"},
                            {id: 11, value: "Women's Empowerment"},
                            {id: 12, value: "Politics"},
                            {id: 13, value: "Diversity & Equity"},
                            {id: 14, value: "Agriculture"},
                            {id: 15, value: "Wildlife Protection"}
                        ]}
                        />
                <FormLabel>Current Licenses:</FormLabel>
                <Textarea placeholder='List any certifications that the volunteer currently holds.' />
                <Flex gap='5'>
                    <Box w='100%'>
                    <FormLabel>Approval Status:</FormLabel>
                    <Stack spacing={3}>
                            <Select variant='filled' placeholder='Select Current Status' >
                                <option value='option1'>Pending Approval</option>
                                <option value='option1'>Approved</option>
                                <option value='option1'>Not Approved</option>
                            </Select>
                        </Stack>
                    </Box>
                    <Box w="100%">
                    <FormLabel>Educational Background:</FormLabel>
                        <Stack spacing={3}>
                            <Select variant='filled' placeholder='Select Highest Level Completed' >
                                <option value='option1'>No Response</option>
                                <option value='option1'>Less than High School Diploma</option>
                                <option value='option1'>High School Diploma</option>
                                <option value='option1'>Some College</option>
                                <option value='option1'>Associate's Degree</option>
                                <option value='option1'>Bachelor's Degree</option>
                                <option value='option1'>Master's Degree</option>
                                <option value='option1'>Doctorate or Professional Degree</option>
                            </Select>
                        </Stack>
                    </Box>
                </Flex>
                <FormLabel>Additional Information:</FormLabel>
                <Stack border='1px solid lightgray' borderRadius='0.25rem' p={2} spacing={5} direction='row'>
                    <Checkbox>Florida Driver's License on File</Checkbox>
                    <Checkbox>SSN on File</Checkbox>
                </Stack>
            </Stack>
            <Progress hasStripe value={66} size='lg' colorScheme='purple' />
            
            <Flex gap='5' justifyContent='center'>
                <NavLink to="/CreateVolunteer/1"><Button leftIcon={<ArrowBackIcon />} colorScheme='purple' variant='solid'>
                Previous
                </Button>
                </NavLink>
                <NavLink to="/CreateVolunteer/3"><Button rightIcon={<ArrowForwardIcon />} colorScheme='purple' variant='solid'>
                Next
                </Button></NavLink>
            </Flex>
        </Box>
    </Flex>
  )
}
