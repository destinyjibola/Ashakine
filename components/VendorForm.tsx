import React, { useState, useRef } from "react";
import Image from "next/image";

const VendorForm = ({
  newVendor,
  setNewVendor,
  vendorError,
  vendorLoading,
  handleAddVendor,
}: {
  newVendor: { name: string; url: string; email: string };
  setNewVendor: (value: { name: string; url: string; email: string }) => void;
  vendorError: string | null;
  vendorLoading: boolean;
  handleAddVendor: (e: React.FormEvent, logo: File | null, resetLogo: () => void) => void;
}) => {
  const [newVendorLogo, setNewVendorLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetLogo = () => {
    setNewVendorLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={(e) => handleAddVendor(e, newVendorLogo, resetLogo)}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <h2 className="text-lg font-medium text-gray-800 mb-4">Add New Vendor</h2>
      
      <div className="space-y-4">
        {/* Vendor Name */}
        <div>
          <label htmlFor="vendorName" className="block text-sm font-medium text-gray-700 mb-1">
            Vendor Name *
          </label>
          <input
            type="text"
            id="vendorName"
            value={newVendor.name}
            onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
            placeholder="Company name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Vendor URL */}
        <div>
          <label htmlFor="vendorUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Website URL *
          </label>
          <input
            type="url"
            id="vendorUrl"
            value={newVendor.url}
            onChange={(e) => setNewVendor({ ...newVendor, url: e.target.value })}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Vendor Email */}
        <div>
          <label htmlFor="vendorEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            id="vendorEmail"
            value={newVendor.email}
            onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
            placeholder="contact@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label htmlFor="vendorLogo" className="block text-sm font-medium text-gray-700 mb-1">
            Logo *
          </label>
          <div className="space-y-2">
            <label
              className={`
                flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-md cursor-pointer
                ${logoPreview ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}
                transition-colors duration-200
              `}
            >
              <div className="flex flex-col items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-600 mb-1">
                  {newVendorLogo ? newVendorLogo.name : "Click to upload logo"}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
              </div>
              <input
                type="file"
                id="vendorLogo"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setNewVendorLogo(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setLogoPreview(reader.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setLogoPreview(null);
                  }
                }}
                className="sr-only"
                required
              />
            </label>

            {logoPreview && (
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={resetLogo}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={
              vendorLoading ||
              !newVendor.name ||
              !newVendor.url ||
              !newVendorLogo
            }
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {vendorLoading ? (
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
                Adding Vendor...
              </>
            ) : (
              "Add Vendor"
            )}
          </button>
        </div>

        {/* Error Message */}
        {vendorError && (
          <div className="p-3 text-sm text-red-700 bg-red-50 rounded-md border border-red-200">
            {vendorError}
          </div>
        )}
      </div>
    </form>
  );
};

export default VendorForm;