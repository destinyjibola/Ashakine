import React from 'react';
import { FiCopy, FiShare2, FiRotateCw, FiImage } from 'react-icons/fi';
import Link from 'next/link';
import { Vendor } from '@/types';

const VendorDetails = ({ vendor }: { vendor: Vendor | null }) => {
  // Placeholder for copy link functionality (adjust as needed)
  const copyVendorLink = () => {
    // Implement copy logic if needed, e.g., copying vendor.url
    navigator.clipboard.writeText(vendor?.url || '');
    // Add state for copied status if needed
  };

  // Placeholder for QR code functionality (adjust as needed)
  const openQRCodeModal = () => {
    // Implement QR code modal logic if needed
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start md:items-center sm:items-center gap-4 py-4 border-b border-gray-200">
      {/* Left side - Vendor logo, name, and back button */}
      <div className="flex items-center space-x-4">
        {/* Vendor Logo */}
        {vendor?.logo.url ? (
          <img
            src={vendor.logo.url}
            alt={`${vendor.name} logo`}
            className="h-12 w-12 object-contain rounded-full border border-gray-200"
          />
        ) : (
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            N/A
          </div>
        )}
        {/* Vendor Name and Back Button */}
        <div>
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group mb-2"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
            <span className="ml-1">All Vendors</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{vendor?.name || 'N/A'}</h1>
        </div>
      </div>

      {/* Right side - Vendor details and action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {/* Vendor Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Event</p>
            <p className="text-gray-900 font-bold">{vendor?.event?.name || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-gray-900 font-bold">{vendor?.email || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">URL</p>
            <a href={vendor?.url} className="text-blue-500 hover:underline font-bold">
              {vendor?.url || 'N/A'}
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {/* Copy Link Button (Optional, adjust based on requirements) */}
          <button
            onClick={copyVendorLink}
            className="flex items-center justify-center px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md relative group"
            aria-label="Copy vendor link"
          >
            <FiCopy className="text-gray-600" size={16} />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Copy Link
            </span>
          </button>

          {/* QR Code Button (Optional, adjust based on requirements) */}
          <button
            onClick={openQRCodeModal}
            className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md"
            aria-label="Generate QR code"
          >
            <FiImage className="mr-2" size={16} />
            QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;