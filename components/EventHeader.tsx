import React from 'react'
import { FiCopy, FiShare2, FiRotateCw, FiImage } from "react-icons/fi"
import Link from "next/link"

const EventHeader = ({
  eventName,
  onBack,
  eventId,
  copySpinWheelLink,
  copied,
  openQRCodeModal,
  qrLoading,
}: {
  eventName: string
  onBack: () => void
  eventId: string
  copySpinWheelLink: () => void
  copied: boolean
  openQRCodeModal: () => void
  qrLoading: boolean
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-gray-200">
    {/* Left side - Event title and back button */}
    <div className="flex items-center space-x-4">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
      >
        <span className="group-hover:-translate-x-0.5 transition-transform duration-200">←</span>
        <span className="ml-1">All Events</span>
      </button>
      <h1 className="text-xl font-semibold text-gray-800 truncate max-w-xs sm:max-w-md">
        {eventName}
      </h1>
    </div>

    {/* Right side - Action buttons */}
    <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
      <Link
        href={`/${eventId}`}
        className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md"
      >
        <FiRotateCw className="mr-2" size={16} />
        View Spin Wheel
      </Link>

      <div className="flex gap-2">
        {/* Copy Link Button */}
        <button
          onClick={copySpinWheelLink}
          className="flex items-center justify-center px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md relative group"
          aria-label="Copy spin wheel link"
        >
          {copied ? (
            <FiShare2 className="text-green-500" size={16} />
          ) : (
            <FiCopy className="text-gray-600" size={16} />
          )}
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {copied ? "Copied!" : "Copy Link"}
          </span>
        </button>

        {/* QR Code Button */}
        <button
          onClick={openQRCodeModal}
          disabled={qrLoading}
          className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Generate QR code"
        >
          {qrLoading ? (
            <>
              <svg
                className="animate-spin mr-2 h-4 w-4 text-gray-600"
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
              Generating...
            </>
          ) : (
            <>
              <FiImage className="mr-2" size={16} />
              QR Code
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)

export default EventHeader