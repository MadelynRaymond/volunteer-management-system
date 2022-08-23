import { CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Wrap,
  Tag,
  Flex,
  Icon,
  Center,
  Text,
  IconButton,
  Button,
  Box,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import NoMatch from "../components/NoMatch";





type RowProps = {
  id: number,
  profile: {
    firstName: string,
		lastName: string,
    email: string,
    address: string,
    approvalStatus: string,
    availability: any[],
  }
}
const TableRow = (props: RowProps): JSX.Element => {
  return (
    <Tr>
      <Td>{props.profile.firstName} {props.profile.lastName}</Td>
      <Td>{props.profile.email}</Td>
      <Td>{props.profile.address}</Td>
      <Td>
        <Wrap>
          <Tag>11:00AM-2:30PM</Tag>
          <Tag>5:00PM-7:30PM</Tag>
        </Wrap>
      </Td>
      <Td>
        <Tag className="uppercase" colorScheme={`${props.profile.approvalStatus.toUpperCase() === 'APPROVED' ? 'green' : (props.profile.approvalStatus.toUpperCase() === 'PENDING APPROVAL' ? 'yellow' : props.profile.approvalStatus.toUpperCase() === 'DISAPPROVED' ? 'red' : 'gray')}`} variant={"solid"}>
          {props.profile.approvalStatus}
        </Tag>
      </Td>
    </Tr>
  )
}

interface TableProps {

}

export default function VolunteerMatches(props: TableProps) {

  const location = useLocation()
  const id: number = parseInt(location.pathname.split('/')[3])

  const [filteredData, setFilteredData] = React.useState<any[]>([])
  const opportunity = React.useRef<any>(null)

  const getOpportunity = async () => {
    const {data} = await axios.get(`http://localhost:8080/Opportunities/${id}`)
    if(data) opportunity.current = data
  }


  const getVolunteers = async () => {
    await getOpportunity()
    const {data} = await axios.get('http://localhost:8080/Volunteers')

    const taggedSkills = opportunity.current.tags.map((tag: any) => tag.skillId)
  
    if(data){
      const test = data.map((row: any) => row.profile.skills)
      console.log(test)
      const result = data.filter((row: any) => row.profile.skills.some((skill: any) => {
        return taggedSkills.some((tag: any) => tag === skill.skill.id)
      }))
      setFilteredData(result)
    }
    else {
      console.log('wtf')
    }
  }

  React.useEffect(() => {
    getVolunteers()

  }, [])


  return (
    <Box w={'100vw'}>
      <Center mt={10}>
        <Stack minW={'1200px'}>
        <Flex justifyContent={'space-between'}>
            <Text fontSize={'2xl'} mb={'1rem'}>Volunteer Matches: </Text>
            <NavLink to="/Opportunities">
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="red"
                variant="solid"
              >
                Exit
              </Button>
            </NavLink>
          </Flex>
          <TableContainer
            shadow={"md"}
            textAlign={"center"}
            borderRadius={"0.5rem"}
            p={2}
          >
            {filteredData.length > 0 && <Table  variant="simple" colorScheme="facebook">
              <TableCaption></TableCaption>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Address</Th>
                  <Th>Availability</Th>
                  <Th>ApprovalStatus</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map(row => <TableRow id={row.id} profile={row.profile} key={row.id} />)}
              </Tbody>
            </Table>}
            
            {filteredData.length === 0 && <NoMatch notFoundText="No matching volunteers for this opportunity"/>}
          </TableContainer>
        </Stack>
      </Center>
    </Box>
  );
}