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
import MultiSelect from "./components/MultiSelect";

export default function App() {
  return (
    <Flex w="100vw" mt="2rem" justifyContent="center">
      <Box w="500px">
        <MultiSelect options={['Jacksonville Women\'s Center', 'Humane Society Rowder', 'The Place']}/>
      </Box>
    </Flex>
  );
}
