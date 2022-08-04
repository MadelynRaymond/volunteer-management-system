import React from "react";
import axios from "axios";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";

type RowProps = {
  profile: {
    firstName: string,
		lastName: string,
    email: string,
    address: string,
    approvalStatus: string
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
        <Tag variant={"solid"} colorScheme={"green"}>
          {props.profile.approvalStatus}
        </Tag>
      </Td>
      <Td>
        <Flex justifyContent={'space-between'}>
          <Icon w={6} h={6} as={EditIcon}/>
          <Icon w={6} h={6} as={DeleteIcon}/>
        </Flex>
      </Td>
    </Tr>
  )
}
export default function BaseTable() {
  
  const [data, setData] = React.useState<any[]>()

  React.useEffect(() =>{
    const getData = async () => {
      const {data} = await axios.get('http://localhost:8080/Volunteers')
      setData(data)
    }

    getData()
  }, [])

  return (
    <TableContainer
      shadow={"md"}
      textAlign={"center"}
      borderRadius={"0.5rem"}
      p={2}
    >
      <Table variant="simple" colorScheme="facebook">
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
          {data && data.map(row => <TableRow profile={row.profile} key={row.id} />)}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
