import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import "./styles/index.css"
import Landing from "./components/Landing"
import GovernmentServices from "./components/government"
import React from "react"
import Layout from "./layout"
import HealthcarePage from "./components/HealthcarePage"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public route without layout */}
        <Route path="/landing" element={<Landing />} />

        {/* Protected routes with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="/GovernmentServices" element={<GovernmentServices />} />
          <Route path="/HealthcarePage" element={<HealthcarePage />} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
