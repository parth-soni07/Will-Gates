import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Users, Wallet } from "lucide-react";

interface Asset {
  id: number;
  name: string;
  type: string;
  value: string;
  assignedTo: string | null;
}

interface Beneficiary {
  id: number;
  name: string;
  relationship: string;
}

const CreateWill = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [willData, setWillData] = useState({
    title: "",
    description: "",
  });
  const [assets, setAssets] = useState<Asset[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWillData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    // Here you would submit the will data to your backend
    console.log("Submitting will:", {
      ...willData,
      assets,
      beneficiaries,
    });
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Add Beneficiaries
            </h3>
            {/* Beneficiary list will be displayed here */}
            <button
              onClick={() => navigate("/beneficiaries/add")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add New Beneficiary
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Will Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={willData.title}
                onChange={handleInputChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a title for your will"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={willData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add any additional notes or instructions"
              ></textarea>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Add Assets
            </h3>
            {/* Asset list will be displayed here */}
            <button
              onClick={() => navigate("/assets/add")}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add New Asset
            </button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Review Your Will
            </h3>

            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-4">
                Will Details
              </h4>
              <table className="w-full">
                <tbody className="divide-y divide-gray-600">
                  <tr>
                    <td className="py-2 text-gray-300">Title</td>
                    <td className="py-2 text-white">{willData.title}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-300">Description</td>
                    <td className="py-2 text-white">{willData.description}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-4">
                Beneficiaries
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {beneficiaries.map((beneficiary) => (
                  <div
                    key={beneficiary.id}
                    className="bg-gray-600 rounded-lg p-4"
                  >
                    <h5 className="font-medium text-white">
                      {beneficiary.name}
                    </h5>
                    <p className="text-gray-300">{beneficiary.relationship}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h4 className="text-lg font-medium text-white mb-4">Assets</h4>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-300">
                    <th className="py-2">Asset</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Value</th>
                    <th className="py-2">Assigned To</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {assets.map((asset) => (
                    <tr key={asset.id}>
                      <td className="py-2 text-white">{asset.name}</td>
                      <td className="py-2 text-gray-300">{asset.type}</td>
                      <td className="py-2 text-gray-300">{asset.value}</td>
                      <td className="py-2 text-gray-300">{asset.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Create Your Will</h1>

      {/* Steps Progress */}
      <div className="mb-12">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <span
            className={currentStep >= 1 ? "text-blue-400" : "text-gray-400"}
          >
            Add Beneficiaries
          </span>
          <span
            className={currentStep >= 2 ? "text-blue-400" : "text-gray-400"}
          >
            Create Will
          </span>
          <span
            className={currentStep >= 3 ? "text-blue-400" : "text-gray-400"}
          >
            Add Assets
          </span>
          <span
            className={currentStep >= 4 ? "text-blue-400" : "text-gray-400"}
          >
            Review
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={handlePrevStep}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              onClick={handleNextStep}
              className="ml-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
            >
              Submit Will
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateWill;
