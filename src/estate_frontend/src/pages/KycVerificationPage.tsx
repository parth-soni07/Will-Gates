import React, { useState, useEffect } from "react";
import {
  Upload,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  X,
} from "lucide-react";
import "./KycVerificationPage.css";
import lighthouse from "@lighthouse-web3/sdk";


const apiKey = import.meta.env.VITE_LIGHTHOUSE_API_KEY;
console.log(apiKey);
interface KycVerificationPageProps {
  userPrincipal: string;
}

const KycVerificationPage: React.FC<KycVerificationPageProps> = ({
  userPrincipal,
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [docType, setDocType] = useState<string>("Aadhaar");
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docPreview, setDocPreview] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<
    "idle" | "submitting" | "verified" | "rejected"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [verificationRefId, setVerificationRefId] = useState<string>("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDocFile(file);

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDocPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setDocPreview(null);
      }

      setShowNotification(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile) {
      setErrorMessage("Please select a document file to upload.");
      return;
    }
    setErrorMessage("");
    setKycStatus("submitting");

      const blob = new Blob([docFile], { type: docFile.type });
      const formData = new FormData();
      formData.append("file", blob, docFile.name);

      const response = await lighthouse.upload(
        formData,
        apiKey
      )
      // const response = await fetch(
      //   "https://node.lighthouse.storage/api/v0/add",
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${apiKey}`,
      //     },
      //     body: formData,
      //   }
      // );

        console.log("File uploaded to IPFS:", response);
        setKycStatus("verified");
  };

  return (
    <div className="kyc-container">
      <h1 className="kyc-title">KYC Verification</h1>

      {showNotification && (
        <div className="notification animate-fade-in">
          <div className="notification-content">
            <div className="notification-info">
              <CheckCircle className="notification-icon" />
              <div>
                <p className="notification-text">Document Uploaded</p>
                <p className="notification-subtext">{docFile?.name}</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="close-notification-btn"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      <div className="kyc-card">
        {kycStatus === "verified" ? (
          <div className="success-container">
            <div className="success-icon-container">
              <CheckCircle className="success-icon" />
            </div>
            <h2 className="success-title">KYC Verified Successfully!</h2>
            <p className="reference-id">Reference ID: {verificationRefId}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name (as per Govt. ID)
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="docType" className="form-label">
                Document Type
              </label>
              <select
                id="docType"
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="form-select"
              >
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Passport">Passport</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Upload Document (PDF/Images)</label>
              {docFile ? (
                <div className="file-preview">
                  <div className="file-preview-content">
                    <div className="file-info">
                      {docPreview ? (
                        <img
                          src={docPreview}
                          alt="Document preview"
                          className="file-thumbnail"
                        />
                      ) : (
                        <div className="file-thumbnail-placeholder">
                          <FileText />
                        </div>
                      )}
                      <div className="file-details">
                        <p className="file-name">{docFile.name}</p>
                        <p className="file-size">
                          {(docFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDocFile(null);
                        setDocPreview(null);
                      }}
                      className="remove-file-btn"
                    >
                      <X />
                    </button>
                  </div>
                  <label className="change-file-btn">
                    Change file
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg, .pdf"
                      onChange={handleDocFileChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              ) : (
                <div className="file-upload-container">
                  <div className="upload-content">
                    <Upload className="upload-icon" />
                    <div className="upload-text">
                      <label className="upload-label">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg, .pdf"
                          onChange={handleDocFileChange}
                          className="sr-only"
                          required
                        />
                      </label>
                      <p>or drag and drop</p>
                    </div>
                    <p className="upload-hint">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="error-message">
                <AlertCircle className="error-icon" />
                <p className="error-text">{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={kycStatus === "submitting"}
              className="submit-btn"
            >
              {kycStatus === "submitting" ? (
                <>
                  <svg
                    className="loading-spinner"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Submit for Verification"
              )}
            </button>
          </form>
        )}

        {kycStatus === "rejected" && (
          <div className="error-message">
            <XCircle className="error-icon" />
            <div>
              <p className="error-text">KYC Verification failed or rejected.</p>
              <p className="error-subtext">{errorMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KycVerificationPage;
