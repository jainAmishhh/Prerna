import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Shield,
  Heart,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// --- Configuration and Constants ---
const API_BASE_URL = import.meta.env.VITE_PERSONALIZE_API;
const SCHOLARSHIPS_ENDPOINT = `${API_BASE_URL}/scholarships`;

const ALL_OPPORTUNITIES_ROUTE = "/scholarships";

// --- Theme Colors ---
const BRIGHT_CORAL = "#D9534F"; // Primary accent color
const DEEP_ORANGE = "#CD4628"; // Secondary accent color
const SUNNY_YELLOW = "#FFC843"; // Tertiary accent color

// A mapping for icons
const iconMap = {
  scholarship: GraduationCap,
  scheme: Shield,
  sport: BookOpen,
  motivation: Award,
  health: Heart,
  default: GraduationCap,
};

const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

export default function ScholarshipCards() {
  const { t, i18n } = useTranslation();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data from FastAPI Endpoint (Scholarships Route) ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
    const userAge = storedUser.age || 18;
    const userRegion = storedUser.region || "India";

    // ACTION: Fetching schemes (backend is responsible for sorting/relevance)
    const url = `${SCHOLARSHIPS_ENDPOINT}?age=${userAge}&region=${userRegion}`;

    axios
      .get(url)
      .then((response) => {
        if (response.data && Array.isArray(response.data.scholarships)) {
          setOpportunities(response.data.scholarships);
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
        {t("Scholarships.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] py-20 px-6 text-center text-red-600 font-bold text-xl">
        Error: {t("Scholarships.error")}
      </div>
    );
  }

  // ACTION: Limit display to the top 3 opportunities
  const opportunitiesToDisplay = opportunities.slice(0, 3);

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-[#FBFBFB] font-sans">
      {/* Enhanced CSS Styles for Animations and Theming */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes slide {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .women-badge {
          background: linear-linear(135deg, ${BRIGHT_CORAL}, ${DEEP_ORANGE});
          position: relative;
          overflow: hidden;
        }
        .women-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.3);
          animation: slide 3s infinite;
        }
        .button-link .arrow-icon { opacity: 0; margin-left: -4px; transition: all 0.3s; }
        .button-link:hover .arrow-icon { opacity: 1; margin-left: 0; }
      `}</style>

      {/* Enhanced Background with Women-Centric Accents */}
      <div className="absolute inset-0 bg-linear-to-b from-[#FBFBFB] via-[#F9E8EC] to-[#FBFBFB] -z-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC843]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D9534F]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Heart className="w-20 h-20 text-[#D9534F]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header - Women Focused */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-6 h-6 text-[#D9534F]" />
          <span className="text-[#CD4628] font-bold text-sm uppercase tracking-wider">
            {t("Scholarships.header_tag")}
          </span>
          <Heart className="w-6 h-6 text-[#D9534F]" />
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4 tracking-tight">
            {t("Scholarships.title")}
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("Scholarships.subtitle")}
          </p>
        </div>

        {/* Card Grid */}
        {opportunitiesToDisplay.length === 0 ? (
          <div className="text-center py-10 bg-white/50 rounded-2xl border-2 border-[#F9E8EC]">
            <Heart className="w-12 h-12 text-[#D9534F] mx-auto mb-3 opacity-50" />
            <p className="text-gray-500 text-lg">
              {t("Scholarships.no_scholarships_desc")}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {opportunitiesToDisplay.map((item, index) => {
              const ButtonIcon = getIcon(item.type || "scholarship");
              const itemType = item.type
                ? item.type.toUpperCase()
                : "SCHOLARSHIP";

              return (
                <div
                  key={item._id}
                  className="group bg-white p-6 shadow-xl hover:shadow-2xl hover:shadow-[#D9534F]/30 transition-all duration-500 border border-[#F9E8EC] flex flex-col items-center text-center relative overflow-hidden rounded-xl"
                >
                  {/* Enhanced Hover Gradient Background */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#F9E8EC] to-[#FFF0F5] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />

                  {/* Decorative Top Accent - Women Theme */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#D9534F] via-[#FFC843] to-[#D9534F] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>

                  {/* Image/Icon Container */}
                  <div className="relative w-32 h-32 mb-6">
                    {/* Rotating Gradient Border */}
                    <div className="absolute inset-0 bg-linear-to-tr from-[#D9534F] to-[#FFC843] rounded-full animate-spin-slow opacity-70 blur-sm group-hover:blur-md transition-all"></div>

                    {/* Image Circle */}
                    <div className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500 flex items-center justify-center bg-linear-to-br from-[#F9E8EC] to-[#FCE4EC] overflow-hidden">
                      <img
                        src={
                          item.image_url ||
                          `https://placehold.co/128x128/${BRIGHT_CORAL.substring(
                            1
                          )}/ffffff?text=${itemType}`
                        }
                        alt={item.title || "Opportunity"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/128x128/${BRIGHT_CORAL.substring(
                            1
                          )}/ffffff?text=${itemType}`;
                        }}
                      />
                      {/* Overlay Icon if no image is present */}
                      {!item.image_url && (
                        <div className="absolute flex items-center justify-center w-full h-full bg-linear-to-br from-[#D9534F]/20 to-[#FFC843]/20">
                          <GraduationCap
                            size={60}
                            className="text-[#D9534F] opacity-60"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-[#333333] mb-2 group-hover:text-[#D9534F] transition-colors line-clamp-2">
                      {item.title || item.name || "Untitled Opportunity"}
                    </h3>

                    {/* Enhanced Divider */}
                    <div className="h-1 w-16 bg-linear-to-r from-[#D9534F] to-[#FFC843] mx-auto rounded-full mb-4 group-hover:w-28 transition-all duration-300 opacity-70"></div>

                    <p className="text-gray-700 mb-6 leading-relaxed text-sm line-clamp-3">
                      {item.description ||
                        "Empowerment opportunity designed for your growth and success..."}
                    </p>

                    {/* Category Tag + Explore Button (stacked neatly) */}
                    <div className="flex flex-col items-center space-y-3 mb-4">
                      {/* Category Tag */}
                      <span className="text-xs font-bold text-white bg-linear-to-r from-[#D9534F] to-[#CD4628] px-3 py-1 rounded-full">
                        {t("Scholarships.badge_women")} • {itemType}
                      </span>

                      {/* Explore Button */}
                      <a
                        href={item.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#CD4628] font-bold inline-flex items-center group/btn button-link
               cursor-pointer hover:text-[#D9534F] transition-colors"
                      >
                        <span className="group-hover/btn:mr-2 transition-all">
                          {t("Scholarships.learn_more")}
                        </span>
                        <ArrowRight
                          className="arrow-icon transition-all duration-300"
                          size={18}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Enhanced Discover More Button */}
        <div className="text-center mt-16">
          <a
            href={ALL_OPPORTUNITIES_ROUTE}
            className="inline-flex items-center space-x-2 px-8 py-3 text-lg font-bold rounded-full text-white bg-linear-to-r from-[#D9534F] to-[#FFC843] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span>{t("Scholarships.more_opportunities")}</span>
            <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
