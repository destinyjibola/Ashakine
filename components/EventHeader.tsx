import React from 'react'
import { FiCopy, FiShare2, FiRotateCw, FiImage } from "react-icons/fi";
import Link from "next/link";


const EventHeader = ({
  eventName,
  onBack,
  eventId,
  copySpinWheelLink,
  copied,
  openQRCodeModal,
  qrLoading,
}: {
  eventName: string;
  onBack: () => void;
  eventId: string;
  copySpinWheelLink: () => void;
  copied: boolean;
  openQRCodeModal: () => void;
  qrLoading: boolean;
}) => (
  <div className="flex sm:flex-row sm:items-center flex-col space-y-4">
    <div>
      <button
        onClick={onBack}
        className="mr-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
      >
        ← All Events
      </button>
    </div>
    <div className="sm:ml-auto flex items-center space-x-2">
      <Link
        href={`/${eventId}`}
        className="flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors"
      >
        <FiRotateCw className="mr-1.5" />
        Go to spinwheel
      </Link>
      <button
        onClick={copySpinWheelLink}
        className="flex items-center px-2 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm transition-colors group relative"
        aria-label="Copy spin wheel link"
      >
        {copied ? (
          <FiShare2 className="text-green-500" />
        ) : (
          <FiCopy className="text-gray-600 group-hover:text-gray-900" />
        )}
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? "Copied!" : "Copy Spin Wheel Link"}
        </span>
      </button>
      <button
        onClick={openQRCodeModal}
        disabled={qrLoading}
        className="flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors group relative disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Generate QR code for spin wheel"
      >
        {qrLoading ? (
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
        ) : (
          <FiImage className="mr-1.5" />
        )}
        Generate QR Code
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Generate QR Code
        </span>
      </button>
    </div>
  </div>
);

export default EventHeader