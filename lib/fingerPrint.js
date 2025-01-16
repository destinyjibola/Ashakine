// Helper function to hash a string
function hashString(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return hash.toString();
  }
  
  // Detect available fonts
  function detectFonts() {
    const testString = "mmmmmmmmmmlli";
    const testSize = "72px";
    const testFont = "monospace";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.font = `${testSize} ${testFont}`;
    const defaultWidth = ctx.measureText(testString).width;
    const defaultHeight = ctx.measureText(testString).height;
  
    const fonts = ["Arial", "Verdana", "Times New Roman", "Courier New", "Comic Sans MS"];
    const detectedFonts = [];
  
    fonts.forEach((font) => {
      ctx.font = `${testSize} ${font}, ${testFont}`;
      const width = ctx.measureText(testString).width;
      const height = ctx.measureText(testString).height;
      if (width !== defaultWidth || height !== defaultHeight) {
        detectedFonts.push(font);
      }
    });
  
    return detectedFonts.sort().join(","); // Sort fonts for stability
  }
  
  // Detect if the device supports touch
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  
  // Generate an audio fingerprint
  async function audioFingerprint() {
    const context = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100 * 1, 44100);
  
    const oscillator = context.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.value = 440;
  
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-50, context.currentTime);
    compressor.knee.setValueAtTime(40, context.currentTime);
    compressor.ratio.setValueAtTime(12, context.currentTime);
    compressor.attack.setValueAtTime(0, context.currentTime);
    compressor.release.setValueAtTime(0.25, context.currentTime);
  
    oscillator.connect(compressor);
    compressor.connect(context.destination);
  
    oscillator.start(0);
    const renderedBuffer = await context.startRendering();
  
    const channelData = renderedBuffer.getChannelData(0);
    const fingerprint = Array.from(channelData)
      .slice(0, 50)
      .reduce((acc, val) => acc + Math.abs(val), 0);
  
    return Math.round(fingerprint).toString(); // Round to make it stable
  }
  
  // Detect media devices
  async function detectMediaDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.map((device) => `${device.kind}:${device.label}`).sort().join(","); // Sort for stability
  }
  
  // Generate the enhanced fingerprint
  async function generateEnhancedFingerprint() {
    const userAgent = navigator.userAgent || "";
    const screenResolution = `${screen.width}x${screen.height}`;
    const devicePixelRatio = window.devicePixelRatio.toFixed(2) || "1.00"; // Round to make stable
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
    const language = navigator.language || navigator.userLanguage || "unknown";
    const platform = navigator.platform || "unknown";
    const isTouch = isTouchDevice ? "touch" : "no-touch";
  
    const fonts = detectFonts();
    const audioHash = await audioFingerprint();
    const mediaDevices = await detectMediaDevices();
  
    const rawData = [
      userAgent.trim(),
      screenResolution.trim(),
      devicePixelRatio,
      timezone.trim(),
      language.trim(),
      platform.trim(),
      isTouch,
      fonts,
      audioHash,
      mediaDevices,
    ].join("|");
  
    return hashString(rawData); // Hash the fingerprint data for uniqueness
  }
  

  // Export the function
  export default generateEnhancedFingerprint;
  