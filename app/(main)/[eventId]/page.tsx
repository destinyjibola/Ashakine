"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import React from "react";
import Confetti from "react-confetti";
import { useParams } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";
import SpinWheel from "@/components/SpinWheel";
import VendorSection from "@/components/VendorSection";
import Leaderboard from "@/components/LeaderBoard";
import WonPrizeModal from "@/components/WonPrizeModal";
import RedeemModal from "@/components/RedeemModal";
import EventHeaders from "@/components/EventHeaders";
import EventCountdown from "@/components/EventCountdown";
import ProductOffering from "@/components/ProductOffering";
import { PrizeData, Prize, Vendor, Event, Winner, WindowSize, Product } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const fakeSegments: PrizeData[] = [
  { option: "Oops!", segColor: "#444444", emoji: "😢" },
  { option: "Try Again", segColor: "#555555", emoji: "😞" },
  { option: "Come Back Later", segColor: "#666666", emoji: "😴" },
  { option: "Keep Trying", segColor: "#777777", emoji: "😅" },
  { option: "Just an Inch", segColor: "#888888", emoji: "😬" },
];

function getStableColor(id: string): string {
  const colors = ["#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1"];
  const index = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[index % colors.length];
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

function isEventActive(event: Event | null, currentTime: Date): boolean {
  if (!event) return false;
  if (event.isActive) return true;
  if (event.startTime && event.endTime) {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    return (
      currentTime.getTime() >= start.getTime() &&
      currentTime.getTime() <= end.getTime()
    );
  }
  return false;
}

const useEventData = (eventId: string) => {
  const [data, setData] = useState<PrizeData[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [recentWinners, setRecentWinners] = useState<Winner[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
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

        const prizeResponse = await fetch(
          `${API_BASE_URL}/api/spinwheel/${eventId}`
        );
        if (!prizeResponse.ok)
          throw new Error(`HTTP error! status: ${prizeResponse.status}`);
        const prizeData = await prizeResponse.json();

        const productResponse = await fetch(
          `${API_BASE_URL}/api/eventproduct/${eventId}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!productResponse.ok)
          throw new Error(`HTTP error! status: ${productResponse.status}`);
        const productData = await productResponse.json();

        if (!prizeData.prizes || !Array.isArray(prizeData.prizes)) {
          throw new Error("Invalid prizes data");
        }

        const realPrizes: PrizeData[] = prizeData.prizes.map((p: Prize) => ({
          _id: p._id,
          option: p.prize,
          segColor: getStableColor(p._id),
          emoji: "🎁",
          redeemInfo:
            p.redeemInfo ||
            "Please contact the event organizer to redeem your prize.",
        }));

        const winnersResponse = await fetch(
          `${API_BASE_URL}/api/winners/${eventId}`
        );
        if (!winnersResponse.ok)
          throw new Error(`HTTP error! status: ${winnersResponse.status}`);
        const winnersData = await winnersResponse.json();

        if (isMounted) {
          setEvent(eventData);
          setVendors(
            eventData.vendors && Array.isArray(eventData.vendors)
              ? eventData.vendors
              : []
          );
          setData(shuffleArray([...realPrizes, ...fakeSegments]));
          setRecentWinners(
            winnersData.filter((winner: Winner) => winner.prizeId).slice(0, 5)
          );
          setProducts(productData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load data");
          setData(fakeSegments);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchEventData();
    return () => {
      isMounted = false;
    };
  }, [eventId]);

  return { data, vendors, event, recentWinners, products, isLoading, error, setError };
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="text-center p-4 text-red-500 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="mb-4">{this.state.error.message}</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
            onClick={() => this.setState({ error: null })}
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const params = useParams();
  const eventId = typeof params?.eventId === "string" ? params.eventId : null;
  const { data, vendors, event, recentWinners, products, isLoading, error, setError } =
    useEventData(eventId || "");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [modals, setModals] = useState({ wonPrize: false, redeem: false });
  const [wonPrize, setWonPrize] = useState<PrizeData | null>(null);
  const [winnerCode, setWinnerCode] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [appSound, setAppSound] = useState<HTMLAudioElement | null>(null);
  const [bSound, setBSound] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Restore redeem modal state and timer from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("redeemModalState");
    if (savedState) {
      const { winnerCode: savedCode, wonPrize: savedPrize, hasCopied } = JSON.parse(savedState);
      if (savedCode && !hasCopied) {
        setWinnerCode(savedCode);
        setWonPrize(savedPrize);
        setModals((prev) => ({ ...prev, redeem: true }));
      }
    }

    const savedTimerState = localStorage.getItem(`spinTimerState_${eventId}`);
    if (savedTimerState) {
      const { timestamp, seconds } = JSON.parse(savedTimerState);
      const elapsed = Math.floor((Date.now() - timestamp) / 1000);
      const remainingSeconds = Math.max(0, seconds - elapsed);
      if (remainingSeconds > 0) {
        setTimerSeconds(remainingSeconds);
        setIsTimerActive(true);
      } else {
        localStorage.removeItem(`spinTimerState_${eventId}`);
      }
    }
  }, [eventId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio1 = new Audio("/audio/applause.mp3");
      const audio2 = new Audio("/audio/boo.mp3");
      setAppSound(audio1);
      setBSound(audio2);
      return () => {
        audio1.pause();
        audio2.pause();
      };
    }
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  // Timer logic with localStorage persistence
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            localStorage.removeItem(`spinTimerState_${eventId}`);
            return 0;
          }
          const newSeconds = prev - 1;
          localStorage.setItem(
            `spinTimerState_${eventId}`,
            JSON.stringify({ timestamp: Date.now(), seconds: newSeconds })
          );
          return newSeconds;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timerSeconds, eventId]);

  const memoizedData = useMemo(() => data, [data]);

  const playSound = useCallback((audio: HTMLAudioElement | null) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch((err) => console.error("Audio playback failed:", err));
    }
  }, []);

  const handleSpinClick = useCallback(async () => {
    if (
      mustSpin ||
      isLoading ||
      !eventId ||
      !isEventActive(event, currentTime) ||
      isTimerActive
    )
      return;

    setPrizeNumber(0);
    setWonPrize(null);
    setShowConfetti(false);
    setModals({ wonPrize: false, redeem: false });
    setWinnerCode(null);
    setIsTimerActive(true);
    setTimerSeconds(60); // Start 1-minute timer
    localStorage.setItem(
      `spinTimerState_${eventId}`,
      JSON.stringify({ timestamp: Date.now(), seconds: 60 })
    );

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    const selectedPrize = data[newPrizeNumber];

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/events/${event?._id}/check-and-record-prize`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            fakeSegments.some((s) => s.option === selectedPrize.option)
              ? { prizeId: false }
              : { prizeId: selectedPrize._id }
          ),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to check and record prize");
      }
      const result = await response.json();

      if (!fakeSegments.some((s) => s.option === selectedPrize.option)) {
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
        setPrizeNumber(newPrizeNumber);
        setWonPrize(selectedPrize);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to record prize");
      const loseIndex = data.findIndex((p) =>
        fakeSegments.some((s) => s.option === p.option)
      );
      setPrizeNumber(loseIndex);
      setWonPrize(data[loseIndex]);
    }

    setMustSpin(true);
  }, [mustSpin, isLoading, eventId, event, data, setError, currentTime, isTimerActive]);

  const onStopSpinning = useCallback(() => {
    setMustSpin(false);
    const prize = data[prizeNumber];
    setWonPrize(prize);
    if (!fakeSegments.some((fake) => fake.option === prize.option)) {
      setShowConfetti(true);
      playSound(appSound);
      setModals((prev) => ({ ...prev, redeem: true }));
      setTimeout(() => setShowConfetti(false), 5000); // Extended confetti duration
    } else {
      playSound(bSound);
      setModals((prev) => ({ ...prev, wonPrize: true }));
    }
  }, [data, prizeNumber, playSound, appSound, bSound]);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!eventId) {
    return <div className="text-red-500 text-center">Invalid event ID</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
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
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-40">
          {error}
        </div>
      )}

      <EventCountdown
        event={event}
        isLoading={isLoading}
        onCurrentTimeChange={setCurrentTime}
        onRefresh={handleRefresh}
      />

      <EventHeaders event={event} />

      <ImageSlider />

      <div className="text-center mb-4">
        <p className="text-lg font-semibold text-gray-700">Spin to Win Exciting Prizes!</p>
      </div>

      <div className="relative flex flex-col items-center">
        {isTimerActive && (
          <div className="mb-4 text-xl font-bold text-purple-600">
            Next spin in: {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
          </div>
        )}
        <div className="relative">
          <SpinWheel
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            data={memoizedData}
            onStopSpinning={onStopSpinning}
            isLoading={isLoading}
          />

          <button
            onClick={handleSpinClick}
            disabled={mustSpin || isLoading || !isEventActive(event, currentTime) || isTimerActive}
            aria-label={
              isLoading
                ? "Loading"
                : mustSpin
                ? "Spinning"
                : isTimerActive
                ? "Waiting for timer"
                : !isEventActive(event, currentTime)
                ? "Spin wheel inactive"
                : "Spin the wheel"
            }
            className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-4 flex justify-center items-center text-white text-xl font-bold w-[70px] h-[70px] rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
              mustSpin || isLoading || !isEventActive(event, currentTime) || isTimerActive
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
      </div>

      <VendorSection
        vendors={vendors}
        eventType={event?.type || ""}
        isLoading={isLoading}
        error={error}
      />

      <ProductOffering
        products={products}
        isLoading={isLoading}
        error={error}
      />

      <Leaderboard winners={recentWinners} vendors={vendors} />

      <WonPrizeModal
        isOpen={modals.wonPrize}
        onClose={() => setModals((prev) => ({ ...prev, wonPrize: false }))}
        wonPrize={wonPrize}
        handleSpinClick={handleSpinClick}
      />

      <RedeemModal
        isOpen={modals.redeem}
        onClose={() => setModals((prev) => ({ ...prev, redeem: false }))}
        winnerCode={winnerCode}
        wonPrize={wonPrize}
        handleSpinClick={handleSpinClick}
      />
    </div>
  );
}

function WrappedApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

export default WrappedApp;