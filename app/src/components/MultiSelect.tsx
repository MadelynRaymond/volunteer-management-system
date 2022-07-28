import {
  Box,
  Input,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  Wrap,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

const TagWithIcon: React.FC<{
  name: string;
  handleClick: (option: string) => void;
}> = (props) => {
  return (
    <Tag onClick={() => props.handleClick(props.name)} size={"md"}>
      <TagLabel>{props.name}</TagLabel>
      <TagRightIcon boxSize={"0.5em"} as={CloseIcon} />
    </Tag>
  );
};

const MultiSelectOption: React.FC<{
  option: string;
  handleSelect: (option: string) => void;
}> = ({ option, handleSelect }) => {
  return (
    <Box
      pt={1}
      pb={1}
      onMouseDown={() => handleSelect(option)}
      _hover={{ backgroundColor: "gray.100" }}
    >
      <Box pl={3}>{option}</Box>
    </Box>
  );
};

type MultiSelectProps = {
  options: string[];
  placeholder?: string;
};

export default function MultiSelect({
  placeholder,
  options,
}: MultiSelectProps) {
  const [show, setShow] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  const handleClick = (clickedTag: string) => {
    setSelected(selected.filter((s) => s !== clickedTag));
    setFilteredOptions([...filteredOptions, clickedTag]);
  };

  const handleSelect = (selectedOption: string) => {
    setSelected([...selected, selectedOption]);
    setFilteredOptions(filteredOptions.filter((s) => s !== selectedOption));
  };

  return (
    <Stack mt={"0.5rem"} spacing="0.5rem">
      <Box>
        <Wrap>
          {selected.map((s) => (
            <TagWithIcon handleClick={handleClick} name={s} />
          ))}
        </Wrap>
      </Box>
      <Input
        onBlur={() => setShow(false)}
        onFocus={() => setShow(true)}
        placeholder={placeholder ? placeholder : ""}
        type="text"
      />
      <Box
        display={show && filteredOptions.length > 0 ? "block" : "none"}
        pb={1}
        shadow={"md"}
      >
        {filteredOptions.map((option) => (
          <MultiSelectOption handleSelect={handleSelect} option={option} />
        ))}
      </Box>
    </Stack>
  );
}
