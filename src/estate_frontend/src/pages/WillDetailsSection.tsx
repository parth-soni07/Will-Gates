import React from "react";
import "./WillDetailsSection.css";

const WillDetailsSection = ({ willData, setWillData } : any) => {
  const handleChange = (e : any) => {
    setWillData((prev : any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="will-details-section">
      <h3 className="section-title">Will Details</h3>
      <div className="form-group">
        <label>Will Title</label>
        <input
          type="text"
          name="title"
          value={willData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Execution Time (days)</label>
        <input
          type="number"
          name="time"
          value={willData.time}
          onChange={handleChange}
          required
          min="1"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={willData.description}
          onChange={handleChange}
          rows={4}
        />
      </div>
    </div>
  );
};

export default WillDetailsSection;
