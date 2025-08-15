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

const VendorSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse h-full">
    <div className="h-32 sm:h-48 bg-gray-200"></div>
    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
      <div className="h-5 sm:h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-8 sm:h-10 bg-gray-200 rounded mt-3 sm:mt-4"></div>
    </div>
  </div>
);

const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="bg-red-50 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto text-center">
    <FiAlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mx-auto mb-3 sm:mb-4" />
    <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
      Could not load partners
    </h3>
    <p className="text-red-600 mb-4 sm:mb-6">{error}</p>
    <button
      onClick={() => window.location.reload()}
      className="px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
    >
      Try Again
    </button>
  </div>
);

const EmptyState = () => (
  <div className="bg-gray-50 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto text-center">
    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
      <FiExternalLink className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400" />
    </div>
    <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
      No partners to display
    </h3>
    <p className="text-gray-600 text-sm sm:text-base">
      Check back later for our partner announcements
    </p>
  </div>
);

const VendorCard = ({ vendor }: { vendor: Vendor }) => (
  <div className="bg-gray-100 rounded-xl p-2 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md group flex flex-col h-full">
    <div className="relative h-32 sm:h-48 w-full bg-gray-50">
      {vendor.logo?.url ? (
        <Image
          src={vendor.logo.url}
          alt={vendor.name}
          fill
          className="object-over"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold text-purple-600">
            {vendor.name.charAt(0)}
          </span>
        </div>
      )}
    </div>

    <div className="text-center flex-grow flex flex-col">
      <h3 className="text-base sm:text-lg md:text-xl mt-2 sm:mt-4 mb-2 sm:mb-4 font-semibold text-gray-900">
        {vendor.name}
      </h3>

      {vendor.url && (
        <a
          href={vendor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          Visit <FiExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
        </a>
      )}
    </div>
  </div>
);

export default function VendorSection({
  vendors,
  eventType,
  isLoading,
  error,
}: VendorSectionProps) {
  return (
    <section className="w-full max-w-6xl mx-auto py-8 sm:py-12 px-2 sm:px-4 lg:px-8">
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6">
          Sponsors and Partners
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(3)].map((_, i) => (
            <VendorSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorDisplay error={error} />
      ) : vendors.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
      )}
    </section>
  );
}