import { Box, Checkbox, Flex, FormLabel, Select, Stack, Textarea } from '@chakra-ui/react'
import React from 'react'
import MultiSelect from './MultiSelect'

export default function VolunteerInfoForm() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
        <Box w="700px">
            <Stack spacing='1.25rem'>
                <Flex gap='5'>
                    <Box w='100%'>
                    <FormLabel>Availability:</FormLabel>
                    <MultiSelect
                        placeholder="Select Preferred Centers"
                        options={[
                        "Weekdays: 8AM-10AM",
                        "Weekdays: 10AM-12PM",
                        "Weekdays: 12PM-2PM",
                        "Weekdays: 2PM-4PM",
                        "Weekdays: 4PM-6PM",
                        "Weekends: 8AM-10AM",
                        "Weekends: 10AM-12PM",
                        "Weekends: 12PM-2PM",
                        "Weekends: 2PM-4PM",
                        "Weekends: 4PM-6PM",
                        ]}
                    />
                    </Box>
                    <Box w="100%">
                    <FormLabel>Preferred Center(s):</FormLabel>
                    <MultiSelect
                        placeholder="Select Availability"
                        options={[
                            "Jacksonville Women's Center",
                            "Duval Humane Society",
                            "NE FL Environmental Outlook Center",
                        ]}
                        />
                    </Box>
                </Flex>
                <FormLabel>Skills/Interests:</FormLabel>
                <MultiSelect
                        placeholder="Select Skills/Interests"
                        options={[
                            "Animal Care",
                            "Event Planning",
                            "Technology",
                            "Working with Children",
                            "Sports",
                            "Healthcare",
                            "Community Development",
                            "Education",
                            "Baking",
                            "Environmental Issues",
                            "Women's Empowerment",
                            "Politics",
                            "Diversity & Equity",
                            "Agriculture",
                            "Wildlife Protection"
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
        </Box>
    </Flex>
  )
}
