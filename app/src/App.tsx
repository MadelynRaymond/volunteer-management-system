import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PersonalInfoForm from "./components/PersonalInfoForm";
import VolunteerInfoForm from "./components/VolunteerInfoForm";
import EmergencyContactForm from "./components/EmergencyContactForm";
import NewVolunteer from "./views/NewVolunteer";
import Volunteers from "./views/Volunteers";
import EditVolunteer from "./views/EditVolunteer";
import Opportunities from "./views/Opportunities";
import Login from "./views/Login";
import VolunteerMatches from "./views/VolunteerMatches";
import OpportunityMatches from "./views/OpportunityMatches";
import AdminPage from "./components/AdminPage";
import OpportunityForm from "./components/OpportunityForm";
import { Box, Button, Flex } from "@chakra-ui/react";
import Nav from "./components/Nav";
import { StoreContext } from "./context/store";


export default function App() {

  const location = useLocation()
  const navigate = useNavigate()
  const {token} = React.useContext(StoreContext) as StoreContext

  React.useEffect(() => {
    if(token === ''){
      navigate('/Login')
    }
  }, [token])
  
  return (
    <>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Opportunities" element={<Opportunities />} />
          <Route path="/Opportunities/VolunteerMatches/:id" element={<VolunteerMatches />} />
          <Route path="/Volunteers" element={<Volunteers />} />
          <Route path="/Volunteers/OpportunityMatches/:id" element={<OpportunityMatches />} />
          <Route path="/EditVolunteer/:id" element={<EditVolunteer/>}>
            <Route path="1" element={<PersonalInfoForm />} />
            <Route path="2" element={<VolunteerInfoForm />} />
            <Route path="3" element={<EmergencyContactForm />} />
          </Route>
          <Route path="/CreateOpportunity" element={<OpportunityForm />} />
          <Route path="/CreateVolunteer" element={<NewVolunteer />}>
            <Route path="1" element={<PersonalInfoForm />} />
            <Route path="2" element={<VolunteerInfoForm />} />
            <Route path="3" element={<EmergencyContactForm />} />
          </Route>
        </Routes>
    </>
  )
}
