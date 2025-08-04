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
 
  selectedVendor: string | null;
  setSelectedVendor: (value: string | null) => void;
  event: Event;
}) => (
  <form
    onSubmit={handleAddPrize}
    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
  >
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900">Add New Prize</h2>
        <p className="text-sm text-gray-500">Fill in the details below to add a new prize</p>
      </div>

      <div className="space-y-5">
        {/* Prize Name and Max Wins - Same Row on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4">
          {/* Prize Name (70%) */}
          <div>
            <label
              htmlFor="prize"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Prize Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="prize"
                value={newPrize}
                onChange={(e) => setNewPrize(e.target.value)}
                placeholder="e.g. $50 Gift Card"
                maxLength={20}
                className="w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all border-gray-300 hover:border-gray-400"
                required
                aria-describedby="prize-length"
              />
              <div className="flex justify-between mt-1.5">
                <p id="prize-length" className="text-xs text-gray-500">
                  {newPrize.length}/20 characters
                </p>
              </div>
            </div>
          </div>

          {/* Max Wins (30%) */}
          <div>
            <label
              htmlFor="maxWins"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Max Wins <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                id="maxWins"
                value={newMaxWins}
                onChange={(e) => setNewMaxWins(Number(e.target.value))}
                placeholder="e.g. 10"
                className="w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all border-gray-300 hover:border-gray-400"
                min="1"
                required
              />
            </div>
          </div>
        </div>

        {/* Vendor Selection (conditionally rendered) - Full width */}
        {/* {event.type !== "Single" && (
          <div>
            <label
              htmlFor="vendor"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Vendor <span className="text-red-500">*</span>
            </label>
            <select
              id="vendor"
              value={selectedVendor || ""}
              onChange={(e) => setSelectedVendor(e.target.value || null)}
              className="w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none border-gray-300 hover:border-gray-400"
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
        )} */}

        {/* Redeem Information */}
        <div>
          <label
            htmlFor="redeemInfo"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Redemption Instructions
          </label>
          <textarea
            id="redeemInfo"
            value={newRedeemInfo}
            onChange={(e) => setNewRedeemInfo(e.target.value)}
            placeholder="Provide details on how to redeem this prize..."
            className="w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all border-gray-300 hover:border-gray-400 min-h-[120px]"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={prizeLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
              prizeLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
            }`}
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
          <div
            className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 flex items-start"
            role="alert"
          >
            <svg
              className="h-5 w-5 text-red-500 mr-2 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{prizeError}</span>
          </div>
        )}
      </div>
    </div>
  </form>
);

export default PrizeForm;