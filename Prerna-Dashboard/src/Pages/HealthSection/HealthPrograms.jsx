import React, { useState, useEffect } from 'react';
import { ChevronRight, HeartPulse, Heart, Shield, GraduationCap, Award, BookOpen, Search, MapPin, Zap, Filter, Sparkles, Flame, Star, ArrowRight, Clock } from 'lucide-react';
import axios from 'axios';

// --- THEME COLORS ---
const BRIGHT_CORAL = "#D9534F";
const DEEP_ORANGE = "#CD4628"; 
const SUNNY_YELLOW = "#FFC843"; 
const NEUTRAL_BASE = "#FBFBFB";
const SOFT_ACCENT = "#F9E8EC"; 
const DARK_TEXT = "#333333"; 

// --- CONFIGURATION ---
const API_BASE_URL = import.meta.env.VITE_FASTAPI_API;
const HEALTHCARE_ENDPOINT = `${API_BASE_URL}/healthcare`;


// --- VIBRANT COLOR GRADIENTS FOR HEALTH CATEGORIES ---
const GRADIENTS = {
    mental: { bg: "from-indigo-500 to-purple-500", accent: "#6366F1", icon: "text-indigo-600" },
    yoga: { bg: "from-emerald-500 to-teal-500", accent: "#10B981", icon: "text-emerald-600" },
    nutrition: { bg: "from-amber-500 to-orange-500", accent: "#F59E0B", icon: "text-amber-600" },
    fitness: { bg: "from-rose-500 to-pink-500", accent: "#F43F5E", icon: "text-rose-600" },
    women: { bg: "from-pink-500 to-fuchsia-500", accent: "#EC4899", icon: "text-pink-600" },
    pregnancy: { bg: "from-red-500 to-pink-500", accent: "#EF4444", icon: "text-red-600" },
    maternal: { bg: "from-rose-500 to-pink-500", accent: "#F43F5E", icon: "text-rose-600" },
    mental_health: { bg: "from-violet-500 to-purple-500", accent: "#7C3AED", icon: "text-violet-600" },
    wellness: { bg: "from-cyan-500 to-blue-500", accent: "#06B6D4", icon: "text-cyan-600" },
    default: { bg: "from-pink-500 to-rose-500", accent: "#EC4899", icon: "text-pink-600" },
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
  'health': Heart,
  'scheme': Shield,
  'scholarship': GraduationCap,
  'sport': BookOpen,
  'motivation': Award,
  'default': HeartPulse,
};
const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

