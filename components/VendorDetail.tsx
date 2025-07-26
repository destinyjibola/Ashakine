import { Vendor, Prize, Winner } from "@/types";
import Image from "next/image";
import React from "react";

const VendorDetails = ({
  vendor,
  prizes,
  winners,
}: {
  vendor: Vendor | null;
  prizes: Prize[] | null;
  winners: Winner[] | null;
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 max-w-3xl mx-auto transition-all duration-300 hover:shadow-xl">
    {/* Header with Logo and Name */}
    <div className="bg-[#FFB60014] rounded-lg p-4 mb-6 flex items-center gap-4">
      {vendor?.logo?.url ? (
        <Image
          src={vendor.logo.url}
          alt={vendor.logo.altText || "Vendor Logo"}
          width={64}
          height={64}
          className="object-cover w-16 h-16 rounded-full border border-gray-200 transition-transform duration-300 hover:scale-105"
        />
      ) : (
        <div className="w-16 h-16 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-xs font-medium">No Logo</span>
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{vendor?.name || "N/A"}</h1>
        <p className="text-sm text-gray-600 font-medium">{vendor?.email || "N/A"}</p>
      </div>
    </div>

    {/* Stats Section */}
    <div className="bg-gray-50 rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Vendor Stats</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* <div className="bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md hover:bg-blue-50 transition-all duration-200">
          <p className="text-sm text-gray-600 font-medium">Event</p>
          <p className="text-lg font-semibold text-blue-700">
            {typeof vendor?.event === "object" ? vendor.event?.name : "N/A"}
          </p>
        </div> */}
        <div className="bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md hover:bg-blue-50 transition-all duration-200">
          <p className="text-sm text-gray-600 font-medium">Prizes</p>
          <p className="text-lg font-semibold text-blue-700">
            {prizes?.length ?? 0}
          </p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md hover:bg-blue-50 transition-all duration-200">
          <p className="text-sm text-gray-600 font-medium">Redeemed</p>
          <p className="text-lg font-semibold text-blue-700">
            {winners?.filter((w) => w.redeemed).length ?? 0}
          </p>
        </div>
        {/* <div className="bg-white p-3 rounded-lg border border-gray-100 hover:shadow-md hover:bg-blue-50 transition-all duration-200">
          <p className="text-sm text-gray-600 font-medium">URL</p>
          <a
            href={vendor?.url}
            className="text-blue-500 hover:underline font-semibold text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            {vendor?.url ? "Visit Site" : "N/A"}
          </a>
        </div> */}
      </div>
    </div>
  </div>
);

export default VendorDetails;