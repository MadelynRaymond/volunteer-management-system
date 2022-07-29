import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import MultiSelect from './MultiSelect'

export default function OpportunityForm() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <Stack spacing='1.25rem'>

            <FormLabel>Opportunity Name:</FormLabel>
            <Input type="text"/>

            <Flex gap='5' alignItems='center'>
                  <Box w='100%'>
                  <FormLabel>Tags:</FormLabel>
                        <MultiSelect
                        placeholder="Select Skills/Interests"
                        options={[
                            {id: 1, value: "Animal Care"},
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
                 </Box>
                  <Box w='100%'>
                    <FormLabel>Associated Center</FormLabel>
                    <Stack spacing={3}>
                        <Select variant='filled' placeholder='Select Center' >
                            <option value='option1'>Jacksonville Women's Center</option>
                            <option value='option1'>Duval Humane Society</option>
                            <option value='option1'>NE FL Environmental Outlook Center</option>
                        </Select>
                    </Stack>
                  </Box>
                </Flex>
                <Flex gap='5' alignItems='center'>
                  <Box w='100%'>
                    <FormLabel>Start Time</FormLabel>
                    <Input type="text" placeholder="8AM"/>
                 </Box>
                  <Box w='100%'>
                    <FormLabel>Finish Time</FormLabel>
                    <Input type="text" placeholder="12PM"/>
                  </Box>
                </Flex>

            <FormLabel>Location Address:</FormLabel>
            <Input type="text" placeholder="117 W. Duval St., Suite 210, Jacksonville, FL 32202"/>
            <FormLabel>Description:</FormLabel>
            <Textarea placeholder='Please give a brief description of the opportunity for prospective volunteers.' />
          
            <Flex gap='5' justifyContent='center'>
                <NavLink to="/"><Button leftIcon={<CloseIcon />} colorScheme='purple' variant='solid'>
                Cancel
                </Button></NavLink>
                
                <NavLink to="/"><Button colorScheme='pink' leftIcon={<CheckIcon />}  variant='solid'>
                Submit
                </Button></NavLink>
            </Flex>
        </Stack>
      </Box>
    </Flex>
  )
}
