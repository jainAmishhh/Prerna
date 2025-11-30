import React, { useState, useEffect } from "react";
import {
  Award,
  Shield,
  Heart,
  ChevronRight,
  ArrowRight,
  Zap,
  Trophy,
  TrendingUp,
  HeartHandshake,
  Flame,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// --- Theme Colors ---
const BRIGHT_CORAL = "#D9534F"; // Primary accent color (Energy/Action)
const DEEP_ORANGE = "#CD4628"; // Secondary accent color (Depth/Strength)
const SUNNY_YELLOW = "#FFC843"; // Tertiary accent color (Achievement/Gold)
const SOFT_PINK = "#F9E8EC"; // Background accent

// --- Configuration and Constants ---
const API_BASE_URL = import.meta.env.VITE_PERSONALIZE_API;
const SPORTS_ENDPOINT = `${API_BASE_URL}/sports`;


const ALL_OPPORTUNITIES_ROUTE = "/sports";

// A mapping for icons
const iconMap = {
  sport: Trophy,
  scheme: Shield,
  scholarship: Award,
  motivation: Zap,
  health: Heart,
  default: Trophy,
};

// Gradients used for the dynamic, energetic theme
const linearStyles = [
  // 0: Coral to Yellow (High Energy)
  {
    linear: `from-[${BRIGHT_CORAL}] to-[${SUNNY_YELLOW}]`,
    primaryColor: BRIGHT_CORAL,
    buttonGradient: `from-[${DEEP_ORANGE}] to-[${BRIGHT_CORAL}]`,
  },
  // 1: Deep Orange to Coral (Strong, determined look)
  {
    linear: `from-[${DEEP_ORANGE}] to-[${BRIGHT_CORAL}]`,
    primaryColor: DEEP_ORANGE,
    buttonGradient: `from-[${BRIGHT_CORAL}] to-[${DEEP_ORANGE}]`,
  },
  // 2: Yellow to Deep Orange (Warm, inspiring)
  {
    linear: `from-[${SUNNY_YELLOW}] to-[${DEEP_ORANGE}]`,
    primaryColor: SUNNY_YELLOW,
    buttonGradient: `from-[${DEEP_ORANGE}] to-[${SUNNY_YELLOW}]`,
  },
];

const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

export default function SportsCards() {
  const { t, i18n } = useTranslation();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data from FastAPI Endpoint (Sports Route) ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
    const userAge = storedUser.age || 18;
    const userRegion = storedUser.region || "India";

    // Fetch data using age and region
    const url = `${SPORTS_ENDPOINT}?age=${userAge}&region=${userRegion}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data && Array.isArray(response.data.sports)) {
          setOpportunities(response.data.sports);
        } else {
          setError(
            "Failed to fetch data: " +
              (response.data.message || "Unknown error")
          );
        }
      })
      .catch((err) => {
        console.error("API Fetch Error:", err);
        setError("Network or API call failed. Ensure FastAPI is running.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // --- Render Logic ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] py-20 px-6 text-center text-[#D9534F] font-bold text-xl">
        {t("Sports.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] py-20 px-6 text-center text-red-600 font-bold text-xl">
        {t("Sports.error")}: {error}
      </div>
    );
  }

  // ACTION: Limit display to the top 3 opportunities
  const opportunitiesToDisplay = opportunities.slice(0, 3);

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-[#FBFBFB] font-sans">
      {/* Enhanced CSS Styles for Animations and Theming */}
      <style>{`
        /* Custom Keyframes */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(217, 83, 79, 0.3); }
          50% { box-shadow: 0 0 25px rgba(217, 83, 79, 0.6); }
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Soft Background Accent */}
      <div className="absolute inset-0 bg-linear-to-b from-[#FBFBFB] via-[#F9E8EC] to-[#FBFBFB] -z-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC843]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#D9534F]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-12 opacity-10 animate-float">
        <Trophy className="w-24 h-24 text-[#D9534F]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header - Women Focused */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-6 h-6 text-[#D9534F] animate-pulse" />
            <span className="text-[#CD4628] font-bold text-sm uppercase tracking-wider">
              {t("Sports.tagline")}
            </span>
            <Trophy className="w-6 h-6 text-[#D9534F] animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4 tracking-tight">
            {t("Sports.title")}
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            {t("Sports.subtitle")}
          </p>
        </div>

        {/* Card Grid - Limited to 3 columns */}
        {opportunitiesToDisplay.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-2xl border-2 border-[#F9E8EC]">
            <HeartHandshake className="w-12 h-12 text-[#D9534F] mx-auto mb-3 opacity-50" />
            <p className="text-gray-500 text-lg">
              {t("Sports.no_programs")}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {t("Sports.no_programs_sub")}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {opportunitiesToDisplay.map((item, index) => {
              const style = linearStyles[index % linearStyles.length];
              const IconComponent = getIcon(item.type || "sport");
              const itemType = item.type ? item.type.toUpperCase() : "SPORT";

              return (
                <a
                  href={item.link || "#"}
                  key={item._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white shadow-xl hover:shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 border border-gray-100 flex flex-col rounded-xl overflow-hidden transform hover:-translate-y-2"
                >
                  {/* --- Header & Diagonal Accent (Dynamic Energy) --- */}
                  <div className={`relative h-48 overflow-hidden`}>
                    {/* Diagonal Gradient Band */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-24 skew-y-[-4deg] origin-top-left bg-linear-to-r ${style.linear} shadow-lg transition-all duration-500 group-hover:skew-y-2 group-hover:shadow-2xl`}
                    ></div>

                    {/* Icon/Trophy Circle */}
                    <div className="absolute top-4 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/30 transform group-hover:scale-125 transition-transform duration-300 z-10 animate-glow">
                      <IconComponent className="text-[#D9534F]" size={30} />
                    </div>

                    {/* Image Area */}
                    <div className="absolute inset-0 top-1/2 p-4 pt-8">
                      <img
                        src={
                          item.image_url ||
                          `https://placehold.co/400x120/${style.primaryColor.substring(
                            1
                          )}/ffffff?text=Athlete`
                        }
                        alt={item.title || "Sports Program"}
                        className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/400x120/${style.primaryColor.substring(
                            1
                          )}/ffffff?text=Athlete`;
                        }}
                      />
                    </div>

                    {/* Title Text (Placed high, over linear) */}
                    <h3
                      className={`absolute top-6 right-6 text-xl font-bold text-white drop-shadow-md text-right line-clamp-2 max-w-[70%]`}
                    >
                      {item.title || `{t("Sports.untitled")}`}
                    </h3>

                    <div className="absolute bottom-3 right-4 bg-linear-to-r from-[#D9534F] to-[#CD4628] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                      <TrendingUp size={12} /> {itemType}
                    </div>
                  </div>

                  {/* --- Content Block --- */}
                  <div className="p-6 pt-4 flex flex-col grow">
                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm grow line-clamp-3">
                      {item.description ||
                        `{t("Sports.fallback_description")}`}
                    </p>

                    {/* Eligibility & Badge - Enhanced */}
                    <div className="mb-4 flex justify-between items-center">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full text-white shadow-md flex-1 justify-center`}
                        style={{ background: style.primaryColor }}
                      >
                        <Heart size={12} />
                        {t("Sports.ages")} {item.age_min || "N/A"} - {item.age_max || "N/A"}
                      </span>
                      <span className="text-xs text-[#D9534F] font-bold bg-gray-100 px-2.5 py-1.5 rounded-full">
                        {t("Sports.women_focused")}
                      </span>
                    </div>

                    {/* View Details Button/Link - Enhanced */}
                    <button
                      className={`w-full py-3 px-4 rounded-full font-bold text-sm transition-all duration-300 text-white bg-linear-to-r ${style.buttonGradient} mt-auto flex items-center justify-center space-x-2 shadow-lg group-hover:scale-105 hover:shadow-xl`}
                    >
                      <Sparkles
                        size={16}
                        className="group-hover:rotate-12 transition-transform"
                      />
                      <span>{t("Sports.learn_more")}</span>
                      <ArrowRight
                        size={18}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* More Opportunities Button */}
        <div className="text-center mt-12">
          <a
            href={ALL_OPPORTUNITIES_ROUTE}
            className="inline-flex items-center space-x-2 px-8 py-3 text-lg font-bold rounded-full text-white bg-linear-to-r from-[#D9534F] to-[#FFC843] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>{t("Sports.more_opportunities")}</span>
            <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
