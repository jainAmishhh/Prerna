import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight, Award, Briefcase, GraduationCap, Zap, Heart, Shield, Layers, MapPin, Trophy, ExternalLink, Star, Search, Sparkles, Flame } from "lucide-react";
import CTASection from "./CTASection";
import { useTranslation } from "react-i18next";

// --- THEME COLORS ---
const BRIGHT_CORAL = "D9534F";
const DEEP_ORANGE = "CD4628";
const SUNNY_YELLOW = "FFC843";
const SOFT_PINK = "F9E8EC";
const NEUTRAL_BASE = "FBFBFB";
const DARK_TEXT = "333333";

// --- CONFIGURATION ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// --- API ENDPOINTS ---
export const ENDPOINTS = {
    schemes: `${API_BASE_URL}/schemes`,
    scholarships: `${API_BASE_URL}/scholarships`,
    sports: `${API_BASE_URL}/sports`,
    motivation: `${API_BASE_URL}/motivation`,
    healthcare: `${API_BASE_URL}/healthcare`,
};

// Enhanced icon function with more vibrant colors
const getTypeIcon = (type) => {
    switch (type ? type.toLowerCase() : '') {
        case 'job':
        case 'internship':
            return <Briefcase size={24} />;
        case 'grant':
        case 'scholarship':
            return <GraduationCap size={24} />;
        case 'fellowship':
            return <Award size={24} />;
        case 'training':
        case 'program':
        case 'skill':
            return <Sparkles size={24} />;
        case 'event':
            return <Flame size={24} />;
        case 'motivation':
            return <Star size={24} />;
        case 'health':
        case 'healthcare':
            return <Heart size={24} />;
        case 'sport':
        case 'sports':
            return <Trophy size={24} />;
        case 'scheme':
            return <Shield size={24} />;
        default:
            return <Layers size={24} />;
    }
};

// Color scheme for different opportunity types
const getCategoryColor = (type) => {
    const typeMap = {
        'scholarship': { bg: 'from-purple-500 to-pink-500', icon: '#FF1493' },
        'scheme': { bg: 'from-blue-500 to-cyan-500', icon: '#00BFFF' },
        'sport': { bg: 'from-orange-500 to-red-500', icon: '#FF6347' },
        'motivation': { bg: 'from-pink-500 to-rose-500', icon: '#FF69B4' },
        'healthcare': { bg: 'from-red-500 to-pink-500', icon: '#E91E63' },
        'job': { bg: 'from-green-500 to-teal-500', icon: '#20B2AA' },
        'training': { bg: 'from-yellow-500 to-orange-500', icon: '#FFA500' },
    };
    return typeMap[type?.toLowerCase()] || { bg: 'from-gray-500 to-slate-500', icon: '#708090' };
};

const getConfidenceLevel = (score) => {
    if (typeof score !== 'number') return 'N/A';
    const normalizedScore = score > 1 ? score : score * 100;
    if (normalizedScore < 20) return 'Low';
    if (normalizedScore < 40) return 'Moderate';
    if (normalizedScore < 70) return 'High';
    return 'Excellent';
};

const getScoreColor = (score) => {
    const level = getConfidenceLevel(score);
    switch (level) {
        case 'Excellent':
            return 'from-green-400 to-emerald-600';
        case 'High':
            return 'from-yellow-400 to-amber-600';
        case 'Moderate':
            return 'from-orange-400 to-orange-600';
        default:
            return 'from-gray-400 to-gray-600';
    }
};

