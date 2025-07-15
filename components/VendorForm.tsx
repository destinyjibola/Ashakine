import React from 'react'

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
  handleAddVendor: (e: React.FormEvent) => void;
}) => (
  <form onSubmit={handleAddVendor} className="flex flex-col gap-4 mb-6">
    <div className="space-y-2">
      <label htmlFor="vendorName" className="text-gray-600 text-sm block">
        Add New Vendor
      </label>
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          id="vendorName"
          value={newVendor.name}
          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
          placeholder="Vendor name"
          className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="url"
          id="vendorUrl"
          value={newVendor.url}
          onChange={(e) => setNewVendor({ ...newVendor, url: e.target.value })}
          placeholder="Vendor URL"
          className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <input
          type="email"
          id="vendorEmail"
          value={newVendor.email}
          onChange={(e) =>
            setNewVendor({ ...newVendor, email: e.target.value })
          }
          placeholder="Vendor Email"
          className="flex-1 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          disabled={vendorLoading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {vendorLoading ? (
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
          Add Vendor
        </button>
      </div>
    </div>
    {vendorError && (
      <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-md">
        {vendorError}
      </div>
    )}
  </form>
);

export default VendorForm