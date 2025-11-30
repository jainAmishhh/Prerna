import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Users, Award, Shield, Heart, ChevronRight } from 'lucide-react';
// import { useTranslation } from "react-i18next"; 
import axios from 'axios';
import { useTranslation } from "react-i18next";

// --- Configuration and Constants ---

// Using hardcoded URL as requested for compilation environment.
const API_BASE_URL = import.meta.env.VITE_PERSONALIZE_API;
const SCHEMES_ENDPOINT = `${API_BASE_URL}/schemes`;

const ALL_OPPORTUNITIES_ROUTE = "/schemes"; // Placeholder route

// A mapping for icons based on the data 'type' or a category in your DB
const iconMap = {
  'scheme': Shield,
  'scholarship': GraduationCap,
  'sport': BookOpen,
  'motivation': Award,
  'health': Heart,
  // Default icon for generic schemes
  'default': Shield,
};

// Helper function to get the appropriate icon component
const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

// Dynamic card styling logic (3 unique styles)
const cardStyles = [
  // Card 1: Coral Background (#D9534F)
  { 
    bg: 'bg-[#D9534F]', accent: '#FFC843', text: 'text-white', 
    buttonBg: 'bg-white', buttonText: 'text-[#D9534F]', 
    buttonHover: 'hover:bg-[#FFC843]/50', borderColor: '' 
  }, 
  // Card 2: Creamy White Background (#FBFBFB)
  { 
    bg: 'bg-[#FBFBFB]', accent: '#D9534F', text: 'text-[#333333]', 
    buttonBg: 'bg-[#D9534F]', buttonText: 'text-white', 
    buttonHover: 'hover:bg-[#FFC843]', borderColor: 'border border-[#FFC843]' 
  }, 
  // Card 3: Yellow Background (#FFC843)
  { 
    bg: 'bg-[#FFC843]', accent: '#D9534F', text: 'text-[#333333]', 
    buttonBg: 'bg-[#D9534F]', buttonText: 'text-white', 
    buttonHover: 'hover:bg-white hover:text-[#D9534F]', borderColor: '' 
  }, 
];


export default function SchemesCards() {
    const { t, i18n } = useTranslation();
  
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data from FastAPI Endpoint (Schemes Route) ---
  useEffect(() => {
    // 👉 Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};

    const userAge = storedUser.age || 18;
    const userRegion = storedUser.region || "India";
    
    // ACTION: Limiting to 3 in the query, and forcing 3 cards to be displayed
    const url = `${SCHEMES_ENDPOINT}?age=${userAge}&region=${userRegion}`;

    axios.get(url)
      .then(response => {
        // The schemes endpoint returns data under the 'schemes' key
        if (response.data && Array.isArray(response.data.schemes)) {
          // NOTE: We rely on the backend filtering, but enforce the slice here for display consistency.
          setOpportunities(response.data.schemes); 
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
        Loading top schemes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] py-20 px-6 text-center text-red-600 font-bold text-xl">
        Error: {error}
      </div>
    );
  }
  
  // ACTION: Limit display to 3 cards for the "top recommendations" style
  const opportunitiesToDisplay = opportunities.slice(0, 3); 

  return (
    <div className="min-h-screen bg-[#FBFBFB] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header - Women-Centric Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#FFC843] to-[#D9534F] mb-4">
            {t("schemes_fe.title")}
          </h2>
          <p className="text-[#333333] text-xl">
            {t("schemes_fe.subtitle")}
          </p>
        </div>

        {/* Card Grid */}
        {opportunitiesToDisplay.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No general schemes found for your current age and region.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            
            {opportunitiesToDisplay.map((item, index) => {
              const style = cardStyles[index % cardStyles.length]; // Cycle through the three defined styles
              const IconComponent = getIcon(item.type || 'scheme'); // Use 'scheme' as default type
              const ButtonIcon = getIcon(item.type || 'scheme');
              
              const isCoralCardBg = style.bg === 'bg-[#D9534F]';
              const isWhiteButton = style.buttonBg === 'bg-white';

              return (
                <a 
                  href={item.link || '#'} 
                  key={item._id} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group relative ${style.bg} ${style.borderColor} overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 rounded-lg block cursor-pointer`} 
                >
                  {/* Decorative Circle Top */}
                  <div className={`absolute -top-4 -right-4 w-24 h-24 bg-[${style.accent}] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500`}></div>
                  
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-6 
                        transform group-hover:rotate-12 transition-transform duration-300
                        ${isCoralCardBg ? 'bg-white/30 backdrop-blur-sm' : 'bg-[#D9534F]/40 backdrop-blur-sm'}
                    `}>
                      <IconComponent className="text-white" size={32} />
                    </div>

                    {/* Title (Dynamic) */}
                    <h3 className={`${style.text} text-3xl font-bold mb-4`}>
                      {item.title || item.name || "Untitled Scheme"}
                    </h3>

                    {/* Description (Dynamic) */}
                    <p className={`${style.text} ${isCoralCardBg ? 'text-white/90' : 'text-gray-700'} text-base mb-6 leading-relaxed`}>
                      {item.description || "Scheme details are loading..."}
                    </p>

                    {/* Image Section - Curved Shape (Dynamic) */}
                    <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
                        <img 
                          src={item.image_url || "https://placehold.co/400x224/A0A0A0/ffffff?text=Scheme+Info"} 
                          alt={item.title || "Scheme"}
                          className="w-full h-56 object-cover"
                          onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/400x224/A0A0A0/ffffff?text=Scheme+Info";
                          }}
                        />
                        {/* Overlay color adjusted to match original theme */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#D9534F]/60 to-transparent"></div>
                      </div>
                      {/* Small decorative circle on image */}
                      <div className={`absolute -bottom-3 -right-3 w-16 h-16 bg-[${style.accent}] rounded-full opacity-80`}></div>
                    </div>

                    {/* Button */}
                    <div className={`w-full ${style.buttonBg} ${style.buttonText} py-3 px-6 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl
                        ${style.buttonHover}
                    `}>
                      <span>{t("schemes_fe.learn_more")}</span>
                      {/* Icon color logic: if button is white, use the button's text color (Coral); otherwise, use white. */}
                      <ButtonIcon size={20} className={isWhiteButton ? style.buttonText : 'text-white'}/>
                    </div>
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
                <span>{t("schemes_fe.more_opportunities")}</span>
                <ChevronRight size={20} />
            </a>
        </div>

      </div>
    </div>
  );
}