// --- ENHANCED OPPORTUNITY CARD ---
const OpportunityCard = ({ opportunity, index }) => {
    const { t, i18n } = useTranslation();
    const categoryColors = getCategoryColor(opportunity.type);
    const scoreColor = getScoreColor(opportunity.score || 0);
    const isHighScore = getConfidenceLevel(opportunity.score || 0) === 'Excellent';

    return (
        <a 
            href={opportunity.link || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group h-full"
        >
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col h-full relative"
                style={{
                    background: 'linear-linear(135deg, #FFFFFF 0%, #FFF8FA 100%)',
                    boxShadow: '0 10px 40px rgba(217, 83, 79, 0.1)'
                }}
            >
                

                {/* Header Section with Gradient Background */}
                <div className={`bg-linear-to-r ${categoryColors.bg} p-8 relative overflow-hidden`}>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-6 -mb-6"></div>

                    {/* Type Icon */}
                    <div className="relative z-10 flex items-start justify-between mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 border border-white/30">
                            <div style={{ color: categoryColors.icon }}>
                                {getTypeIcon(opportunity.type)}
                            </div>
                        </div>
                        
                    </div>

                    {/* Category Badge */}
                    <div>
                        <span className="inline-block text-xs font-extrabold uppercase text-white bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            {opportunity.category || opportunity.type}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col grow p-6">
                    
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#333333] mb-3 group-hover:text-[#D9534F] transition-colors line-clamp-2 leading-tight" 
                        title={opportunity.title}>
                        {opportunity.title}
                    </h3>
                    
                    {/* Divider */}
                    <div className="h-1 w-12 bg-linear-to-r from-[#D9534F] to-[#FFC843] rounded-full mb-4 group-hover:w-20 transition-all duration-300"></div>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-700 mb-6 line-clamp-3 grow leading-relaxed">
                        {opportunity.description || "No detailed description available."}
                    </p>
                    
                    {/* Metadata Section */}
                    <div className="space-y-3 mb-6">
                        {/* Region */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin size={16} className="text-[#D9534F] shrink-0" />
                            <span className="font-medium">{opportunity.region || 'India'}</span>
                        </div>

                        {/* Age Range */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Heart size={16} className="text-[#D9534F] shrink-0" />
                            <span className="font-medium">{t("ageRange")} {opportunity.age_min || 'N/A'} - {opportunity.age_max || 'N/A'}</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button 
                        className="w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 text-white bg-linear-to-r from-[#D9534F] to-[#CD4628] hover:from-[#CD4628] hover:to-[#A53320] flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl group-hover:scale-105 mt-auto"
                    >
                        <span>{t("exploreApply")}</span>
                        <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </a>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function OpportunitiesPage() {
    const { t, i18n } = useTranslation();
    const [allOpportunities, setAllOpportunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('All');
    const [filterRegion, setFilterRegion] = useState('All');
    
    const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
    const defaultRegion = storedUser.region || 'India';

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);
            
            const age = storedUser.age || 18;
            const region = storedUser.region || 'India';
            
            const fetchEndpoint = async (key, url) => {
                try {
                    const response = await axios.get(`${url}?age=${age}&region=${region}`);
                    const data = response.data[key];

                    if (Array.isArray(data)) {
                        return data.map(item => ({
                            ...item,
                            category: key.charAt(0).toUpperCase() + key.slice(1),
                            type: item.type || key,
                            age_min: item.age_min || 0,
                            age_max: item.age_max || 99,
                            region: item.region || 'India',
                            title: item.title || item.name || 'Untitled Opportunity',
                            description: item.description || item.focus || item.desc || 'A relevant opportunity.',
                        }));
                    }
                    return [];
                } catch (err) {
                    console.error(`Error fetching ${key}:`, err);
                    return [];
                }
            };

            const promises = Object.entries(ENDPOINTS).map(([key, url]) => fetchEndpoint(key, url));
            
            try {
                const results = await Promise.all(promises);
                const mergedData = results.flat().filter(item => item.title && item.link);
                setAllOpportunities(mergedData);
                setFilterRegion(defaultRegion);
            } catch (e) {
                setError(`{t("errorMessage")}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // --- Filtering Logic ---
    const allTypes = ['All', ...new Set(allOpportunities.map(o => o.type))];
    const allRegions = ['All', ...new Set(allOpportunities.map(o => o.region))];
    allRegions.sort();
    
    const filteredOpportunities = allOpportunities.filter(opp => {
        const typeMatch = filterType === 'All' || opp.type === filterType;
        const regionMatch = filterRegion === 'All' || opp.region === filterRegion;
        return typeMatch && regionMatch;
    }).sort((a, b) => (b.score || 0) - (a.score || 0))
     ; // Limit to 3 cards

    // --- Render ---
    if (loading) {
        return (
            <div className={`min-h-screen py-20 px-6 text-center text-[#${BRIGHT_CORAL}] font-bold text-xl bg-[#${NEUTRAL_BASE}]`}>
                <div className="flex flex-col items-center gap-4">
                    <Layers className="w-10 h-10 animate-spin" />
                    <p>{t("loadingMessage")}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen py-20 px-6 text-center text-red-600 font-bold text-xl bg-[#${NEUTRAL_BASE}]`}>
                <Heart className="w-8 h-8 inline mr-2 opacity-50" /> Error: {error}
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: `#${NEUTRAL_BASE}` }} className="min-h-screen py-20">
            
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
            
            <div className="fixed top-20 left-10 w-72 h-72 bg-[#FFC843]/10 rounded-full blur-3xl animate-float opacity-40 pointer-events-none"></div>
            <div className="fixed bottom-32 right-10 w-96 h-96 bg-[#D9534F]/10 rounded-full blur-3xl animate-float opacity-40 pointer-events-none" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Header */}
                <header className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Heart className="w-6 h-6 text-[#D9534F]" />
                        <span className="text-[#CD4628] font-bold text-sm uppercase tracking-wider">{t("tailoredForYou")}</span>
                        <Heart className="w-6 h-6 text-[#D9534F]" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-4" 
                        style={{ 
                            background: `linear-linear(135deg, #D9534F, #CD4628, #FFC843)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                        {t("yourBestOpportunities")}
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: `#${DARK_TEXT}`, opacity: 0.75 }}>
                        {t("curatedPrograms")}
                    </p>
                </header>

                {/* Filter Section */}
                <div className="mb-12 p-8 rounded-3xl shadow-lg" 
                    style={{ 
                        background: `linear-linear(135deg, #F9E8EC, #FBFBFB)`,
                        border: '2px solid #F9E8EC'
                    }}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-bold mb-3" style={{ color: `#${DARK_TEXT}` }}>
                                <Layers className="w-4 h-4 inline mr-2" style={{ color: `#${BRIGHT_CORAL}` }} /> 
                                {t("filterByType")}
                            </label>
                            <select 
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full p-3 rounded-xl border-2 appearance-none cursor-pointer font-medium transition-all hover:border-[#D9534F]"
                                style={{ 
                                    backgroundColor: `#${NEUTRAL_BASE}`, 
                                    borderColor: `#${BRIGHT_CORAL}20`, 
                                    color: `#${DARK_TEXT}` 
                                }}
                            >
                                {allTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        {/* Region Filter */}
                        <div>
                            <label className="block text-sm font-bold mb-3" style={{ color: `#${DARK_TEXT}` }}>
                                <MapPin className="w-4 h-4 inline mr-2" style={{ color: `#${BRIGHT_CORAL}` }} /> 
                                {t("filterByRegion")}
                            </label>
                            <select 
                                value={filterRegion}
                                onChange={(e) => setFilterRegion(e.target.value)}
                                className="w-full p-3 rounded-xl border-2 appearance-none cursor-pointer font-medium transition-all hover:border-[#D9534F]"
                                style={{ 
                                    backgroundColor: `#${NEUTRAL_BASE}`, 
                                    borderColor: `#${BRIGHT_CORAL}20`, 
                                    color: `#${DARK_TEXT}` 
                                }}
                            >
                                {allRegions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex flex-col justify-center items-center md:col-span-2 lg:col-span-1 p-4 rounded-xl bg-white/50">
                            <div className="flex items-center gap-2">
                                <Sparkles size={20} style={{ color: `#${BRIGHT_CORAL}` }} />
                                <p className="text-2xl font-extrabold" style={{ color: `#${DEEP_ORANGE}` }}>
                                    {filteredOpportunities.length}
                                </p>
                            </div>
                            <p className="text-sm font-semibold" style={{ color: `#${DARK_TEXT}`, opacity: 0.7 }}>
                                {t("topMatches")}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Opportunities Grid - 2-3 Cards */}
                {filteredOpportunities.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {filteredOpportunities.map((opp, index) => (
                            <OpportunityCard key={opp._id || opp.title} opportunity={opp} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-16 rounded-3xl" style={{ backgroundColor: `#${SOFT_PINK}` }}>
                        <Search size={48} className="mx-auto mb-4 opacity-50" style={{ color: `#${DEEP_ORANGE}` }} />
                        <h3 className="text-2xl font-bold mb-3" style={{ color: `#${DEEP_ORANGE}` }}>
                            {t("noMatchesFound")}
                        </h3>
                        <p className="text-lg" style={{ color: `#${DARK_TEXT}`, opacity: 0.8 }}>
                            {t("noMatchesDescription")}
                        </p>
                    </div>
                )}

                <CTASection />

                {/* Footer CTA */}
                <div className="text-center mt-16">
                    <p className="text-gray-600 text-sm">
                        {t("ctaLine")}
                    </p>
                </div>
            </div>
        </div>
    );
}
