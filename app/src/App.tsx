import React from "react";
import {
  Box,
  Flex
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
