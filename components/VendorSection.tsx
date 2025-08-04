"use client";
import Image from "next/image";
import { Vendor } from "@/types";
import { FiExternalLink, FiLoader, FiAlertCircle } from "react-icons/fi";

interface VendorSectionProps {
  vendors: Vendor[];
  eventType: string;
  isLoading: boolean;
  error: string | null;
}

export default function VendorSection({
  vendors,
  eventType,
  isLoading,
  error,
}: VendorSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="md:text-2xl text-xl font-bold text-center mb-6">
          Sponsors and Partners
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 rounded-xl p-8 max-w-2xl mx-auto text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Could not load partners
          </h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : vendors.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <FiExternalLink className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No partners to display
          </h3>
          <p className="text-gray-600">
            Check back later for our partner announcements
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group flex flex-col h-full"
            >
              <div 
                className="relative h-48 w-full bg-gray-50 bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: vendor.logo?.url ? `url(${vendor.logo.url})` : 'none',
                  backgroundSize: '100%',
                  backgroundPosition: 'center'
                }}
              >
                {!vendor.logo?.url && (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-purple-600">
                      {vendor.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6 text-center flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {vendor.name}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  Explore their offerings
                </p>
                {vendor.url && (
                  <a
                    href={vendor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium gap-2 w-full"
                  >
                    Visit Website <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}