import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Users, Award, Shield, Heart, ChevronRight, Search, Filter, Sparkles, Flame, Star, ArrowRight, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const SCHEMES_ENDPOINT = `${API_BASE_URL}/schemes`;

// Icon mapping
const iconMap = {
  'scheme': Shield,
  'scholarship': GraduationCap,
  'sport': BookOpen,
  'motivation': Award,
  'health': Heart,
  'default': Shield,
};

const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

// Color themes for schemes
const themeColors = [
  { bg: 'from-purple-500 to-pink-500', accent: '#EC407A', icon: 'text-purple-600' },
  { bg: 'from-blue-500 to-cyan-500', accent: '#00BCD4', icon: 'text-blue-600' },
  { bg: 'from-orange-500 to-red-500', accent: '#FF7043', icon: 'text-orange-600' },
  { bg: 'from-green-500 to-teal-500', accent: '#26A69A', icon: 'text-green-600' },
  { bg: 'from-pink-500 to-rose-500', accent: '#F06292', icon: 'text-pink-600' },
  { bg: 'from-indigo-500 to-purple-500', accent: '#5C6BC0', icon: 'text-indigo-600' },
  { bg: 'from-yellow-500 to-orange-500', accent: '#FFA726', icon: 'text-yellow-600' },
  { bg: 'from-red-500 to-pink-500', accent: '#EF5350', icon: 'text-red-600' },
];

// --- ENHANCED SCHEME CARD ---
const SchemeCard = ({ item, index }) => {
  const theme = themeColors[index % themeColors.length];
  const IconComponent = getIcon(item.type || 'scheme');

  return (
    <a 
      href={item.link || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group h-full"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 flex flex-col h-full relative hover:border-gray-300">
        
        {/* Top Gradient Bar */}
        <div className={`h-2 w-full bg-gradient-to-r ${theme.bg}`}></div>

        {/* Header Section with Gradient Background */}
        <div className={`bg-gradient-to-br ${theme.bg} p-6 relative overflow-hidden`}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-4 -mb-4"></div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 shadow-lg border border-white/30">
              <IconComponent className="text-white" size={28} />
            </div>

            {/* Type Badge */}
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              {item.type ? item.type.toUpperCase() : 'SCHEME'}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2 leading-tight">
            {item.title || item.name || "Untitled Scheme"}
          </h3>

          {/* Divider */}
          <div className="h-1 w-10 rounded-full mb-4" style={{ background: theme.accent }}></div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
            {item.description || "Scheme details loading..."}
          </p>

          {/* Image */}
          <div className="mb-4 rounded-lg overflow-hidden shadow-md h-40">
            <img 
              src={item.image_url || "https://placehold.co/400x160/D9534F/ffffff?text=Scheme"} 
              alt={item.title || "Scheme"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x160/D9534F/ffffff?text=Scheme";
              }}
            />
          </div>

          {/* Metadata */}
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            {/* Region */}
            {item.region && (
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: theme.accent }} className="flex-shrink-0" />
                <span className="font-medium">{item.region}</span>
              </div>
            )}

            {/* Age Range */}
            {(item.age_min || item.age_max) && (
              <div className="flex items-center gap-2">
                <Clock size={16} style={{ color: theme.accent }} className="flex-shrink-0" />
                <span className="font-medium">
                  Ages {item.age_min || '18'} - {item.age_max || '65'}
                </span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <button 
            className="w-full py-3 px-4 rounded-lg font-bold text-sm transition-all duration-300 text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg group-hover:scale-105 mt-auto"
            style={{ background: `linear-gradient(135deg, ${theme.accent}, #D9534F)` }}
          >
            <span>View Details</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Hover Badge */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <Star size={20} style={{ color: theme.accent }} className="fill-current" />
          </div>
        </div>
      </div>
    </a>
  );
};

// --- MAIN COMPONENT ---
export default function AllSchemes() {
  const t = (key, fallback) => {
    if (key === "schemes.title") return "Women's Government Schemes";
    if (key === "schemes.subtitle") return "Explore all available schemes and programs tailored for your profile. Discover opportunities that empower you.";
    if (key === "schemes.learn_more") return "View Scheme Details";
    if (key === "schemes.more_opportunities") return "Browse All Schemes";
    if (key === "schemes.no_results") return "No schemes found for your criteria";
    if (key === "schemes.search") return "Search schemes...";
    if (key === "schemes.total") return "Total Schemes Available";
    return fallback;
  }; 
  
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};
    const userAge = storedUser.age || 18;
    const userRegion = storedUser.region || "India";
    
    const url = `${SCHEMES_ENDPOINT}?age=${userAge}&region=${userRegion}`;

    axios.get(url)
      .then(response => {
        if (response.data && Array.isArray(response.data.schemes)) {
          setOpportunities(response.data.schemes);
          setFilteredOpportunities(response.data.schemes);
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

  // Filter logic
  useEffect(() => {
    let filtered = opportunities;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'All') {
      filtered = filtered.filter(item => (item.type || '').toLowerCase() === selectedType.toLowerCase());
    }

    setFilteredOpportunities(filtered);
  }, [searchTerm, selectedType, opportunities]);

  // Get unique types
  const uniqueTypes = ['All', ...new Set(opportunities.map(o => o.type || 'scheme'))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FBFBFB] to-[#F9E8EC] py-20 px-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <Sparkles className="w-12 h-12 animate-spin text-[#D9534F]" />
          <p className="text-[#D9534F] font-bold text-xl">Loading all schemes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FBFBFB] to-[#F9E8EC] py-20 px-6 text-center">
        <Heart className="w-12 h-12 inline mb-4 opacity-50 text-[#D9534F]" />
        <p className="text-red-600 font-bold text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBFBFB] via-[#F9E8EC] to-[#FBFBFB] py-20 px-6 relative overflow-hidden">
      
      {/* Background decorations */}
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-[#D9534F]" />
            <span className="text-[#CD4628] font-bold text-sm uppercase tracking-wider">Empowerment Programs</span>
            <Heart className="w-6 h-6 text-[#D9534F]" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4" 
            style={{ 
              background: 'linear-gradient(135deg, #D9534F, #CD4628, #FFC843)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
            {t("schemes.title")}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t("schemes.subtitle")}
          </p>
        </div>

        {/* Filter & Search Section */}
        <div className="mb-12 p-6 rounded-2xl bg-white shadow-lg border border-gray-200">
          <div className="grid md:grid-cols-2 gap-6 items-end">
            
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Search size={16} className="inline mr-2" />Search Schemes
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("schemes.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#D9534F] focus:outline-none transition-colors"
                />
                <Search size={20} className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <Filter size={16} className="inline mr-2" />Filter by Type
              </label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-[#D9534F] focus:outline-none transition-colors cursor-pointer font-medium bg-white"
              >
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 p-3 bg-gradient-to-r from-[#D9534F]/10 to-[#FFC843]/10 rounded-lg">
            <p className="text-center font-bold text-gray-800">
              <Sparkles className="inline mr-2 text-[#D9534F]" size={18} />
              Showing <span className="text-[#D9534F] text-lg">{filteredOpportunities.length}</span> schemes
            </p>
          </div>
        </div>

        {/* Schemes Grid */}
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-20">
            <Search size={48} className="mx-auto mb-4 opacity-30 text-[#D9534F]" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Schemes Found</h3>
            <p className="text-gray-600">{t("schemes.no_results")}. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOpportunities.map((item, index) => (
              <SchemeCard key={item._id || index} item={item} index={index} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredOpportunities.length > 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-600 text-sm">
              ✨ All {filteredOpportunities.length} schemes displayed | Last updated today
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
