import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { estate_backend } from "../../../declarations/estate_backend";
import "./CreateWill.css";
import { Principal } from "@dfinity/principal";
import BeneficiariesSection from "./BeneficiariesSection";
import WillDetailsSection from "./WillDetailsSection";
import AssetsSection from "./AssetsSection";
import ReviewSection from "./ReviewSection";
import ProgressTracker from "./ProgressTracker";
import { getAssets } from "./assetStore";

interface Beneficiary {
  id: number;
  name: string;
  relationship: string;
  email: string;
  principal: Principal
}

interface Asset {
  id: number;
  name: string;
  type: string;
  value: number;
  description: string;
  assignedTo: Principal | null;
  isAssigned: boolean;
  status: "Tokenized";
}

const CreateWill = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [willData, setWillData] = useState({
    title: "",
    description: "",
    time: 0,
  });
  const [assets, setAssets] = useState<Asset[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [assignedBeneficiaries, setAssignedBeneficiaries] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAssets = await getAssets(); // Fetch assets from assetStore.ts
        setAssets(
          fetchedAssets.map((asset, index) => ({
            id: index,
            name: asset.assetName,
            type: asset.assetType,
            value: parseFloat(asset.estimatedValue.replace("$", "")), // Convert string to number
            description: asset.description,
            assignedTo: null, // Default value since it's not in assetStore
            isAssigned: asset.isAssigned,
            status: "Tokenized",
          }))
        );

        const beneficiariesResponse = await estate_backend.showBeneficiaries();
        if (beneficiariesResponse !== "No beneficiaries registered.") {
          const parsedBeneficiaries: Beneficiary[] = beneficiariesResponse
            .split("\n")
            .slice(1)
            .map((line, index) => {
              const parts = line.match(
                /Name: (.*?) (.*?), Relationship: (.*?), Email: (.*?), Phone: (.*?), Wallet: (.*)/
              );
              return parts
                ? {
                    id: index,
                    name: `${parts[1]} ${parts[2]}`,
                    relationship: parts[3],
                    email: parts[4],
                  }
                : null;
            })
            .filter((b): b is Beneficiary => b !== null);

          setBeneficiaries(parsedBeneficiaries);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  const assignBeneficiaryToAsset = (assetId: number, beneficiaryId: number) => {
    const selectedBeneficiary = beneficiaries.find(
      (b: any) => b.id === beneficiaryId
    );
    if (selectedBeneficiary) {
      setAssignedBeneficiaries((prev) => ({
        ...prev,
        [assetId]: selectedBeneficiary.name, // Store beneficiary's name against the asset ID
      }));
    }
  };
  const handleSelectBeneficiary = (beneficiaryId: number) => {
    assignBeneficiaryToAsset(selectedAssetId, beneficiaryId); // Assign beneficiary
    setShowBeneficiaryModal(false); // Close modal
  };
  const handleAssign = async (beneficiaryPrincipal: Principal) => {
      try {
        const success = await estate_backend.assignAsset(beneficiaryPrincipal);
        if (!success) {
          console.error("Failed to assign the beneficiary.");
          return;
        }
      } catch (error) {
        console.error("Error creating assigning asset:", error);
        return;
      }
    };
  const handleNextStep = async () => {
    if (currentStep === 2) {
      try {
        const success = await estate_backend.createWill(
          willData.title,
          willData.description,
          BigInt(willData.time)
        );
        if (!success) {
          console.error("Failed to create the will.");
          return;
        }
      } catch (error) {
        console.error("Error creating will:", error);
        return;
      }
    } else if (currentStep === 3) {
      for (const asset of assets) {
        try {
          await estate_backend.addAsset(
            asset.name,
            asset.type,
            BigInt(asset.value),
            asset.description
          );
        } catch (error) {
          console.error("Error adding asset to the backend:", error);
        }
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="create-will-container">
      <h1 className="page-title">Create Your Will</h1>
      <ProgressTracker currentStep={currentStep} />
      <div className="content-section">
        {currentStep === 1 && (
          <BeneficiariesSection
            beneficiaries={beneficiaries}
            navigate={navigate}
          />
        )}
        {currentStep === 2 && (
          <WillDetailsSection willData={willData} setWillData={setWillData} />
        )}
        {currentStep === 3 && (
          <AssetsSection
            assets={assets}
            setSelectedAssetId={setSelectedAssetId}
            setShowBeneficiaryModal={setShowBeneficiaryModal}
            assignedBeneficiaries={assignedBeneficiaries}
          />
        )}
        {currentStep === 4 && (
          <ReviewSection willData={willData} assets={assets} />
        )}
      </div>

      <div className="navigation-buttons">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className="prev-button"
          >
            Previous
          </button>
        )}
        {currentStep < 4 ? (
          <button onClick={handleNextStep} className="next-button">
            Next Step
          </button>
        ) : (
          <button
            onClick={() => navigate("/dashboard")}
            className="submit-button"
          >
            Submit Will
          </button>
        )}
      </div>

      {showBeneficiaryModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Select Beneficiary</h3>
              <button
                className="close-modal"
                onClick={() => {
                  setShowBeneficiaryModal(false); // Close modal after selection
                }}
              >
                <X />
              </button>
            </div>
            <div className="modal-content">
              {beneficiaries.map((beneficiary) => (
                <button
                  key={beneficiary.id}
                  className="beneficiary-option"
                  onClick={() => {
                    handleSelectBeneficiary(beneficiary.id),
                    handleAssign(beneficiary.principal)
                  }}
                >
                  <span className="beneficiary-name">{beneficiary.name}</span>
                  <span className="beneficiary-relationship">
                    {beneficiary.relationship}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWill;
