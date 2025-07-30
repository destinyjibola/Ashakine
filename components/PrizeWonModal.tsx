import { Winner } from "@/types";
import Modal from "@/components/Modal";

interface PrizeWonModalProps {
  isOpen: boolean;
  onClose: () => void;
  winner: Winner | null;
}

const PrizeWonModal = ({ isOpen, onClose, winner }: PrizeWonModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Prize Redeemed!
        </h2>
        {winner ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Prize:</span>{" "}
              {winner.prizeId?.prize || "No prize details available"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Code:</span> {winner.code}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Status:</span>{" "}
              {winner.redeemed ? "Redeemed" : "Not Redeemed"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Won:</span>{" "}
              {new Date(winner.createdAt).toLocaleDateString()}
            </p>
            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-500">No prize details available</p>
        )}
      </div>
    </Modal>
  );
};

export default PrizeWonModal;