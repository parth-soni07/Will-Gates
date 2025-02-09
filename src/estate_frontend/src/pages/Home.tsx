import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Cpu, Users } from "lucide-react";
import "./Home.css";

const features = [
  {
    icon: <Shield className="feature-icon" />,
    title: "NFT Asset Tokenization",
    description:
      "Convert your assets into secure, blockchain-based tokens for seamless transfer and management.",
  },
  {
    icon: <Lock className="feature-icon" />,
    title: "Zero-Knowledge Identity",
    description:
      "Protect privacy with advanced cryptographic proofs for secure identity verification.",
  },
  {
    icon: <Cpu className="feature-icon" />,
    title: "Automated Execution",
    description:
      "Smart contracts ensure your wishes are carried out exactly as specified.",
  },
  {
    icon: <Users className="feature-icon" />,
    title: "Governance & Resolution",
    description:
      "Fair and transparent dispute resolution through decentralized arbitration.",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-image" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Reinventing Estate Planning with{" "}
            <span className="hero-title-gradient">
              Blockchain & Zero-Knowledge Proofs
            </span>
          </h1>
          <p className="hero-description">
            Simplify will creation, automate asset distribution, and ensure
            complete privacy using Will-Gates.
          </p>
          <div className="hero-buttons">
            <button
              onClick={() => navigate("/dashboard")}
              className="hero-button hero-button-primary"
            >
              Get Started
            </button>
            <button className="hero-button hero-button-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Next-Generation Estate Planning</h2>
            <p className="features-description">
              Will-Gates merges traditional estate planning with cutting-edge
              blockchain technology and advanced cryptography for unparalleled
              security and privacy.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-container">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
