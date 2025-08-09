"use client";
import React from "react";
import Image from "next/image";
import { Vendor, Event } from "@/types";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface VendorItemProps {
  vendor: Vendor;
  eventType: string;
  handleDeleteVendor: (vendorId: string) => void;
  setEditingVendor: (vendor: Vendor | null) => void;
}

const VendorItem = ({
  vendor,
  eventType,
  handleDeleteVendor,
  setEditingVendor,
}: VendorItemProps) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${vendor.name}?`)) {
      handleDeleteVendor(vendor._id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-row items-start justify-between space-y-4">
      <div className="flex items-center space-x-4">
        {vendor.logo?.url ? (
          <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200">
            <Image
              src={vendor.logo.url}
              alt={`${vendor.name} logo`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : (
          <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-400">No Logo</span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">{vendor.name}</h3>
          <a
            href={vendor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            {vendor.url}
          </a>
          {vendor.email && (
            <p className="text-xs text-gray-500">{vendor.email}</p>
          )}
        </div>
      </div>
 
        <div className="flex flex-row space-x-2">
          <button
            onClick={() => setEditingVendor(vendor)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label={`Edit ${vendor.name}`}
          >
            <FiEdit className="h-5 w-5" />
          </button>


          <button
            onClick={handleDelete}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            aria-label={`Delete ${vendor.name}`}
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
        </div>
  );
};

export default VendorItem;