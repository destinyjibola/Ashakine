"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Vendor } from "@/types";
import { useAuth } from "@/hooks/AuthContext";
import { FiTrash2, FiEdit, FiExternalLink, FiMail, FiRefreshCw } from "react-icons/fi";

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
  const [showResend, setShowResend] = useState(vendor.invite || false);
  const router = useRouter();

  useEffect(() => {
    setShowResend(vendor.invite || false);
  }, [vendor.invite]);

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
      setShowResend(true);
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
    <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-300/50 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative p-5 flex flex-col md:flex-row gap-5">
        {/* Vendor Logo */}
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-100 group-hover:border-blue-100 transition-all duration-300">
            {vendor.logo?.url ? (
              <Image
                src={vendor.logo.url}
                alt={vendor.logo.altText || `${vendor.name} logo`}
                fill
                sizes="64px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-xs font-medium">No Logo</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Vendor Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-gray-900 truncate">
                {vendor.name}
              </h3>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full">
                  <FiMail className="text-gray-600 flex-shrink-0" size={14} />
                  <span className="text-sm text-gray-700 truncate">
                    {vendor.email || "No email"}
                  </span>
                </div>
                
                {vendor.url && (
                  <a
                    href={vendor.url}
                    className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink className="text-blue-600 flex-shrink-0" size={14} />
                    <span className="text-sm text-blue-600 truncate max-w-[120px]">
                      {vendor.url.replace(/^https?:\/\//, '')}
                    </span>
                  </a>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span className="font-medium">Prizes:</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-800">
                    {vendor.prizes?.length || 0}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 min-w-[140px]">
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingVendor(vendor)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-medium"
                  aria-label={`Edit ${vendor.name}`}
                >
                  <FiEdit size={16} />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={() => handleDeleteVendor(vendor._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
                  aria-label={`Delete ${vendor.name}`}
                >
                  <FiTrash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={handleSendInvitation}
                  disabled={isSendingInvitation || !vendor.email || isInvited}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 ${
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
                
                {(showResend || vendor.invite) && (
                  <button
                    onClick={handleSendInvitation}
                    disabled={isSendingInvitation}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                      isSendingInvitation
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title="Resend invitation email"
                  >
                    <FiRefreshCw size={14} />
                    <span>Resend</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Status messages */}
          <div className="mt-3">
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