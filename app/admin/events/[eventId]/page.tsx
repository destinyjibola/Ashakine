"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Event, NewPrizeData, Winner, Vendor } from "@/types";
import { useAuth } from "@/hooks/AuthContext";
import { FiCopy, FiShare2, FiRotateCw, FiImage } from "react-icons/fi";
import Link from "next/link";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import EventHeader from "@/components/EventHeader";
import EventDetails from "@/components/EventDetails";
import VendorForm from "@/components/VendorForm";
import EditVendorModal from "@/components/EditVendorModal";
import VendorItem from "@/components/VendorItem";
import VendorsList from "@/components/VendorsList";
import PrizeForm from "@/components/PrizeForm";
import PrizeItem from "@/components/PrizeItem";
import PrizesList from "@/components/PrizesList";
import WinnersList from "@/components/WinnersList";
import RedeemPrizeModal from "@/components/RedeemPrizeModal";
import QRCodePreviewModal from "@/components/QRCodePreviewModal";
import { createSearchParamsBailoutProxy } from "next/dist/client/components/searchparams-bailout-proxy";

export default function EventDetailsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { token, loading: authLoading, logout } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPrize, setNewPrize] = useState<string>("");
  const [newMaxWins, setNewMaxWins] = useState<number>(1);
  const [newRedeemInfo, setNewRedeemInfo] = useState<string>("");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [newVendor, setNewVendor] = useState<{
    name: string;
    url: string;
    email: string;
  }>({
    name: "",
    url: "",
    email: "",
  });
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [editingPrizeId, setEditingPrizeId] = useState<string | null>(null);
  const [editPrizeName, setEditPrizeName] = useState<string>("");
  const [editMaxWins, setEditMaxWins] = useState<number>(1);
  const [editRedeemInfo, setEditRedeemInfo] = useState<string>("");
  const [prizeLoading, setPrizeLoading] = useState<boolean>(false);
  const [prizeError, setPrizeError] = useState<string | null>(null);
  const [addVendorLoading, setAddVendorLoading] = useState<boolean>(false);
  const [addVendorError, setAddVendorError] = useState<string | null>(null);
  const [editVendorLoading, setEditVendorLoading] = useState<boolean>(false);
  const [editVendorError, setEditVendorError] = useState<string | null>(null);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
  const [redeemCode, setRedeemCode] = useState<string>("");
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const prizesPerPage = 5;
  const currentPrizes =
    event?.prizes?.slice(
      (currentPage - 1) * prizesPerPage,
      currentPage * prizesPerPage
    ) || [];
  const totalPages = event?.prizes
    ? Math.ceil(event.prizes.length / prizesPerPage)
    : 0;

  const copySpinWheelLink = () => {
    const spinWheelUrl = `${window.location.origin}/${event?.slug}`;
    navigator.clipboard.writeText(spinWheelUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateQRCodePDF = async () => {
    setQrLoading(true);
    setQrError(null);
    try {
      const spinWheelUrl = `${window.location.origin}/${params.eventId}`;
      const qrDataUrl = await QRCode.toDataURL(spinWheelUrl, {
        width: 150,
        margin: 1,
      });
      setQrCodeDataUrl(qrDataUrl);
      setIsQRModalOpen(true);
    } catch (err) {
      setQrError("Failed to generate QR code");
    } finally {
      setQrLoading(false);
    }
  };

  const downloadPDF = () => {
    if (qrCodeDataUrl && event) {
      const pdf = new jsPDF();
      pdf.setFont("Arial", "bold");
      pdf.setFontSize(20);
      pdf.text(event.name, 105, 20, { align: "center" });
      pdf.addImage(qrCodeDataUrl, "PNG", 80, 50, 50, 50);
      pdf.setFont("Arial", "normal");
      pdf.setFontSize(14);
      pdf.text("Scan and Spin to Win Prizes", 105, 110, { align: "center" });
      pdf.save(`${event.name}-spin-wheel-qr.pdf`);
      setIsQRModalOpen(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, winnersResponse] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/winners/${params.eventId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          ),
        ]);

        if (eventResponse.status === 401 || winnersResponse.status === 401) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/login");
          return;
        }

        if (!eventResponse.ok) {
          const errorData = await eventResponse.json();
          throw new Error(errorData.message || "Failed to fetch event");
        }
        if (!winnersResponse.ok) {
          const errorData = await winnersResponse.json();
          throw new Error(errorData.message || "Failed to fetch winners");
        }

        const eventData: Event = await eventResponse.json();
        const winnersData: Winner[] = await winnersResponse.json();
        setEvent(eventData);
        setVendors(
          Array.isArray(eventData.vendors) &&
            eventData.vendors.every((v) => typeof v !== "string")
            ? eventData.vendors
            : []
        );
        setWinners(winnersData);
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
  }, [params.eventId, token, authLoading, router, logout]);

  const handleAddVendor = async (
    e: React.FormEvent,
    logo: File | null,
    resetLogo: () => void
  ) => {
    e.preventDefault();
    setAddVendorLoading(true);
    setAddVendorError(null);

    try {
      if (!logo) {
        throw new Error("Vendor logo is required");
      }

      const reader = new FileReader();
      const logoBase64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(logo);
      });

      const vendorData = {
        name: newVendor.name,
        url: newVendor.url,
        email: newVendor.email,
        logo: logoBase64,
        eventId: params.eventId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vendors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vendorData),
        }
      );

      if (response.status === 401) {
        logout();
        setAddVendorError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.message || "Failed to add vendor");
      }

      const newVendorData: Vendor = await response.json();
      setVendors([...vendors, newVendorData]);
      setNewVendor({ name: "", url: "", email: "" });
      resetLogo();
    } catch (err) {
      setAddVendorError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setAddVendorLoading(false);
    }
  };

  const handleUpdateVendor = async (
    e: React.FormEvent,
    vendorId: string,
    data: { name: string; url: string; email?: string },
    logo: File | null,
    resetLogo: () => void
  ) => {
    e.preventDefault();
    setEditVendorLoading(true);
    setEditVendorError(null);

    try {
      let logoBase64: string | null = null;
      if (logo) {
        const reader = new FileReader();
        logoBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(logo);
        });
      }

      const vendorData = {
        name: data.name,
        url: data.url,
        email: data.email || undefined,
        image: logoBase64,
      };

      console.log("Sending vendorData:", vendorData); // Debug log

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vendors/${vendorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vendorData),
        }
      );

      if (response.status === 401) {
        logout();
        setEditVendorError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update vendor");
      }

      const updatedVendor: Vendor = await response.json();
      setVendors(vendors.map((v) => (v._id === vendorId ? updatedVendor : v)));
      resetLogo();
      setEditingVendor(null); // Close modal after successful update
    } catch (err) {
      setEditVendorError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setEditVendorLoading(false);
    }
  };

  const handleDeleteVendor = async (vendorId: string) => {
    setAddVendorLoading(true);
    setAddVendorError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vendors/${vendorId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        logout();
        setAddVendorError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete vendor");
      }

      setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setAddVendorError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
    } catch (err) {
      setAddVendorError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setAddVendorLoading(false);
    }
  };

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
        vendorId: selectedVendor,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prizes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(prizeData),
        }
      );

      if (response.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add prize");
      }

      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("//login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
      setNewPrize("");
      setNewMaxWins(1);
      setNewRedeemInfo("");
      setSelectedVendor("");
    } catch (err) {
      setPrizeError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleEditPrize = async (e: React.FormEvent, prizeId: string) => {
    e.preventDefault();
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prizes/${prizeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prize: editPrizeName,
            maxWins: editMaxWins,
            redeemInfo: editRedeemInfo,
          }),
        }
      );

      if (response.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update prize");
      }

      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
      setEditingPrizeId(null);
      setEditPrizeName("");
      setEditMaxWins(1);
      setEditRedeemInfo("");
    } catch (err) {
      setPrizeError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleDeletePrize = async (prizeId: string) => {
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prizes/${prizeId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("//login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete prize");
      }

      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("//login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
    } catch (err) {
      setPrizeError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleRedeemPrize = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemError(null);

    try {
      const winner = winners.find((w) => w.code === redeemCode);
      if (!winner) {
        throw new Error("Invalid redemption code");
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
        router.push("//login");
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

  if (authLoading) return <div className="p-6 text-gray-800">Loading...</div>;
  if (loading)
    return <div className="p-6 text-gray-800">Loading event details...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!event) return <div className="p-6 text-gray-800">Event not found</div>;

     return (
    <div className="relative flex flex-col max-w-6xl mx-auto bg-white">
      {qrError && (
        <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-md mt-[176px]">
          {qrError}
        </div>
      )}
      <div className="fixed top-[100px] left-0 right-0 z-10 bg-white container-spacing mx-auto">
        <EventHeader
          eventName={event.name}
          onBack={() => router.push("/admin/events")}
          eventId={params.eventId}
          copySpinWheelLink={copySpinWheelLink}
          copied={copied}
          openQRCodeModal={generateQRCodePDF}
          qrLoading={qrLoading}
        />
      </div>
      <div className="mt-[164px] flex flex-col gap-6">
        <EventDetails event={event} vendors={vendors} winners={winners} />
        {event.type === "Vendor" && (
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Vendors ({vendors.length})
            </h2>
            <VendorForm
              newVendor={newVendor}
              setNewVendor={setNewVendor}
              vendorError={addVendorError}
              vendorLoading={addVendorLoading}
              handleAddVendor={handleAddVendor}
            />
            <VendorsList
              event={event}
              vendors={vendors}
              handleDeleteVendor={handleDeleteVendor}
              setEditingVendor={setEditingVendor}
            />
          </div>
        )}
        {editingVendor && (
          <EditVendorModal
            isOpen={editingVendor !== null}
            onClose={() => setEditingVendor(null)}
            vendor={editingVendor}
            vendorError={editVendorError}
            vendorLoading={editVendorLoading}
            handleUpdateVendor={handleUpdateVendor}
            setEditingVendor={setEditingVendor}
          />
        )}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Prizes ({event.prizes.length})
              </h2>
              {event.type === "Single" && (
                <button
                  onClick={() => setIsRedeemModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Redeem Prize
                </button>
              )}
            </div>
            {event.type === "Vendor" && vendors.length === 0 ? (
              <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
                <p className="text-gray-500">
                  Please add a vendor before adding prizes.
                </p>
              </div>
            ) : (
              <PrizeForm
                event={event}
                newPrize={newPrize}
                setNewPrize={setNewPrize}
                newMaxWins={newMaxWins}
                setNewMaxWins={setNewMaxWins}
                newRedeemInfo={newRedeemInfo}
                setNewRedeemInfo={setNewRedeemInfo}
                prizeLoading={prizeLoading}
                prizeError={prizeError}
                handleAddPrize={handleAddPrize}
                vendors={vendors}
                selectedVendor={selectedVendor}
                setSelectedVendor={setSelectedVendor}
              />
            )}
            <PrizesList
              event={event}
              currentPrizes={currentPrizes}
              editingPrizeId={editingPrizeId}
              editPrizeName={editPrizeName}
              setEditPrizeName={setEditPrizeName}
              editMaxWins={editMaxWins}
              setEditMaxWins={setEditMaxWins}
              editRedeemInfo={editRedeemInfo}
              setEditRedeemInfo={setEditRedeemInfo}
              handleEditPrize={handleEditPrize}
              handleDeletePrize={handleDeletePrize}
              setEditingPrizeId={setEditingPrizeId}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              vendors={vendors}
            />
          </div>
        </div>
        {event.type === "Single" && <WinnersList winners={winners} />}
        <RedeemPrizeModal
          isOpen={isRedeemModalOpen}
          onClose={() => setIsRedeemModalOpen(false)}
          redeemCode={redeemCode}
          setRedeemCode={setRedeemCode}
          redeemError={redeemError}
          handleRedeemPrize={handleRedeemPrize}
        />
        <QRCodePreviewModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          qrCodeDataUrl={qrCodeDataUrl}
          eventName={event.name}
          downloadPDF={downloadPDF}
        />
      </div>
    </div>
  );
}
