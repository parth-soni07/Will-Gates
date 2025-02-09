import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create Will", href: "/create-will" },
    { name: "Assets", href: "/assets" },
    { name: "Beneficiaries", href: "/beneficiaries" },
    { name: "Governance", href: "/governance" },
    { name: "KYC Verification", href: "/kyc-verification" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Shield className="navbar-logo" />
            <span className="navbar-title">Will-Gates</span>
          </Link>

          <div className="navbar-links">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${
                  location.pathname === item.href ? "active" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button className="connect-wallet-btn">Connect Wallet</button>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="mobile-menu">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${
                  location.pathname === item.href ? "active" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="connect-wallet-btn">Connect Wallet</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
