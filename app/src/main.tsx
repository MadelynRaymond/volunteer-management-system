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
import OpportunityForm from "./components/OpportunityForm";
import AdminPage from "./components/AdminPage";
import StoreProvider from "./context/store";
import Volunteers from "./views/Volunteers";
import EditVolunteer from "./views/EditVolunteer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminPage />} />
          <Route path="/Volunteers" element={<Volunteers />} />
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
