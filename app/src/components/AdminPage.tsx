import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, List, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


export default function AdminPage() {

    const [manageVolunteers, setManageVolunteers] = useState(false)


  return (
    <Flex w="100vw" h='100vh' mt="2rem" alignItems="center" justifyContent="center">
            <Flex gap="10" mb='15rem' flexDirection="column" justifyContent="flex-start">
                <NavLink to='/Volunteers'><Button w="300px" as={Button}>Manage Volunteers</Button></NavLink>
                <NavLink to='/Opportunities'><Button w="300px" as={Button}>Manage Opportunities</Button></NavLink>
                
            </Flex>
    </Flex>

  )
}
