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
  name: string,
  startTime: string,
  endTime: string,
  location: string,
  center: {
    name: string,
  }
}

function TableRow(props: RowProps): JSX.Element {


  return (
    <Tr>
      <Td>{props.name}</Td>
      <Td>{props.center.name}</Td>
      <Td>
        <Tag>{props.startTime}</Tag>
        <Tag>{props.endTime}</Tag>
      </Td>
      <Td >{props.location}</Td>

    </Tr>
  )
}

interface TableProps {

}

export default function OpportunityMatches(props: TableProps) {

  const location = useLocation()
  const id: number = parseInt(location.pathname.split('/')[2])

  const [filteredData, setFilteredData] = React.useState<any[]>([])
  const volunteer = React.useRef<any>(null)


  const getVolunteer = async () => {
    const id = parseInt(location.pathname.split('/')[3])
    const {data} = await axios.get(`http://localhost:8080/Volunteers/${id}`)
    volunteer.current = data
  }

  const getOpportunities = async () => {
    await getVolunteer()
    const {data} = await axios.get('http://localhost:8080/Opportunities')
    const centers = volunteer.current.profile.preferredCenters.map((c: any) => c.center)
    if(data){
      const result = data.filter((row: any) => centers.some((c: any) => c.name === row.center.name))
      setFilteredData(result)
    }
  }

  React.useEffect(() => {
    getOpportunities()

  }, [])


  return (
    <Box w={'100vw'}>
      <Center mt={10}>
        <Stack minW={'1200px'}>
          <Flex justifyContent={'space-between'}>
            <Text fontSize={'2xl'} mb={'1rem'}>Opportunity Matches: </Text>
            <NavLink to="/Volunteers">
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
                  <Th>Center Name</Th>
                  <Th>Time</Th>
                  <Th>Location</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map(row => <TableRow id={row.id} key={row.id} name={row.name} startTime={row.startTime} endTime={row.endTime} location={row.location} center={{
                  name: row.center.name
                }} />)}
              </Tbody>
            </Table>}

            {filteredData.length === 0 && <NoMatch notFoundText="No matching opportunities for this volunteer"/>}
          </TableContainer>
        </Stack>
      </Center>
    </Box>
  );
}