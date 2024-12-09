"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { ProjectResponse } from "@/lib/types"; // the path to where your ProjectResponse is defined

// Update the props to match ProjectResponse
interface SupporterCardProps {
  project: ProjectResponse; // Accept project as a prop
}

const SupporterCard: React.FC<SupporterCardProps> = ({ project }) => {
  const [animatedRaisedAmount, setAnimatedRaisedAmount] = useState(0);
  const [animatedCompletionPercentage, setAnimatedCompletionPercentage] = useState(0);

  // Extract relevant data from the project prop
  const { title, goalAmount, currentAmount, shortdesc } = project;
  const raisedAmount = currentAmount;
  const targetAmount = `$${goalAmount.toLocaleString()}`;
  const progressValue = (currentAmount / goalAmount) * 100;
  const completionPercentage = (raisedAmount / goalAmount) * 100;

  useEffect(() => {
    // Animation settings
    const duration = 3000; // Total duration of the animation in ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Interpolate values
      setAnimatedRaisedAmount(Math.floor(raisedAmount * progress));
      setAnimatedCompletionPercentage(Math.floor(completionPercentage * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [raisedAmount, completionPercentage]);

  return (
    <div className="border-bordercolor bg-slate-50 rounded-xl shadow-lg p-4 border-2 cursor-pointer transform hover:bg-gray-100 hover:scale-105 hover:shadow-xl hover:shadow-gray-400/50 transition-all">
      <div className="mb-4">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm">{shortdesc}</p>
      </div>
      <h2 className="mb-4 secondaryheading">{targetAmount}</h2>
      <Progress value={progressValue} />
      <div className="flex justify-between paragraph-1 mt-2">
        <p>${animatedRaisedAmount.toLocaleString()} raised</p>
        <p>{animatedCompletionPercentage}% completed</p>
      </div>
    </div>
  );
};

export default SupporterCard;
