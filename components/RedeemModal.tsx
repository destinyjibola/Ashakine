"use client";
import { useState, useEffect } from "react";
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
  const [hasCopied, setHasCopied] = useState(false);

  // Persist modal state in localStorage
  useEffect(() => {
    if (isOpen && winnerCode) {
      localStorage.setItem(
        "redeemModalState",
        JSON.stringify({ winnerCode, wonPrize, hasCopied: false })
      );
    }
  }, [isOpen, winnerCode, wonPrize]);

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (winnerCode) {
      try {
        await navigator.clipboard.writeText(winnerCode);
        setHasCopied(true);
        localStorage.removeItem("redeemModalState"); // Clear state after copying
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  // Modified onClose to prevent closing unless code is copied
  const handleClose = () => {
    if (!hasCopied && winnerCode) {
      alert("Please copy your winner code before closing!");
      return;
    }
    localStorage.removeItem("redeemModalState"); // Ensure state is cleared on close
    onClose();
    setTimeout(handleSpinClick, 300);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="text-center p-4 md:p-10">
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Your Prize!</h2>
        <h3 className="text-lg font-semibold mb-4 bg-gray-100 py-3">
          {wonPrize?.option}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Please copy your code to redeem your prize and follow the
          instructions.
        </p>
        <h3 className="text-lg font-semibold mb-2">Redemption code:</h3>
        {winnerCode && (
          <div className="flex items-center justify-center gap-2 bg-gray-100 p-3 rounded-md mb-4">
            <div className="text-2xl font-mono">{winnerCode}</div>
            <div className="relative group">
              <button
                onClick={handleCopy}
                className={`p-1 rounded-md transition-all duration-300 ease-in-out ${
                  hasCopied
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                aria-label={
                  hasCopied ? "Code copied" : "Copy winner code to clipboard"
                }
              >
                {hasCopied ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 00 002 2z"
                    ></path>
                  </svg>
                )}
              </button>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-sm text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {hasCopied ? "Copied!" : "Copy to Clipboard"}
              </span>
            </div>
          </div>
        )}

        <h3 className="text-lg font-semibold mb-2">
          How to redeem your prize:
        </h3>
        <p className="text-gray-600 mb-6">{wonPrize?.redeemInfo}</p>
        {/* <button
          onClick={handleClose}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Spin Again
        </button> */}
      </div>
    </Modal>
  );
}

export default RedeemModal;
