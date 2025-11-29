import React, { useState, useRef, useEffect } from "react";

const AskDidi = () => {
  // --- State Management ---
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // NEW: State to store the last audio URL for replay
  const [lastAudioUrl, setLastAudioUrl] = useState(null);

  // --- Refs for non-rendering variables ---
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const currentAudioRef = useRef(null);

  const backendURL = "http://127.0.0.1:8001";

  // --- Cleanup on unmount ---
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
    };
  }, []);

  // --- Logic: Text Message ---
  const sendMessage = async () => {
    try {
      const msg = inputText.trim();
      if (!msg) return;

      // Note: You had a small bug here in previous code (body: formData), 
      // I fixed it to send JSON for text chat as per standard fetch
      const res = await fetch(`${backendURL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "u001", message: msg }),
      });

      const data = await res.json();
      console.log("AI:", data.answer);

      if (data.audio_url) {
        setLastAudioUrl(data.audio_url); // Store for replay
        playAvatarVoice(data.audio_url);
      }
    } catch (e) {
      console.error("sendMessage error:", e);
    }
  };

  // --- Logic: Audio Recording ---
  const startRecording = async () => {
    audioChunksRef.current = [];
    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        await sendAudioToBackend(audioBlob);
      };

      mediaRecorder.start();
      console.log("Recording Started");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (!isRecording || !mediaRecorderRef.current) return;

    setIsRecording(false);
    console.log("Stop clicked");

    mediaRecorderRef.current.stop();
    // Stop all tracks to release microphone
    mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
  };

  // --- Logic: Send Audio to Backend ---
  const sendAudioToBackend = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append("user_id", "u001");
      formData.append("audio", audioBlob, "voice.webm");

      console.log("Sending audio...");

      const res = await fetch(`${backendURL}/speech_ask`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      console.log("Transcript:", data.transcript);
      console.log("Answer:", data.answer);

      if (data.audio_url) {
        setLastAudioUrl(data.audio_url); // Store for replay
        playAvatarVoice(data.audio_url);
      }
    } catch (err) {
      console.error("sendAudioToBackend error:", err);
    }
  };

  // --- Logic: Replay Last Audio ---
  const handleReplay = () => {
    if (lastAudioUrl) {
      console.log("Replaying:", lastAudioUrl);
      playAvatarVoice(lastAudioUrl);
    }
  };

  // --- Logic: Play Audio & Animate ---
  const playAvatarVoice = (url) => {
    try {
      // Stop previous audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      setIsSpeaking(false);

      // Add timestamp to prevent caching
      const finalUrl = `${url}?t=${Date.now()}`;
      console.log("Playing:", finalUrl);

      const audio = new Audio(finalUrl);
      currentAudioRef.current = audio;

      audio.crossOrigin = "anonymous";
      audio.playbackRate = 1.25;
      audio.preload = "auto";
      audio.volume = 1.0;

      audio.addEventListener("loadeddata", () => {
        setIsSpeaking(true);
        audio.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
          alert("Tap the screen once to enable audio.");
        });
      });

      audio.addEventListener("ended", () => {
        setIsSpeaking(false);
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        setIsSpeaking(false);
      });
    } catch (err) {
      console.error("playAvatarVoice error:", err);
      setIsSpeaking(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e0f7fa] to-[#b2ebf2] flex flex-col items-center justify-center p-5 font-sans text-[#263238] mt-6">
      <style>{`
        @keyframes custom-pulse {
          from {
            transform: scale(1.0);
            box-shadow: 0 0 10px 5px rgba(0, 188, 212, 0.6);
          }
          to {
            transform: scale(1.03);
            box-shadow: 0 0 25px 10px rgba(0, 188, 212, 0.9);
          }
        }
        .speaking-animation {
          border-color: #00e5ff;
          box-shadow: 0 0 20px rgba(0, 229, 255, 0.8);
          animation: custom-pulse 1.5s infinite alternate;
        }
      `}</style>

      {/* Avatar Container */}
      <div className="relative mb-[30px]">
        <img
          src="avatar.png"
          alt="AI Avatar"
          className={`w-40 h-40 rounded-full border-[6px] border-[#00bcd4] shadow-xl transition-all duration-400 ease-in-out object-cover ${
            isSpeaking ? "speaking-animation" : ""
          }`}
        />
      </div>

      {/* Chat Box */}
      {/* <div className="w-[90%] max-w-[450px] mb-5 p-5 bg-white rounded-xl shadow-2xl text-center">
        <h3 className="text-[#00796b] mt-0 font-semibold text-xl mb-4">
          Text Chat
        </h3>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message here..."
          className="w-full p-3 mb-4 border border-[#cfd8dc] rounded-lg resize-none min-h-20 text-base transition-colors focus:outline-none focus:border-[#00bcd4]"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="w-full py-3 px-5 m-1 border-none rounded-full cursor-pointer text-base font-bold tracking-[0.5px] uppercase transition-transform duration-200 bg-[#43a047] text-white hover:bg-[#388e3c] active:scale-95"
        >
          💬 Send Message
        </button>
      </div> */}

      {/* Voice Controls */}
      <div className="w-[90%] max-w-[450px] mb-5 p-5 bg-white rounded-xl shadow-2xl text-center flex flex-col items-center">
        <h3 className="text-[#00796b] mt-0 font-semibold text-xl mb-4">
          Voice Input
        </h3>

        <button
          type="button"
          onClick={startRecording}
          disabled={isRecording}
          className={`w-[90%] py-3 px-5 my-2 border-none rounded-full cursor-pointer text-base font-bold tracking-[0.5px] uppercase transition-transform duration-200 text-[#333] ${
            isRecording
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#ff9800] hover:bg-[#fb8c00] active:scale-95"
          }`}
        >
          🎤 Start Speaking
        </button>

        <button
          type="button"
          onClick={stopRecording}
          disabled={!isRecording}
          className={`w-[90%] py-3 px-5 my-2 border-none rounded-full cursor-pointer text-base font-bold tracking-[0.5px] uppercase transition-transform duration-200 text-white ${
            !isRecording
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#e53935] hover:bg-[#c62828] active:scale-95"
          }`}
        >
          ⏹ Stop Recording
        </button>

        {/* NEW: Replay Button */}
        <button
          type="button"
          onClick={handleReplay}
          disabled={!lastAudioUrl || isRecording}
          className={`w-[90%] py-3 px-5 my-2 border-none rounded-full cursor-pointer text-base font-bold tracking-[0.5px] uppercase transition-transform duration-200 text-white ${
            !lastAudioUrl || isRecording
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#0288d1] hover:bg-[#0277bd] active:scale-95"
          }`}
        >
          🔊 Replay Last Answer
        </button>
      </div>
    </div>
  );
};

export default AskDidi;

