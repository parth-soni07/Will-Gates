import React from "react";
import "./ProgressTracker.css";

interface ProgressTrackerProps {
  currentStep: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep }) => {
  const steps = ["Beneficiaries", "Will Details", "Assets", "Review"];

  return (
    <div className="progress-tracker">
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>
      </div>

      <div className="steps">
        {steps.map((step, index) => {
          const isCompleted = index + 1 < currentStep;
          const isActive = index + 1 === currentStep;

          return (
            <div
              key={index}
              className={`step ${isCompleted ? "completed" : ""} ${
                isActive ? "active" : ""
              }`}
            >
              <div className="step-circle">{index + 1}</div>
              <div className="step-label">{step}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
