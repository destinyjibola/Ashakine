// components/VendorSection.tsx
"use client";

import Image from "next/image";
import { Vendor } from "@/types";

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
  if (isLoading || error || eventType !== "Vendor" || vendors.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 w-full max-w-5xl">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Event Sponsors & Partners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              {vendor.logo?.url ? (
                <Image
                  src={vendor.logo.url}
                  alt={vendor.logo.altText || vendor.name}
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] object-cover mx-auto mb-4 rounded-full border-2 border-purple-200"
                />
              ) : (
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">
                    {vendor.name.charAt(0)}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                {vendor.name}
              </h3>
              <p className="text-gray-600 text-center mt-2 line-clamp-2">
                {vendor.prizes?.length
                  ? `Offering ${vendor.prizes.length} exciting prize${
                      vendor.prizes.length > 1 ? "s" : ""
                    }`
                  : "Explore their offerings!"}
              </p>
              <div className="mt-4 flex justify-center">
                <a
                  href={vendor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-semibold hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                >
                  Visit
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}