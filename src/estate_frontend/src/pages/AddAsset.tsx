import React from "react";
import { Wallet, Upload, Link } from "lucide-react";

const AddAsset = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Asset</h1>

      <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="assetName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Asset Name
            </label>
            <input
              type="text"
              id="assetName"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter asset name"
            />
          </div>

          <div>
            <label
              htmlFor="assetType"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Asset Type
            </label>
            <select
              id="assetType"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select asset type</option>
              <option value="real-estate">Real Estate</option>
              <option value="financial">Financial</option>
              <option value="collectibles">Collectibles</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="value"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Estimated Value
            </label>
            <input
              type="text"
              id="value"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter estimated value"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add details about your asset"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Documentation
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Add Asset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
