import React, { useEffect, useState } from "react";
import { Users, UserPlus, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { estate_backend } from "../../../declarations/estate_backend";
import "./Beneficiaries.css"
const Beneficiaries = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState<
    Array<{
      id: number;
      name: string;
      relationship: string;
      email: string;
      phone: string;
      wallet: string;
      status: string;
      assets: string[];
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const response = await estate_backend.showBeneficiaries();
        if (response === "No beneficiaries registered.") {
          setBeneficiaries([]);
        } else {
          const parsedBeneficiaries = response
            .split("\n")
            .slice(1)
            .map((line, index) => {
              const parts = line.match(
                /Name: (.*?) (.*?), Relationship: (.*?), Email: (.*?), Phone: (.*?), Wallet: (.*)/
              );
              if (parts) {
                return {
                  id: index,
                  name: `${parts[1]} ${parts[2]}`,
                  relationship: parts[3],
                  email: parts[4],
                  phone: parts[5],
                  wallet: parts[6],
                  status: "Verified",
                  assets: [],
                };
              }
              return null; // Explicitly returning null for unmatched lines
            })
            .filter((b) => b !== null) as {
            id: number;
            name: string;
            relationship: string;
            email: string;
            phone: string;
            wallet: string;
            status: string;
            assets: string[];
          }[]; // Type assertion to avoid TS errors

          setBeneficiaries(parsedBeneficiaries);

        }
      } catch (error) {
        console.error("Error fetching beneficiaries:", error);
      }
      setLoading(false);
    };

    fetchBeneficiaries();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Beneficiaries</h1>
        <button
          onClick={() => navigate("/add-beneficiary")}
          className="add-button"
        >
          <UserPlus className="icon" />
          <span>Add Beneficiary</span>
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : beneficiaries.length === 0 ? (
        <p className="no-data">No beneficiaries registered.</p>
      ) : (
        <div className="grid-container">
          {beneficiaries.map((beneficiary) => (
            <div key={beneficiary.id} className="card">
              <div className="card-header">
                <div className="card-icon">
                  <Users className="icon" />
                </div>
                <div>
                  <h3 className="card-title">{beneficiary.name}</h3>
                  <p className="card-subtitle">{beneficiary.relationship}</p>
                </div>
              </div>
              <span
                className={
                  "status " +
                  (beneficiary.status === "Verified" ? "verified" : "pending")
                }
              >
                {beneficiary.status}
              </span>
              <div className="card-body">
                <div className="info">
                  <Mail className="icon" />
                  <span>{beneficiary.email}</span>
                </div>
                <div className="assets">
                  <h4>Assigned Assets:</h4>
                  <div className="asset-list">
                    {beneficiary.assets.length > 0 ? (
                      beneficiary.assets.map((asset, index) => (
                        <span key={index} className="asset">
                          {asset}
                        </span>
                      ))
                    ) : (
                      <span className="no-assets">No assets assigned</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="edit-button">Edit Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Beneficiaries;
