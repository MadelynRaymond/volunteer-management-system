import axios from 'axios'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { StoreContext } from '../context/store'

export default function EditVolunteer() {
  const {state} = useLocation()
  const {volunteer, updateVolunteer} = React.useContext(StoreContext) as StoreContext
  const getVolunteer = async () => {

    const hasId = (state: unknown): state is {id: number} => state !== null && typeof state === 'object' && state.hasOwnProperty('id')

    if(hasId(state)) {
      const {data} = await axios.get(`http://localhost:8080/Volunteers/${state.id}`)
      updateVolunteer(data)
    }
  }

  React.useEffect(() => {
    getVolunteer()
  }, [])
  return (
    <>
      <p>volunteer page</p>
    </>
  )
}
