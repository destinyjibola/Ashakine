import { Event } from '@/types';
import React from 'react'

const EventDetails = ({
  event,
  vendors,
  winners,
}: {
  event: Event;
  vendors: any[] | null;
  winners: any[] | null;
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">
      Event Information
    </h2>
    <h1 className="text-2xl font-bold text-gray-900 mb-4">{event.name}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div></div>
      <div></div>
      <div>
        <p className="text-gray-500 text-sm">Vendors</p>
        <p className="text-gray-900 font-bold">{vendors?.length ?? 0}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Prizes</p>
        <p className="text-gray-900 font-bold">{event.prizes?.length ?? 0}</p>
      </div>
      {event.type === "Single" && (
        <>
          <div>
            <p className="text-gray-500 text-sm">Winners</p>
            <p className="text-gray-900 font-bold">{winners?.length ?? 0}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Redeemed</p>
            <p className="text-gray-900 font-bold">
              {winners?.filter((w) => w.redeemed).length ?? 0}
            </p>
          </div>
        </>
      )}
    </div>
  </div>
);

export default EventDetails