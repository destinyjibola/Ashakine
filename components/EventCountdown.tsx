"use client";
import { useState, useEffect, useCallback, memo } from "react";
import { Event } from "@/types";

// Countdown Timer Component
interface CountdownTimerProps {
  startTime: string;
  onTimerEnd: () => void;
}

const CountdownTimer = memo(({ startTime, onTimerEnd }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const start = new Date(startTime);
      const diffMs = start.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeLeft("");
        onTimerEnd();
        return;
      }

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      let result = "";
      if (days > 0) result += `${days}d `;
      if (hours > 0 || days > 0) result += `${hours.toString().padStart(2, "0")}:`;
      result += `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setTimeLeft(result.trim());
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [startTime, onTimerEnd]);

  if (!timeLeft) return null;

  return (
    <span className="font-mono text-lg font-semibold bg-yellow-600 px-2 py-1 rounded" aria-live="polite">
      {timeLeft}
    </span>
  );
});

CountdownTimer.displayName = "CountdownTimer";

// Display times in user's local timezone with timezone name
const formatDateTime = (date: string | null): string => {
  if (!date) return "N/A";
  try {
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) return "Invalid Date";
    return parsed.toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
  } catch {
    return "Invalid Date";
  }
};

function getTimeUntil(startTime: string, currentTime: Date): string {
  const start = new Date(startTime);
  const diffMs = start.getTime() - currentTime.getTime();
  if (diffMs <= 0) return "";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  let result = "";
  if (days > 0) result += `${days} day${days > 1 ? "s" : ""} `;
  if (hours > 0) result += `${hours} hour${hours > 1 ? "s" : ""} `;
  if (minutes > 0 || result === "") result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
  return result.trim();
}

function hasEventEnded(endTime: string, currentTime: Date): boolean {
  const end = new Date(endTime);
  return currentTime.getTime() > end.getTime();
}

function isEventActive(event: Event | null, currentTime: Date): boolean {
  if (!event) return false;
  if (event.isActive) return true;
  if (event.startTime && event.endTime) {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    return currentTime.getTime() >= start.getTime() && currentTime.getTime() <= end.getTime();
  }
  return false;
}

interface EventStatusProps {
  event: Event | null;
  isLoading: boolean;
  onCurrentTimeChange: (currentTime: Date) => void;
  onRefresh: () => void;
}

export default function EventCountdown({ event, isLoading, onCurrentTimeChange, onRefresh }: EventStatusProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      onCurrentTimeChange(now);
    }, 1000);
    return () => clearInterval(interval);
  }, [onCurrentTimeChange]);

  const handleTimerEnd = useCallback(() => {
    const now = new Date();
    setCurrentTime(now);
    onCurrentTimeChange(now);
  }, [onCurrentTimeChange]);

  let eventStatusMessage: string | React.ReactNode | null = null;
  let isEventScheduled = false;

  if (event && !isEventActive(event, currentTime)) {
    eventStatusMessage = "The spin wheel is currently inactive. Please contact the event organizer for more information.";
    if (event.startTime && event.endTime) {
      isEventScheduled = true;
      const timeUntilStart = getTimeUntil(event.startTime, currentTime);
      if (timeUntilStart) {
        eventStatusMessage = (
          <div className="flex text-center flex-col space-y-4 items-center justify-center">
            <p>The spin wheel will be active in</p>
            <CountdownTimer startTime={event.startTime} onTimerEnd={handleTimerEnd} />
            {/* <p>
              Starts: {formatDateTime(event.startTime)} Ends: {formatDateTime(event.endTime)}
            </p> */}
          </div>
        );
      } else if (hasEventEnded(event.endTime, currentTime)) {
        eventStatusMessage = `The spin wheel is no longer active. Ended: ${formatDateTime(event.endTime)}`;
      }
    }
  }

  if (!eventStatusMessage || isLoading) {
    return null;
  }

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-md shadow-lg z-40 flex flex-col items-center gap-2">
      <p>{eventStatusMessage}</p>
      <button
        onClick={onRefresh}
        className="px-4 py-2 bg-green-500 text-xs text-white rounded hover:bg-green-600 transition-all"
        aria-label="Refresh the page"
      >
        Refresh page
      </button>
    </div>
  );
}