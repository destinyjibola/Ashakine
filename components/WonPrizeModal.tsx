"use client";
import { PrizeData } from "@/types";
import Modal from "@/components/Modal";

interface WonPrizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  wonPrize: PrizeData | null;
  handleSpinClick: () => void;
  setIsRedeemModalOpen: (value: boolean) => void;
}

function WonPrizeModal({
  isOpen,
  onClose,
  wonPrize,
  handleSpinClick,
  setIsRedeemModalOpen,
}: WonPrizeModalProps) {
  const fakeSegments: PrizeData[] = [
    { option: "Oops!", segColor: "#444444", emoji: "😢" },
    { option: "Try Again", segColor: "#555555", emoji: "😞" },
    { option: "Come Back Later", segColor: "#666666", emoji: "😴" },
    { option: "Keep Trying", segColor: "#777777", emoji: "😅" },
    { option: "Just an Inch", segColor: "#888888", emoji: "😬" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center p-6 md:p-10">
        {wonPrize && fakeSegments.some((fake) => fake.option === wonPrize.option) ? (
          <div className="space-y-6">
            <div className="text-7xl mb-4">😢</div>
            <h2 className="text-3xl font-bold text-red-500 mb-2">Oh no!</h2>
            <div
              className="text-4xl font-extrabold mb-6"
              style={{ color: wonPrize.segColor }}
            >
              {wonPrize.option}
            </div>
            <p className="text-xl text-gray-600 mb-6">
              Do not worry, you can try again!
            </p>
            <button
              onClick={() => {
                onClose();
                setTimeout(handleSpinClick, 300);
              }}
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Spin Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-7xl mb-4 animate-bounce">{wonPrize?.emoji}</div>
            <h2 className="text-3xl font-bold text-purple-600 mb-2">
              Congratulations! 🎉
            </h2>
            <div
              className="text-4xl font-extrabold mb-6 animate-pulse"
              style={{ color: wonPrize?.segColor }}
            >
              {wonPrize?.option}
            </div>
            <p className="text-xl text-gray-600 mb-6">
              You have won an amazing prize!
            </p>
            <button
              onClick={() => {
                onClose();
                setIsRedeemModalOpen(true);
              }}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-bold hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
            >
              Redeem Prize
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default WonPrizeModal;