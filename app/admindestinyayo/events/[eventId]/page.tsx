"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Event, NewPrizeData } from "@/types";
import Modal from "@/components/Modal";

interface Winner {
  _id: string;
  code: string;
  prizeId: string;
  eventId: string;
  redeemed: boolean;
  createdAt: string;
  prize: {
    prize: string;
  };
}

export default function EventDetailsPage({
  params,
}: {
  params: { eventId: string };
}) {
   const [event, setEvent] = useState<Event | null>(null);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPrize, setNewPrize] = useState<string>("");
  const [newMaxWins, setNewMaxWins] = useState<number>(1);
  const [newRedeemInfo, setNewRedeemInfo] = useState<string>("");
  const [editingPrizeId, setEditingPrizeId] = useState<string | null>(null);
  const [editPrizeName, setEditPrizeName] = useState<string>("");
  const [editMaxWins, setEditMaxWins] = useState<number>(1);
  const [editRedeemInfo, setEditRedeemInfo] = useState<string>("");
  const [prizeLoading, setPrizeLoading] = useState<boolean>(false);
  const [prizeError, setPrizeError] = useState<string | null>(null);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
  const [redeemCode, setRedeemCode] = useState<string>("");
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, winnersResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/winners`),
        ]);

        if (!eventResponse.ok) throw new Error("Failed to fetch event");
        if (!winnersResponse.ok) throw new Error("Failed to fetch winners");

        const eventData: Event = await eventResponse.json();
        const winnersData: Winner[] = await winnersResponse.json();
        
        setEvent(eventData);
        setWinners(winnersData.filter(winner => winner.eventId === params.eventId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.eventId]);

  const handleAddPrize = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const prizeData: NewPrizeData = {
        prize: newPrize,
        maxWins: newMaxWins,
        winCount: 0,
        redeemInfo: newRedeemInfo,
        eventId: params.eventId,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prizes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prizeData),
      });

      if (!response.ok) throw new Error("Failed to add prize");

      const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`);
      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
      setNewPrize("");
      setNewMaxWins(1);
      setNewRedeemInfo("");
    } catch (err) {
      setPrizeError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleEditPrize = async (e: React.FormEvent, prizeId: string) => {
    e.preventDefault();
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prizes/${prizeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prize: editPrizeName,
          maxWins: editMaxWins,
          redeemInfo: editRedeemInfo,
        }),
      });

      if (!response.ok) throw new Error("Failed to update prize");

      const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`);
      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
      setEditingPrizeId(null);
      setEditPrizeName("");
      setEditMaxWins(1);
      setEditRedeemInfo("");
    } catch (err) {
      setPrizeError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleDeletePrize = async (prizeId: string) => {
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prizes/${prizeId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete prize");

      const updatedResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`);
      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
    } catch (err) {
      setPrizeError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleRedeemPrize = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemError(null);

    try {
      const winner = winners.find(w => w.code === redeemCode);
      if (!winner) {
        throw new Error("Invalid redemption code");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/winners/${winner._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redeemed: true }),
      });

      if (!response.ok) throw new Error("Failed to redeem prize");

      const updatedWinner = await response.json();
      setWinners(winners.map(w => w._id === updatedWinner._id ? updatedWinner : w));
      setRedeemCode("");
      setIsRedeemModalOpen(false);
    } catch (err) {
      setRedeemError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  if (loading) return <div className="p-6">Loading event details...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!event) return <div className="p-6">Event not found</div>;


  return (
    <div className="p-6 flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center">
        <button
          onClick={() => router.push("/admindestinyayo/events")}
          className="text-gray-300 hover:text-white mr-4 transition-colors duration-200"
        >
          ← All Events
        </button>
        <h1 className="text-2xl font-bold text-white">{event.name}</h1>
      </div>

      {/* Event Details Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Event Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Created</p>
            <p className="text-white">{new Date(event.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p className="text-white">{new Date(event.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Prizes Management Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Prizes ({event.prizes.length})
            </h2>
            <button
              onClick={() => setIsRedeemModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Redeem Prize
            </button>
          </div>

          {/* Add Prize Form */}
          <form onSubmit={handleAddPrize} className="flex flex-col gap-4">
            <div className="space-y-2">
              <label htmlFor="prize" className="text-gray-300 text-sm block">
                Add New Prize
              </label>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  id="prize"
                  value={newPrize}
                  onChange={(e) => setNewPrize(e.target.value)}
                  placeholder="Prize name"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="number"
                  id="maxWins"
                  value={newMaxWins}
                  onChange={(e) => setNewMaxWins(Number(e.target.value))}
                  placeholder="Max Wins"
                  className="w-24 bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  required
                />
                <button
                  type="submit"
                  disabled={prizeLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {prizeLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  Add Prize
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="redeemInfo" className="text-gray-300 text-sm block">
                Redeem Information
              </label>
              <textarea
                id="redeemInfo"
                value={newRedeemInfo}
                onChange={(e) => setNewRedeemInfo(e.target.value)}
                placeholder="Instructions for redeeming this prize"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                rows={3}
              />
            </div>
            {prizeError && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-2 rounded-md">
                {prizeError}
              </div>
            )}
          </form>

          {/* Prizes List */}
          {event.prizes.length === 0 ? (
            <div className="bg-gray-900/50 rounded-lg p-8 text-center border border-gray-700">
              <p className="text-gray-400">No prizes added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {event.prizes.map((prize) => (
                <div
                  key={prize._id}
                  className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 transition-all duration-200 hover:border-gray-600"
                >
                  {editingPrizeId === prize._id ? (
                    <form
                      onSubmit={(e) => handleEditPrize(e, prize._id)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="text-gray-300 text-sm block mb-1">Prize Name</label>
                          <input
                            type="text"
                            value={editPrizeName}
                            onChange={(e) => setEditPrizeName(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 text-sm block mb-1">Max Wins</label>
                          <input
                            type="number"
                            value={editMaxWins}
                            onChange={(e) => setEditMaxWins(Number(e.target.value))}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            min="1"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-300 text-sm block mb-1">Redeem Info</label>
                        <textarea
                          value={editRedeemInfo}
                          onChange={(e) => setEditRedeemInfo(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setEditingPrizeId(null)}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={prizeLoading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                          {prizeLoading ? (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : null}
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg text-white">{prize.prize}</h3>
                          <div className="flex gap-4 mt-1 text-sm">
                            <span className="text-gray-400">Max Wins: {prize.maxWins}</span>
                            <span className="text-gray-400">Wins: {prize.winCount || 0}</span>
                            {prize.maxWins > 0 && (
                              <span className="text-gray-400">
                                Remaining: {Math.max(0, prize.maxWins - (prize.winCount || 0))}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingPrizeId(prize._id);
                              setEditPrizeName(prize.prize);
                              setEditMaxWins(prize.maxWins);
                              setEditRedeemInfo(prize.redeemInfo || "");
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePrize(prize._id)}
                            disabled={prizeLoading}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {prize.redeemInfo && (
                        <div className="mt-4 bg-gray-800/50 p-3 rounded-md border border-gray-700">
                          <h4 className="text-gray-300 text-sm font-medium mb-1">Redeem Information:</h4>
                          <p className="text-gray-200 whitespace-pre-line">{prize.redeemInfo}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Winners List Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Winners ({winners.length})</h2>
        {winners.length === 0 ? (
          <div className="bg-gray-900/50 rounded-lg p-8 text-center border border-gray-700">
            <p className="text-gray-400">No winners yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {winners.map((winner) => (
              <div
                key={winner._id}
                className="bg-gray-900/50 p-4 rounded-lg border border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    {/* <p className="font-medium text-white">Prize: {winner.prize.prize}</p> */}
                    <p className="text-sm text-gray-400">Code: {winner.code}</p>
                    <p className="text-sm text-gray-400">
                      Won: {new Date(winner.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Status: {winner.redeemed ? "Redeemed" : "Not Redeemed"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Redeem Prize Modal */}
      <Modal isOpen={isRedeemModalOpen} onClose={() => setIsRedeemModalOpen(false)}>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Redeem Prize</h2>
          <form onSubmit={handleRedeemPrize} className="space-y-4">
            <div>
              <label htmlFor="redeemCode" className="text-gray-300 text-sm block mb-1">
                Redemption Code
              </label>
              <input
                type="text"
                id="redeemCode"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                placeholder="Enter redemption code"
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            {redeemError && (
              <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-2 rounded-md">
                {redeemError}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsRedeemModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Redeem
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}