import React, { useState } from "react";
import Modal from "./Modal";
import { FiShare2, FiX } from "react-icons/fi";

const QRCodePreviewModal = ({
  isOpen,
  onClose,
  qrCodeDataUrl,
  eventName,
  downloadPDF,
  spinWheelUrl,
}: {
  isOpen: boolean;
  onClose: () => void;
  qrCodeDataUrl: string | null;
  eventName: string;
  downloadPDF: () => void;
  spinWheelUrl: string; // Added prop for spin wheel URL
}) => {
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `Spin to Win at ${eventName}`,
      text: `Join the fun and spin to win exciting prizes at ${eventName}!`,
      url: spinWheelUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      setIsShareMenuOpen(true); // Open fallback share menu
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(
      `Join the fun and spin to win exciting prizes at ${eventName}! ${spinWheelUrl} #SpinToWin`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(
      `Join the fun and spin to win exciting prizes at ${eventName}! ${spinWheelUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(spinWheelUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-4 bg-white relative">
        <h2 className="text-xl font-semibold text-gray-900">QR Code Preview</h2>
        {qrCodeDataUrl ? (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-bold text-gray-900">{eventName}</h3>
            <img src={qrCodeDataUrl} alt="QR Code" className="w-40 h-40" />
            <p className="text-gray-800 text-sm">Scan and Spin to Win Prizes</p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
              >
                <FiShare2 />
                Share
              </button>
              <button
                type="button"
                onClick={downloadPDF}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Download PDF
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Generating QR code...</p>
        )}

        {/* Fallback Share Menu */}
        {isShareMenuOpen && (
          <div className="absolute inset-0 bg-white p-6 flex flex-col items-center justify-center space-y-4">
            <div className="flex justify-between w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                Share Event
              </h3>
              <button
                onClick={() => setIsShareMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                onClick={shareToTwitter}
                className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Share on Twitter/X
              </button>
              <button
                onClick={shareToWhatsApp}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Share on WhatsApp
              </button>
              <button
                onClick={shareToFacebook}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Share on Facebook
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default QRCodePreviewModal;