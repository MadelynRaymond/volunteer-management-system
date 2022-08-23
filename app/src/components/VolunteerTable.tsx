import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
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
  Button,
  IconButton
} from "@chakra-ui/react";


type RowProps = {
  id: number,
  profile: {
    firstName: string,
		lastName: string,
    email: string,
    address: string,
    approvalStatus: string,
    availability: any[],
    preferredCenters: any[]
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
      <Td>
        <Flex gap='0.5rem'>
          <Link state={props.id} to={`/EditVolunteer/${props.id}/1`}>
            <IconButton aria-label='Search database' icon={<EditIcon />} />
          </Link>
            <Button colorScheme={'cyan'} color={'white'}>View Matches</Button>

        </Flex>
      </Td>
    </Tr>
  )
}

interface TableProps {
  searchQuery: string,
  approvalFilter: string
}

function NoMatch() {
  return (
    <Center mt={'1rem'} mb={'1rem'} w={'100%'}>
      <Text fontSize={'xl'}>No matching volunteers with current filter</Text>
    </Center>
  )
}
export default function VolunteerTable({searchQuery, approvalFilter}: TableProps) {
  
  const [data, setData] = React.useState<any[]>()
  const [filteredData, setFilteredData] = React.useState<any[]>([])

  const hasName = (name: string): boolean => {
    if(searchQuery === '') return true

    return name.toLowerCase().includes(searchQuery.toLowerCase())
  }

  const hasApproval = (status: string): boolean => {
    if (approvalFilter === 'ALL') return true

    return status.toUpperCase() === approvalFilter
  }

  React.useEffect(() =>{
    const getData = async () => {
      const {data} = await axios.get('http://localhost:8080/Volunteers')
      setData(data)
      setFilteredData(data)
    }

    getData()
  }, [])

  React.useEffect(() => {
    if(data) {
      const update = data.filter(row => hasName(row.profile.firstName) || hasName(row.profile.lastName)).filter(row => hasApproval(row.profile.approvalStatus))
      setFilteredData(update)
    }
  }, [searchQuery, approvalFilter])

  return (
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
            <Th>Approval Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map(row => <TableRow id={row.id} profile={row.profile} key={row.id} />)}
        </Tbody>
      </Table>}

      {filteredData.length === 0 && <NoMatch/>}
    </TableContainer>
  );
}
