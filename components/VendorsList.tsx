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
  <div className="mt-4">
    {!event ? (
      <div className="bg-gray-100 rounded-xl p-8 text-center border border-gray-300">
        <p className="text-gray-500">Loading event...</p>
      </div>
    ) : vendors.length === 0 ? (
      <div className="bg-gray-100 rounded-xl p-8 text-center border border-gray-300">
        <p className="text-gray-500">No partners added yet</p>
      </div>
    ) : (
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vendors.map((vendor) => (
            <VendorItem
              key={vendor._id}
              vendor={vendor}
              eventType={event.type}
              handleDeleteVendor={handleDeleteVendor}
              setEditingVendor={setEditingVendor}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default VendorsList;