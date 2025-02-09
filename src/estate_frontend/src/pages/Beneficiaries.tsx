import React from "react";
import { Users, UserPlus, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Beneficiaries = () => {
  const navigate = useNavigate();
  const beneficiaries = [
    {
      id: 1,
      name: "John Doe",
      relationship: "Son",
      email: "john@example.com",
      status: "Verified",
      assets: ["Primary Residence", "Investment Portfolio"],
    },
    {
      id: 2,
      name: "Jane Smith",
      relationship: "Daughter",
      email: "jane@example.com",
      status: "Pending",
      assets: ["Art Collection"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Beneficiaries</h1>
        <button
          onClick={() => navigate("/add-beneficiary")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <UserPlus className="h-5 w-5" />
          <span>Add Beneficiary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {beneficiaries.map((beneficiary) => (
          <div
            key={beneficiary.id}
            className="bg-gray-800 rounded-lg border border-gray-700 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-gray-700 rounded-full p-3">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">
                    {beneficiary.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {beneficiary.relationship}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  beneficiary.status === "Verified"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {beneficiary.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">{beneficiary.email}</span>
              </div>

              <div className="border-t border-gray-700 pt-3">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Assigned Assets:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {beneficiary.assets.map((asset, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm">
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Beneficiaries;
