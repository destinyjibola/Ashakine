"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";

const options: string[] = [
  "Free Item",
  "10% Off",
  "Try Again",
  "20% Off",
  "50% Off",
  "Better Luck",
  "5% Off",
  "Surprise!",
];

const SpinWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (isSpinning) return;

    const spins = 5; // Full 360° spins
    const randomIndex = Math.floor(Math.random() * options.length);
    const anglePerSlice = 360 / options.length;
    const targetRotation = spins * 360 + randomIndex * anglePerSlice + anglePerSlice / 2;

    setIsSpinning(true);
    setRotation((prev) => prev + targetRotation);

    setTimeout(() => {
      setResult(options[randomIndex]);
      setIsSpinning(false);
    }, 4000); // Animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6 p-4">
      <div className="relative w-72 h-72">
        <motion.div
          className="w-full h-full rounded-full border-[12px] border-white shadow-lg"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: "easeOut" }}
          style={{
            background: "conic-gradient(#f87171 0% 12.5%, #facc15 12.5% 25%, #4ade80 25% 37.5%, #60a5fa 37.5% 50%, #a78bfa 50% 62.5%, #f472b6 62.5% 75%, #fcd34d 75% 87.5%, #34d399 87.5% 100%)",
          }}
        />
        {/* Spinner button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <button
            onClick={spin}
            disabled={isSpinning}
            className="bg-black text-white px-4 py-2 rounded-full shadow-lg cursor-pointer active:scale-95 disabled:opacity-50"
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>
        </div>
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-black z-10" />
      </div>

      {/* Result */}
      {result && (
        <div className="text-xl font-bold text-gray-700">
          🎉 Result: <span className="text-indigo-600">{result}</span>
        </div>
      )}
    </div>
  );
};

export default SpinWheel;
