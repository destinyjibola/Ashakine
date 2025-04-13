// src/components/SpinWheel.jsx
"use client"
import React, { useRef, useState } from "react";

const segments = [
  "Dell LAPTOP", "IMAC PRO", "SUZUKI", "HONDA",
  "FERRARI", "APARTMENT", "IPAD PRO", "LAND",
  "MOTOROLA", "BMW"
];

const colors = [
  "bg-blue-700", "bg-blue-300", "bg-orange-500", "bg-orange-300",
  "bg-green-700", "bg-green-400", "bg-red-600", "bg-pink-300",
  "bg-purple-600", "bg-purple-400"
];

const SpinWheel = () => {
  const wheelRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (spinning) return;

    const randomRotation = 360 * 5 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + randomRotation);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
    }, 5000); // duration of spin
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Pointer */}
      <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-black mb-2" />

      {/* Wheel */}
      <div className="relative">
        <div
          ref={wheelRef}
          className="rounded-full w-[300px] h-[300px] transition-transform duration-[5s] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((label, i) => {
            const angle = (360 / segments.length) * i;
            return (
              <div
                key={i}
                className={`absolute w-1/2 h-1/2 origin-bottom left-1/2 top-1/2 ${colors[i % colors.length]} text-xs text-center text-black font-bold`}
                style={{
                  transform: `rotate(${angle}deg) translateY(-100%)`,
                  transformOrigin: "bottom center",
                }}
              >
                <div className="rotate-[270deg]">{label}</div>
              </div>
            );
          })}
        </div>

        {/* Center Spin Button */}
        <button
          onClick={spin}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-black rounded-full w-[80px] h-[80px] font-bold text-black"
        >
          SPIN
        </button>
      </div>
    </div>
  );
};

export default SpinWheel;
