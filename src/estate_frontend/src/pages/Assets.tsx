import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Assets.css";
import { assetStore } from "./assetStore"; // Import asset store

const Assets = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState(assetStore); // Directly use assetStore
  const [loading, setLoading] = useState(false); // No need for async fetching

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Digital Assets</h1>
        <button onClick={() => navigate("/add-asset")} className="add-button">
          <Plus className="icon" />
          <span>Add New Asset</span>
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading assets...</div>
      ) : assets.length === 0 ? (
        <div className="empty-state">No assets registered.</div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Value</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>${asset.estimatedValue}</td>
                  <td>
                    <span className="status-badge tokenized">Tokenized</span>
                  </td>
                  <td>
                    <button className="action-button">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Assets;
