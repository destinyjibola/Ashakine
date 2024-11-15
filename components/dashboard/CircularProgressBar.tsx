import React, { useEffect, useState } from 'react';

interface CircularProgressBarProps {
  progress: number; // Progress as a percentage (0 - 100)
  size?: number; // Diameter of the circle
  strokeWidth?: number; // Width of the circle stroke
  duration?: number; // Duration of the animation in milliseconds
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 100,
  strokeWidth = 8,
  duration = 1000,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Initialize start time and previous progress
    let start = 0;
    const startTime = performance.now();

    const animateProgress = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progressFraction = Math.min(elapsedTime / duration, 1);
      const newProgress = start + (progress - start) * progressFraction;
      setAnimatedProgress(newProgress);

      if (progressFraction < 1) {
        requestAnimationFrame(animateProgress);
      }
    };

    requestAnimationFrame(animateProgress);
  }, [progress, duration]);

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  return (
    <div className="flex items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb" // Tailwind gray-300
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#A937A9" // Tailwind blue-500
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="butt" // Use 'butt' for a square stroke end
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-stroke duration-500 ease-in-out"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      {/* Progress text */}
      <div
        className="absolute flex items-center justify-center font-medium text-lg"
        style={{ width: size, height: size }}
      >
        {Math.round(animatedProgress)}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
