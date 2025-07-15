import { Vendor } from "@/types";
import React from "react";

const VendorItem = ({
  vendor,
  handleDeleteVendor,
}: {
  vendor: Vendor;
  handleDeleteVendor: (vendorId: string) => void;
}) => (
  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-medium text-lg text-gray-900">{vendor.name}</h3>
        <div className="flex flex-col gap-2 mt-1 text-sm">
          <a href={vendor.url} className="text-blue-500 hover:underline">
            {vendor.url}
          </a>
          <p className="text-gray-500">Email: {vendor.email}</p>
          <p className="text-gray-500">Prizes: {vendor.prizes?.length || 0}</p>
        </div>
      </div>
      <button
        onClick={() => handleDeleteVendor(vendor._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  </div>
);

export default VendorItem;
