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

type Option = {
  id: number;
  value: string;
};

const TagWithIcon: React.FC<{
  id: number;
  name: string;
  handleClick: (option: Option) => void;
}> = (props) => {
  return (
    <Tag
      onClick={() =>
        props.handleClick({ id: props.id, value: props.name } as Option)
      }
      size={"md"}
    >
      <TagLabel>{props.name}</TagLabel>
      <TagRightIcon boxSize={"0.5em"} as={CloseIcon} />
    </Tag>
  );
};

const MultiSelectOption: React.FC<{
  id: number;
  name: string;
  handleSelect: (option: Option) => void;
}> = ({ id, name, handleSelect }) => {
  return (
    <Box
      pt={1}
      pb={1}
      onMouseDown={() => handleSelect({ id, value: name } as Option)}
      _hover={{ backgroundColor: "gray.100" }}
    >
      <Box pl={3}>{name}</Box>
    </Box>
  );
};

type MultiSelectProps = {
  options: Option[];
  onSelect?: (newState: Option[]) => void;
  placeholder?: string;
};

export default function MultiSelect({
  placeholder,
  options,
  onSelect,
}: MultiSelectProps) {
  const [show, setShow] = React.useState(false);
  const [selected, setSelected] = React.useState<Option[]>([]);
  const [filteredOptions, setFilteredOptions] = React.useState(options);

  React.useEffect(() => {
    onSelect && onSelect(selected);
  }, [selected]);

  const handleClick = (clickedTag: Option) => {
    setSelected(selected.filter((s) => s.id !== clickedTag.id));
    setFilteredOptions([...filteredOptions, clickedTag]);
  };

  const handleSelect = (selectedOption: Option) => {
    setSelected([...selected, selectedOption]);
    setFilteredOptions(
      filteredOptions.filter((s) => s.id !== selectedOption.id)
    );
  };

  return (
    <Stack spacing="0.5rem">
      <Box>
        <Wrap>
          {selected.map((s) => (
            <TagWithIcon
              handleClick={handleClick}
              key={s.id}
              id={s.id}
              name={s.value}
            />
          ))}
        </Wrap>
      </Box>
      <Box id="dropdown-wrapper" position={"relative"}>
        <Input
          onBlur={() => setShow(false)}
          onFocus={() => setShow(true)}
          placeholder={placeholder ? placeholder : ""}
          type="text"
        ></Input>
        <Box
          bg={"white"}
          top={"3rem"}
          width={"100%"}
          zIndex={"1000"}
          position={"absolute"}
          display={show && filteredOptions.length > 0 ? "block" : "none"}
          pb={1}
          shadow={"md"}
        >
          {filteredOptions.map((option) => (
            <MultiSelectOption
              handleSelect={handleSelect}
              key={option.id}
              id={option.id}
              name={option.value}
            />
          ))}
        </Box>
      </Box>
    </Stack>
  );
}
