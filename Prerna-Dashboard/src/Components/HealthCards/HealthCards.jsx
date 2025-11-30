import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Users, Award, Shield, Heart, ChevronRight, ArrowRight, Zap, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// --- Theme Colors ---
const BRIGHT_CORAL = "#D9534F"; // Primary accent color (Health/Life)
const DEEP_ORANGE = "#CD4628"; // Secondary accent color (Depth/Strength)
const SUNNY_YELLOW = "#FFC843"; // Tertiary accent color (Energy/Hope)
const SOFT_PINK = "#F9E8EC"; // Background accent
const WHITE_GLOW = "#FFF8FB"; // Card background

// --- Configuration and Constants ---
const API_BASE_URL = import.meta.env.VITE_PERSONALIZE_API;
const HEALTHCARE_ENDPOINT = `${API_BASE_URL}/healthcare`;
 
const ALL_OPPORTUNITIES_ROUTE = "/health"; 

// A mapping for icons
const iconMap = {
  'health': Heart,
  'scheme': Shield,
  'scholarship': GraduationCap,
  'sport': BookOpen,
  'motivation': Award,
  'default': Heart,
};

const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

export default function HealthCards() {
  const { t, i18n } = useTranslation();
  
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data from FastAPI Endpoint (Healthcare Route) ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};

    const userAge = storedUser.age || 18;
    const userRegion = storedUser.region || "India";
    
    // ACTION: Construct URL using age and region only
    const url = `${HEALTHCARE_ENDPOINT}?age=${userAge}&region=${userRegion}`;

    axios.get(url)
      .then(response => {
        if (response.data && Array.isArray(response.data.healthcare)) {
          setOpportunities(response.data.healthcare);
        } else {
          setError('Failed to fetch data: ' + (response.data.message || 'Unknown error'));
        }
      })
      .catch(err => {
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
        {t("Health.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] py-20 px-6 text-center text-red-600 font-bold text-xl">
        {t("Health.error")}: {error}
      </div>
    );
  }
  
  // ACTION: Limit display to the top 3 opportunities
  const opportunitiesToDisplay = opportunities.slice(0, 3); 

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-[#FBFBFB] font-sans">
      
      {/* Enhanced CSS Styles for Animations and Theming */}
      <style>{`
        /* Custom Keyframes and Classes for Health Theme */
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .health-heart-badge {
            background: linear-linear(135deg, ${BRIGHT_CORAL}, ${DEEP_ORANGE});
            position: relative;
            overflow: hidden;
            animation: pulse-heart 2s infinite ease-in-out;
        }
        .health-tag {
             background: linear-linear(90deg, ${SUNNY_YELLOW}, ${BRIGHT_CORAL});
        }
      `}</style>

      {/* Soft Background Gradients - Theme Accent */}
      <div className="absolute inset-0 bg-linear-to-b from-[#FBFBFB] via-[#F9E8EC] to-[#FBFBFB] -z-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFC843]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D9534F]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header - Women-Centric Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-6 h-6 text-[#CD4628]" />
            <span className="text-[#D9534F] font-bold text-sm uppercase tracking-wider">{t("Health.tagline")}</span>
            <Heart className="w-6 h-6 text-[#CD4628]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4 tracking-tight">
            {t("Health.title")}
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            {t("Health.subtitle")}
          </p>
        </div>

        {/* Card Grid */}
        {opportunitiesToDisplay.length === 0 ? (
          <div className="text-center py-10 bg-white/50 rounded-2xl border-2 border-[#F9E8EC]">
            <Heart className="w-12 h-12 text-[#D9534F] mx-auto mb-3 opacity-50" />
            <p className="text-gray-500 text-lg">{t("Health.no_programs")}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            
            {opportunitiesToDisplay.map((item, index) => {
              const IconComponent = getIcon(item.type || 'health');
              const itemType = item.type ? item.type.toUpperCase() : 'WELLNESS';

              // Cycle through soft backgrounds with a vibrant inner image block
              const primaryGradient = index % 2 === 0 
                ? `from-[${SOFT_PINK}] to-white` // Soft Pink to White
                : `from-white to-[${SOFT_PINK}]`; // White to Soft Pink

              const headerColor = index % 3 === 0 ? DEEP_ORANGE : BRIGHT_CORAL; // Alternate header color

              return (
                <a
                  href={item.link || '#'} 
                  key={item._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group bg-[${WHITE_GLOW}] shadow-xl hover:shadow-2xl hover:shadow-[#D9534F]/40 transition-all duration-500 border border-[#F9E8EC] flex flex-col rounded-2xl overflow-hidden transform hover:-translate-y-1`}
                >
                  
                  {/* Image/Gradient Header Block */}
                  <div className={`relative h-48 overflow-hidden rounded-t-xl bg-linear-to-br ${primaryGradient}`}>
                    <img
                      src={item.image_url || `https://placehold.co/400x192/${BRIGHT_CORAL.substring(1)}/ffffff?text=Health+Care`}
                      alt={item.title || "Health Program"}
                      className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x192/${BRIGHT_CORAL.substring(1)}/ffffff?text=Health+Care`; }}
                    />
                    
                    {/* Floating Icon/Title */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <div className="flex items-center space-x-3 mb-2">
                            {/* Icon Circle */}
                            <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/50 group-hover:scale-110 transition-transform`}>
                                <IconComponent className={`text-[${headerColor}]`} size={24} />
                            </div>
                            <h3 className={`text-xl font-bold text-gray-800 drop-shadow-sm group-hover:text-[${headerColor}] transition-colors`}>
                                {item.title || "Untitled Program"}
                            </h3>
                        </div>
                    </div>
                  </div>

                  {/* Content Block */}
                  <div className="p-6 relative z-10 flex flex-col grow">
                    
                    {/* Tag + Eligibility */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-white px-3 py-1 rounded-full health-heart-badge shadow-md flex items-center gap-1">
                             <Heart size={12} /> {t("Health.available")}
                        </span>
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full text-white bg-gray-500 shadow-md`}>
                            {itemType}
                        </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm grow line-clamp-3">
                      {item.description || "Detailed information about this essential healthcare scheme is available on the scheme page."}
                    </p>

                    {/* View Details Button/Link */}
                    <button 
                        className={`w-full py-3 px-4 rounded-full font-bold text-sm transition-all duration-300 text-white bg-linear-to-r from-[#CD4628] to-[#D9534F] mt-auto flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl group-hover:scale-[1.02]`}
                    >
                      <span>{t("Health.learn_more")}</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
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
                <span>{t("Health.more_opportunities")}</span>
                <ChevronRight size={20} />
            </a>
        </div>
      </div>
    </section>
  );
}
