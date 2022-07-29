import { Box, Checkbox, Flex, FormLabel, Stack } from '@chakra-ui/react'
import React from 'react'
import MultiSelect from './MultiSelect'

export default function VolunteerInfoForm() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
        <Box w="700px">
            <Flex gap='5'>
                <Box w='100%'>
                <FormLabel>Preferred Center(s):</FormLabel>
                <MultiSelect
                    placeholder="Select preferred centers"
                    options={[
                    "Jacksonville Women's Center",
                    "Humane Society Rowder",
                    "The Place",
                    ]}
                />
                </Box>
                <Box w="100%">
                <FormLabel>Availability Time(s):</FormLabel>
                <MultiSelect
                    placeholder="Select availability"
                    options={[
                        "Jacksonville Women's Center",
                        "Humane Society Rowder",
                        "The Place",
                    ]}
                    />
                </Box>
            </Flex>

            <FormLabel>Additional Information:</FormLabel>
            <Stack border='1px solid lightgray' borderRadius='0.25rem' p={2} spacing={5} direction='row'>
                <Checkbox>License on File</Checkbox>
                <Checkbox>SSN on File</Checkbox>
            </Stack>
        </Box>
    </Flex>
  )
}
