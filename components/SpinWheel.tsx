"use client";
import { PrizeData } from "@/types";
import { memo } from "react";
import { Wheel } from "react-custom-roulette";

interface SpinWheelProps {
  mustSpin: boolean;
  prizeNumber: number;
  data: PrizeData[];
  onStopSpinning: () => void;
  isLoading: boolean;
}

const MemoizedWheel = memo(Wheel, (prevProps, nextProps) => {
  return (
    prevProps.mustStartSpinning === nextProps.mustStartSpinning &&
    prevProps.prizeNumber === nextProps.prizeNumber &&
    prevProps.onStopSpinning === nextProps.onStopSpinning &&
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
  );
});

// Explicitly set displayName for the memoized Wheel component
MemoizedWheel.displayName = "MemoizedWheel";

const SpinWheel = memo(
  ({ mustSpin, prizeNumber, data, onStopSpinning, isLoading }: SpinWheelProps) => {
    return (
      <div className="relative z-10">
        <div className="absolute inset-[1px] rounded-full blur-lg opacity-70 animate-pulse bg-gradient-to-r from-purple-600 to-pink-500"></div>

        <div className="relative">
          {!isLoading && (
            <MemoizedWheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor="#ffffff"
              outerBorderWidth={10}
              innerBorderColor="#302e2e"
              radiusLineColor="#ffffff"
              radiusLineWidth={2}
              fontSize={14}
              textColors={["#ffffff"]}
              backgroundColors={data.map((item) => item.segColor)}
              onStopSpinning={onStopSpinning}
              spinDuration={0.6}
              perpendicularText={false}
            />
          )}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-yellow-400">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-600 absolute -top-12"></div>
          </div>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.mustSpin === nextProps.mustSpin &&
      prevProps.prizeNumber === nextProps.prizeNumber &&
      prevProps.isLoading === nextProps.isLoading &&
      prevProps.onStopSpinning === nextProps.onStopSpinning &&
      JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
    );
  }
);

// Explicitly set displayName for the SpinWheel component
SpinWheel.displayName = "SpinWheel";

export default SpinWheel;