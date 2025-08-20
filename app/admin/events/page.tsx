 
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Event } from "@/types";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventRowProps {
  event: Event;
  onManage: (id: string) => void;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventRow: React.FC<EventRowProps> = ({ event, onManage, onEdit, onDelete }) => {
  return (
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
      <td className="px-4 py-4 text-sm text-gray-900 sm:px-6 w-[120px] overflow-visible">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-green-600 hover:text-green-800 flex items-center gap-1"
            >
              Manage
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-32 bg-white border-gray-200">
            <DropdownMenuItem
              onClick={() => onManage(event._id)}
              className="text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onEdit(event)}
              className="text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${event.name}"?`)) {
                  onDelete(event._id);
                }
              }}
              className="text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

interface EventsTableProps {
  events: Event[];
  onManage: (id: string) => void;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const EventsTable: React.FC<EventsTableProps> = ({ events, onManage, onEdit, onDelete }) => (
  <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200 table-fixed">
      <thead className="bg-[#CAC9CE2E] h-[50px]">
        <tr>
          <th className="w-[250px] px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Event Name
          </th>
          <th className="w-[100px] px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Type
          </th>
          <th className="w-[100px] px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Prizes
          </th>
          <th className="w-[100px] px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Spins
          </th>
          <th className="w-[100px] px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Wins
          </th>
          <th className="w-[100px] px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Redeemed
          </th>
          <th className="w-[120px] px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider sm:px-6">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {events.map((event) => (
          <EventRow
            key={event._id}
            event={event}
            onManage={onManage}
            onEdit={onEdit}
            onDelete={onDelete}
          />
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
  newEventLogo: File | null;
  setNewEventLogo: (value: File | null) => void;
  logoPreview: string | null;
  setLogoPreview: (value: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isCreating: boolean;
  nameError: string | null;
  logoError: string | null;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  newEventName,
  setNewEventName,
  newEventLogo,
  setNewEventLogo,
  logoPreview,
  setLogoPreview,
  onSubmit,
  isCreating,
  nameError,
  logoError,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={onSubmit} className="rounded-lg">
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
            className={`w-full border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter spinwheel name"
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-500">{nameError}</p>
          )}
        </div>
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
                flex-1 cursor-pointer rounded-md border ${logoError ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-3
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
            {logoError && (
              <p className="mt-1 text-sm text-red-500">{logoError}</p>
            )}
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
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!newEventName.trim() || !newEventLogo || isCreating}
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
    </form>
  </Modal>
);

interface EditEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  editEventName: string;
  setEditEventName: (value: string) => void;
  editEventLogo: File | null;
  setEditEventLogo: (value: File | null) => void;
  logoPreview: string | null;
  setLogoPreview: (value: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
  nameError: string | null;
  logoError: string | null;
}

const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  onClose,
  event,
  editEventName,
  setEditEventName,
  editEventLogo,
  setEditEventLogo,
  logoPreview,
  setLogoPreview,
  onSubmit,
  isUpdating,
  nameError,
  logoError,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={onSubmit} className="rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Edit Spinwheel
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="editEventName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="editEventName"
            value={editEventName}
            onChange={(e) => setEditEventName(e.target.value)}
            className={`w-full border ${nameError ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter spinwheel name"
          />
          {nameError && (
            <p className="mt-1 text-sm text-red-500">{nameError}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="editEventLogo"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Event Logo
          </label>
          <div className="flex flex-col">
            <label
              className={`
                flex-1 cursor-pointer rounded-md border ${logoError ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-3
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
                    {editEventLogo ? editEventLogo.name : "Select an image"}
                  </span>
                </div>
                <span className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  Browse
                </span>
              </div>
              <input
                type="file"
                id="editEventLogo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setEditEventLogo(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () =>
                      setLogoPreview(reader.result as string);
                    reader.readAsDataURL(file);
                  } else {
                    setLogoPreview(event?.logo?.url || null);
                  }
                }}
                className="sr-only"
              />
            </label>
            {logoError && (
              <p className="mt-1 text-sm text-red-500">{logoError}</p>
            )}
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
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!editEventName.trim() || isUpdating}
            className="px-4 py-2 bg-primarys-100 text-white hover:bg-primarys-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isUpdating ? (
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
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </div>
    </form>
  </Modal>
);

