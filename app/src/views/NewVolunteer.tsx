import { Progress } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import VolunteerInfoForm from '../components/VolunteerInfoForm'
import FormPage from './FormPage'

export default function NewVolunteer() {
  return (
    <>
        <Outlet/>
    </>
  )
}
