"use client";
import { PrizeData } from "@/types";
import Modal from "@/components/Modal";

interface RedeemModalProps {
  isOpen: boolean;
  onClose: () => void;
  winnerCode: string | null;
  wonPrize: PrizeData | null;
  handleSpinClick: () => void;
}

function RedeemModal({
  isOpen,
  onClose,
  winnerCode,
  wonPrize,
  handleSpinClick,
}: RedeemModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center p-6 md:p-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">
          Your Prize!
        </h2>
        {winnerCode && (
          <div className="text-2xl font-mono bg-gray-100 p-3 rounded-md mb-6">
            {winnerCode}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2">{wonPrize?.option}</h3>
        <p className="text-gray-600 mb-6">{wonPrize?.redeemInfo}</p>
        <button
          onClick={() => {
            onClose();
            setTimeout(handleSpinClick, 300);
          }}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
        >
          Spin Again
        </button>
      </div>
    </Modal>
  );
}

export default RedeemModal;