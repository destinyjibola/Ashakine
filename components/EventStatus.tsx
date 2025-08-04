 
"use client";
import { useState } from "react";
import { Event } from "@/types";
import { FiCalendar, FiClock } from "react-icons/fi";

interface EventStatusProps {
  event: Event;
  handleToggleActive: (isActive: boolean) => Promise<void>;
  handleSetTimer: (startTime: string, endTime: string) => Promise<void>;
  handleClearTimer: () => Promise<void>;
  eventStatusLoading: boolean;
  eventStatusError: string | null;
}

const EventStatus = ({
  event,
  handleToggleActive,
  handleSetTimer,
  handleClearTimer,
  eventStatusLoading,
  eventStatusError,
}: EventStatusProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [timerError, setTimerError] = useState<string | null>(null);

  const currentTime = new Date();

  // Convert local time input to UTC for backend
  const convertToUTC = (localTime: string): string | null => {
    try {
      const date = new Date(localTime);
      if (isNaN(date.getTime())) return null; // Invalid date
      return date.toISOString();
    } catch {
      return null;
    }
  };

  // Check if event is active based on UTC times
  const isScheduledActive =
    event.startTime && event.endTime
      ? new Date(event.startTime).getTime() <= currentTime.getTime() &&
        currentTime.getTime() <= new Date(event.endTime).getTime()
      : false;

  const status = event.isActive
    ? "Active"
    : isScheduledActive
    ? "Active (Scheduled)"
    : "Inactive";
  const isScheduled = event.startTime !== null && event.endTime !== null;

  const handleSubmitTimer = (e: React.FormEvent) => {
    e.preventDefault();
    setTimerError(null);

    if (!startTime || !endTime) {
      setTimerError("Both start and end times are required");
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setTimerError("Invalid date or time format");
      return;
    }

    if (start >= end) {
      setTimerError("End time must be after start time");
      return;
    }

    const startUTC = convertToUTC(startTime);
    const endUTC = convertToUTC(endTime);

    if (!startUTC || !endUTC) {
      setTimerError("Failed to process date or time");
      return;
    }

    handleSetTimer(startUTC, endUTC);
    setStartTime("");
    setEndTime("");
    setIsModalOpen(false);
  };

  const handleClearSchedule = async () => {
    await handleClearTimer();
    setIsModalOpen(false);
  };

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

  return (
    <div className="flex md:flex-row flex-col items-start md:items-center gap-4">
      {/* Status Display */}
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-sm text-gray-600 font-medium">Status</p>
        <p
          className={`text-base font-semibold ${
            status === "Active" || status === "Active (Scheduled)"
              ? "text-green-700"
              : "text-red-700"
          }`}
        >
          {status}
        </p>
        {isScheduled && (
          <p className="text-xs text-gray-700 mt-1">
            Starts: {formatDateTime(event.startTime)} <br />
            Ends: {formatDateTime(event.endTime)}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex md:flex-row flex-col gap-2">
        <button
          onClick={() => handleToggleActive(!event.isActive)}
          disabled={eventStatusLoading || isScheduled}
          className={`px-3 py-1.5 text-sm font-medium text-white rounded-md ${
            eventStatusLoading || isScheduled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }`}
        >
          {event.isActive ? "Deactivate Spinwheel" : "Instantly Activate Spinwheel"}
        </button>
        <button
          onClick={isScheduled ? handleClearSchedule : () => setIsModalOpen(true)}
          disabled={eventStatusLoading || event.isActive}
          className={`px-3 py-1.5 text-sm font-medium text-white rounded-md ${
            eventStatusLoading
              ? "bg-gray-400 cursor-not-allowed"
              : isScheduled
              ? "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              : "bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          }`}
        >
          {isScheduled ? "Cancel Schedule" : "Schedule Spinwheel"}
        </button>
      </div>

      {/* Modal for Scheduling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Schedule Spinwheel
            </h2>
            <form onSubmit={handleSubmitTimer} className="space-y-4">
              <div>
                <label
                  htmlFor="startTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Time
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="datetime-local"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="endTime"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Time
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="datetime-local"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={eventStatusLoading}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium text-white rounded-md ${
                    eventStatusLoading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  }`}
                >
                  {eventStatusLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Setting Timer...
                    </>
                  ) : (
                    "Set Timer"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClearSchedule}
                  disabled={eventStatusLoading}
                  className={`flex-1 py-2.5 px-4 text-sm font-medium text-white rounded-md ${
                    eventStatusLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  }`}
                >
                  Clear Schedule
                </button>
              </div>
              {timerError && (
                <div className="p-3 text-sm text-red-700 bg-red-50 rounded-md border border-red-200">
                  {timerError}
                </div>
              )}
              {eventStatusError && (
                <div className="p-3 text-sm text-red-700 bg-red-50 rounded-md border border-red-200">
                  {eventStatusError}
                </div>
              )}
            </form>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full py-2.5 px-4 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventStatus;