export default function EventsPage() {
  const { token, logout, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEventName, setNewEventName] = useState<string>("");
  const [newEventLogo, setNewEventLogo] = useState<File | null>(null);
  const [createLogoPreview, setCreateLogoPreview] = useState<string | null>(null);
  const [editEventName, setEditEventName] = useState<string>("");
  const [editEventLogo, setEditEventLogo] = useState<File | null>(null);
  const [editLogoPreview, setEditLogoPreview] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [createNameError, setCreateNameError] = useState<string | null>(null);
  const [createLogoError, setCreateLogoError] = useState<string | null>(null);
  const [editNameError, setEditNameError] = useState<string | null>(null);
  const [editLogoError, setEditLogoError] = useState<string | null>(null);
  const router = useRouter();

  const fetchEvents = useCallback(
    async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/userevents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/auth/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch events: HTTP ${response.status}`);
        }

        const data: Event[] = await response.json();
        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    },
    [token, logout, router]
  );

  const handleCreateEvent = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setCreateNameError(null);
      setCreateLogoError(null);

      console.log("handleCreateEvent called", { newEventName, newEventLogo });

      if (!newEventName.trim()) {
        setCreateNameError("Event name is required");
        console.log("Validation failed: Event name is missing");
        return;
      }
      if (!newEventLogo) {
        setCreateLogoError("Event logo is required");
        console.log("Validation failed: Event logo is missing");
        return;
      }

      setIsCreating(true);
      try {
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

        if (response.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/auth/login");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to create event: HTTP ${response.status}`);
        }

        const data: Event = await response.json();
        setEvents((prev) => [...prev, data]);
        setIsCreateModalOpen(false);
        setNewEventName("");
        setNewEventLogo(null);
        setCreateLogoPreview(null);
        setCreateNameError(null);
        setCreateLogoError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsCreating(false);
      }
    },
    [newEventName, newEventLogo, token, logout, router]
  );

  const handleUpdateEvent = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedEvent) return;

      setEditNameError(null);
      setEditLogoError(null);

      console.log("handleUpdateEvent called", { editEventName, editEventLogo });

      if (!editEventName.trim()) {
        setEditNameError("Event name is required");
        console.log("Validation failed: Event name is missing");
        return;
      }

      setIsUpdating(true);
      try {
        const body: { name: string; logo?: string } = { name: editEventName };
        if (editEventLogo) {
          const reader = new FileReader();
          const logoBase64 = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(editEventLogo);
          });
          body.logo = logoBase64;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${selectedEvent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          }
        );

        if (response.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/auth/login");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to update event: HTTP ${response.status}`);
        }

        const updatedEvent: Event = await response.json();
        setEvents((prev) =>
          prev.map((event) =>
            event._id === updatedEvent._id ? updatedEvent : event
          )
        );
        setIsEditModalOpen(false);
        setEditEventName("");
        setEditEventLogo(null);
        setEditLogoPreview(null);
        setEditNameError(null);
        setEditLogoError(null);
        setSelectedEvent(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setIsUpdating(false);
      }
    },
    [editEventName, editEventLogo, selectedEvent, token, logout, router]
  );

  const handleDeleteEvent = useCallback(
    async (id: string) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/auth/login");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to delete event: HTTP ${response.status}`);
        }

        setEvents((prev) => prev.filter((event) => event._id !== id));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    },
    [token, logout, router]
  );

  const handleEditEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setEditEventName(event.name);
    setEditEventLogo(null);
    setEditLogoPreview(event.logo?.url || null);
    setIsEditModalOpen(true);
  }, []);

  const handleManageEvent = useCallback((id: string) => {
    router.push(`/admin/events/${id}`);
  }, [router]);

  useEffect(() => {
    if (authLoading) return; // Wait for AuthContext to finish loading

    if (token) {
      fetchEvents();
    }
  }, [authLoading, token, fetchEvents]);

  if (authLoading) return <div className="p-4 sm:p-6 bg-white">Loading...</div>;
  if (loading)
    return <div className="p-4 sm:p-6 bg-white">Loading events...</div>;
  if (error)
    return (
      <div className="p-4 sm:p-6 text-red-500 bg-white">Error: {error}</div>
    );

  return (
    <div className="p-4 sm:p-6 bg-white">
      <div className="flex flex-row flex-wrap md:justify-between items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">My Spinwheels</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="text-sm font-normal bg-primarys-100 text-white whitespace-nowrap"
        >
          Create New Spinwheel
        </Button>
      </div>
      <EventsTable
        events={events}
        onManage={handleManageEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setTimeout(() => {
            setIsCreateModalOpen(false);
            setNewEventName("");
            setNewEventLogo(null);
            setCreateLogoPreview(null);
            setCreateNameError(null);
            setCreateLogoError(null);
          }, 200);
        }}
        newEventName={newEventName}
        setNewEventName={setNewEventName}
        newEventLogo={newEventLogo}
        setNewEventLogo={setNewEventLogo}
        logoPreview={createLogoPreview}
        setLogoPreview={setCreateLogoPreview}
        onSubmit={handleCreateEvent}
        isCreating={isCreating}
        nameError={createNameError}
        logoError={createLogoError}
      />
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setTimeout(() => {
            setIsEditModalOpen(false);
            setEditEventName("");
            setEditEventLogo(null);
            setEditLogoPreview(null);
            setEditNameError(null);
            setEditLogoError(null);
            setSelectedEvent(null);
          }, 200);
        }}
        event={selectedEvent}
        editEventName={editEventName}
        setEditEventName={setEditEventName}
        editEventLogo={editEventLogo}
        setEditEventLogo={setEditEventLogo}
        logoPreview={editLogoPreview}
        setLogoPreview={setEditLogoPreview}
        onSubmit={handleUpdateEvent}
        isUpdating={isUpdating}
        nameError={editNameError}
        logoError={editLogoError}
      />
    </div>
  );
}
