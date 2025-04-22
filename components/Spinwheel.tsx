"use client"
import React, { CSSProperties, useState, useRef, useCallback } from "react";
import Modal from "./Modal";

const segments = [
  { i: 1, color: "#db7093", value: "100" },
  { i: 2, color: "#20b2aa", value: "200" },
  { i: 3, color: "#ffb347", value: "300" },
  { i: 4, color: "#9370db", value: "400" },
  { i: 5, color: "#3cb371", value: "500" },
  { i: 6, color: "#ffa07a", value: "600" },
  { i: 7, color: "#40e0d0", value: "700" },
  { i: 8, color: "#ff6347", value: "800" }
];

const SpinWheel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prize, setPrize] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const currentRotationRef = useRef(22.5); // Initial offset to align with pointer

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const calculatePrize = (angle: number) => {
    const normalizedAngle = ((angle % 360) + 360) % 360;
    const segmentAngle = 360 / segments.length;
    // Adjust for pointer position (22.5° offset for 8 segments)
    const pointerOffset = segmentAngle / 2;
    const adjustedAngle = (normalizedAngle + pointerOffset) % 360;
    const segmentIndex = Math.floor(adjustedAngle / segmentAngle);
    return segments[segmentIndex].value;
  };

  const spinWheel = useCallback(() => {
    if (isSpinning || !wheelRef.current) return;

    setIsSpinning(true);
    const spinDuration = 5000;
    const rotations = 5;
    
    // Select target segment (for testing, use 5 for "600")
    const targetSegment = 5; // Change this to test different segments
    const segmentAngle = 360 / segments.length;
    // Calculate exact stop position (center of segment minus initial offset)
    const targetAngle = targetSegment * segmentAngle - 22.5;
    const totalRotation = currentRotationRef.current + 360 * rotations + targetAngle;

    wheelRef.current.style.transition = `transform ${spinDuration}ms cubic-bezier(0.17, 0.85, 0.45, 1)`;
    wheelRef.current.style.transform = `rotate(${-totalRotation}deg)`;

    setTimeout(() => {
      const prizeValue = calculatePrize(totalRotation);
      setPrize(prizeValue);
      currentRotationRef.current = totalRotation % 360;
      
      setTimeout(() => {
        if (wheelRef.current) {
          wheelRef.current.style.transition = 'none';
          wheelRef.current.style.transform = `rotate(${-(currentRotationRef.current)}deg)`;
        }
      }, 50);
      
      setIsModalOpen(true);
      setIsSpinning(false);
    }, spinDuration);
  }, [isSpinning]);

  return (
    <div className="containers">
      <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Congratulations!</h2>
          <div className="text-5xl font-extrabold mb-6 animate-bounce" style={{ color: segments.find(s => s.value === prize)?.color }}>
            {prize}
          </div>
          <p className="text-xl text-gray-700 mb-6">You have won {prize} points!</p>
          <button
            onClick={toggleModal}
            className="px-6 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg"
          >
            Claim Your Prize
          </button>
        </div>
      </Modal>

      <div className="wheel" ref={wheelRef}>
        {segments.map((seg) => {
          const style: CSSProperties & { [key: string]: string } = {
            "--i": seg.i.toString(),
            "--clr": seg.color,
          };
          return (
            <div key={seg.i} className="number" style={style}>
              <span>{seg.value}</span>
            </div>
          );
        })}
      </div>

      <button className="spinBtn" onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? <div className="animate-pulse">...</div> : "SPIN"}
      </button>
    </div>
  );
};

export default SpinWheel