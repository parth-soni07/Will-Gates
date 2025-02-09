import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Users, Wallet } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Will-Gates</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Tokenized Assets</h3>
            <Wallet className="stat-icon stat-icon-blue" />
          </div>
          <p className="stat-value">12</p>
          <p className="stat-description">Total assets registered</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Will Status</h3>
            <FileText className="stat-icon stat-icon-green" />
          </div>
          <p className="stat-value">Active</p>
          <p className="stat-description">Last updated 2 days ago</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3 className="stat-title">Beneficiaries</h3>
            <Users className="stat-icon stat-icon-purple" />
          </div>
          <p className="stat-value">5</p>
          <p className="stat-description">Registered heirs</p>
        </div>
      </div>

      <div className="quick-actions">
        <button
          onClick={() => navigate("/create-will")}
          className="action-button action-button-primary"
        >
          <h3 className="action-title">Create New Will</h3>
          <p className="action-description">Start the will creation process</p>
        </button>

        <button
          onClick={() => navigate("/create-will")}
          className="action-button action-button-secondary"
        >
          <h3 className="action-title">View Existing Will</h3>
          <p className="action-description">
            Review and edit your current will
          </p>
        </button>

        <button
          onClick={() => navigate("/assets")}
          className="action-button action-button-secondary"
        >
          <h3 className="action-title">View Assets</h3>
          <p className="action-description">Manage your tokenized assets</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
