import { FiArrowLeft, FiCopy, FiShare2 } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Event, Vendor, Winner } from "@/types";

interface EventHeaderProps {
  event: Event;
  vendors: Vendor[] | null;
  winners: Winner[] | null;
  onBack: () => void;
  copySpinWheelLink: () => void;
  copied: boolean;
  openQRCodeModal: () => void;
  qrLoading: boolean;
}

const EventHeader = ({
  event,
  vendors,
  winners,
  onBack,
  copySpinWheelLink,
  copied,
  openQRCodeModal,
  qrLoading,
}: EventHeaderProps) => {
  return (
    <div className="px-4 py-4 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout (md and up) */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center group text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">All spinwheels</span>
            </button>

            <div className="flex space-x-3">
              <Link href={`/${event._id}`} target="_blank">
                <button className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm">
                  Go to Spinwheel
                </button>
              </Link>
              <button
                onClick={copySpinWheelLink}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  copied
                    ? "bg-green-100 text-green-800 shadow-inner"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm"
                }`}
              >
                <FiCopy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
              <button
                onClick={openQRCodeModal}
                disabled={qrLoading}
                className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  qrLoading
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 shadow-sm"
                }`}
              >
                <FiShare2 className="h-4 w-4 mr-2" />
                {qrLoading ? "Generating..." : "QR"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {event.logo?.url ? (
                <div className="mr-4 relative group">
                  <div className="absolute inset-0 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={event.logo.url}
                    alt={event.logo.altText || "Event Logo"}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-gray-200 group-hover:border-blue-200 transition-all duration-300"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center mr-4 group hover:border-blue-200 transition-colors duration-300">
                  <span className="text-xs text-gray-400 group-hover:text-gray-600">
                    No Logo
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {event.name}
                </h1>
                <p className="text-sm text-gray-500">{event.type}</p>
              </div>
            </div>

            <div className="flex space-x-6">
              {[
                { label: "Parners", value: vendors?.length ?? 0 },
                { label: "Prizes", value: event.prizes?.length ?? 0 },
                ...(event.type === "Single"
                  ? [
                      { label: "Winners", value: winners?.length ?? 0 },
                      {
                        label: "Redeemed",
                        value: winners?.filter((w) => w.redeemed).length ?? 0,
                      },
                    ]
                  : []),
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                    {stat.label}
                  </p>
                  <p className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout (sm and down) */}
        <div className="md:hidden">
          {/* Event Info - logo, name, type */}
          <div className="flex items-center mb-4">
            {event.logo?.url ? (
              <div className="mr-4 relative group">
                <Image
                  src={event.logo.url}
                  alt={event.logo.altText || "Event Logo"}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-gray-200 group-hover:border-blue-200 transition-colors duration-300"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center mr-4 group hover:border-blue-200 transition-colors duration-300">
                <span className="text-xs text-gray-400 group-hover:text-gray-600">
                  No Logo
                </span>
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {event.name}
              </h1>
              <p className="text-sm text-gray-500">{event.type}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-row gap-x-2 mb-4">
            {[
              { label: "Partners", value: vendors?.length ?? 0 },
              { label: "Prizes", value: event.prizes?.length ?? 0 },
              ...(event.type === "Single"
                ? [
                    { label: "Winners", value: winners?.length ?? 0 },
                    {
                      label: "Redeemed",
                      value: winners?.filter((w) => w.redeemed).length ?? 0,
                    },
                  ]
                : []),
            ].map((stat, index) => (
              <div key={index} className="text-center group min-w-[60px]">
                <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors">
                  {stat.label}
                </p>
                <p className="text-lg font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <Link href={`/${event._id}`} target="_blank">
              <button className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm">
                Go to Spinwheel
              </button>
            </Link>
            <button
              onClick={copySpinWheelLink}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                copied
                  ? "bg-green-100 text-green-800 shadow-inner"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm"
              }`}
            >
              <FiCopy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <button
              onClick={openQRCodeModal}
              disabled={qrLoading}
              className={`flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                qrLoading
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100 shadow-sm"
              }`}
            >
              <FiShare2 className="h-4 w-4 mr-2" />
              {qrLoading ? "Generating..." : "QR"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHeader;