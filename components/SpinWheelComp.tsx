import { useEffect, useMemo, useState } from "react";

// import tickingSound from "../public/audio/spin-wheel-sound.mp3";
const tickingSound = "/audio/spin-wheel-sound.mp3";


import { ISpinWheelProps } from "./SpinWheel.interface";
const ticTicSound: HTMLAudioElement | null =
  typeof window !== "undefined" ? new Audio(tickingSound) : new Audio();

export const SpinWheel: React.FC<ISpinWheelProps> = ({
  segments,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  buttonText = "Spin",
  isOnlyOnce = true,
  size = 290,
  upDuration = 1000,
  downDuration = 500,
  fontFamily = "Arial",
  arrowLocation = "center",
  showTextOnSpin = false,
  isSpinSound = true,
}: ISpinWheelProps) => {
  // Separate arrays without nullish values
  const segmentTextArray = segments
    .map((segment) => segment.segmentText)
    .filter(Boolean);

  const segColorArray = segments
    .map((segment) => segment.segColor)
    .filter(Boolean);

  const [isFinished, setFinished] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [needleText, setNeedleText] = useState<string>("");

  let currentSegment = "";
  let timerHandle: any = 0;
  const timerDelay = segmentTextArray.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  let canvasContext: any = null;
  let maxSpeed = Math.PI / segmentTextArray.length;
  const upTime = segmentTextArray.length * upDuration;
  const downTime = segmentTextArray.length * downDuration;
  let spinStart = 0;
  let frames = 0;
  const centerX = size;
  const centerY = size;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wheelInit = () => {
    initCanvas();

    // Set default angle to point needle to segment index 2 (3rd segment)
    // const defaultIndex = 9; // segment 3 if 0-based
    // const totalSegments = segmentTextArray.length;
    // const anglePerSegment = (2 * Math.PI) / totalSegments;

    // Angle so the needle (which adds Math.PI/2) ends up pointing to index 2
    // angleCurrent =
    // (totalSegments - defaultIndex - 1) * anglePerSegment - Math.PI / 2;

    // Ensure angleCurrent stays within 0 to 2π
    // angleCurrent = ((angleCurrent + 2 * Math.PI) % (2 * Math.PI));

    wheelDraw(); // draw with the adjusted angle
  };

  const initCanvas = () => {
    let canvas: HTMLCanvasElement | null = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;

    if (!canvas) {
      // Create a new canvas if it doesn't exist
      canvas = document.createElement("canvas");
      // Set the canvas dimensions to be square based on the size prop
      canvas.setAttribute("width", `${size * 2}`);
      canvas.setAttribute("height", `${size * 2}`);
      canvas.setAttribute("id", "canvas");
      document?.getElementById("wheel")?.appendChild(canvas);
    }

    // Make the canvas responsive
    canvas.style.width = "100%";
    canvas.style.maxWidth = `${size * 2}px`; // Maximum size based on the original size
    canvas.style.height = "auto"; // Maintain aspect ratio
    canvas.style.aspectRatio = "1/1"; // Ensure it remains square

    canvasContext = canvas.getContext("2d");
    canvas.style.borderRadius = "50%"; // Set border radius for a circular shape
    canvas?.addEventListener("click", spin, false);
  };

  const spin = () => {
    setIsStarted(true);
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI / segmentTextArray.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay * 5);
    }
  };

  const getSegmentAngleRange = (segmentIndex: number) => {
    const totalSegments = segmentTextArray.length;
    const anglePerSegment = (2 * Math.PI) / totalSegments;

    const startAngle =
      (2 * Math.PI -
        (segmentIndex + 1) * anglePerSegment -
        Math.PI / 2 +
        2 * Math.PI) %
      (2 * Math.PI);

    const endAngle = (startAngle + anglePerSegment) % (2 * Math.PI);

    return { startAngle, endAngle };
  };

  const onTimerTick = () => {
    /////

    const { startAngle, endAngle } = getSegmentAngleRange(4); // For segment 4

    ///
    frames++;
    wheelDraw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      progress = duration / downTime;

      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      // if (progress >= 1) finished = true;
      const normalizedAngle = (angleCurrent + 2 * Math.PI) % (2 * Math.PI);

      // Handle wrap-around case
      const isBetween =
        startAngle < endAngle
          ? normalizedAngle >= startAngle && normalizedAngle <= endAngle
          : normalizedAngle >= startAngle || normalizedAngle <= endAngle;

          if (isBetween) {
            // const centerAngle =
            //   (startAngle + ((endAngle - startAngle + 2 * Math.PI) % (2 * Math.PI)) / 2) % (2 * Math.PI);
          
            angleCurrent = startAngle; // 💥 Snap to center
            // angleDelta = 0;             // Stop rotation
            progress = 0;
            finished = true;
          
            // console.log("🎯 AngleCurrent is within target segment range:", {
            //   angleCurrent: angleCurrent.toFixed(4),
            //   startAngle: startAngle.toFixed(4),
            //   endAngle: endAngle.toFixed(4),
            //   centerAngle: centerAngle.toFixed(4),
            // });
          }
          
    }
    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      console.log("finished");
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
      ticTicSound.pause(); // Pause tic-tic sound when the wheel stops spinning
      ticTicSound.currentTime = 0; // Reset the tic-tic sound to the beginning
    }
  };

  useMemo(() => {
    ticTicSound.currentTime = 0;
    if (needleText && isSpinSound && isStarted) {
      ticTicSound.play();
    } else {
      ticTicSound.pause(); // Pause tic-tic sound when the wheel stops spinning
      ticTicSound.currentTime = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needleText, isSpinSound]);

  const wheelDraw = () => {
    clear();
    drawWheel();
    drawNeedle();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext;
    const value = segmentTextArray[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColorArray[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segmentTextArray.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, PI2, false);
    ctx.closePath();
    ctx.fillStyle = primaryColor;
    ctx.lineWidth = 2;
    ctx.strokeStyle = contrastColor;
    ctx.fill();
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillStyle = contrastColor;
    ctx.textAlign = "center";
    ctx.fillText(buttonText, centerX, centerY + 3);
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 4;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const drawNeedle = () => {
    const ctx = canvasContext;
    ctx.lineWidth = 1;
    ctx.strokeStyle = contrastColor;
    ctx.fileStyle = contrastColor;
    ctx.beginPath();

    if (arrowLocation === "top") {
      ctx.moveTo(centerX + 20, centerY / 15);
      ctx.lineTo(centerX - 20, centerY / 15);
      ctx.lineTo(centerX, centerY - centerY / 1.35);
    } else {
      ctx.moveTo(centerX + 20, centerY - 30);
      ctx.lineTo(centerX - 20, centerY - 30);
      ctx.lineTo(centerX, centerY - centerY / 2.5);
    }

    ctx.closePath();
    ctx.fill();
    const change = angleCurrent + Math.PI / 2;
    let i =
      segmentTextArray.length -
      Math.floor((change / (Math.PI * 2)) * segmentTextArray.length) -
      1;
    if (i < 0) i = i + segmentTextArray.length;
    else if (i >= segmentTextArray.length) i = i - segmentTextArray.length;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = primaryColor;
    ctx.font = "bold 1.5em " + fontFamily;
    currentSegment = segmentTextArray[i];
    setNeedleText(segmentTextArray[i]);
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, size, size);
  };

  return (
    <div
      id="wheel"
      style={{ width: "100%", maxWidth: `${size * 2}px`, margin: "0 auto" }}
    >
      <canvas
        id="canvas"
        width={size * 2}
        height={size * 2}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
          width: "100%",
          height: "auto",
          aspectRatio: "1/1",
        }}
      />
      {showTextOnSpin && isStarted && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontWeight: "bold",
            fontSize: "1.5em",
            fontFamily: fontFamily,
          }}
        >
          {needleText}
        </div>
      )}
    </div>
  );
};
