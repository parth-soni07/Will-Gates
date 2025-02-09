import React from "react";
import "./ReviewSection.css";

const ReviewSection = ({ willData, assets } : any) => {
  return (
    <div className="review-section">
      <h3 className="section-title">Review Your Will</h3>

      <div className="review-block">
        <h4>Will Details</h4>
        <p>
          <strong>Title:</strong> {willData.title}
        </p>
        <p>
          <strong>Description:</strong> {willData.description}
        </p>
        <p>
          <strong>Execution Time:</strong> {willData.time} days
        </p>
      </div>
    </div>
  );
};

export default ReviewSection;
