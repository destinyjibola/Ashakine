"use client";
import { Event } from "@/types";
import Image from "next/image";

interface EventHeaderProps {
  event?: Event | null; // Updated to allow null
}

function EventHeaders({ event }: EventHeaderProps) {
  return (
    <header className="w-auto mx-auto mb-6 md:p-2 p-1 rounded-full flex items-center justify-center space-x-2">
      {event?.logo?.url ? (
        <Image
          src={event.logo.url}
          alt={event.logo.altText || `${event.name} logo`}
          width={50}
          height={50}
          className="object-cover md:w-14 md:h-14 w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <span className="text-2xl">🎉</span>
        </div>
      )}
      <h1 className="text-xl font-bold text-black text-center">
        {event?.name || "Event Name"}
      </h1>
    </header>
  );
}

export default EventHeaders;