import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DonationService from "./pages/DonationService";
import Signup from "./pages/Signup";
import MasterSignup from "./pages/MasterSignup";
import MasterLogin from "./pages/MasterLogin";
import PlatformControl from "./pages/PlatformControl";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserSignup from "./pages/UserSignup";
import AdminSignup from "./pages/AdminSignup";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails"; // Import CampaignDetails

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/signup" || location.pathname === "/master" || location.pathname === "/master-login" || location.pathname === "/login"; // Hide header/footer on Signup, MasterSignup, MasterLogin, and Login

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/master" element={<MasterSignup />} />
          <Route path="/master-login" element={<MasterLogin />} />
          <Route path="/platform-control" element={<PlatformControl />} />
          <Route path="/services/donation" element={<DonationService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} /> {/* Add CampaignDetails route */}
        </Routes>
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
