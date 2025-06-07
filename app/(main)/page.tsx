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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error("Environment variable NEXT_PUBLIC_API_URL is not defined. Please check Vercel environment settings.");
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("API endpoint not found. Verify the /api/events endpoint exists on the backend.");
          } else if (response.status >= 500) {
            throw new Error("Server error. The API server may be down or misconfigured.");
          } else if (response.status === 0) {
            throw new Error("CORS error: The backend may not allow requests from this domain.");
          } else {
            throw new Error(`Failed to fetch events: HTTP ${response.status} ${response.statusText}`);
          }
        }
        const events: Event[] = await response.json();
        if (!Array.isArray(events)) {
          throw new Error("Invalid API response: Expected an array of events.");
        }
        setEvent(events[0] || null);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred while fetching events.");
        console.error("Fetch error:", err);
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
      <p className="mb-4 text-sm text-gray-400">
        API URL: {process.env.NEXT_PUBLIC_API_URL || "Not defined"}
      </p>
      {loading ? (
        <p>Loading event...</p>
      ) : error ? (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md mb-4">
          <p className="font-semibold">Error: {error}</p>
          <p className="text-sm mt-1">
            {error.includes("NEXT_PUBLIC_API_URL") ? (
              <>
                Ensure <code>NEXT_PUBLIC_API_URL</code> is set in Vercel Dashboard under Settings > Environment Variables for the Production environment, then redeploy.
              </>
            ) : error.includes("CORS error") ? (
              <>
                The backend at <code>{process.env.NEXT_PUBLIC_API_URL}</code> may not allow requests from this domain. Add CORS middleware to allow <code>{window.location.origin}</code>.
              </>
            ) : error.includes("API endpoint not found") ? (
              <>
                Check if the <code>/api/events</code> endpoint exists on <code>{process.env.NEXT_PUBLIC_API_URL}</code>. Test it in a browser or Postman.
              </>
            ) : error.includes("Server error") ? (
              <>
                The API server may be down. Check Render’s dashboard logs for <code>ashakine</code> or restart the service.
              </>
            ) : (
              <>
                Try refreshing the page. If the issue persists, test <code>{process.env.NEXT_PUBLIC_API_URL}/api/events</code> in a browser or contact support.
              </>
            )}
          </p>
        </div>
      ) : event ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
          {event.images && event.images[0] && (
            <img
              src={event.images[0].url}
              alt={event.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}
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