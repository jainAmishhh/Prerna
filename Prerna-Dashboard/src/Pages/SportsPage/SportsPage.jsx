import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, Shield, Award, Trophy, TrendingUp, Heart, Zap, Filter, Star, ArrowRight, Clock, Landmark, MessageCircle, Search, Flame, Sparkles } from 'lucide-react';

// --- THEME COLORS ---
const BRIGHT_CORAL = "#D9534F"; // Primary accent
const DEEP_ORANGE = "#CD4628"; 
const SUNNY_YELLOW = "#FFC843"; 
const NEUTRAL_BASE = "#FBFBFB";
const SOFT_ACCENT = "#F9E8EC"; 
const DARK_TEXT = "#333333"; 

// --- CONFIGURATION ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;  
const SPORTS_ENDPOINT = `${API_BASE_URL}/sports`;
const ALL_OPPORTUNITIES_ROUTE = "/all-opportunities";

// --- VIBRANT COLOR GRADIENTS FOR SPORTS CATEGORIES ---
const GRADIENTS = {
    training: { bg: "from-blue-500 to-cyan-500", icon: "#3B82F6" },
    fitness: { bg: "from-pink-500 to-rose-500", icon: "#EC4899" },
    scholarship: { bg: "from-purple-500 to-violet-500", icon: "#8B5CF6" },
    default: { bg: "from-amber-500 to-orange-500", icon: "#F59E0B" },
};

const getColorClass = (interest = "") => {
    const key = interest.toLowerCase().replace(/\s+/g, '_');
    for (const gradientKey in GRADIENTS) {
        if (key.includes(gradientKey) || interest.toLowerCase().includes(gradientKey)) {
            return GRADIENTS[gradientKey];
        }
    }
    return GRADIENTS.default;
};

// --- ICON MAP ---
const iconMap = {
    'sport': Trophy,
    'scheme': Shield,
    'scholarship': Award,
    'motivation': Zap,
    'health': Heart,
    'default': Trophy,
};
const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

