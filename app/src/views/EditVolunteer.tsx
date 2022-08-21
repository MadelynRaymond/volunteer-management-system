import axios from 'axios'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import PersonalInfoForm from '../components/PersonalInfoForm'
import { StoreContext } from '../context/store'

export default function EditVolunteer() {
  
  const {state} = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(true)
  const {volunteer, updateVolunteer} = React.useContext(StoreContext) as StoreContext
  const getVolunteer = async () => {
    const hasId = (state: unknown): state is number => state !== null && typeof state === 'number'
    console.log(state)
    if(hasId(state)) {
      const {data} = await axios.get(`http://localhost:8080/Volunteers/${state}`)
      updateVolunteer(data)
      setLoading(false)
    }
    else {
      navigate('/Volunteers')
    }
  }

  React.useEffect(() => {
    getVolunteer()
  }, [])

  return (
    <>
      {!loading && <Outlet/>}
    </>
  )
}
