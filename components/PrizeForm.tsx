import { Event, Vendor } from "@/types";
import React from "react";

const PrizeForm = ({
  newPrize,
  setNewPrize,
  newMaxWins,
  setNewMaxWins,
  newRedeemInfo,
  setNewRedeemInfo,
  prizeLoading,
  prizeError,
  handleAddPrize,
  vendors,
  selectedVendor,
  setSelectedVendor,
  event,
}: {
  newPrize: string;
  setNewPrize: (value: string) => void;
  newMaxWins: number;
  setNewMaxWins: (value: number) => void;
  newRedeemInfo: string;
  setNewRedeemInfo: (value: string) => void;
  prizeLoading: boolean;
  prizeError: string | null;
  handleAddPrize: (e: React.FormEvent) => void;
  vendors: Vendor[];
  selectedVendor: string | null;
  setSelectedVendor: (value: string | null) => void;
  event: Event;
}) => (
  <form
    onSubmit={handleAddPrize}
    className="space-y-4 bg-white rounded-lg p-6 shadow-sm border border-gray-200"
  >
    <h2 className="text-lg font-medium text-gray-800">Add New Prize</h2>

    <div className="space-y-4">
      {/* Prize Name */}
      <div>
        <label
          htmlFor="prize"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Prize Name *
        </label>
        <input
          type="text"
          id="prize"
          value={newPrize}
          onChange={(e) => setNewPrize(e.target.value)}
          placeholder="e.g. $50 Gift Card"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Max Wins and Vendor Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Max Wins */}
        <div>
          <label
            htmlFor="maxWins"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Maximum Wins *
          </label>
          <div className="relative">
            <input
              type="number"
              id="maxWins"
              value={newMaxWins}
              onChange={(e) => setNewMaxWins(Number(e.target.value))}
              placeholder="e.g. 10"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
              required
            />
          </div>
        </div>

        {/* Vendor Selection (conditionally rendered) */}
        {event.type !== "Single" && (
          <div>
            <label
              htmlFor="vendor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Vendor *
            </label>
            <select
              id="vendor"
              value={selectedVendor || ""}
              onChange={(e) =>
                setSelectedVendor(e.target.value || null)
              }
              className="w-full px-4 py-[10px] border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="" disabled>
                Select a vendor
              </option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Redeem Information */}
      <div>
        <label
          htmlFor="redeemInfo"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Redemption Instructions
        </label>
        <textarea
          id="redeemInfo"
          value={newRedeemInfo}
          onChange={(e) => setNewRedeemInfo(e.target.value)}
          placeholder="Provide details on how to redeem this prize..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={prizeLoading}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {prizeLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Adding Prize...
            </>
          ) : (
            "Add Prize"
          )}
        </button>
      </div>

      {/* Error Message */}
      {prizeError && (
        <div className="p-3 text-sm text-red-700 bg-red-50 rounded-md border border-red-200">
          {prizeError}
        </div>
      )}
    </div>
  </form>
);

export default PrizeForm;