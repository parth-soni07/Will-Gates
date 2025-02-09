import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X } from "lucide-react";
import { AuthClient } from "@dfinity/auth-client";
import "./Navbar.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create Will", href: "/create-will" },
    { name: "Assets", href: "/assets" },
    { name: "Beneficiaries", href: "/beneficiaries" },
    { name: "KYC Verification", href: "/kyc-verification" },
  ];

  const handleConnectWallet = async () => {
    if (!walletConnected) {
      const authClient = await AuthClient.create();
      authClient.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          // Handle successful authentication here
          console.log("Login successful");
          setWalletConnected(true);
          // Update UI or state as necessary
        },
        onError: (error:any) => {
          console.error("Login failed:", error);
        },
      });
    } else {
      alert("Wallet already connected");
    }
  };
  const WalletButton = () => {
    if (walletConnected) {
      return <div className="connect-wallet-btn">Connected</div>;
    }
    return (
      <button className="connect-wallet-btn" onClick={handleConnectWallet}>
        Connect Wallet
      </button>
    );
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="flex items-center">
            <Link to="/" className="navbar-brand">
              <Shield className="navbar-logo" />
              <span className="navbar-title">Will-Gates</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
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
              <WalletButton />
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
