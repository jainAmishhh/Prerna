import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Send,
  Volume2,
  Sparkles,
  BookOpen,
  Stethoscope,
  GraduationCap,
  ShieldAlert,
  Heart,
  Briefcase,
  Calendar,
  Phone,
  AlertCircle,
  Video,
  MessageCircle,
  FileText,
  RotateCcw
} from "lucide-react";

import SakhiHeader from "./SakhiHeader";
import ChatWindow from "./ChatWindow";
import ChatQuickActions from "./ChatQuickActions";
import ChatInput from "./ChatInput";

const initialMessage = {
  type: "bot",
  text: "Namaste! 🙏 I'm Sakhi, your personal AI guide. I'm here to help you with schemes, health, career, safety, and everything else. You can type or speak to me in Hindi or English!",
  timestamp: new Date(),
};

// Quick action shortcuts
const quickActionsData = [
  { icon: <BookOpen className="w-4 h-4" />, text: "Explain this scheme", category: "schemes" },
  { icon: <Calendar className="w-4 h-4" />, text: "Track my period", category: "health" },
  { icon: <Briefcase className="w-4 h-4" />, text: "Give me a job tip", category: "career" },
  { icon: <ShieldAlert className="w-4 h-4" />, text: "Tell me my rights", category: "legal" },
  { icon: <Stethoscope className="w-4 h-4" />, text: "Pregnancy guidance", category: "health" },
];

// REAL BACKEND API CALL
const fetchSakhiResponse = async (query) => {
  try {
    const res = await fetch(
      `http://localhost:8000/sakhi?query=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    if (data.status === "success") {
      return data.reply;
    } else {
      return "Sorry, something went wrong.";
    }
  } catch (error) {
    console.error(error);
    return "Error connecting to server.";
  }
};

const Sakhi = () => {
  const [messages, setMessages] = useState([initialMessage]);
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    if (window.confirm("Start a new chat?")) {
      setMessages([initialMessage]);
      setInputText("");
      setIsRecording(false);
      setIsProcessing(false);
    }
  };

  // UPDATED WITH REAL API
  const handleSendMessage = async (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMessage = {
      type: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsProcessing(true);

    // REAL GEMINI RESPONSE
    const reply = await fetchSakhiResponse(textToSend);

    const botMessage = {
      type: "bot",
      text: reply,
      timestamp: new Date(),
      hasVideo: false, // if you add video later from backend
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsProcessing(false);
  };

  const handleQuickAction = (actionText) => {
    setInputText(actionText);
    handleSendMessage(actionText);
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        const voiceQuery =
          selectedLanguage === "hi"
            ? "मुझे सरकारी योजना के बारे में बताओ"
            : "Tell me about government schemes";

        setInputText(voiceQuery);

        setTimeout(() => {
          handleSendMessage(voiceQuery);
        }, 500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <SakhiHeader />

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-pink-100 mb-12">

          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between">

              <div className="flex items-center space-x-4">
                <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Chat with Sakhi</h3>
                  <p className="text-white/80 text-sm">Online • Responds instantly</p>
                </div>
              </div>

              <div className="flex space-x-3 items-center">
                <button
                  onClick={handleNewChat}
                  className="p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setSelectedLanguage("en")}
                  className={`px-4 py-2 rounded-lg font-bold border-2 ${
                    selectedLanguage === "en"
                      ? "bg-white text-pink-600 border-white"
                      : "bg-white/20 text-white border-white/40"
                  }`}
                >
                  EN
                </button>

                <button
                  onClick={() => setSelectedLanguage("hi")}
                  className={`px-4 py-2 rounded-lg font-bold border-2 ${
                    selectedLanguage === "hi"
                      ? "bg-white text-pink-600 border-white"
                      : "bg-white/20 text-white border-white/40"
                  }`}
                >
                  हि
                </button>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <ChatWindow
            messages={messages}
            isProcessing={isProcessing}
            messagesEndRef={messagesEndRef}
          />

          {/* Quick Actions */}
          <ChatQuickActions actions={quickActionsData} onQuickAction={handleQuickAction} />

          {/* Input Field */}
          <ChatInput
            inputText={inputText}
            setInputText={setInputText}
            handleSendMessage={() => handleSendMessage(inputText)}
            handleVoiceInput={handleVoiceInput}
            isRecording={isRecording}
            isProcessing={isProcessing}
            selectedLanguage={selectedLanguage}
          />
        </div>

        {/* Emergency */}
        <a
          href="tel:1091"
          className="w-full md:w-auto mx-auto mb-12 flex items-center justify-center space-x-3 bg-red-600 text-white font-extrabold text-xl py-4 px-10 rounded-full shadow-2xl hover:bg-red-700 transition-all transform hover:scale-105 ring-4 ring-red-300 animate-pulse"
        >
          <AlertCircle className="w-6 h-6" />
          <span>EMERGENCY HELP (1091)</span>
        </a>

        {/* Daily Motivation */}
        <div className="mt-12 text-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-10 border-4 border-pink-300 shadow-xl">
          <Heart className="w-14 h-14 text-pink-600 mx-auto mb-4" />
          <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-wider">
            Your Daily Spark ✨
          </h3>
          <p className="text-xl font-serif text-gray-700 max-w-2xl mx-auto leading-relaxed italic">
            "तुम वो सब कुछ हो जो तुम्हें चाहिए। अपने अंदर की ताकत को पहचानो।"
            <br />
            <span className="text-pink-600 font-extrabold block mt-3">
              "You are everything you need. Recognize the strength within you."
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Sakhi;
