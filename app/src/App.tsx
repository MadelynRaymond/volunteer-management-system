import React from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

export default function App() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="600px">
        <Stack>
          <Flex gap="3">
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" />
          </FormControl>
        </Stack>
        <Flex gap="3">
          <FormControl>
            <FormLabel>Approval Status</FormLabel>
            <Select variant="filled" placeholder="Select Status">
              <option value="option1">Pending Approval</option>
              <option value="option2">Approved</option>
              <option value="option3">Disapproved</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Education Background</FormLabel>
            <Select variant="filled" placeholder="Select Highest Education">
              <option value="">Less Than Highschool Diploma</option>
              <option value="">Highschool Diploma</option>
              <option value="">Some College</option>
              <option value="">...</option>
            </Select>
          </FormControl>
        </Flex>
        <FormControl>
          <FormLabel>Test </FormLabel>
          <Flex gap="3">
            <Menu closeOnSelect={false}>
              <MenuButton w="295px" as={Button}>
                Preferred Centers
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Checkbox colorScheme="purple">
                    NE FL Environmental Outlook Center
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox colorScheme="purple">
                    Jacksonville Women's Center
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox colorScheme="purple">Duval Humane Society</Checkbox>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={false}>
              <MenuButton w="295px" as={Button}>
                Current Licenses
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Checkbox colorScheme="purple">FL Drivers License</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox></Checkbox>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </FormControl>
      </Box>
    </Flex>
  );
}
