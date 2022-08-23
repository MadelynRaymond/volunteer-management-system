import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Nav() {

  const navigate = useNavigate()
  const {pathname} = useLocation()
  return (
    <>
    {!pathname.includes('Login') && 
      <Box h={'5rem'} w={'100vw'}>
        <Flex padding={'2rem'} justifyContent={'flex-end'}>
          <Button onClick={() => navigate('/Login')}>Logout</Button>
        </Flex>
      </Box>
    }
    </>
  )
}
