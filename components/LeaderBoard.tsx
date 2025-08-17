"use client";
import { Winner, Vendor } from "@/types";
import Image from "next/image";
import { Trophy, Gift, CheckCircle, Clock } from "lucide-react";

interface LeaderboardProps {
  winners: Winner[] | null;
  vendors: Vendor[];
}

export default function Leaderboard({ winners, vendors }: LeaderboardProps) {
  const getVendorName = (vendorId?: string) => {
    if (!vendorId) return "";
    const vendor = vendors.find((v) => v._id === vendorId);
    return vendor ? vendor.name : "Unknown Vendor";
  };

  const getVendorLogo = (vendorId?: string) => {
    if (!vendorId) return null;
    const vendor = vendors.find((v) => v._id === vendorId);
    return vendor?.logo?.url || null;
  };

  // Check if any winner has a vendorId
  const hasAnyVendor =
    winners?.some((winner) => !!winner.prizeId?.vendor) || false;

  if (!winners || winners.length === 0) {
    return (
      <div
        className="mt-12 w-full max-w-5xl"
        role="region"
        aria-label="Recent Winners"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <h2 className="md:text-2xl text-xl font-bold text-center mb-6">
            Recent Winners
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-purple-100">
          <div className="flex flex-col items-center justify-center">
            <Gift className="w-12 h-12 text-purple-400 mb-4" />
            <p className="text-lg text-gray-600 mb-4">
              No winners yet! Spin to be the first!
            </p>
            <div className="w-full max-w-xs h-2 bg-gradient-to-r from-purple-100 via-purple-400 to-purple-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-12 w-full max-w-5xl"
      role="region"
      aria-label="Recent Winners"
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <h2 className="md:text-2xl text-xl font-bold text-center mb-6">
          Recent Winners
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
        <div
          className={`grid ${
            hasAnyVendor ? "grid-cols-12" : "grid-cols-8"
          } gap-4 mb-4 px-4 font-semibold text-purple-800`}
        >
          <div className="col-span-5">Prize</div>
          {hasAnyVendor && <div className="col-span-4">Vendor</div>}
          <div className="col-span-3">Date</div>
        </div>

        <ul className="space-y-4">
          {winners.map((winner) => {
            const vendorId = winner.prizeId?.vendor;
            const vendorLogo = getVendorLogo(vendorId);
            const date = new Date(winner.createdAt);
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li
                key={winner._id}
                className={`grid ${
                  hasAnyVendor ? "grid-cols-12" : "grid-cols-8"
                } gap-4 items-center p-4 rounded-lg hover:bg-purple-50 transition-colors`}
              >
                <div className="col-span-5 flex items-center gap-3">
                  <Gift
                    className={`w-5 h-5 ${
                      winner.redeemed ? "text-green-500" : "text-purple-500"
                    }`}
                  />
                  <span className="font-medium text-gray-800">
                    {winner.prizeId?.prize}
                  </span>
                  {/* {winner.redeemed && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Redeemed
                    </span>
                  )} */}
                </div>

                {hasAnyVendor && (
                  <div className="col-span-4 flex items-center gap-3">
                    {vendorLogo ? (
                      <Image
                        src={vendorLogo}
                        alt={getVendorName(vendorId)}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-600">
                          {getVendorName(vendorId).charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-sm text-gray-600">
                      {getVendorName(vendorId)}
                    </span>
                  </div>
                )}

                <div className="col-span-3 flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formattedDate}</span>
                  <span className="text-xs opacity-70">{formattedTime}</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* {winners.length > 5 && (
          <div className="mt-4 text-center">
            <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
              View All Winners →
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
