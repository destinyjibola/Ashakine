"use client";
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useParams } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";
import SpinWheel from "@/components/SpinWheel";
import VendorSection from "@/components/VendorSection";
import Leaderboard from "@/components/LeaderBoard";
import WonPrizeModal from "@/components/WonPrizeModal";
import RedeemModal from "@/components/RedeemModal";
import {
  PrizeData,
  Prize,
  WinnerData,
  WindowSize,
  Vendor,
  Event,
  Winner,
} from "@/types";
import EventHeaders from "@/components/EventHeaders";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const fakeSegments: PrizeData[] = [
  { option: "Oops!", segColor: "#444444", emoji: "😢" },
  { option: "Try Again", segColor: "#555555", emoji: "😞" },
  { option: "Come Back Later", segColor: "#666666", emoji: "😴" },
  { option: "Keep Trying", segColor: "#777777", emoji: "😅" },
  { option: "Just an Inch", segColor: "#888888", emoji: "😬" },
];

function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  return (
    "#" +
    Array.from({ length: 6 })
      .map(() => letters[Math.floor(Math.random() * 16)])
      .join("")
  );
}

function generateRandomCode(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 })
    .map(() => characters[Math.floor(Math.random() * characters.length)])
    .join("");
}

function shuffleArray(array: PrizeData[]): PrizeData[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function App() {
  const params = useParams();
  const eventId = params?.eventId as string;
  const [data, setData] = useState<PrizeData[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [event, setEvent] = useState<Event>();
  const [mustSpin, setMustSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
  const [wonPrize, setWonPrize] = useState<PrizeData | null>(null);
  const [winnerCode, setWinnerCode] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recentWinners, setRecentWinners] = useState<Winner[]>([]);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [appSound, setAppSound] = useState<HTMLAudioElement | null>(null);
  const [bSound, setBSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAppSound(new Audio("/audio/applause.mp3"));
      setBSound(new Audio("/audio/boo.mp3"));
    }
  }, []);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const eventResponse = await fetch(
          `${API_BASE_URL}/api/events/${eventId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!eventResponse.ok)
          throw new Error(`HTTP error! status: ${eventResponse.status}`);
        const eventData = await eventResponse.json();
        setEvent(eventData);

        if (eventData.vendors && Array.isArray(eventData.vendors)) {
          setVendors(eventData.vendors);
        }

        const prizeResponse = await fetch(
          `${API_BASE_URL}/api/spinwheel/${eventId}`
        );
        if (!prizeResponse.ok)
          throw new Error(`HTTP error! status: ${prizeResponse.status}`);
        const prizeData = await prizeResponse.json();

        if (!prizeData.prizes || !Array.isArray(prizeData.prizes)) {
          throw new Error("Invalid prizes data");
        }

        const realPrizes: PrizeData[] = prizeData.prizes.map((p: Prize) => ({
          _id: p._id,
          option: p.prize,
          segColor: getRandomColor(),
          emoji: "🎁",
          redeemInfo:
            p.redeemInfo ||
            "Please contact the event organizer to redeem your prize.",
        }));

        setData(shuffleArray([...realPrizes, ...fakeSegments]));

        const winnersResponse = await fetch(
          `${API_BASE_URL}/api/winners/${eventId}`
        );
        if (!winnersResponse.ok)
          throw new Error(`HTTP error! status: ${winnersResponse.status}`);
        const winnersData = await winnersResponse.json();
        setRecentWinners(
          winnersData.filter((winner: Winner) => winner.prizeId).slice(0, 5)
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        setData(fakeSegments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSpinClick = async () => {
    if (mustSpin || isLoading) return;

    setPrizeNumber(0);
    setWonPrize(null);
    setShowConfetti(false);
    setIsModalOpen(false);
    setIsRedeemModalOpen(false);
    setWinnerCode(null);

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    const selectedPrize = data[newPrizeNumber];

    try {
      // Always send a request to increment spinCount, with or without prizeId
      const response = await fetch(
        `${API_BASE_URL}/api/events/${event?._id}/check-and-record-prize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            fakeSegments.some((s) => s.option === selectedPrize.option)
              ? { prizeId: false } // No prizeId for false segments
              : { prizeId: selectedPrize._id }
          ),
        }
      );
      if (!response.ok) throw new Error("Failed to check and record prize");
      const result = await response.json();

      if (!fakeSegments.some((s) => s.option === selectedPrize.option)) {
        // Handle winning spins
        if (!result.available) {
          const loseIndex = data.findIndex((p) =>
            fakeSegments.some((s) => s.option === p.option)
          );
          setPrizeNumber(loseIndex);
          setWonPrize(data[loseIndex]);
        } else {
          const code = generateRandomCode();
          setWinnerCode(code);
          await fetch(`${API_BASE_URL}/api/winners`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              code,
              prizeId: selectedPrize._id,
              eventId,
            }),
          });
          setPrizeNumber(newPrizeNumber);
          setWonPrize(selectedPrize);
        }
      } else {
        // Handle non-winning spins
        setPrizeNumber(newPrizeNumber);
        setWonPrize(selectedPrize);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to record prize"
      );
      const loseIndex = data.findIndex((p) =>
        fakeSegments.some((s) => s.option === p.option)
      );
      setPrizeNumber(loseIndex);
      setWonPrize(data[loseIndex]);
    }

    setMustSpin(true);
  };

  // const handleSpinClick = async () => {
  //   if (mustSpin || isLoading) return;

  //   setPrizeNumber(0);
  //   setWonPrize(null);
  //   setShowConfetti(false);
  //   setIsModalOpen(false);
  //   setIsRedeemModalOpen(false);
  //   setWinnerCode(null);

  //   const newPrizeNumber = Math.floor(Math.random() * data.length);
  //   const selectedPrize = data[newPrizeNumber];

  //   if (!fakeSegments.some((s) => s.option === selectedPrize.option)) {
  //     try {
  //       const response = await fetch(
  //         `${API_BASE_URL}/api/events/${event?._id}/check-and-record-prize`,
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ prizeId: selectedPrize._id }),
  //         }
  //       );
  //       if (!response.ok) throw new Error("Failed to check and record prize");
  //       const result = await response.json();

  //       if (!result.available) {
  //         const loseIndex = data.findIndex((p) =>
  //           fakeSegments.some((s) => s.option === p.option)
  //         );
  //         setPrizeNumber(loseIndex);
  //         setWonPrize(data[loseIndex]);
  //       } else {
  //         const code = generateRandomCode();
  //         setWinnerCode(code);
  //         await fetch(`${API_BASE_URL}/api/winners`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             code,
  //             prizeId: selectedPrize._id,
  //             eventId,
  //           }),
  //         });
  //         setPrizeNumber(newPrizeNumber);
  //         setWonPrize(selectedPrize);
  //       }
  //     } catch (error) {
  //       setError(
  //         error instanceof Error ? error.message : "Failed to record prize"
  //       );
  //       const loseIndex = data.findIndex((p) =>
  //         fakeSegments.some((s) => s.option === p.option)
  //       );
  //       setPrizeNumber(loseIndex);
  //       setWonPrize(data[loseIndex]);
  //     }
  //   } else {
  //     setPrizeNumber(newPrizeNumber);
  //     setWonPrize(selectedPrize);
  //   }

  //   setMustSpin(true);
  // };

  const onStopSpinning = () => {
    setMustSpin(false);
    const prize = data[prizeNumber];
    setWonPrize(prize);
    if (!fakeSegments.some((fake) => fake.option === prize.option)) {
      setShowConfetti(true);
      appSound?.play();
      setIsRedeemModalOpen(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      bSound?.play();
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex bg-gray-100 flex-col items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
            <h2 className="text-white text-2xl font-bold">Loading...</h2>
            <p className="text-purple-200 mt-2">Preparing your chance to win</p>
          </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {error}
        </div>
      )}

      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
      </div>

      <EventHeaders event={event} />

      <ImageSlider />

      <div className="relative">
        <SpinWheel
          mustSpin={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={onStopSpinning}
          isLoading={isLoading}
        />

        <button
          onClick={handleSpinClick}
          disabled={mustSpin || isLoading}
          className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 flex justify-center items-center text-white text-xl font-bold w-[70px] h-[70px] rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
            mustSpin || isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg"
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-1">
              <svg
                className="animate-spin h-6 w-6 text-white"
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
              <span className="text-xs">Loading</span>
            </div>
          ) : mustSpin ? (
            <div className="flex flex-col items-center justify-center gap-1">
              <svg
                className="animate-spin h-6 w-6 text-white"
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
              <span className="text-xs">Spinning</span>
            </div>
          ) : (
            <span className="animate-pulse">SPIN</span>
          )}
        </button>
      </div>

      <VendorSection
        vendors={vendors}
        eventType={event?.type || ""}
        isLoading={isLoading}
        error={error}
      />

      <Leaderboard winners={recentWinners} vendors={vendors} />

      <WonPrizeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wonPrize={wonPrize}
        handleSpinClick={handleSpinClick}
        setIsRedeemModalOpen={setIsRedeemModalOpen}
      />

      <RedeemModal
        isOpen={isRedeemModalOpen}
        onClose={() => setIsRedeemModalOpen(false)}
        winnerCode={winnerCode}
        wonPrize={wonPrize}
        handleSpinClick={handleSpinClick}
      />
    </div>
  );
}

export default App;
