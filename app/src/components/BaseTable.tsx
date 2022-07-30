import React from "react";
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

{
  /*TODO: Add Props to base table */
}
export default function BaseTable() {
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
          <Tr>
            <Td>John Applebottom </Td>
            <Td>yaboijappleb218@gmail.com</Td>
            <Td>123 Sesame St. New York, NY 33523</Td>
            <Td>
              <Wrap>
                <Tag>11:00AM-2:30PM</Tag>
                <Tag>5:00PM-7:30PM</Tag>
              </Wrap>
            </Td>
            <Td>
              <Tag variant={"solid"} colorScheme={"green"}>
                Approved
              </Tag>
            </Td>
            <Td>
              <Flex justifyContent={'space-between'}>
                <Icon w={6} h={6} as={EditIcon}/>
                <Icon w={6} h={6} as={DeleteIcon}/>
              </Flex>
            </Td>
          </Tr>

          <Tr>
            <Td>Hozier Milton</Td>
            <Td>themilt99@outlook.com</Td>
            <Td>1250 Azure Ln. San Francisco, CA 90142</Td>
            <Td>
              <Wrap>
                <Tag>9:00AM-12:30PM</Tag>
                <Tag>2:00PM-2:30PM</Tag>
                <Tag>3:00PM-4:30PM</Tag>
              </Wrap>
            </Td>
            <Td>
              <Tag variant={"solid"} colorScheme={"yellow"}>
                Pending
              </Tag>
            </Td>
          </Tr>

          <Tr>
            <Td>Claire White</Td>
            <Td>cwhite@gmail.com</Td>
            <Td>740 Rock Ln. Jackson, MO 22142</Td>
            <Td>
              <Wrap>
                <Tag>3:00PM-8:30PM</Tag>
              </Wrap>
            </Td>
            <Td>
              <Tag variant={"solid"} colorScheme={"red"}>
                Denied
              </Tag>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
