"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Event {
  _id: string;
  name: string;
  images?: { url: string; public_id: string }[];
}

export default function Home() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const events: Event[] = await response.json();
        setEvent(events[0] || null); // Set the first event
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="text-white container-spacing mt-8">
      <h1 className="text-3xl font-bold mb-6">Ashakhine Wheel</h1>
      <p className="mb-4">Welcome! Spin the wheel for a chance to win exciting prizes!</p>

      {loading ? (
        <p>Loading event...</p>
      ) : event ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
    
          <p className="text-gray-300 mb-4">Join the fun and spin the wheel to win!</p>
          <Link
            href={`/${event._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
          >
            Spin Now
          </Link>
        </div>
      ) : (
        <p>No events available. Check back soon!</p>
      )}
    </div>
  );
}