import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddAsset.scss";
import { assetStore } from "./assetStore"; // Import asset store

const AddAsset = () => {
  const navigate = useNavigate();
  const [assetData, setAssetData] = useState({
    assetName: "",
    assetType: "",
    estimatedValue: "",
    description: "",
    isAssigned: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setAssetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add asset to assetStore instead of calling backend
      assetStore.push({ ...assetData });

      console.log("Asset added successfully:", assetData);
      navigate("/assets"); // Redirect to Assets page
    } catch (error) {
      console.error("Error adding asset:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-asset-container">
      <h1 className="title">Add New Asset</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="assetName">Asset Name</label>
            <input
              type="text"
              id="assetName"
              name="assetName"
              value={assetData.assetName}
              onChange={handleInputChange}
              placeholder="Enter asset name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="assetType">Asset Type</label>
            <select
              id="assetType"
              name="assetType"
              value={assetData.assetType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select asset type</option>
              <option value="real-estate">Real Estate</option>
              <option value="financial">Financial</option>
              <option value="collectibles">Collectibles</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="estimatedValue">Estimated Value</label>
            <input
              type="number"
              id="estimatedValue"
              name="estimatedValue"
              value={assetData.estimatedValue}
              onChange={handleInputChange}
              placeholder="Enter estimated value"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={assetData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Add details about your asset"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Adding..." : "Add Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
