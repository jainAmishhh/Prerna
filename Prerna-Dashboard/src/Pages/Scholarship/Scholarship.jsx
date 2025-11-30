import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, HeartPulse, Heart, Shield, GraduationCap, Award, BookOpen, Search, MapPin, Zap, Filter, Star, ArrowRight, Clock, Landmark, MessageCircle, Layers } from 'lucide-react';
import axios from 'axios';

// --- THEME COLORS ---
const BRIGHT_CORAL = "#D9534F"; // Primary accent
const DEEP_ORANGE = "#CD4628"; 
const SUNNY_YELLOW = "#FFC843"; 
const NEUTRAL_BASE = "#FBFBFB";
const SOFT_ACCENT = "#F9E8EC"; 
const DARK_TEXT = "#333333"; 

// --- CONFIGURATION ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SCHOLARSHIPS_ENDPOINT = `${API_BASE_URL}/scholarships`;

// --- VIBRANT COLOR GRADIENTS FOR CATEGORIES (Used for Icon Accent) ---
const GRADIENTS = {
    // Education/Scholarship related gradients
    stem: { bg: "from-blue-500 to-indigo-500", icon: "#3B82F6" },
    arts: { bg: "from-pink-500 to-rose-500", icon: "#EC4899" },
    fellowship: { bg: "from-purple-500 to-violet-500", icon: "#8B5CF6" },
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
    'scholarship': GraduationCap,
    'scheme': Shield,
    'fellowship': Award,
    'grant': Zap,
    'default': GraduationCap,
};
const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

// --- INDIVIDUAL SCHOLARSHIP CARD ---
const ScholarshipCard = ({ program, index }) => {
    const colorTheme = getColorClass(program.interest || program.type);
    const IconComponent = getIcon(program.type);

    return (
        <a
            href={program.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-1 overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-[#D9534F]/30 rounded-2xl block"
        >
            {/* Card Border Gradient - Coral to Yellow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#D9534F] via-[#CD4628] to-[#FFC843] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

            {/* Inner Content Box (White) */}
            <div className="bg-white rounded-xl p-6 h-full relative z-10 flex items-start gap-5">
                {/* Icon Box - Yellow/Coral accent background */}
                <div className="w-16 h-16 rounded-full bg-[#FFC843]/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 border border-[#FFC843]/60 group-hover:bg-[#D9534F]">
                    <IconComponent className="w-8 h-8" style={{ color: colorTheme.icon }} />
                </div>

                <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#D9534F] transition-colors line-clamp-2">
                        {program.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-2">
                        {program.description}
                    </p>
                    
                    {/* Metadata (Eligibility, Region) */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                            <MapPin size={12} className="text-[#CD4628]" />
                            {program.region}
                        </span>
                        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                            <Clock size={12} className="text-[#CD4628]" />
                            Ages: {program.age_min || 'N/A'} - {program.age_max || 'N/A'}
                        </span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        {/* Verified Scheme Badge */}
                        <span className="text-xs font-bold bg-[#F9E8EC] text-green-700 px-3 py-1 rounded-full border border-[#D9534F]/30 flex items-center gap-1">
                            <Shield size={12} /> Verified Scheme
                        </span>
                        
                    </div>
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
export default function ScholarshipPage() {
    const [programs, setPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // --- Data Fetching ---
    useEffect(() => {
        const fetchScholarshipPrograms = async () => {
            setIsLoading(true);
            setError(null);

            const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
            const userAge = storedUser.age || 18;
            const userRegion = storedUser.region || "India";

            const url = `${SCHOLARSHIPS_ENDPOINT}?age=${userAge}&region=${userRegion}`;

            try {
                const response = await axios.get(url); 
                
                // Expecting data under the 'scholarships' key
                let programsArray = response.data.scholarships; 
                if (!Array.isArray(programsArray)) {
                    throw new Error("API response did not contain a valid 'scholarships' array.");
                }
                
                const updatedPrograms = programsArray.map((item) => ({
                    ...item,
                    title: item.title || item.name || "Untitled Scholarship",
                    description: item.description || item.focus || "No description provided.",
                    interest: item.interest || item.category || "Scholarship",
                    type: item.type || "scholarship",
                    age_min: parseInt(item.age_min) || 0,
                    age_max: parseInt(item.age_max) || 99,
                    region: item.region || "India",
                    link: item.link || "#",
                    
                    // Derive color class based on interest/type
                    color: getColorClass(item.interest || item.type), 
                    image_url: item.image_url || `https://placehold.co/600x400/${BRIGHT_CORAL.substring(1)}/FFFFFF?text=Scholarship`,
                }));

                setPrograms(updatedPrograms);
                setFilteredPrograms(updatedPrograms);
                setError(null);
            } catch (err) {
                console.error("Error fetching scholarship programs:", err);
                setError("Unable to load scholarship programs. Please try again.");
                setPrograms([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchScholarshipPrograms();
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

    // Get unique categories for the filter dropdown
    const categories = ["All", ...new Set(programs.map(p => p.interest || "Scholarship"))];

    // --- Render ---
    return (
        <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: NEUTRAL_BASE }}>
            
            {/* Background Decoration (Reusing float style) */}
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
                    <div className="inline-flex items-center bg-white border border-[#D9534F]/30 text-[#CD4628] px-6 py-2 rounded-full mb-6 shadow-sm">
                        <Landmark size={18} />
                        <span className="font-bold ml-2 tracking-wide text-sm uppercase">
                            Education & Funding Initiatives
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif"
                        style={{ color: DARK_TEXT }}>
                        Scholarships & Grants for Women
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        A complete database of verified government and private scholarship opportunities.
                    </p>
                </div>

                {/* Search & Filter Section */}
                <div className="mb-12 p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6 items-end">
                        
                        {/* Search Bar */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Search size={16} className="inline mr-2 text-[#CD4628]" />Search Programs
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by title, field, or interest..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#D9534F] focus:outline-none transition-colors"
                                    style={{ backgroundColor: SOFT_ACCENT }}
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="md:col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                <Filter size={16} className="inline mr-2 text-[#CD4628]" />Filter by Focus
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
                            Showing <span className="text-[#D9534F] text-lg">{filteredPrograms.length}</span> scholarships matching your profile.
                        </p>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center p-20">
                        <div className="w-12 h-12 border-4 border-[#D9534F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#D9534F] font-bold text-xl">Loading scholarships...</p>
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
                            <ScholarshipCard key={program.id || idx} program={program} index={idx} />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    !isLoading && (
                        <div className="text-center p-16 rounded-2xl" style={{ backgroundColor: SOFT_ACCENT }}>
                            <Search size={48} className="mx-auto mb-4 opacity-30 text-[#D9534F]" />
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Scholarships Found</h3>
                            <p className="text-gray-600">Try broadening your search or adjusting your filters.</p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
