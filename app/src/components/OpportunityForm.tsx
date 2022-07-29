import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom'
import MultiSelect from './MultiSelect'

export default function OpportunityForm() {

  const [centers, setCenters] = React.useState<Array<{id: number, name: string}>>()
  const [name, setName] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [startTime, setStartTime] = React.useState('')
  const [endTime, setEndTime] = React.useState('')
  const [tags, setTags] = React.useState<Array<{id: number, value: string}>>()
  const [center, setCenter] = React.useState('')

  const getCenters = async () => {
    const {data} = await axios.get<{id: number, name: string}[]>('http://localhost:8080/Centers')
    setCenters(data)
  }
  React.useEffect(() => {
    getCenters()
  }, [])
  
  const postOpportunity = async () => {
    const opportunity = {
      name : name,
      startTime: startTime,
      endTime: endTime,
      centerId: parseInt(center),
      location: address,
      description: desc
      //tags can be added later

    }
    const {data} = await axios.post('http://localhost:8080/Opportunities', opportunity)
  }

  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="700px">
        <Stack spacing='1.25rem'>

            <FormLabel>Opportunity Name:</FormLabel>
            <Input onChange={(e) => setName(e.target.value)} type="text"/>

            <Flex gap='5' alignItems='end'>
                  <Box w='100%'>
                  <FormLabel>Tags:</FormLabel>
                        <MultiSelect
                        onSelect={(e) => setTags(e)}
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
                        <Select onChange={(e) => setCenter(e.target.value)} variant='filled' placeholder='Select Center' >
                            {centers && centers.map((center) => <option value={center.id} key={center.id}>{center.name}</option>)}
                        </Select>
                    </Stack>
                  </Box>
                </Flex>
                <Flex gap='5' alignItems='center'>
                  <Box w='100%'>
                    <FormLabel>Start Time</FormLabel>
                    <Input onChange={(e) => setStartTime(e.target.value)} type="text" placeholder="8AM"/>
                 </Box>
                  <Box w='100%'>
                    <FormLabel>End Time</FormLabel>
                    <Input onChange={(e) => setEndTime(e.target.value)} type="text" placeholder="12PM"/>
                  </Box>
                </Flex>

            <FormLabel>Location Address:</FormLabel>
            <Input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="117 W. Duval St., Suite 210, Jacksonville, FL 32202"/>
            <FormLabel>Description:</FormLabel>
            <Textarea onChange={(e) => setDesc(e.target.value)} placeholder='Please give a brief description of the opportunity for prospective volunteers.' />
          
            <Flex gap='5' justifyContent='center'>
                <NavLink to="/"><Button leftIcon={<CloseIcon />} colorScheme='purple' variant='solid'>
                Cancel
                </Button></NavLink>
                
                <NavLink to="/"><Button onClick={postOpportunity} colorScheme='pink' leftIcon={<CheckIcon />}  variant='solid'>
                Submit
                </Button></NavLink>
            </Flex>
        </Stack>
      </Box>
    </Flex>
  )
}
