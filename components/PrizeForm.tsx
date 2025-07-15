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
  event, // Add event prop
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
  selectedVendor: string;
  setSelectedVendor: (value: string) => void;
  event: Event; // Add event to props
}) => (
  <form onSubmit={handleAddPrize} className="flex flex-col gap-4">
    <div className="space-y-2">
      <label htmlFor="prize" className="text-gray-600 text-sm block">
        Add New Prize
      </label>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          id="prize"
          value={newPrize}
          onChange={(e) => setNewPrize(e.target.value)}
          placeholder="Prize name"
          className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="number"
          id="maxWins"
          value={newMaxWins}
          onChange={(e) => setNewMaxWins(Number(e.target.value))}
          placeholder="Max Wins"
          className="w-24 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="1"
          required
        />
      </div>
    </div>
    <div className="space-y-2">
      <label htmlFor="redeemInfo" className="text-gray-600 text-sm block">
        Redeem Information
      </label>
      <textarea
        id="redeemInfo"
        value={newRedeemInfo}
        onChange={(e) => setNewRedeemInfo(e.target.value)}
        placeholder="Instructions for redeeming this prize"
        className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
        rows={3}
      />
    </div>
    {event.type !== "Single" && ( 
      <div className="space-y-2">
        <label htmlFor="vendor" className="text-gray-600 text-sm block">
          Select a Vendor
        </label>
        <select
          id="vendor"
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
    <button
      type="submit"
      disabled={prizeLoading}
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
    >
      {prizeLoading ? (
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
      ) : null}
      Add Prize
    </button>
    {prizeError && (
      <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-md">
        {prizeError}
      </div>
    )}
  </form>
);

export default PrizeForm;