import React, { useState } from "react";
import { Briefcase, UserPlus } from "lucide-react";
import "./AssetsSection.css";

const AssetsSection = ({
  assets,
  setSelectedAssetId,
  setShowBeneficiaryModal,
  assignedBeneficiaries,
}: any) => {
  // State to store assigned beneficiaries for each asset

  const handleAssignBeneficiary = (assetId: number) => {
    setSelectedAssetId(assetId);
    setShowBeneficiaryModal(true);
  };

  return (
    <div className="assets-section">
      <h3 className="section-title">Your Registered Assets</h3>
      <div className="assets-grid">
        {assets.map((asset: any) => (
          <div key={asset.id} className="asset-card">
            <Briefcase className="asset-icon" />
            <h4>{asset.name}</h4>
            <p>{asset.type}</p>
            <p className="asset-value">{asset.value}</p>
            <button
              className="assign-button"
              onClick={() => handleAssignBeneficiary(asset.id)}
            >
              {assignedBeneficiaries[asset.id] ? (
                <span>{assignedBeneficiaries[asset.id]}</span> // Show beneficiary name if assigned
              ) : (
                <>
                  <UserPlus size={16} /> Assign Beneficiary
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetsSection;
