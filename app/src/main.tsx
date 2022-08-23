import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalInfoForm from "./components/PersonalInfoForm";
import VolunteerInfoForm from "./components/VolunteerInfoForm";
import EmergencyContactForm from "./components/EmergencyContactForm";
import NewVolunteer from "./views/NewVolunteer";
import StoreProvider from "./context/store";
import Volunteers from "./views/Volunteers";
import EditVolunteer from "./views/EditVolunteer";
import Opportunities from "./views/Opportunities";
import Login from "./views/Login";
import VolunteerMatches from "./views/VolunteerMatches";
import OpportunityMatches from "./views/OpportunityMatches";
import OpportunityForm from "./Components/OpportunityForm";
import AdminPage from "./Components/AdminPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <StoreProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </StoreProvider>
  </ChakraProvider>
);
