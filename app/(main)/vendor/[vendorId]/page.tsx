"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";
import Modal from "@/components/Modal";
import PrizeDetails from "@/components/PrizeDetails";
import WinnersList from "@/components/WinnersList";
import RedeemPrizeModal from "@/components/RedeemPrizeModal";
import { Event, Prize, Vendor, Winner } from "@/types";
import VendorDetails from "@/components/VendorDetail";

const VendorPage = () => {
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

      if (!winner.prizeId) {
        throw new Error("Winner has no associated prize");
      }

      // Check if the winner's prize belongs to the current vendor
      const prize = vendor?.prizes?.find((p) => p._id === winner.prizeId?._id);
      if (!prize || prize.vendor !== vendorId) {
        // Fetch the vendor details for the prize's vendor
        const otherVendorId = prize?.vendor || "";
        if (otherVendorId) {
          const otherVendorResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/vendors/${otherVendorId}`,
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
        } else {
          throw new Error("Prize is not associated with any vendor");
        }
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

      const updatedWinner: Winner = await response.json();
      // Debug log to inspect updatedWinner
      console.log("Updated Winner:", updatedWinner);
      if (!updatedWinner.prizeId) {
        console.warn("Updated winner has no prizeId:", updatedWinner);
      }
      setWinners(
        winners.map((w) =>
          w._id === updatedWinner._id
            ? { ...updatedWinner, prizeId: winner.prizeId } // Preserve prizeId
            : w
        )
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
        console.log("Vendor Data:", vendorData); // Debug log
        setVendor(vendorData);

        // Fetch event details using event ID
        const eventId =
          typeof vendorData.event === "object"
            ? vendorData.event?._id
            : vendorData.event;
        if (!eventId) {
          throw new Error("Vendor is not associated with an event");
        }

        const eventResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${eventId}`,
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
        console.log("Event Data:", eventData); // Debug log
        setEvent(eventData);

        // Fetch winners using event ID
        const winnersResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/winners/${eventId}`,
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
        console.log("Winners Data:", winnersData); // Debug log
        // Filter winners to only include those with prizeId in vendor's prizes
        const vendorPrizeIds =
          vendorData.prizes?.map((prize) => prize._id) || [];
        const filteredWinners = winnersData.filter(
          (winner) =>
            winner.prizeId && vendorPrizeIds.includes(winner.prizeId._id)
        );
        console.log("Filtered Winners:", filteredWinners); // Debug log
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
  if (loading)
    return <div className="p-6 text-gray-800">Loading details...</div>;
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
      <VendorDetails
        vendor={vendor}
        prizes={vendor.prizes || []}
        winners={winners}
      />
      <PrizeDetails prizes={vendor.prizes || []} />
      <WinnersList winners={winners} />
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
};

export default VendorPage;