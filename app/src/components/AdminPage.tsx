import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, List, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


export default function AdminPage() {

    const [manageVolunteers, setManageVolunteers] = useState(false)


  return (
    <Flex w="100vw" h='100vh' mt="2rem" alignItems="center" justifyContent="center">
            <Flex gap="10" mb='15rem' flexDirection="column" justifyContent="flex-start">
                    <Menu>
                        <MenuButton w="300px" as={Button} rightIcon={<ChevronDownIcon />}>
                            Manage Volunteers
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Change Volunteer Filter</MenuItem>
                            <MenuItem>Search Volunteers</MenuItem>
                            <MenuItem>View Volunteer Opportunity Matches</MenuItem>
                            <MenuItem>Edit Volunteer</MenuItem>
                            <NavLink to='/CreateVolunteer/1'><MenuItem>Add New Volunteer</MenuItem></NavLink>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton w="300px" as={Button} rightIcon={<ChevronDownIcon />}>
                            Manage Opportunities
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Change Opportunity Filter</MenuItem>
                            <MenuItem>Search Opportunities</MenuItem>
                            <MenuItem>View Volunteer Opportunity Matches</MenuItem>
                            <MenuItem>Edit Opportunities</MenuItem>
                            <MenuItem>Add New Opportunity</MenuItem>
                            <NavLink to='/CreateOpportunity'><MenuItem>Add New Opportunity</MenuItem></NavLink>
                        </MenuList>
                    </Menu>
            </Flex>
    </Flex>

  )
}
