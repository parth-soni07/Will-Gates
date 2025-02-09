import React from "react";
import { Users } from "lucide-react";
import "./BeneficiariesSection.css";

const BeneficiariesSection = ({ beneficiaries, navigate } : any) => (
  <div className="beneficiaries-section">
    <h3 className="section-title">Current Beneficiaries</h3>
    <div className="beneficiaries-grid">
      {beneficiaries.map((beneficiary : any) => (
        <div key={beneficiary.id} className="beneficiary-card">
          <Users className="beneficiary-icon" />
          <h4>{beneficiary.name}</h4>
          <p>{beneficiary.relationship}</p>
          <span className="beneficiary-email">{beneficiary.email}</span>
        </div>
      ))}
    </div>
    <button
      onClick={() => navigate("/add-beneficiary")}
      className="add-new-button"
    >
      Add New Beneficiary
    </button>
  </div>
);

export default BeneficiariesSection;
