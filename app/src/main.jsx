import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";

import "./styles/index.css";

// Layouts
import Layout from "./layout";
import CnLayout from "./layout_cn";

// Components - English
import Landing from "./components/Landing";
import GovernmentServices from "./components/government";
import HealthcarePage from "./components/HealthcarePage";
import VitalInformation from "./components/Vital";
import CommunityEvents from "./components/CommunityEvents";

// Components - Chinese
import GovernmentServicesCn from "./components/government_cn";
import HealthcarePageCn from "./components/HealthcarePage_cn";
import VitalInformationCn from "./components/Vital_cn";
import CommunityEventsCn from "./components/CommunityEvents_cn";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Landing page is the entry point */}
        <Route path="/" element={<Landing />} />
        <Route path="/landing" element={<Landing />} />

        {/* English routes with default layout */}
        <Route element={<Layout />}>
          <Route path="/VitalInformation" element={<VitalInformation />} />
          <Route path="/GovernmentServices" element={<GovernmentServices />} />
          <Route path="/HealthcarePage" element={<HealthcarePage />} />
          <Route path="/CommunityEvents" element={<CommunityEvents />} />
        </Route>

        {/* Chinese routes with Chinese layout */}
        <Route element={<CnLayout />}>
          <Route path="/VitalInformationCn" element={<VitalInformationCn />} />
          <Route path="/GovernmentServicesCn" element={<GovernmentServicesCn />} />
          <Route path="/HealthcarePageCn" element={<HealthcarePageCn />} />
          <Route path="/CommunityEventsCn" element={<CommunityEventsCn />} />

        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
