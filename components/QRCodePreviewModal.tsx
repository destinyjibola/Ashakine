import React from "react";
import Modal from "./Modal";

const QRCodePreviewModal = ({
  isOpen,
  onClose,
  qrCodeDataUrl,
  eventName,
  downloadPDF,
}: {
  isOpen: boolean;
  onClose: () => void;
  qrCodeDataUrl: string | null;
  eventName: string;
  downloadPDF: () => void;
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-6 space-y-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-900">QR Code Preview</h2>
      {qrCodeDataUrl ? (
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-bold text-gray-900">{eventName}</h3>
          <img src={qrCodeDataUrl} alt="QR Code" className="w-40 h-40" />
          <p className="text-gray-800 text-sm">Scan and Spin to Win Prizes</p>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
            >
              Cancel
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
    </div>
  </Modal>
);

export default QRCodePreviewModal;
