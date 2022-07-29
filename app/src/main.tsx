import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseTable from "./components/BaseTable";
import PersonalInfoForm from "./components/PersonalInfoForm";
import VolunteerInfoForm from "./components/VolunteerInfoForm";
import EmergencyContactForm from "./components/EmergencyContactForm";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/TablePreview" element={<BaseTable />} />
        <Route path="/CreateVolunteer/PersonalInfo" element={<PersonalInfoForm />} />
        <Route path="/CreateVolunteer/VolunteerInfo" element={<VolunteerInfoForm />} />
        <Route path="/CreateVolunteer/EmergencyContactInfo" element={<EmergencyContactForm  />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
