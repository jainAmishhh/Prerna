import React, { useState, useEffect } from 'react';
import { Award, Heart, ChevronRight, ArrowRight, Zap, Lightbulb, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// --- Theme Colors ---
const BRIGHT_CORAL = "#D9534F"; // Primary accent color
const DEEP_ORANGE = "#CD4628"; // Secondary accent color
const SUNNY_YELLOW = "#FFC843"; // Tertiary accent color
const SOFT_PINK = "#F9E8EC"; // Background accent color
const CREAMY_WHITE = "#FBFBFB";

// --- Configuration and Constants ---
const API_BASE_URL = import.meta.env.VITE_PERSONALIZE_API;
const MOTIVATION_ENDPOINT = `${API_BASE_URL}/motivation`;

const ALL_OPPORTUNITIES_ROUTE = "/motivation"; 

// A mapping for icons (Using inspirational/supportive icons)
const iconMap = {
  'motivation': Lightbulb,
  'support': Heart,
  'story': MessageSquare,
  'default': Zap,
};

// Helper function to get the appropriate icon component
const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

// --- Default Fallback Motivation Items ---
const DEFAULT_MOTIVATION = [
    {
        _id: "default-1",
        title: "The Power of Self-Belief ",
        description: "Read inspiring stories of women who overcame challenges to achieve their dreams. This is a placeholder resource shown because the API returned no results.",
        image_url: "https://images.unsplash.com/photo-1517486803732-c646067756f7?q=80&w=600&auto=format&fit=crop",
        type: "story",
        link: "https://www.youtube.com/watch?v=nPlssYxupfc", // Using one of the example YouTube links for embed test
        age_min: 16, age_max: 99
    },
    {
        _id: "default-2",
        title: "Daily Wellness Checklist ",
        description: "Simple steps and exercises to boost your mental health and maintain balance. This is a placeholder resource shown because the API returned no results.",
        image_url: "https://images.unsplash.com/photo-1549477038-f865f802161f?q=80&w=600&auto=format&fit=crop",
        type: "support",
        link: "https://www.youtube.com/watch?v=OJvYaQF2O0I", // Using another example YouTube link
        age_min: 18, age_max: 60
    },
];

// --- YouTube URL Processor ---
const getYouTubeEmbedUrl = (link) => {
    // Extracts video ID from common YouTube URLs and formats for iframe embed
    try {
        const url = new URL(link);
        if (url.hostname.includes('youtube.com')) {
            const videoId = url.searchParams.get('v');
            if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
        } else if (url.hostname.includes('youtu.be')) {
            const videoId = url.pathname.substring(1);
            if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
        }
    } catch (e) {
        // console.error("Invalid URL:", link);
    }
    return null;
};


// --- Individual Motivation Card Component ---
const MotivationCardItem = ({ item, index }) => {
    const { t, i18n } = useTranslation();
     const isVideoRight = index % 2 === 0; // Card 1 (index 0) = Video Right, Content Left
    const embedUrl = getYouTubeEmbedUrl(item.link);
    const IconComponent = getIcon(item.type || 'motivation');

    // Content Block (Title, Description, Button)
    const content = (
        <div className={`p-8 md:p-12 flex flex-col justify-center relative ${isVideoRight ? 'md:rounded-r-2xl' : 'md:rounded-l-2xl'}`}>
            {/* Type Badge */}
            <div className="absolute top-4 left-4 bg-[#CD4628] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <IconComponent size={14} />
                {item.type ? item.type.toUpperCase() : `{t("Motivation.badge_default")}`}
            </div>

            <h3 className={`text-4xl font-bold text-[#333333] mb-4 text-left`}>
                {item.title || `{t("Motivation.fallback_untitled")}`}
            </h3>
            
            <div className={`h-1 w-16 bg-[${BRIGHT_CORAL}]/50 rounded-full mb-6 ${isVideoRight ? 'mx-0' : 'mx-auto'} transition-all duration-300`}></div>
            
            <p className="text-gray-700 mb-6 leading-relaxed text-lg line-clamp-4 text-left">
                {item.description || `{t("Motivation.fallback_description")}`}
            </p>

            <a
                href={item.link || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex self-start items-center space-x-2 px-6 py-3 text-lg font-bold rounded-full text-white bg-linear-to-r from-[${BRIGHT_CORAL}] to-[${DEEP_ORANGE}] transition-all duration-300 transform hover:scale-[1.05] shadow-lg`}
            >
                <Lightbulb size={18} />
                <span>{t("Motivation.explore_resource")}</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    );

    // Video Embed Block
    const videoEmbed = (
        <div className={`relative h-64 md:h-full shrink-0 ${isVideoRight ? 'md:rounded-l-none' : 'md:rounded-r-none'} overflow-hidden`}>
            {embedUrl ? (
                <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title={item.title || "Motivational Video"}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                ></iframe>
            ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-600">
                    {t("Motivation.video_unavailable")}
                </div>
            )}
            
            {/* Placeholder Image/Overlay */}
            <img 
                src={item.image_url || "https://placehold.co/800x400/E0E0E0/333333?text=Inspirational+Media"} 
                alt={item.title || "Media"}
                className="w-full h-full object-cover absolute inset-0 opacity-20"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/E0E0E0/333333?text=Inspirational+Media"; }}
            />

            {/* Wavy Separator SVG (positioned based on side) */}
            <svg 
                className={`absolute inset-y-0 w-12 h-full z-10 ${isVideoRight ? '-left-12' : '-right-12 rotate-180'}`} 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                style={{ fill: '#F9E8EC' }} // Match the card background color
            >
                <path d="M0,0 L50,0 C75,25 75,75 50,100 L0,100 Z" />
            </svg>
        </div>
    );

    return (
        <div className="w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden group border border-[#F9E8EC] transform hover:shadow-3xl transition-all duration-500">
            <div className={`md:flex ${isVideoRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                {/* Content Area */}
                <div className={`w-full md:w-7/12 relative bg-white`}>
                    {content}
                </div>
                {/* Video Area */}
                <div className={`w-full md:w-5/12 relative bg-white`}>
                    {videoEmbed}
                </div>
            </div>
        </div>
    );
};


export default function MotivationCards() {
    const { t, i18n } = useTranslation();
    
    const [opportunities, setOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Fetch Data from FastAPI Endpoint (Motivation Route) ---
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
        const userAge = storedUser.age || 18;
        const userRegion = storedUser.region || "India";
        
        const url = `${MOTIVATION_ENDPOINT}?age=${userAge}&region=${userRegion}`;

        axios.get(url)
            .then(response => {
                if (response.data && Array.isArray(response.data.motivation)) {
                    setOpportunities(response.data.motivation);
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
                {t("Motivation.loading")}
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FBFBFB] py-20 px-6 text-center text-red-600 font-bold text-xl">
                {t("Motivation.error")}: {error}
            </div>
        );
    }
    
    // Display only the top 2 cards, using fallbacks if the API returned 0.
    let opportunitiesToDisplay = opportunities.slice(0, 2); 
    if (opportunitiesToDisplay.length === 0) {
        opportunitiesToDisplay = DEFAULT_MOTIVATION.slice(0, 2);
    }

    return (
        <section className="py-20 px-6 relative overflow-hidden bg-[#F9E8EC] font-sans">
            
            {/* Soft Background Accent with subtle pattern */}
            <div className="absolute inset-0 bg-linear-to-b from-[#F9E8EC] via-[#FBFBFB] to-[#F9E8EC] -z-10"></div>
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#FFC843]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#D9534F] to-[#CD4628] mb-4 tracking-tight">
                        {t("Motivation.title")}
                    </h2>
                    <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                        {t("Motivation.subtitle")}
                    </p>
                </div>

                {/* Card Grid - Vertical, full-width (approx 70%) layout */}
                <div className="flex flex-col space-y-16 items-center">
                    
                    {opportunitiesToDisplay.map((item, index) => (
                        <MotivationCardItem key={item._id} item={item} index={index} />
                    ))}
                    
                </div>
                
                {/* More Opportunities Button */}
                <div className="text-center mt-12">
                    <a 
                        href={ALL_OPPORTUNITIES_ROUTE}
                        className="inline-flex items-center space-x-2 px-8 py-3 text-lg font-bold rounded-full text-white bg-linear-to-r from-[#D9534F] to-[#FFC843] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <span>{t("Motivation.more_opportunities")}</span>
                        <ChevronRight size={20} />
                    </a>
                </div>
            </div>
        </section>
    );
}
