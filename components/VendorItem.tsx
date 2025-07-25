"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Vendor } from "@/types";
import { useAuth } from "@/hooks/AuthContext";
import { FiTrash2, FiEdit, FiExternalLink, FiMail } from "react-icons/fi";

interface VendorItemProps {
  vendor: Vendor;
  handleDeleteVendor: (vendorId: string) => void;
  setEditingVendor: (vendor: Vendor | null) => void;
}

const VendorItem = ({
  vendor,
  handleDeleteVendor,
  setEditingVendor,
}: VendorItemProps) => {
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

      setIsInvited(true);
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
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-blue-100">
      <div className="flex flex-col md:flex-row items-start gap-4">
        {/* Vendor Logo */}
        <div className="flex-shrink-0">
          {vendor.logo?.url ? (
            <div className="relative w-16 h-16">
              <Image
                src={vendor.logo.url}
                alt={vendor.logo.altText || `${vendor.name} logo`}
                fill
                sizes="64px"
                className="object-cover rounded-full border-2 border-gray-100 transition-transform duration-200 hover:scale-105"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
              <span className="text-gray-400 text-xs font-medium">No Logo</span>
            </div>
          )}
        </div>
        
        {/* Vendor Details */}
        <div className="flex-1 w-full">
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-900">{vendor.name}</h3>
              
              <div className="flex items-center gap-1 text-gray-600">
                <FiMail className="flex-shrink-0" />
                <span className="truncate">{vendor.email || "N/A"}</span>
              </div>
              
              {vendor.url && (
                <div className="flex items-center gap-1">
                  <FiExternalLink className="text-gray-400 flex-shrink-0" />
                  <a
                    href={vendor.url}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 truncate text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={vendor.url}
                  >
                    {vendor.url.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              
              <div className="flex gap-4 text-sm">
                
                <span className="text-gray-600">
                  <span className="font-medium">Prizes:</span> {vendor.prizes?.length || 0}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 min-w-[120px]">
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingVendor(vendor)}
                  className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 text-sm"
                  aria-label={`Edit ${vendor.name}`}
                >
                  <FiEdit size={16} />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={() => handleDeleteVendor(vendor._id)}
                  className="flex items-center gap-1 px-3 py-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 text-sm"
                  aria-label={`Delete ${vendor.name}`}
                >
                  <FiTrash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
              
              <button
                onClick={handleSendInvitation}
                disabled={isSendingInvitation || !vendor.email || isInvited}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                  isSendingInvitation
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : isInvited
                    ? "bg-green-100 text-green-700 cursor-default"
                    : !vendor.email
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
                title={
                  !vendor.email 
                    ? "No email address available" 
                    : isInvited 
                    ? "Invitation already sent" 
                    : "Send invitation email"
                }
              >
                <FiMail size={16} />
                <span>
                  {isSendingInvitation 
                    ? "Sending..." 
                    : isInvited 
                    ? "Invitation Sent" 
                    : !vendor.email 
                    ? "No Email" 
                    : "Send Invite"}
                </span>
              </button>
            </div>
          </div>
          
          {/* Status messages */}
          <div className="mt-2">
            {invitationMessage && (
              <p className="text-green-600 text-sm animate-fade-in">{invitationMessage}</p>
            )}
            {invitationError && (
              <p className="text-red-600 text-sm animate-fade-in">{invitationError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorItem;