document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const avatar = document.getElementById("avatar");
  const audioEl = document.getElementById("audio");
  const inputEl = document.getElementById("input");

  const backendURL = "http://127.0.0.1:8000"; // change if different

  // ------- Text chat (sendMessage) -------
  async function sendMessage() {
    try {
      const msg = inputEl.value.trim();
      if (!msg) return;

      const res = await fetch(`${backendURL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "u001", message: msg })
      });

      if (!res.ok) throw new Error(`Server ${res.status}`);
      const data = await res.json();

      console.log("AI:", data.answer);
      // audio_url expected in response from /ask
      if (data.audio_url) {
        await playAvatarVoice(data.audio_url);
      }
    } catch (err) {
      console.error("sendMessage error:", err);
    }
  }

  // Expose button handler if needed
  window.sendMessage = sendMessage;

  // ------- Recording (live speech) -------
  let mediaRecorder;
  let audioChunks = [];
  let isRecording = false;

async function startRecording() {
    console.log("Start clicked");
    audioChunks = [];
    isRecording = true;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => {
        console.log("Chunk collected:", e.data.size);
        audioChunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
        console.log("Stopped, processing audio...");

        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        console.log("Blob:", audioBlob);

        await sendAudioToBackend(audioBlob);
    };

    mediaRecorder.start();
    console.log("Recording started:", mediaRecorder.state);
}

function stopRecording() {
    console.log("Stop clicked");
    if (!isRecording) return;
    isRecording = false;
    mediaRecorder.stop();
}
// 🎯 THE IMPORTANT PART
window.startRecording = startRecording;
window.stopRecording = stopRecording;
window.sendMessage = sendMessage;   // if needed


  // ------- Send audio Blob to backend --------
  async function sendAudioToBackend(audioBlob) {
    try {
      const formData = new FormData();
      formData.append("user_id", "u001"); // ⛳⛳⛳⛳
      // filename extension .webm keeps browser encoding consistent
      formData.append("audio", audioBlob, "voice.webm");
      const res = await fetch(`${backendURL}/speech_ask`, { //⛳⛳
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server ${res.status}: ${text}`);
      }

      const data = await res.json();
      console.log("Transcript:", data.transcript);
      console.log("Answer:", data.answer);
      console.log("Audio URL:", data.audio_url);

      if (data.audio_url) await playAvatarVoice(data.audio_url);
    } catch (err) {
      console.error("sendAudioToBackend error:", err);
      alert("Error sending audio. Check backend logs.");
    }
  }

  // ------- Play audio and animate avatar -------
  async function playAvatarVoice(url) {
    try {
        avatar.classList.add("speaking");
        audioEl.src = url;
        audioEl.crossOrigin = "anonymous";
        audioEl.load();

        console.log("Audio URL set to:", url);

        audioEl.oncanplaythrough = () => {
            console.log("Audio CAN play. Ready for playback...");
        };

        audioEl.onerror = (e) => {
            console.error("Audio ERROR:", e, "src:", audioEl.src);
        };

        audioEl.volume = 1.0;
        audioEl.muted = false;

        audioEl.play()
            .then(() => console.log("Playback started"))
            .catch(err => {
                console.warn("Autoplay blocked:", err);
                alert("Tap the audio player to hear the response.");
            });

        audioEl.onended = () => avatar.classList.remove("speaking");
        audioEl.onpause = () => avatar.classList.remove("speaking");
        audioEl.onplay = () => avatar.classList.add("speaking");

    } catch (err) {
        avatar.classList.remove("speaking");
        console.error("playAvatarVoice error:", err);
    }
}

    // Make functions available for buttons in HTML
    window.playAvatarVoice = playAvatarVoice;
    window.startRecording = startRecording;
    window.stopRecording = stopRecording;
    window.sendMessage = sendMessage;
    window.sendAudioToBackend = sendAudioToBackend;
    window.playAvatarVoice = playAvatarVoice;

});
