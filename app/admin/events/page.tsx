"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Event } from "@/types";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventRowProps {
  event: Event;
  onManage: (id: string) => void;
}

const EventRow: React.FC<EventRowProps> = ({ event, onManage }) => (
  <tr className="h-[50px] hover:bg-gray-50">
    <td className="px-4 py-4 text-sm text-gray-900 sm:px-6 min-w-[250px]">
      <Link
        href={`/admin/events/${event._id}`}
        className="text-blue-600 hover:text-blue-800 hover:underline"
      >
        {event.name}
      </Link>
    </td>
    <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">{event.type}</td>
    <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">
      {event.prizes.length}
    </td>
    <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">
      {event.spinCount || 0}
    </td>
    <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">
      {event.totalWins || 0}
    </td>
    <td className="px-4 py-4 text-sm text-gray-500 sm:px-6">
      {event.redeemedCount || 0}
    </td>
    <td className="px-4 py-4 text-sm text-gray-900 sm:px-6">
      <button
        onClick={() => onManage(event._id)}
        className="text-green-600 hover:text-green-800"
      >
        Manage
      </button>
    </td>
  </tr>
);

interface EventsTableProps {
  events: Event[];
  onManage: (id: string) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onManage }) => (
  <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-[#CAC9CE2E] h-[50px]">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Event Name
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Type
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Prizes
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Spins
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Wins
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Redeemed
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {events.map((event) => (
          <EventRow key={event._id} event={event} onManage={onManage} />
        ))}
      </tbody>
    </table>
  </div>
);

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  newEventName: string;
  setNewEventName: (value: string) => void;
  newEventType: string;
  setNewEventType: (value: string) => void;
  newEventLogo: File | null;
  setNewEventLogo: (value: File | null) => void;
  logoPreview: string | null;
  setLogoPreview: (value: string | null) => void;
  onCreate: () => void;
  isCreating: boolean;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  newEventName,
  setNewEventName,
  newEventType,
  setNewEventType,
  newEventLogo,
  setNewEventLogo,
  logoPreview,
  setLogoPreview,
  onCreate,
  isCreating,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Create New Spinwheel
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="eventName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="eventName"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter spinwheel name"
          />
        </div>
        {/* <div>
          <label
            htmlFor="eventType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type
          </label>
          <Select value={newEventType} onValueChange={setNewEventType}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Vendor">Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
        <div>
          <label
            htmlFor="eventLogo"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Event Logo
          </label>
          <div className="flex flex-col">
            <label
              className={`
        flex-1 cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-3
        hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200
        focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
        ${logoPreview ? "border-green-500 hover:border-green-600" : ""}
      `}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                    {newEventLogo ? newEventLogo.name : "Select an image"}
                  </span>
                </div>
                <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  Browse
                </span>
              </div>
              <input
                type="file"
                id="eventLogo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setNewEventLogo(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () =>
                      setLogoPreview(reader.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setLogoPreview(null);
                  }
                }}
                className="sr-only"
              />
            </label>
            {logoPreview && (
              <div className="mt-2">
                <Image
                  src={logoPreview}
                  alt="Logo Preview"
                  width={120}
                  height={120}
                  className="object-cover w-[80px] h-[80px] rounded-md border border-gray-200"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={onCreate}
              disabled={!newEventName.trim() || isCreating}
              className="px-4 py-2 bg-primarys-100 text-white hover:bg-primarys-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
                "Create"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

export default function EventsPage() {
  const { token } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newEventName, setNewEventName] = useState<string>("");
  const [newEventType, setNewEventType] = useState<string>("Single");
  const [newEventLogo, setNewEventLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/userevents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

    if (token) fetchEvents();
  }, [token]);

  const handleCreateEvent = async () => {
    if (!newEventName.trim()) return;

    setIsCreating(true);
    try {
      let logoData = null;
      if (newEventLogo) {
        const reader = new FileReader();
        const logoBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(newEventLogo);
        });

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: newEventName,
              type: "Single",
              logo: logoBase64,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to create event");

        const data: Event = await response.json();
        setEvents([...events, data]);
        setIsModalOpen(false);
        setNewEventName("");
        setNewEventType("Single");
        setNewEventLogo(null);
        setLogoPreview(null);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: newEventName,
              type: newEventType,
            }),
          }
        );

        if (!response.ok) throw new Error("Failed to create event");

        const data: Event = await response.json();
        setEvents([...events, data]);
        setIsModalOpen(false);
        setNewEventName("");
        setNewEventType("Single");
        setNewEventLogo(null);
        setLogoPreview(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleManageEvent = (id: string) => {
    router.push(`/admin/events/${id}`);
  };

  if (loading)
    return <div className="p-4 sm:p-6 bg-white">Loading events...</div>;
  if (error)
    return (
      <div className="p-4 sm:p-6 text-red-500 bg-white">Error: {error}</div>
    );

  return (
    <div className="p-4 sm:p-6 relative bg-white">
      <div className="flex flex-row flex-wrap md:justify-between items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">My Spinwheels</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-sm font-normal bg-primarys-100 text-white whitespace-nowrap"
        >
          Create New Spinwheel
        </Button>
      </div>
      <EventsTable events={events} onManage={handleManageEvent} />
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewEventName("");
          setNewEventType("Single");
          setNewEventLogo(null);
          setLogoPreview(null);
        }}
        newEventName={newEventName}
        setNewEventName={setNewEventName}
        newEventType={newEventType}
        setNewEventType={setNewEventType}
        newEventLogo={newEventLogo}
        setNewEventLogo={setNewEventLogo}
        logoPreview={logoPreview}
        setLogoPreview={setLogoPreview}
        onCreate={handleCreateEvent}
        isCreating={isCreating}
      />
    </div>
  );
}