// --- INDIVIDUAL SPORTS CARD ---
const SportsCard = ({ program, index }) => {
    const colorTheme = getColorClass(program.interest || program.type);
    const IconComponent = getIcon(program.type);
    const itemType = program.type ? program.type.toUpperCase() : 'SPORT';

    // Gradients used for the dynamic, energetic theme (from previous SportsCards)
    const cardGradients = [
        // 0: Coral to Yellow
        { gradient: `from-[${BRIGHT_CORAL}] to-[${SUNNY_YELLOW}]`, primaryColor: BRIGHT_CORAL, buttonGradient: `from-[${DEEP_ORANGE}] to-[${BRIGHT_CORAL}]`, },
        // 1: Deep Orange to Coral
        { gradient: `from-[${DEEP_ORANGE}] to-[${BRIGHT_CORAL}]`, primaryColor: DEEP_ORANGE, buttonGradient: `from-[${BRIGHT_CORAL}] to-[${DEEP_ORANGE}]`, },
        // 2: Yellow to Deep Orange
        { gradient: `from-[${SUNNY_YELLOW}] to-[${DEEP_ORANGE}]`, primaryColor: SUNNY_YELLOW, buttonGradient: `from-[${DEEP_ORANGE}] to-[${SUNNY_YELLOW}]`, },
    ];
    const style = cardGradients[index % cardGradients.length];

    return (
        <a
            href={program.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white shadow-xl hover:shadow-2xl hover:shadow-pink-300/50 transition-all duration-500 border border-gray-100 flex flex-col rounded-xl overflow-hidden transform hover:-translate-y-2"
        >
            
            {/* --- Header & Diagonal Accent (Dynamic Energy) --- */}
            <div className={`relative h-48 overflow-hidden`}>
                
                {/* Diagonal Gradient Band - NOW USING DYNAMIC STYLE VARIABLE */}
                <div 
                    className={`absolute top-0 left-0 right-0 h-24 skew-y-[-4deg] origin-top-left bg-gradient-to-r ${style.gradient} shadow-lg transition-all duration-500 group-hover:skew-y-[-2deg] group-hover:shadow-2xl`}
                ></div>
                
                {/* Icon/Trophy Circle */}
                <div className="absolute top-4 left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/30 transform group-hover:scale-125 transition-transform duration-300 z-10 animate-glow">
                    <IconComponent className={`text-[${BRIGHT_CORAL}]`} size={30} />
                </div>

                {/* Badge/Tag */}
                <div 
                    className={`absolute top-4 right-6 text-xs font-bold text-white px-3 py-1.5 rounded-full shadow-md bg-gradient-to-r from-[#D9534F] to-[#CD4628] z-10 flex items-center gap-1`}
                >
                    <TrendingUp size={12} /> {itemType}
                </div>

                {/* Image Area */}
                <div className="absolute inset-0 top-1/2 p-4 pt-8">
                    <img
                        src={program.image_url || `https://placehold.co/400x120/${BRIGHT_CORAL.substring(1)}/ffffff?text=Athlete`}
                        alt={program.title || "Sports Program"}
                        className="w-full h-full object-cover rounded-lg opacity-90 group-hover:opacity-100 transition-opacity"
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x120/${BRIGHT_CORAL.substring(1)}/ffffff?text=Athlete`; }}
                    />
                </div>

                {/* Title Text (Placed high, over gradient) */}
                <h3 className={`absolute top-6 right-6 text-xl font-bold text-white drop-shadow-md text-right line-clamp-2 max-w-[70%]`}>
                    {program.title || "Untitled Program"}
                </h3>

                {/* Champions Badge (Bottom Left) */}
                <div className={`absolute bottom-3 left-4 bg-white/95 backdrop-blur-sm text-[${DEEP_ORANGE}] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1`}>
                    <Flame size={12} />
                    CHAMPIONSHIP
                </div>

                {/* Limited Spots Indicator (Bottom Right) */}
                <div className={`absolute bottom-3 right-4 bg-gradient-to-r from-[${BRIGHT_CORAL}] to-[${DEEP_ORANGE}] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1`}>
                    <Zap size={12} />
                    Spots Open
                </div>
            </div>

            {/* --- Content Block --- */}
            <div className="p-6 pt-4 flex flex-col flex-grow">
                
                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow line-clamp-3">
                    {program.description || "Detailed information about this training, or fitness opportunity is available on the program page."}
                </p>

                {/* Eligibility & Badge - Enhanced */}
                <div className="mb-4 flex justify-between items-center">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full text-white shadow-md flex-1 justify-center`}
                        style={{ background: style.primaryColor }}>
                        <Heart size={12} />
                        Ages {program.age_min || 'N/A'} - {program.age_max || 'N/A'}
                    </span>
                    <span className={`text-xs text-[${BRIGHT_CORAL}] font-bold bg-gray-100 px-2.5 py-1.5 rounded-full`}>Women Focused</span>
                </div>

                {/* View Details Button/Link - Enhanced */}
                <button 
                    className={`w-full py-3 px-4 rounded-full font-bold text-sm transition-all duration-300 text-white bg-gradient-to-r ${style.buttonGradient} mt-auto flex items-center justify-center space-x-2 shadow-lg hover:scale-105 hover:shadow-xl`}
                >
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                    <span>View Program</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </a>
    );
};

