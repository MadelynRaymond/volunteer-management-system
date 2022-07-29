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
import NewVolunteer from "./views/NewVolunteer";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/TablePreview" element={<BaseTable />} />
        <Route path="/CreateVolunteer" element={<NewVolunteer/>}>
          <Route path="PersonalInfo" element={<PersonalInfoForm/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
