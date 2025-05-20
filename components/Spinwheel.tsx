"use client";
import React, { CSSProperties, useState, useRef, useCallback } from "react";
import Modal from "./Modal";

interface Prize {
  _id: string;
  prize: string;
}

interface SpinWheelProps {
  prizes: Prize[];
}

const SpinWheel: React.FC<SpinWheelProps> = ({ prizes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef(0);

  const goldenRatioConjugate = 0.618033988749895;
  let hue = Math.random();

  // Create segments directly from prizes
  const segments = prizes.map((prize, i) => {
    hue = (hue + goldenRatioConjugate) % 1;
    const color = `hsl(${Math.floor(hue * 360)}, 100%, 50%)`;
    return {
      i,
      color,
      value: prize.prize,
      prizeData: prize,
      isTryAgain: prize.prize.toLowerCase().includes("try again"),
    };
  });

  // Dynamic clip-path calculation
  const calculateClipPathPercentage = (count: number) => {
    const specialCases = {
      3: 150,
      4: 99,
      5: 83,
      6: 72,
      7: 64,
      8: 57,
      9: 52,
      10: 48,
      11: 44,
      12: 41,
      13: 38,
      14: 36,
      15: 34,
      16: 32,
      17: 30,
      18: 29,
      19: 28,
      20: 26,
    };
    return (
      specialCases[count as keyof typeof specialCases] ||
      Math.max(20, 100 - count * 3.5)
    );
  };

  const segmentAngle = 360 / segments.length;
  const clipPathPercentage = calculateClipPathPercentage(segments.length);

  const calculatePrize = (angle: number) => {
    // Normalize angle to 0-360 range
    const normalizedAngle = ((angle % 360) + 360) % 360;
    // Calculate segment index (adjusted for the pointer position at top)
    const segmentIndex = Math.floor((360 - (normalizedAngle % 360)) / segmentAngle) % segments.length;
    return segments[segmentIndex];
  };

  const spinWheel = useCallback(() => {
    if (isSpinning || !wheelRef.current) return;
  
    setIsSpinning(true);
    const spinDuration = 5000;
    const rotations = 5;
    
    // Randomly select a segment to land on
    const targetSegmentIndex = Math.floor(Math.random() * segments.length);
    const targetSegment = segments[targetSegmentIndex];
    
    // Calculate the exact angle needed to land this segment at the pointer (top)
    // We want the center of the segment to land at the top (0 degrees)
    const targetAngle = 360 - (targetSegmentIndex * segmentAngle + segmentAngle / 2);
    const totalRotation = 360 * rotations + targetAngle;
  
    // Reset wheel position
    const wheel = wheelRef.current;
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    currentRotationRef.current = 0;
  
    // Force reflow
    setTimeout(() => {
      if (!wheelRef.current) return;
      
      const wheel = wheelRef.current;
      wheel.style.transition = `transform ${spinDuration}ms cubic-bezier(0.17, 0.85, 0.45, 1)`;
      wheel.style.transform = `rotate(${totalRotation}deg)`;
  
      setTimeout(() => {
        const winningSegment = calculatePrize(totalRotation);
        setWonPrize(winningSegment.prizeData);
        currentRotationRef.current = totalRotation % 360;
        
        // Reset transition
        setTimeout(() => {
          if (wheelRef.current) {
            wheelRef.current.style.transition = 'none';
            wheelRef.current.style.transform = `rotate(${currentRotationRef.current}deg)`;
          }
        }, 50);
        
        setIsModalOpen(true);
        setIsSpinning(false);
      }, spinDuration);
    }, 10);
  }, [isSpinning, segments, segmentAngle]);

  return (
    <div className="containers">
      <div
        className="wheel"
        ref={wheelRef}
        style={
          {
            "--total-segments": segments.length,
            "--segment-angle": `${segmentAngle}deg`,
            "--clip-path-percentage": `${clipPathPercentage}%`,
          } as CSSProperties
        }
      >
        {segments.map((seg) => {
          const style: CSSProperties & { [key: string]: string } = {
            "--i": seg.i.toString(),
            "--clr": seg.color,
          };
          return (
            <div key={seg.i} className="segment" style={style}>
              <span>{seg.value}</span>
            </div>
          );
        })}
      </div>

      <button className="spinBtn" onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? <div className="animate-pulse">...</div> : "SPIN"}
      </button>

      <Modal isOpen={isModalOpen} toggleModal={() => setIsModalOpen(false)}>
        <div className="text-center p-8">
          {wonPrize?.prize.toLowerCase().includes("try again") ? (
            <>
              <h2 className="text-3xl font-bold text-red-500 mb-4">Oh no!</h2>
              <div
                className="text-5xl font-extrabold mb-6"
                style={{ color: "#ff6347" }}
              >
                {wonPrize.prize}
              </div>
              <p className="text-xl text-gray-700 mb-6">
                Better luck next spin!
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-colors shadow-lg"
              >
                Spin Again
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-purple-600 mb-4">
                Congratulations!
              </h2>
              <div
                className="text-5xl font-extrabold mb-6 animate-bounce"
                style={{
                  color: segments.find((s) => s.prizeData._id === wonPrize?._id)
                    ?.color,
                }}
              >
                {wonPrize?.prize}
              </div>
              <p className="text-xl text-gray-700 mb-6">
                You have won: {wonPrize?.prize}!
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg"
              >
                Claim Your Prize
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default SpinWheel;