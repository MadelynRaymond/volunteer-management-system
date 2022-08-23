import { Box, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/store'

export default function Nav() {

  const navigate = useNavigate()
  const {pathname} = useLocation()
  const {setLoggedIn} = React.useContext(StoreContext) as StoreContext

  const logout = () => {
    setLoggedIn('')
    navigate('/Login')
  }
  return (
    <>
    {!pathname.includes('Login') && 
      <Box h={'5rem'} w={'100vw'}>
        <Flex padding={'2rem'} justifyContent={'flex-end'}>
          <Button onClick={logout}>Logout</Button>
        </Flex>
      </Box>
    }
    </>
  )
}
