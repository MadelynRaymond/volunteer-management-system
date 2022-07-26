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
import NoMatch from "./NoMatch";


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
          {props.profile.availability.map((time: any) => <Tag key={time.availability.id}>{time.availability.time}</Tag>)}
        </Wrap>
      </Td>
      <Td>
        <Tag className="uppercase" colorScheme={`${props.profile.approvalStatus.toUpperCase() === 'APPROVED' ? 'green' : (props.profile.approvalStatus.toUpperCase() === 'PENDING APPROVAL' ? 'yellow' : props.profile.approvalStatus.toUpperCase() === 'NOT APPROVED' ? 'red' : 'gray')}`} variant={"solid"}>
          {props.profile.approvalStatus}
        </Tag>
      </Td>
      <Td>
        <Flex gap='0.5rem'>
          <Link state={props.id} to={`/EditVolunteer/${props.id}/1`}>
            <IconButton aria-label='Search database' icon={<EditIcon />} />
          </Link>
            <Link to={`OpportunityMatches/${props.id}`}><Button colorScheme={'cyan'} color={'white'}>View Matches</Button></Link>
        </Flex>
      </Td>
    </Tr>
  )
}

interface TableProps {
  searchQuery: string,
  approvalFilter: string
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
    const inStatus = approvalFilter.toUpperCase().includes(status.toUpperCase())
    const falsePosDisapprove = approvalFilter === 'APPROVED' && status.toUpperCase() === 'NOT APPROVED'
    const falsePosApprove = approvalFilter === 'NOT APPROVED' && status.toUpperCase() === 'APPROVED'
    console.log(falsePosApprove)

    return inStatus && !falsePosDisapprove && !falsePosApprove
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
      const update = data.filter(row =>  hasName(row.profile.firstName + ' ' + row.profile.lastName)).filter(row => hasApproval(row.profile.approvalStatus))
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

      {filteredData.length === 0 && <NoMatch notFoundText="No matching volunteers with current filter"/>}
    </TableContainer>
  );
}
