"use client";
import React from "react";
import VendorItem from "./VendorItem";
import { Event, Vendor } from "@/types";

const VendorsList = ({
  event,
  vendors,
  handleDeleteVendor,
  setEditingVendor,
}: {
  event: Event | null;
  vendors: Vendor[];
  handleDeleteVendor: (vendorId: string) => void;
  setEditingVendor: (vendor: Vendor | null) => void;
}) => (
  <>
    {!event ? (
      <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
        <p className="text-gray-500">Loading event...</p>
      </div>
    ) : vendors.length === 0 ? (
      <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
        <p className="text-gray-500">No vendors added yet</p>
      </div>
    ) : (
      <div className="mt-6">
        <h2 className="mb-4">Vendors</h2>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {vendors.map((vendor) => (
            <VendorItem
              key={vendor._id}
              vendor={vendor}
              handleDeleteVendor={handleDeleteVendor}
              setEditingVendor={setEditingVendor} 
            />
          ))}
        </div>
      </div>
    )}
  </>
);

export default VendorsList;