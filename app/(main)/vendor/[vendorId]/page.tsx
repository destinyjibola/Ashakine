"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";
import Modal from "@/components/Modal";

// Define Vendor type locally
type Vendor = {
  _id: string;
  name: string;
  url: string;
  email: string;
  event: {
    _id: string;
    name: string;
  };
  prizes: {
    _id: string;
    prize: string;
    maxWins: number;
    redeemInfo: string;
    winCount: number;
    vendor: string;
  }[];
};

// Define Event type locally
type Event = {
  _id: string;
  name: string;
  type: string;
  createdAt: string;
};

// Define Winner type locally
type Winner = {
  _id: string;
  code: string;
  redeemed: boolean;
  createdAt: string;
  prizeId?: {
    _id: string;
    prize: string;
  };
};

// Vendor Details Component
const VendorDetails = ({ vendor }: { vendor: Vendor | null }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-900 mb-4">Vendor Information</h2>
    <h1 className="text-2xl font-bold text-gray-900 mb-4">{vendor?.name || "N/A"}</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-gray-500 text-sm">Event</p>
        <p className="text-gray-900 font-bold">{vendor?.event?.name || "N/A"}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">Email</p>
        <p className="text-gray-900 font-bold">{vendor?.email || "N/A"}</p>
      </div>
      <div>
        <p className="text-gray-500 text-sm">URL</p>
        <a href={vendor?.url} className="text-blue-500 hover:underline font-bold">
          {vendor?.url || "N/A"}
        </a>
      </div>
    </div>
  </div>
);

