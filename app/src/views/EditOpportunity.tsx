import axios from 'axios'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import OpportunityForm from '../components/OpportunityForm'

export default function EditOpportunity() {

  const [data, setData] = React.useState()
  const [loading, setLoading] = React.useState(true)
  const location = useLocation()

  const getOpportunity = async () => {
    const {data} = await axios.get(`http://localhost:8080/Opportunities/${location.pathname.split('/')[2]}`)
    setData(data)
    setLoading(false)
  }
  React.useEffect(() => {
    getOpportunity()
  }, [])
  return (
    <>
      {!loading && <OpportunityForm existingOpportunity={data}/>}
    </>
  )
}
