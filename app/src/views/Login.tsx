import { Box, Text, Flex, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const notPopulated = (field: string) => field === '' && submitted

  const submit = (e: any) => {
    setSubmitted(true)
 
    const hasErrors = username === '' || password === ''

    if(hasErrors){
      e.preventDefault()
      
      const delay = setTimeout(() => {
        setSubmitted(false)
        clearInterval(delay)
      }, 500)
    }
    else {
      navigate('/')
    }

    

  }

  return (
    <>
        <Flex w="100vw" mt="2rem" justifyContent="center">
    
            <Box w="400px" boxShadow={'base'} p='2rem' borderRadius={'2xl'} mt='8rem'>
                <Stack spacing="1.25rem">
                    <Text fontSize="3xl">Admin Login</Text>
                    <FormControl isRequired isInvalid={notPopulated(username)}>
                        <FormLabel>Username:</FormLabel>
                        <Input onChange={(e) => setUsername(e.target.value)} type="text" />
                    </FormControl>
                    <FormControl isRequired isInvalid={notPopulated(password)}>
                        <FormLabel>Password:</FormLabel>
                        <Input onChange={(e) => setPassword(e.target.value)} type="text" />
                    </FormControl>
                    <Button onClick={(e) => submit(e)} colorScheme='purple'>Login</Button>
                    <Flex justifyContent={'center'}>
                      <Text color={'blue.600'}>Please contact IT Help Desk with any admin login issues: (904) 233-5555</Text>
                    </Flex>
                </Stack>
            </Box>
        </Flex>

    </>
  )
}
