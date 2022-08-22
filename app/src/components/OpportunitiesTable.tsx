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
  Center,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";





type RowProps = {
  onDelete: (id: number) => Promise<void>
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

  const deleteOpportunity = async (id: number) => {
    await props.onDelete(id)
  }

  return (
    <Tr>
      <Td>{props.name}</Td>
      <Td>{props.center.name}</Td>
      <Td>
        <Tag>{props.startTime}</Tag>
        <Tag>{props.endTime}</Tag>
      </Td>
      <Td >{props.location}</Td>
      <Td>
        <Flex justifyContent={'space-between'}>
            <Link state={props.id} to={`/EditOpportunity/${props.id}/1`}>
              <Icon w={6} h={6} as={EditIcon}/>
            </Link>
            <DeleteDialog deleteAction={deleteOpportunity} deletionId={props.id} header="Delete Opportunity" body={`Delete opportunity "${props.name}?"`}/>
          </Flex>
      </Td>
    </Tr>
  )
}

interface TableProps {

}

export default function OpportunitiesTable(props: TableProps) {

  const [data, setData] = React.useState<any[]>()
  const [filteredData, setFilteredData] = React.useState<any[]>([])

  const onDelete = async (id: number) => {
    const res = await axios.delete(`http://localhost:8080/Opportunities/${id}`)
    console.log(res)
    data && setData(data.filter((row) => row.id !== id))
  }

  const getOpportunities = async () => {
    const {data} = await axios.get('http://localhost:8080/Opportunities')
    setData(data)
    setFilteredData(data)

  }

  React.useEffect(() => {
    getOpportunities()

  }, [data])


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
            <Th>Center Name</Th>
            <Th>Time</Th>
            <Th>Location</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map(row => <TableRow onDelete={onDelete} id={row.id} key={row.id} name={row.name} startTime={row.startTime} endTime={row.endTime} location={row.location} center={{
            name: row.center.name
          }} />)}
        </Tbody>
      </Table>}

      
    </TableContainer>
  );
}