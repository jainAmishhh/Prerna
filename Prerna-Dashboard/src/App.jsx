import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./Layout";

// Pages
import Dashboard from "./Components/Dashboard/Dashboard";
import Schemes from "./Pages/Schemes/Schemes";
import HealthSection from "./Pages/HealthSection/HealthSection";
import GuidanceSection from "./Pages/GuidanceSection/GuidanceSection";
import Sakhi from "./Pages/Sakhi/Sakhi";
import SupportSection from "./Pages/SupportSection/SupportSection";
import BlogSection from "./Pages/BlogSection/BlogSection";
import Auth from "./Components/Auth/Auth";
import AboutPrernaPlatform from "./Pages/AboutSection/AboutPrernaPlatform";
import AskDidi from "./Pages/AskDidi/AskDidi";
import Opportunities from "./Components/Opportunities/Opportunities";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* All pages wrapped inside Layout */}
        <Route element={<Layout />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/about-section" element={<AboutPrernaPlatform />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/all-opportunities" element={<Opportunities />} />
          <Route path="/health" element={<HealthSection />} />
          <Route path="/guidance" element={<GuidanceSection />} />
          <Route path="/sakhi" element={<Sakhi />} />
          <Route path="/ask-Didi" element={<AskDidi />} />
          <Route path="/support" element={<SupportSection />} />
          <Route path="/blogs" element={<BlogSection />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
