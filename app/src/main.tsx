import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import StoreProvider from "./context/store";
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider>
    <StoreProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </StoreProvider>
  </ChakraProvider>
);
