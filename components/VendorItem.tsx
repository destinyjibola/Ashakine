"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Vendor } from "@/types";
import { useAuth } from "@/hooks/AuthContext";

const VendorItem = ({
  vendor,
  handleDeleteVendor,
}: {
  vendor: Vendor;
  handleDeleteVendor: (vendorId: string) => void;
}) => {
  const { token, logout } = useAuth();
  const [isSendingInvitation, setIsSendingInvitation] = useState(false);
  const [invitationMessage, setInvitationMessage] = useState<string | null>(null);
  const [invitationError, setInvitationError] = useState<string | null>(null);
  const [isInvited, setIsInvited] = useState(vendor.invite || false);
  const router = useRouter();

  const handleSendInvitation = async () => {
    setIsSendingInvitation(true);
    setInvitationMessage(null);
    setInvitationError(null);

    try {
      if (!token) {
        throw new Error("No authentication token available");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${vendor.event}/vendors/${vendor._id}/invite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        logout();
        setInvitationError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to send invitation email");
      }

      setIsInvited(true); // Update state immediately after successful invite
      setInvitationMessage("Invitation email sent successfully!");
      setTimeout(() => setInvitationMessage(null), 3000);
    } catch (error) {
      setInvitationError(error instanceof Error ? error.message : "An error occurred");
      setTimeout(() => setInvitationError(null), 3000);
    } finally {
      setIsSendingInvitation(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-center gap-4">
        {/* Vendor Logo */}
        {vendor.logo?.url ? (
          <Image
            src={vendor.logo.url}
            alt={vendor.logo.altText || "Vendor Logo"}
            width={48}
            height={48}
            className="object-cover w-12 h-12 rounded-full border border-gray-200 transition-transform duration-200 hover:scale-105"
          />
        ) : (
          <div className="w-12 h-12 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium">No Logo</span>
          </div>
        )}
        {/* Vendor Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{vendor.name}</h3>
              <div className="flex flex-col gap-1 mt-1 text-sm">
                <a
                  href={vendor.url}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {vendor.url}
                </a>
                <p className="text-gray-600">Email: {vendor.email || "N/A"}</p>
                <p className="text-gray-600">Prizes: {vendor.prizes?.length || 0}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDeleteVendor(vendor._id)}
                className="bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 hover:text-red-700 transition-all duration-200 text-sm font-medium"
              >
                Delete
              </button>
              <button
                onClick={handleSendInvitation}
                disabled={isSendingInvitation || !vendor.email || isInvited}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
                  isSendingInvitation || !vendor.email || isInvited
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                }`}
              >
                {isSendingInvitation ? "Sending..." : isInvited ? "Invited" : "Send Invitation"}
              </button>
            </div>
          </div>
          {invitationMessage && (
            <p className="text-green-600 text-sm mt-2">{invitationMessage}</p>
          )}
          {invitationError && (
            <p className="text-red-600 text-sm mt-2">{invitationError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorItem;