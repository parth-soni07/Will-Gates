import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Shield,
  Key,
  FileText,
  Users,
  Activity,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateWill from "./pages/CreateWill";
import Assets from "./pages/Assets";
import Beneficiaries from "./pages/Beneficiaries";
import AddAsset from "./pages/AddAsset";
import AddBeneficiary from "./pages/AddBeneficiary";
import KycVerificationPage from "./pages/KycVerificationPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-will" element={<CreateWill />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/add-asset" element={<AddAsset />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/add-beneficiary" element={<AddBeneficiary />} />
          <Route
            path="/kyc-verification"
            element={<KycVerificationPage userPrincipal="" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
