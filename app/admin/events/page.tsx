"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Event } from "@/types";
import Modal from "@/components/Modal";
import useSound from "use-sound";

export default function EventsPage() {
  const [playApplause] = useSound("/sounds/applause.mp3");
  const [playBoo] = useSound("/sounds/boo.mp3");
  const [playTick] = useSound("/sounds/tick.mp3");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newEventName, setNewEventName] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events`
        );
        if (!response.ok) throw new Error("Failed to fetch events");
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    if (!newEventName.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newEventName }),
        }
      );

      if (!response.ok) throw new Error("Failed to create event");

      const data: Event = await response.json();
      setEvents([...events, data]);
      setIsModalOpen(false);
      setNewEventName("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) return <div className="p-4 sm:p-6">Loading events...</div>;
  if (error) return <div className="p-4 sm:p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 sm:p-6 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Events Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto text-sm sm:text-base"
        >
          Create New Event
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6">
                Event Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6">
                Prizes
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6 hidden sm:table-cell">
                Created At
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {events.map((event) => (
              <tr key={event._id}>
                <td className="px-4 py-4 text-sm sm:px-6">
                  <Link
                    href={`/admin/events/${event._id}`}
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    {event.name}
                  </Link>
                </td>
                <td className="px-4 py-4 text-sm text-gray-300 sm:px-6">
                  {event.prizes.length}
                </td>
                <td className="px-4 py-4 text-sm text-gray-300 sm:px-6 hidden sm:table-cell">
                  {new Date(event.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-sm sm:px-6">
                  <button
                    onClick={() => router.push(`/admin/events/${event._id}`)}
                    className="text-green-400 hover:text-green-300"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewEventName("");
        }}
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter event name"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setNewEventName("");
              }}
              className="px-4 py-2 text-gray-300 hover:text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateEvent}
              disabled={!newEventName.trim() || isCreating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isCreating ? (
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
                  Creating...
                </>
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}