"use client";
import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import Modal from "../../../components/Modal";
import Confetti from "react-confetti";
import { useParams } from "next/navigation";
import hero from "../../../assets/images/heroimage.jpg";
import Image from "next/image";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface PrizeData {
  _id?: string;
  option: string;
  segColor: string;
  emoji: string;
  redeemInfo?: string;
}

interface Prize {
  _id: string;
  prize: string;
  redeemInfo?: string;
}

interface WinnerData {
  code: string;
  prizeId: string;
  eventId: string;
}

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

interface WindowSize {
  width: number;
  height: number;
}

interface ImageItem {
  src: any;
  alt: string;
}

const images: ImageItem[] = [
  { src: hero, alt: "Image 1" },
  { src: hero, alt: "Image 2" },
  { src: hero, alt: "Image 3" },
  // Add more images as needed
];

function App() {
  const params = useParams();
  const eventId = params?.eventId as string;
  const [data, setData] = useState<PrizeData[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [wonPrize, setWonPrize] = useState<PrizeData | null>(null);
  const [winnerCode, setWinnerCode] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [ticTicSound, setTicTicSound] = useState<HTMLAudioElement | null>(null);
  const [appSound, setAppSound] = useState<HTMLAudioElement | null>(null);
  const [bSound, setBSound] = useState<HTMLAudioElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTicTicSound(new Audio("/audio/spin-wheel-sound.mp3"));
      setAppSound(new Audio("/audio/applause.mp3"));
      setBSound(new Audio("/audio/boo.mp3"));
    }
  }, []);

  useEffect(() => {
    const fetchPrizes = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/events/${eventId}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const eventData = await response.json();

        if (!eventData.prizes || !Array.isArray(eventData.prizes)) {
          throw new Error("Invalid prizes data");
        }

        const realPrizes: PrizeData[] = eventData.prizes.map((p: Prize) => ({
          _id: p._id,
          option: p.prize,
          segColor: getRandomColor(),
          emoji: "🎁",
          redeemInfo:
            p.redeemInfo ||
            "Please contact the event organizer to redeem your prize.",
        }));

        setData(shuffleArray([...realPrizes, ...fakeSegments]));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load prizes");
        setData(fakeSegments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrizes();
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

    ticTicSound?.play();

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    const selectedPrize = data[newPrizeNumber];

    if (!fakeSegments.some((s) => s.option === selectedPrize.option)) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/events/${eventId}/check-and-record-prize`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prizeId: selectedPrize._id }),
          }
        );
        if (!response.ok) throw new Error("Failed to check and record prize");
        const result = await response.json();

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
    } else {
      setPrizeNumber(newPrizeNumber);
      setWonPrize(selectedPrize);
    }

    setMustSpin(true);
  };

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
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-4 relative overflow-hidden">
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
            <h2 className="text-white text-2xl font-bold">Loading Prizes...</h2>
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

      <div className="w-full mb-[3rem]">
        {/* Mobile: Carousel */}
        <div className="lg:hidden w-full h-[10rem] relative overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full"
                width={1000}
                height={500}
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Desktop: Three-column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="w-full h-[10rem] relative">
              <Image
                src={image.src}
                alt={image.alt}
                className="h-full w-full"
                width={1000}
                height={500}
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mb-12">
        <div className="absolute -inset-4 bg-purple-600 rounded-full blur-lg opacity-70 animate-pulse"></div>
        <div className="relative">
          {!isLoading && (
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              outerBorderColor="#ffffff"
              outerBorderWidth={10}
              innerBorderColor="#302e2e"
              radiusLineColor="#ffffff"
              radiusLineWidth={2}
              fontSize={14}
              textColors={["#ffffff"]}
              backgroundColors={data.map((item) => item.segColor)}
              onStopSpinning={onStopSpinning}
              spinDuration={0.6}
              perpendicularText={false}
            />
          )}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-yellow-400">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-600 absolute -top-12"></div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSpinClick}
        disabled={mustSpin || isLoading}
        className={`relative z-10 px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
          mustSpin || isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg"
        }`}
      >
        {isLoading ? (
          "Loading..."
        ) : mustSpin ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            Spinning...
          </span>
        ) : (
          "SPIN TO WIN!"
        )}
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center p-6 md:p-10">
          {wonPrize &&
          fakeSegments.some((fake) => fake.option === wonPrize.option) ? (
            <div className="space-y-6">
              <div className="text-7xl mb-4">😢</div>
              <h2 className="text-3xl font-bold text-red-500 mb-2">Oh no!</h2>
              <div
                className="text-4xl font-extrabold mb-6"
                style={{ color: wonPrize.segColor }}
              >
                {wonPrize.option}
              </div>
              <p className="text-xl text-gray-600 mb-6">
                Do not worry, you can try again!
              </p>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setTimeout(handleSpinClick, 300);
                }}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Spin Again
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-7xl mb-4 animate-bounce">
                {wonPrize?.emoji}
              </div>
              <h2 className="text-3xl font-bold text-purple-600 mb-2">
                Congratulations! 🎉
              </h2>
              <div
                className="text-4xl font-extrabold mb-6 animate-pulse"
                style={{ color: wonPrize?.segColor }}
              >
                {wonPrize?.option}
              </div>
              <p className="text-xl text-gray-600 mb-6">
                You have won an amazing prize!
              </p>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsRedeemModalOpen(true);
                }}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full font-bold hover:from-green-600 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Redeem Prize
              </button>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isRedeemModalOpen}
        onClose={() => setIsRedeemModalOpen(false)}
      >
        <div className="text-center p-6 md:p-10">
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            Your Prize!
          </h2>
          {winnerCode && (
            <div className="text-2xl font-mono bg-gray-100 p-3 rounded-md mb-6">
              {winnerCode}
            </div>
          )}
          <h3 className="text-xl font-semibold mb-2">{wonPrize?.option}</h3>
          <p className="text-gray-600 mb-6">{wonPrize?.redeemInfo}</p>
          <button
            onClick={() => {
              setIsRedeemModalOpen(false);
              setTimeout(handleSpinClick, 300);
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Spin Again
          </button>
        </div>
      </Modal>

      {!isLoading && !error && (
        <div className="mt-12 text-purple-200 text-sm z-10">
          <p>Spin the wheel for a chance to win incredible prizes!</p>
        </div>
      )}
    </div>
  );
}

export default App;
