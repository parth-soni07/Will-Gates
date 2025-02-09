import React from "react";
import { Wallet, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Assets = () => {
  const navigate = useNavigate();
  const assets = [
    {
      id: 1,
      name: "Primary Residence",
      type: "Real Estate",
      value: "$500,000",
      status: "Tokenized",
    },
    {
      id: 2,
      name: "Investment Portfolio",
      type: "Financial",
      value: "$250,000",
      status: "Pending",
    },
    {
      id: 3,
      name: "Art Collection",
      type: "Collectibles",
      value: "$100,000",
      status: "Tokenized",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Digital Assets</h1>
        <button
          onClick={() => navigate("/add-asset")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Asset</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Asset Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Value
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="px-6 py-4 text-sm text-white">{asset.name}</td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {asset.type}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  {asset.value}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      asset.status === "Tokenized"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assets;
