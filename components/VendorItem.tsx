"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Vendor } from "@/types";
import { useAuth } from "@/hooks/AuthContext";
import {
  FiMail,
  FiExternalLink,
  FiEdit2,
  FiTrash2,
  FiRefreshCw,
} from "react-icons/fi";

interface VendorItemProps {
  vendor: Vendor;
  handleDeleteVendor: (vendorId: string) => void;
  setEditingVendor: (vendor: Vendor | null) => void;
  eventType?: string;
}

const VendorItem = ({
  vendor,
  handleDeleteVendor,
  setEditingVendor,
  eventType,
}: VendorItemProps) => {
  const { token, logout } = useAuth();
  const [isSendingInvitation, setIsSendingInvitation] = useState(false);
  const [invitationMessage, setInvitationMessage] = useState<string | null>(
    null
  );
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
      if (!token) throw new Error("No authentication token available");

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

      if (!response.ok)
        throw new Error(data.message || "Failed to send invitation email");

      setIsInvited(true);
      setShowResend(true);
      setInvitationMessage("Invitation sent successfully!");
      setTimeout(() => setInvitationMessage(null), 3000);
    } catch (error) {
      setInvitationError(
        error instanceof Error ? error.message : "An error occurred"
      );
      setTimeout(() => setInvitationError(null), 3000);
    } finally {
      setIsSendingInvitation(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-400/50 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start gap-4">
          {/* Vendor Info */}
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="flex-shrink-0 relative w-12 h-12 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
              {vendor.logo?.url ? (
                <Image
                  src={vendor.logo.url}
                  alt={vendor.logo.altText || `${vendor.name} logo`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-400">
                    No Logo
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-gray-900">{vendor.name}</h3>

              <div className="flex flex-wrap gap-2">
                {vendor.email && (
                  <div className="flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full">
                    <FiMail className="w-3.5 h-3.5 text-gray-600" />
                    <span
                      className="text-xs font-medium text-gray-600 truncate max-w-[120px]"
                      title={vendor.email}
                    >
                      {vendor.email}
                    </span>
                  </div>
                )}

                {vendor.url && (
                  <a
                    href={vendor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <FiExternalLink className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-medium text-blue-600">
                      {vendor.url.replace(/^https?:\/\//, "").substring(0, 20)}
                      {vendor.url.replace(/^https?:\/\//, "").length > 10
                        ? "..."
                        : ""}
                    </span>
                  </a>
                )}

                {eventType !== "Single" && (
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">
                      <span className="font-medium">Prizes:</span>{" "}
                      {vendor.prizes?.length || 0}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={() => setEditingVendor(vendor)}
              className="text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors"
              aria-label="Edit vendor"
            >
              <FiEdit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDeleteVendor(vendor._id)}
              className="text-gray-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
              aria-label="Delete vendor"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invitation Section */}
        {eventType !== "Single" && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between gap-3">
              <div className="flex-1">
                {invitationMessage && (
                  <p className="text-green-600 text-sm animate-fade-in">
                    {invitationMessage}
                  </p>
                )}
                {invitationError && (
                  <p className="text-red-600 text-sm animate-fade-in">
                    {invitationError}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSendInvitation}
                  disabled={isSendingInvitation || !vendor.email || isInvited}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                    isSendingInvitation
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : isInvited
                      ? "bg-green-100 text-green-700 cursor-default"
                      : !vendor.email
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  title={
                    !vendor.email
                      ? "No email address available"
                      : isInvited
                      ? "Invitation already sent"
                      : "Send invitation email"
                  }
                >
                  <FiMail className="w-4 h-4" />
                  <span>
                    {isSendingInvitation
                      ? "Sending..."
                      : isInvited
                      ? "Invited"
                      : !vendor.email
                      ? "No Email"
                      : "Invite"}
                  </span>
                </button>

                {(showResend || vendor.invite) && (
                  <button
                    onClick={handleSendInvitation}
                    disabled={isSendingInvitation}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                      isSendingInvitation
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title="Resend invitation email"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    <span>Resend</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorItem;