// --- MAIN COMPONENT ---
export default function SportsPage() {
    const [programs, setPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // --- Data Fetching ---
    useEffect(() => {
        const fetchSportsPrograms = async () => {
            setIsLoading(true);
            setError(null);

            const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
            const userAge = storedUser.age || 18;
            const userRegion = storedUser.region || "India";

            const url = `${SPORTS_ENDPOINT}?age=${userAge}&region=${userRegion}`;

            try {
                const response = await axios.get(url); 
                
                // Expecting data under the 'sports' key
                let programsArray = response.data.sports; 
                if (!Array.isArray(programsArray)) {
                    throw new Error("API response did not contain a valid 'sports' array.");
                }
                
                const updatedPrograms = programsArray.map((item) => ({
                    ...item,
                    title: item.title || item.name || "Untitled Sports Program",
                    description: item.description || item.focus || "No description provided.",
                    interest: item.interest || item.category || "Fitness",
                    type: item.type || "sport",
                    age_min: parseInt(item.age_min) || 0,
                    age_max: parseInt(item.age_max) || 99,
                    region: item.region || "India",
                    link: item.link || "#",
                    feature_text: item.feature_text || "High Performance Training", 
                }));

                setPrograms(updatedPrograms);
                setFilteredPrograms(updatedPrograms);
                setError(null);
            } catch (err) {
                console.error("Error fetching sports programs:", err);
                setError("Unable to load sports programs. Please check the API connection.");
                setPrograms([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSportsPrograms();
    }, []);

    // --- Filter & Search Logic ---
    useEffect(() => {
        let filtered = programs;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(prog =>
                prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prog.interest.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category (interest)
        if (selectedCategory !== "All") {
            filtered = filtered.filter(prog =>
                (prog.interest || 'fitness').toLowerCase().includes(selectedCategory.toLowerCase())
            );
        }

        setFilteredPrograms(filtered);
    }, [searchTerm, selectedCategory, programs]);

    // Get unique categories for the filter dropdown
    const categories = ["All", ...new Set(programs.map(p => p.interest || "Fitness"))];

    // --- Render ---
    return (
        <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: NEUTRAL_BASE }}>
            
            {/* Background Decoration */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-glow {
                    animation: glow 3s ease-in-out infinite;
                }
            `}</style>

            <div className={`fixed top-20 left-10 w-72 h-72 bg-[${SUNNY_YELLOW}]/5 rounded-full blur-3xl animate-float opacity-60 pointer-events-none`}></div>
            <div className={`fixed bottom-32 right-10 w-96 h-96 bg-[${BRIGHT_CORAL}]/5 rounded-full blur-3xl animate-float opacity-60 pointer-events-none`} style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className={`inline-flex items-center bg-white border border-[${BRIGHT_CORAL}]/30 text-[${DEEP_ORANGE}] px-6 py-2 rounded-full mb-6 shadow-sm`}>
                        <Trophy size={18} />
                        <span className="font-bold ml-2 tracking-wide text-sm uppercase">
                            Elite Sports & Training
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif"
                        style={{ color: DARK_TEXT }}>
                        Igniting Women's Athletic Potential
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Discover athletic scholarships, local training programs, and competition opportunities across India.
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div className="mb-12 p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6 items-end">
                        
                        {/* Search Bar */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Search size={16} className={`inline mr-2 text-[${DEEP_ORANGE}]`} />Search Programs
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by sport, region, or training type..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[${BRIGHT_CORAL}] focus:outline-none transition-colors`}
                                    style={{ backgroundColor: SOFT_ACCENT }}
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Filter size={16} className={`inline mr-2 text-[${DEEP_ORANGE}]`} />Filter by Focus
                            </label>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[${BRIGHT_CORAL}] focus:outline-none transition-colors cursor-pointer font-medium bg-white`}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Counter */}
                    <div className={`mt-4 p-3 bg-gradient-to-r from-[${BRIGHT_CORAL}]/10 to-[${SUNNY_YELLOW}]/10 rounded-lg`}>
                        <p className="text-center font-bold text-gray-800">
                            <Sparkles className={`inline mr-2 text-[${BRIGHT_CORAL}]`} size={18} />
                            Showing <span className={`text-[${BRIGHT_CORAL}] text-lg`}>{filteredPrograms.length}</span> sports programs matching your criteria.
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center p-20">
                        <div className={`w-12 h-12 border-4 border-[${BRIGHT_CORAL}] border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
                        <p className={`text-[${BRIGHT_CORAL}] font-bold text-xl`}>Loading programs...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="text-center p-10 rounded-xl bg-red-50 border border-red-300 mx-auto max-w-md">
                        <Heart className="w-8 h-8 mx-auto mb-3 opacity-50 text-red-600" />
                        <p className="text-red-700 font-semibold">{error}</p>
                    </div>
                )}

                {/* Programs Grid */}
                {!isLoading && filteredPrograms.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrograms.map((program, idx) => (
                            <SportsCard key={program.id || idx} program={program} index={idx} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    !isLoading && (
                        <div className="text-center p-16 rounded-2xl" style={{ backgroundColor: SOFT_ACCENT }}>
                            <Search size={48} className={`mx-auto mb-4 opacity-30 text-[${BRIGHT_CORAL}]`} />
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Programs Found</h3>
                            <p className="text-gray-600">Try broadening your search or adjusting your filters.</p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
