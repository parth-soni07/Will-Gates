import React, { useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useNavigate } from "react-router-dom";
import { estate_backend } from "../../../declarations/estate_backend"; // Adjust based on your project setup
import { Principal } from "@dfinity/principal";
import "./AddBeneficiary.css"; // Import external CSS file

const AddBeneficiary = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    email: "",
    phone: "",
    wallet: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const walletPrincipal = formData.wallet
        ? Principal.fromText(formData.wallet)
        : Principal.anonymous();

      const response = await estate_backend.addBeneficiary(
        formData.firstName,
        formData.lastName,
        formData.relationship,
        formData.email,
        formData.phone,
        walletPrincipal
      );
      console.log("Beneficiary added:", response);
      alert("Beneficiary successfully added!");
      setFormData({
        firstName: "",
        lastName: "",
        relationship: "",
        email: "",
        phone: "",
        wallet: "",
      });
    } catch (error) {
      console.error("Error adding beneficiary:", error);
      alert("Failed to add beneficiary");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">Add New Beneficiary</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <select
            id="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="select"
            required
          >
            <option value="">Select relationship</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="other">Other</option>
          </select>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="tel"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="text"
            id="wallet"
            placeholder="Wallet Address (Optional)"
            value={formData.wallet}
            onChange={handleChange}
            className="input"
          />
          <div className="button-group">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/beneficiaries")}
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Adding..." : "Add Beneficiary"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBeneficiary;
