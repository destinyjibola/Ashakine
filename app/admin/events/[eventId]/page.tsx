'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Event, NewPrizeData } from '@/types';

export default function EventDetailsPage({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPrize, setNewPrize] = useState<string>('');
  const [prizeLoading, setPrizeLoading] = useState<boolean>(false);
  const [prizeError, setPrizeError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:7000/api/events/${params.eventId}`);
        if (!response.ok) throw new Error('Failed to fetch event');
        const data: Event = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [params.eventId]);

  const handleAddPrize = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const prizeData: NewPrizeData = {
        prize: newPrize,
        eventId: params.eventId
      };

      const response = await fetch('http://localhost:7000/api/prizes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prizeData),
      });

      if (!response.ok) throw new Error('Failed to add prize');
      
      const updatedResponse = await fetch(`http://localhost:7000/api/events/${params.eventId}`);
      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
      setNewPrize('');
    } catch (err) {
      setPrizeError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setPrizeLoading(false);
    }
  };

  const togglePrizeStatus = async (prizeId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`http://localhost:7000/api/prizes/${prizeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !currentStatus
        }),
      });

      if (!response.ok) throw new Error('Failed to update prize status');
      
      const updatedResponse = await fetch(`http://localhost:7000/api/events/${params.eventId}`);
      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (loading) return <div className="p-6">Loading event details...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!event) return <div className="p-6">Event not found</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex items-center">
        <button 
          onClick={() => router.push('/admin/events')}
          className="text-gray-300 hover:text-white mr-4"
        >
          ← All Events
        </button>
        <h1 className="text-2xl font-bold">{event.name}</h1>
      </div>

      {/* Event Details Card */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Event Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Created</p>
            <p>{new Date(event.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p>{new Date(event.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Prizes Management Section */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Prizes ({event.prizes.length})</h2>
          </div>
          
          {/* Add Prize Form */}
          <form onSubmit={handleAddPrize} className="flex flex-col gap-2">
            <label htmlFor="prize" className="text-gray-300 text-sm">
              Add New Prize
            </label>
            <div className="flex">
              <input
                type="text"
                id="prize"
                value={newPrize}
                onChange={(e) => setNewPrize(e.target.value)}
                placeholder="Enter prize name"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 text-white"
                required
              />
              <button
                type="submit"
                disabled={prizeLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md disabled:opacity-50"
              >
                {prizeLoading ? 'Adding...' : 'Add'}
              </button>
            </div>
            {prizeError && <p className="text-red-500 text-sm">{prizeError}</p>}
          </form>

          {/* Prizes List */}
          {event.prizes.length === 0 ? (
            <p className="text-gray-400 py-4">No prizes added yet</p>
          ) : (
            <div className="divide-y divide-gray-700">
              {event.prizes.map((prize) => (
                <div key={prize._id} className="py-3 flex flex-col sm:flex-row justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium">{prize.prize}</p>
                    <p className="text-sm text-gray-400">
                      Added: {new Date(prize.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      prize.isActive ? 'bg-green-900/50 text-green-400' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {prize.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => togglePrizeStatus(prize._id, prize.isActive)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        prize.isActive 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}