"use client";
import { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import Modal from "../../../components/Modal";
import Confetti from "react-confetti";

const tickingSound = "/audio/spin-wheel-sound.mp3";
const applaudSound = "/audio/applause.mp3";
const booSound = "/audio/boo.mp3";

const ticTicSound: HTMLAudioElement | null =
  typeof window !== "undefined" ? new Audio(tickingSound) : null;


const appSound: HTMLAudioElement | null =
  typeof window !== "undefined" ? new Audio(applaudSound) : null;

const bSound: HTMLAudioElement | null =
  typeof window !== "undefined" ? new Audio(booSound) : null;

interface PrizeData {
  option: string;
  segColor: string;
  emoji: string;
}

const data: PrizeData[] = [
  { option: "iPhone 15 Pro", segColor: "#0071e3", emoji: "📱" },
  { option: '75" Smart TV', segColor: "#4b0082", emoji: "📺" },
  { option: "Tesla Model 3", segColor: "#e82127", emoji: "🚗" },
  { option: "Dream House", segColor: "#ff8c00", emoji: "🏠" },
  { option: "MacBook Pro", segColor: "#999999", emoji: "💻" },
  { option: "Better luck next time!", segColor: "#333333", emoji: "😢" },
  { option: "$10,000 Cash", segColor: "#ffd700", emoji: "💰" },
  { option: "World Cruise", segColor: "#1e90ff", emoji: "🛳️" },
  { option: "Luxury Watch", segColor: "#b8860b", emoji: "⌚" },
  { option: "Trip to Maldives", segColor: "#00bfff", emoji: "🏝️" },
  { option: "Opps, Almost!", segColor: "#a9a9a9", emoji: "😅" },
  { option: "Shopping Spree", segColor: "#ff69b4", emoji: "🛍️" },
  { option: "Gourmet Dinner", segColor: "#8b0000", emoji: "🍽️" },
];

interface WindowSize {
  width: number;
  height: number;
}

function App() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wonPrize, setWonPrize] = useState<PrizeData | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSpinClick = () => {
    if (mustSpin) return;
    // ticTicSound?.play();

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setIsModalOpen(false);
    setShowConfetti(false);
  };
  const onStopSpinning = () => {
    setMustSpin(false);
    const prize = data[prizeNumber];
    setWonPrize(prize);
    setIsModalOpen(true);

    if (!prize.option.toLowerCase().includes("better luck")) {
      setShowConfetti(true);
      appSound?.play(); // Play applause sound on win
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      bSound?.play(); // Play boo sound on loss
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-800 p-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
      </div>

      <div className="relative z-10 mb-12">
        <div className="absolute -inset-4 bg-purple-600 rounded-full blur-lg opacity-70 animate-pulse"></div>
        <div className="relative">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor={"#ffffff"}
            outerBorderWidth={10}
            innerBorderColor={"#302e2e"}
            radiusLineColor={"#ffffff"}
            radiusLineWidth={2}
            fontSize={14}
            textColors={["#ffffff"]}
            backgroundColors={[
              "#FF5733",
              "#33FF57",
              "#3357FF",
              "#F3FF33",
              "#FF33F3",
              "#33FFF3",
              "#FF8C33",
              "#8C33FF",
              "#33FF8C",
              "#FF338C",
              "#8CFF33",
              "#338CFF",
              "#FF5733",
            ]}
            onStopSpinning={onStopSpinning}
            spinDuration={0.6}
            perpendicularText={false}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-yellow-400">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-600 absolute -top-12"></div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSpinClick}
        disabled={mustSpin}
        className={`relative z-10 px-8 py-4 text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 ${
          mustSpin
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg"
        }`}
      >
        {mustSpin ? (
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
          {wonPrize?.option.toLowerCase().includes("better luck") ? (
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
                Dont worry, you can try again!
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
                Youve won an amazing prize!
              </p>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold hover:from-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Claim Your Prize
              </button>
            </div>
          )}
        </div>
      </Modal>

      <div className="mt-12 text-purple-200 text-sm z-10">
        <p>Spin the wheel for a chance to win incredible prizes!</p>
      </div>
    </div>
  );
}

export default App;