// --- ENHANCED HEALTH CARD ---
const HealthCard = ({ program, index }) => {
    const colorTheme = getColorClass(program.interest || program.type);
    const IconComponent = getIcon(program.type);

    return (
        <a
            href={program.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer block border border-gray-100 hover:border-gray-300"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${program.image_url})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${colorTheme.bg} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}/>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 text-white h-full flex flex-col justify-between">
                
                {/* Top Section */}
                <div>
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-7 h-7 text-white" size={28} />
                    </div>

                    {/* Category Badge */}
                    <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3 border border-white/30">
                        {program.type ? program.type.toUpperCase() : 'WELLNESS'}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2 leading-tight">
                        {program.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-white/85 text-sm mb-3">
                        {program.interest || 'Health & Wellness'}
                    </p>

                    {/* Description */}
                    <p className="text-white/80 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {program.description}
                    </p>
                </div>

                {/* Bottom Section */}
                <div className="space-y-3">
                    {/* Metadata */}
                    <div className="space-y-2 text-xs text-white/90">
                        {program.region && (
                            <div className="flex items-center gap-2">
                                <MapPin size={14} className="flex-shrink-0" />
                                <span>{program.region}</span>
                            </div>
                        )}
                        {(program.age_min || program.age_max) && (
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="flex-shrink-0" />
                                <span>Ages {program.age_min || '18'} - {program.age_max || '65'}</span>
                            </div>
                        )}
                    </div>

                    {/* Feature Badge */}
                    {program.feature_text && (
                        <div className="bg-white/15 backdrop-blur-sm px-3 py-2 rounded-lg inline-flex items-center space-x-2 border border-white/20">
                            <Zap size={14} className="text-yellow-300 fill-yellow-300" />
                            <span className="text-xs font-bold uppercase">{program.feature_text}</span>
                        </div>
                    )}

                    {/* CTA Button */}
                    <button className="w-full bg-white text-[#D9534F] py-3 px-4 rounded-lg font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:scale-105 mt-4">
                        <span>View Program</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Hover Star Badge */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-white rounded-full p-2 shadow-lg">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                </div>
            </div>
        </a>
    );
};

// --- MAIN COMPONENT ---
export default function HealthPrograms() {
    const [programs, setPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // --- Data Fetching ---
    useEffect(() => {
        const fetchHealthPrograms = async () => {
            setIsLoading(true);
            setError(null);

            const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
            const userAge = storedUser.age || 18;
            const userRegion = storedUser.region || "India";

            const url = `${HEALTHCARE_ENDPOINT}?age=${userAge}&region=${userRegion}`;

            try {
                const response = await axios.get(url); 
                
                let programsArray = response.data.healthcare; 
                if (!Array.isArray(programsArray)) {
                    throw new Error("API response did not contain a valid 'healthcare' array.");
                }
                
                const updatedPrograms = programsArray.map((item) => ({
                    ...item,
                    title: item.title || item.name || "Untitled Program",
                    description: item.description || item.focus || "No description provided.",
                    interest: item.interest || item.category || "Wellness",
                    type: item.type || "health",
                    age_min: parseInt(item.age_min) || 0,
                    age_max: parseInt(item.age_max) || 99,
                    region: item.region || "India",
                    link: item.link || "#",
                    color: getColorClass(item.interest || item.type),
                    image_url: item.image_url || `https://placehold.co/600x400/${BRIGHT_CORAL.substring(1)}/FFFFFF?text=Health+Program`,
                    feature_text: item.feature_text || "Premium Program",
                }));

                setPrograms(updatedPrograms);
                setFilteredPrograms(updatedPrograms);
                setError(null);
            } catch (err) {
                console.error("Error fetching health programs:", err);
                setError("Unable to load health programs. Please try again.");
                setPrograms([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHealthPrograms();
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

        // Filter by category
        if (selectedCategory !== "All") {
            filtered = filtered.filter(prog =>
                prog.interest.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        setFilteredPrograms(filtered);
    }, [searchTerm, selectedCategory, programs]);

    // Get unique categories
    const categories = ["All", ...new Set(programs.map(p => p.interest || "Wellness"))];

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
            `}</style>

            <div className="fixed top-20 left-10 w-72 h-72 bg-[#FFC843]/5 rounded-full blur-3xl animate-float opacity-60 pointer-events-none"></div>
            <div className="fixed bottom-32 right-10 w-96 h-96 bg-[#D9534F]/5 rounded-full blur-3xl animate-float opacity-60 pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D9534F] to-[#CD4628] text-white px-6 py-2 rounded-full mb-6 shadow-lg shadow-[#D9534F]/30">
                        <HeartPulse size={20} className="animate-pulse" />
                        <span className="font-bold">Women's Health & Wellness</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4"
                        style={{ 
                            background: 'linear-gradient(135deg, #D9534F, #CD4628, #FFC843)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                        Health Programs & Initiatives
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Discover comprehensive wellness programs covering Mental Health, Yoga, Nutrition, Fitness, and more. Find the perfect program for your health journey.
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div className="mb-12 p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6 items-end">
                        
                        {/* Search Bar */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Search size={16} className="inline mr-2" />Search Programs
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by title, description, or interest..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#D9534F] focus:outline-none transition-colors"
                                    style={{ backgroundColor: SOFT_ACCENT }}
                                />
                                <Search size={20} className="absolute right-3 top-3 text-gray-400" />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Filter size={16} className="inline mr-2" />Filter by Category
                            </label>
                            <select 
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#D9534F] focus:outline-none transition-colors cursor-pointer font-medium bg-white"
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
                    <div className="mt-4 p-3 bg-gradient-to-r from-[#D9534F]/10 to-[#FFC843]/10 rounded-lg">
                        <p className="text-center font-bold text-gray-800">
                            <Sparkles className="inline mr-2 text-[#D9534F]" size={18} />
                            Showing <span className="text-[#D9534F] text-lg">{filteredPrograms.length}</span> health programs
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center p-20">
                        <div className="w-12 h-12 border-4 border-[#D9534F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#D9534F] font-bold text-xl">Loading health programs...</p>
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
                {!isLoading && filteredPrograms.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPrograms.map((program, idx) => (
                            <HealthCard key={program.id || idx} program={program} index={idx} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredPrograms.length === 0 && (
                    <div className="text-center p-16 rounded-2xl" style={{ backgroundColor: SOFT_ACCENT }}>
                        <Search size={48} className="mx-auto mb-4 opacity-30 text-[#D9534F]" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Programs Found</h3>
                        <p className="text-gray-600">
                            {searchTerm ? `No programs match "${searchTerm}".` : "No programs available."} Try adjusting your filters.
                        </p>
                    </div>
                )}

                {/* Footer */}
                {filteredPrograms.length > 0 && !isLoading && (
                    <div className="text-center mt-16">
                        <p className="text-gray-600 text-sm">
                            ✨ All {filteredPrograms.length} programs displayed | Empowering women's health
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