// Event Details Component
// const EventDetails = ({ event }: { event: Event | null }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//     <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Information</h2>
//     <h1 className="text-2xl font-bold text-gray-900 mb-4">{event?.name || "N/A"}</h1>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div>
//         <p className="text-gray-500 text-sm">Type</p>
//         <p className="text-gray-900 font-bold">{event?.type || "N/A"}</p>
//       </div>
//       <div>
//         <p className="text-gray-500 text-sm">Created At</p>
//         <p className="text-gray-900 font-bold">
//           {event?.createdAt ? new Date(event.createdAt).toLocaleDateString() : "N/A"}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// Prize Details Component
const PrizeDetails = ({ prizes }: { prizes: Vendor['prizes'] }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-200 hover:shadow-xl">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-serif">Vendor Prizes</h2>
    {prizes.length === 0 ? (
      <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
        <p className="text-gray-500 text-base font-medium">No prizes available</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto">
        {prizes.map((prize) => (
          <div
            key={prize._id}
            className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="flex flex-col gap-3">
              <p className="text-lg font-bold text-gray-900 font-sans">
                Prize: <span className="text-blue-600">{prize.prize}</span>
              </p>
              <p className="text-base font-semibold text-gray-800">
                Max Wins: <span className="text-gray-900">{prize.maxWins}</span>
              </p>
              <p className="text-base font-semibold text-gray-800">
                Redeem Info: <span className="text-gray-900">{prize.redeemInfo}</span>
              </p>
              <p className="text-base font-semibold text-gray-800">
                Win Count: <span className="text-gray-900">{prize.winCount}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Redeem Prize Modal Component
const RedeemPrizeModal = ({
  isOpen,
  onClose,
  redeemCode,
  setRedeemCode,
  redeemError,
  handleRedeemPrize,
}: {
  isOpen: boolean;
  onClose: () => void;
  redeemCode: string;
  setRedeemCode: (value: string) => void;
  redeemError: string | null;
  handleRedeemPrize: (e: React.FormEvent) => void;
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="p-6 space-y-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-900">Redeem Prize</h2>
      <form onSubmit={handleRedeemPrize} className="space-y-4">
        <div>
          <label
            htmlFor="redeemCode"
            className="text-gray-600 text-sm block mb-1"
          >
            Redemption Code
          </label>
          <input
            type="text"
            id="redeemCode"
            value={redeemCode}
            onChange={(e) => setRedeemCode(e.target.value)}
            placeholder="Enter redemption code"
            className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        {redeemError && (
          <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-md">
            {redeemError}
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Redeem
          </button>
        </div>
      </form>
    </div>
  </Modal>
);

// Winners List Component
const WinnersList = ({ winners, openRedeemModal }: { winners: Winner[]; openRedeemModal: () => void }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Winners ({winners.length})
      </h2>
  l
    </div>
    {winners.length === 0 ? (
      <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
        <p className="text-gray-500">No winners yet</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
        {winners.map((winner) => (
          <div
            key={winner._id}
            className="bg-gray-100 p-4 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors duration-200 h-full"
          >
            <div className="flex flex-col gap-2 h-full">
              <p className="font-medium text-gray-900">
                Prize: {winner.prizeId?.prize || "No prize"}
              </p>
              <p className="text-sm text-gray-500">Code: {winner.code}</p>
              <p className="text-sm text-gray-500">
                Won: {new Date(winner.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={
                    winner.redeemed ? "text-green-500" : "text-yellow-500"
                  }
                >
                  {winner.redeemed ? "Redeemed" : "Not Redeemed"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Main Vendor Component
export default function Vendor() {
  const { token, loading: authLoading, logout } = useAuth();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
  const [redeemCode, setRedeemCode] = useState<string>("");
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const vendorId = params?.vendorId as string;

  const handleRedeemPrize = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemError(null);

    try {
      const winner = winners.find((w) => w.code === redeemCode);
      if (!winner) {
        throw new Error("Invalid redemption code");
      }

      // Check if the winner's prize belongs to the current vendor
      const prize = vendor?.prizes.find((p) => p._id === winner.prizeId?._id);
      if (!prize || prize.vendor !== vendorId) {
        // Fetch the vendor details for the prize's vendor
        const otherVendorResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vendors/${prize?.vendor || ''}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!otherVendorResponse.ok) {
          throw new Error("This prize cannot be redeemed by this vendor");
        }

        const otherVendorData: Vendor = await otherVendorResponse.json();
        throw new Error(
          `This prize can only be redeemed by ${otherVendorData.name}`
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/winners/${winner._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ redeemed: true }),
        }
      );

      if (response.status === 401) {
        logout();
        setRedeemError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to redeem prize");
      }

      const updatedWinner = await response.json();
      setWinners(
        winners.map((w) => (w._id === updatedWinner._id ? updatedWinner : w))
      );
      setRedeemCode("");
      setIsRedeemModalOpen(false);
    } catch (err) {
      setRedeemError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vendor to get event ID and prizes
        const vendorResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/vendors/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (vendorResponse.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/login");
          return;
        }

        if (!vendorResponse.ok) {
          const errorData = await vendorResponse.json();
          throw new Error(errorData.message || "Failed to fetch vendor");
        }

        const vendorData: Vendor = await vendorResponse.json();
        setVendor(vendorData);

        // Fetch event details using event ID
        const eventResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${vendorData.event._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (eventResponse.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/login");
          return;
        }

        if (!eventResponse.ok) {
          const errorData = await eventResponse.json();
          throw new Error(errorData.message || "Failed to fetch event");
        }

        const eventData: Event = await eventResponse.json();
        setEvent(eventData);

        // Fetch winners using event ID
        const winnersResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/winners/${vendorData.event._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (winnersResponse.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/login");
          return;
        }

        if (!winnersResponse.ok) {
          const errorData = await winnersResponse.json();
          throw new Error(errorData.message || "Failed to fetch winners");
        }

        const winnersData: Winner[] = await winnersResponse.json();
        // Filter winners to only include those with prizeId in vendor's prizes
        const vendorPrizeIds = vendorData.prizes.map((prize) => prize._id);
        const filteredWinners = winnersData.filter(
          (winner) =>
            winner.prizeId && vendorPrizeIds.includes(winner.prizeId._id)
        );
        setWinners(filteredWinners);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && token) {
      fetchData();
    } else if (!authLoading && !token) {
      setError("No authentication token available");
      setLoading(false);
      router.push("/login");
    }
  }, [vendorId, token, authLoading, router, logout]);

  if (authLoading) return <div className="p-6 text-gray-800">Loading...</div>;
  if (loading) return <div className="p-6 text-gray-800">Loading details...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!vendor) return <div className="p-6 text-gray-800">Vendor not found</div>;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-6xl mx-auto bg-white">
      <div className="flex flex-row justify-end">
        <button
          onClick={() => setIsRedeemModalOpen(true)}
          className="bg-[#3DAF34] text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Redeem Prize
        </button>
      </div>
      <VendorDetails vendor={vendor} />
      {/* <EventDetails event={event} /> */}
      <PrizeDetails prizes={vendor?.prizes || []} />
      <WinnersList winners={winners} openRedeemModal={() => setIsRedeemModalOpen(true)} />
      <RedeemPrizeModal
        isOpen={isRedeemModalOpen}
        onClose={() => setIsRedeemModalOpen(false)}
        redeemCode={redeemCode}
        setRedeemCode={setRedeemCode}
        redeemError={redeemError}
        handleRedeemPrize={handleRedeemPrize}
      />
    </div>
  );
}