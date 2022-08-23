import { Center, Text } from "@chakra-ui/react";

export default function NoMatch({notFoundText}: {notFoundText: string}) {
  return (
    <Center mt={'1rem'} mb={'1rem'} w={'100%'}>
      <Text fontSize={'xl'}>{notFoundText}</Text>
    </Center>
  )
}