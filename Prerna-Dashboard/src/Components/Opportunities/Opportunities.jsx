import React from "react";
import { ChevronRight, Award, Briefcase, GraduationCap, Star, Target, Zap } from "lucide-react";

// --- THEME COLORS ---
const BRIGHT_CORAL = "D9534F";
const DEEP_ORANGE = "CD4628";
const SUNNY_YELLOW = "FFC843";
const SOFT_PINK = "F9E8EC";

// Helper function to render appropriate icon
const getTypeIcon = (type) => {
    // Assuming 'type' field exists in MongoDB document
    switch (type ? type.toLowerCase() : '') {
        case 'job':
        case 'internship':
            return <Briefcase size={20} />;
        case 'grant':
        case 'scholarship':
        case 'fellowship':
            return <Award size={20} />;
        case 'training':
        case 'program':
        case 'skill':
            return <GraduationCap size={20} />;
        case 'event':
            return <Star size={20} />;
        default:
            return <Zap size={20} />;
    }
}

// Helper function to format score into visual confidence level
const getConfidenceLevel = (score) => {
    if (typeof score !== 'number' || score < 0.2) return 'Low';
    if (score < 0.4) return 'Moderate';
    if (score < 0.7) return 'High';
    return 'Excellent';
};

const OpportunitiesGrid = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 bg-[#FBFBFB] font-semibold border-2 border-[#D9534F]/30 rounded-xl mx-4">
                No recommended opportunities found for your criteria.
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {data.map((opportunity, i) => (
                <div
                    key={opportunity._id || i} // Use MongoDB _id or index
                    className="group bg-white rounded-xl p-5 shadow-lg border border-[#F9E8EC] hover:shadow-2xl hover:shadow-[#D9534F]/30 transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            {/* Icon Circle: Yellow background, Deep Orange icon */}
                            <div className={`w-10 h-10 rounded-full bg-[#${SUNNY_YELLOW}]/40 flex items-center justify-center text-[#${DEEP_ORANGE}]`}>
                                {getTypeIcon(opportunity.type)}
                            </div>
                            {/* Type Badge: Deep Orange text */}
                            <span className="text-xs font-extrabold uppercase text-[#CD4628]">
                                {opportunity.category || opportunity.type}
                            </span>
                        </div>
                        {/* Score Display (Confidence) */}
                        <div className="text-xs font-semibold text-gray-600">
                            Confidence: <span className="text-[#D9534F] font-extrabold">
                                {getConfidenceLevel(opportunity.score)}
                            </span>
                        </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#333333] mb-2 group-hover:text-[#D9534F] transition-colors line-clamp-2" title={opportunity.title}>
                        {opportunity.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                        {opportunity.description}
                    </p>
                    
                    {/* Region Display */}
                    <p className="text-xs text-gray-500 mb-4 italic">
                        Region: {opportunity.region} | Min Age: {opportunity.age_min}
                    </p>

                    {/* CTA Button: Deep Orange text */}
                    <button className={`w-full text-[#CD4628] font-bold text-sm flex items-center space-x-1 hover:space-x-2 transition-all`}>
                        <span>Apply / View Details</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default OpportunitiesGrid;

// import React from "react";
// import { ChevronRight, Award, Briefcase, GraduationCap, Star, Target } from "lucide-react";

// // --- THEME COLORS ---
// const BRIGHT_CORAL = "D9534F";
// const DEEP_ORANGE = "CD4628";
// const SUNNY_YELLOW = "FFC843";
// const SOFT_PINK = "F9E8EC";

// // Helper function to render appropriate icon
// const getTypeIcon = (type) => {
//     switch (type) {
//         case 'job':
//         case 'internship':
//             return <Briefcase size={20} />;
//         case 'grant':
//         case 'scholarship':
//             return <Award size={20} />;
//         case 'training':
//         case 'program':
//             return <GraduationCap size={20} />;
//         case 'fellowship':
//             return <Star size={20} />;
//         default:
//             return <Target size={20} />;
//     }
// }

// const OpportunitiesGrid = ({ data }) => {
//     if (!data || data.length === 0) {
//         return (
//             <div className="text-center py-10 text-gray-500 bg-[#FBFBFB]">
//                 No live opportunities currently matched to your profile. Check back soon!
//             </div>
//         );
//     }

//     // Limit to 8 for better presentation on the landing page
//     const opportunities = data.slice(0, 8); 

//     return (
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
//             {opportunities.map((opportunity, i) => (
//                 <div
//                     key={opportunity.id || i}
//                     className="group bg-white rounded-xl p-5 shadow-lg border border-[#F9E8EC] hover:shadow-xl hover:shadow-[#D9534F]/30 transition-all duration-300 hover:-translate-y-1"
//                 >
//                     <div className="flex items-center justify-between mb-3">
//                         <div className="flex items-center gap-2">
//                             {/* Icon Circle: Yellow background, Deep Orange icon */}
//                             <div className={`w-10 h-10 rounded-full bg-[#${SUNNY_YELLOW}]/40 flex items-center justify-center text-[#${DEEP_ORANGE}]`}>
//                                 {getTypeIcon(opportunity.type)}
//                             </div>
//                             {/* Type Badge: Deep Orange text */}
//                             <span className="text-xs font-extrabold uppercase text-[#CD4628]">
//                                 {opportunity.type}
//                             </span>
//                         </div>
//                         <span className="text-xs font-semibold text-gray-600">
//                             {opportunity.location}
//                         </span>
//                     </div>
                    
//                     {/* Title */}
//                     <h3 className="text-lg font-bold text-[#333333] mb-2 group-hover:text-[#D9534F] transition-colors">
//                         {opportunity.title}
//                     </h3>
//                     <p className="text-sm text-gray-700 mb-4 line-clamp-3">
//                         {opportunity.description}
//                     </p>
                    
//                     {/* CTA Button: Deep Orange text */}
//                     <button className={`w-full text-[#CD4628] font-bold text-sm flex items-center space-x-1 hover:space-x-2 transition-all`}>
//                         <span>Apply / View Details</span>
//                         <ChevronRight className="w-4 h-4" />
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default OpportunitiesGrid;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Heart,
// //   Award,
// //   BookOpen,
// //   Calendar,
// //   Briefcase,
// //   Layers,
// //   Star,
// //   ChevronRight,
// //   ExternalLink,
// //   MapPin,
// //   Target,
// //   Sparkles,
// //   Zap,
// //   GraduationCap
// // } from "lucide-react";
// // import COLORS from '../Constants/ThemeColors.js';

// // // // --- TEMPORARILY RE-INJECTED COLORS (Fixes "Could not resolve" error) ---
// // // const COLORS = {
// // //   PRIMARY_ACCENT: '#D9534F',      // Bright Coral/Red
// // //   SECONDARY_ACCENT: '#FFC843',    // Sunny Yellow
// // //   TERTIARY_ACCENT: '#CD4628',     // Deep Burnt Orange
// // //   SOFT_ACCENT: '#F9E8EC',        // Subtle Pink
// // //   NEUTRAL_BASE: '#FBFBFB',       // Creamy White
// // //   DARK_TEXT: '#333333'           // Dark Text/Primary Text
// // // };
// // // // --- END COLORS FIX ---


// // // --- Mock Data (Updated with user's new opportunities) ---
// // const mockOpportunities = [
// //     { id: "op65432101", title: "AI for Social Good – National Youth Challenge", type: "event", age_min: 14, age_max: 24, interest: "AI, Innovation, Social Impact", region: "India", description: "A national competition encouraging young innovators to build AI-based solutions that solve real-world social problems. Winners receive national recognition and mentorship.", image_url: "https://placehold.co/600x400/D9534F/FFFFFF?text=AI+Challenge", feature_text: "Build AI solutions for social good", score: 87, link: "#" },
// //     { id: "op65432102", title: "Women in STEM Excellence Scholarship 2025", type: "scholarship", age_min: 16, age_max: 28, interest: "STEM, Research, Technology", region: "Global", description: "A scholarship program supporting girls and young women studying science, engineering, and technology. Includes stipend, mentorship, and project funding.", image_url: "https://placehold.co/600x400/CD4628/FFFFFF?text=STEM+Scholarship", feature_text: "Scholarship for women in STEM", score: 93, link: "#" },
// //     { id: "op65432103", title: "UN Youth Changemakers Fellowship", type: "fellowship", age_min: 15, age_max: 22, interest: "Leadership, Social Work, Policy", region: "Asia", description: "A global fellowship by the United Nations that trains young changemakers in leadership, sustainability, and community impact.", image_url: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=UN+Fellowship", feature_text: "Become a UN certified youth leader", score: 90, link: "#" },
// //     { id: "op65432104", title: "Cybersecurity Explorer Program for Girls", type: "program", age_min: 13, age_max: 22, interest: "Cybersecurity, Ethical Hacking, Networks", region: "Global", description: "A beginner-friendly cybersecurity training designed for girls, covering ethical hacking, cyber hygiene, and network defense.", image_url: "https://placehold.co/600x400/10B981/FFFFFF?text=Cyber+Program", feature_text: "Start your cybersecurity journey", score: 85, link: "#" },
// //     { id: "op65432105", title: "ISRO Space Science Student Program (YUVIKA)", type: "event", age_min: 14, age_max: 18, interest: "Space, Astronomy, Physics", region: "India", description: "A space science training program for young students, featuring hands-on workshops conducted by ISRO scientists.", image_url: "https://placehold.co/600x400/D9534F/FFFFFF?text=ISRO+YUVIKA", feature_text: "Learn from ISRO scientists", score: 96, link: "#" },
// //     { id: "op65432106", title: "Girls Who Code – Summer Immersion Program 2025", type: "internship", age_min: 15, age_max: 22, interest: "Coding, Software Development, Tech", region: "Global", description: "A virtual summer program teaching young women computer science, app development, and real-world coding skills.", image_url: "https://placehold.co/600x400/3B82F6/FFFFFF?text=Girls+Who+Code", feature_text: "Become a confident coder", score: 88, link: "#" },
// //     { id: "op65432107", title: "National Arts & Talent Discovery Competition", type: "event", age_min: 10, age_max: 18, interest: "Art, Music, Dance", region: "India", description: "An annual arts competition giving young students a platform to showcase talent in painting, dance, music, and crafts.", image_url: "https://placehold.co/600x400/FFC843/FFFFFF?text=Arts+Competition", feature_text: "Show your artistic talent", score: 74, link: "#" },
// //     { id: "op65432108", title: "Microsoft Young Innovators Bootcamp", type: "program", age_min: 12, age_max: 20, interest: "Tech, AI, Cloud", region: "Global", description: "A beginner-friendly tech bootcamp covering cloud computing, AI fundamentals, and hands-on project building with Microsoft tools.", image_url: "https://placehold.co/600x400/10B981/FFFFFF?text=MS+Bootcamp", feature_text: "Learn AI & cloud from Microsoft", score: 89, link: "#" },
// //     { id: "op65432109", title: "Global Youth Entrepreneurship Challenge", type: "event", age_min: 15, age_max: 24, interest: "Entrepreneurship, Business, Innovation", region: "Global", description: "A global business and startup challenge where young participants solve real-world problems with innovative solutions.", image_url: "https://placehold.co/600x400/CD4628/FFFFFF?text=Entrepreneurship", feature_text: "Build your startup idea", score: 82, link: "#" },
// //     { id: "op65432110", title: "Prerna Women Leadership & Mentorship Circle", type: "program", age_min: 14, age_max: 30, interest: "Women Empowerment, Leadership, Skill Building", region: "India", description: "A mentorship program to help girls and women grow in leadership, communication, and personal development.", image_url: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Leadership+Circle", feature_text: "Leadership mentorship for women", score: 80, link: "#" },
// // ];


// // const typeIcons = {
// //     event: <Zap />,
// //     scholarship: <Award />,
// //     internship: <Briefcase />,
// //     program: <Calendar />,
// //     fellowship: <GraduationCap />,
// // };

// // const typeColors = {
// //     event: COLORS.PRIMARY_ACCENT,
// //     scholarship: COLORS.TERTIARY_ACCENT,
// //     internship: '#3B82F6', // Blue
// //     program: '#10B981', // Green (Emerald)
// //     fellowship: '#8B5CF6', // Violet
// // };

// // const OpportunityCard = ({ opp }) => {
// //     const iconColor = typeColors[opp.type] || COLORS.DARK_TEXT;

// //     return (
// //         <div 
// //             className="group relative bg-white rounded-3xl shadow-xl border-t-8 p-6 pb-4 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
// //             style={{ borderTopColor: iconColor, borderBottom: `1px solid ${COLORS.SOFT_ACCENT}` }}
// //         >
            
// //             {/* Image Header with Floating Icon */}
// //             <div className="relative h-40 rounded-xl overflow-hidden mb-4">
// //                 <img 
// //                     src={opp.image_url} 
// //                     alt={opp.title} 
// //                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //                     // Fallback to placeholder if image fails
// //                     onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/${COLORS.SOFT_ACCENT.substring(1)}/${COLORS.DARK_TEXT.substring(1)}?text=Prerna`; }}
// //                 />
                
// //                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />

// //                 {/* Type Icon Tag */}
// //                 <div 
// //                     className="absolute top-4 left-4 p-3 rounded-full text-white shadow-lg"
// //                     style={{ backgroundColor: iconColor }}
// //                 >
// //                     {React.cloneElement(typeIcons[opp.type] || <Layers />, { size: 20 })}
// //                 </div>

// //                 {/* Score Badge */}
// //                 <div className="absolute top-4 right-4 bg-white text-sm font-bold px-3 py-1 rounded-full shadow-md flex items-center" style={{ color: COLORS.TERTIARY_ACCENT }}>
// //                     <Star className="w-4 h-4 mr-1 fill-yellow-400" style={{ color: COLORS.SECONDARY_ACCENT }}/>
// //                     {opp.score}%
// //                 </div>
// //             </div>

// //             {/* Content */}
// //             <h3 className="text-xl font-bold mb-2 truncate" style={{ color: COLORS.DARK_TEXT }}>
// //                 {opp.title}
// //             </h3>
// //             <p className="text-sm mb-3 line-clamp-2 flex-grow" style={{ color: COLORS.DARK_TEXT, opacity: 0.8 }}>
// //                 {opp.description}
// //             </p>

// //             {/* Key Features / Metadata */}
// //             <div className="flex flex-wrap gap-2 mb-4 pt-2 border-t" style={{ borderColor: COLORS.SOFT_ACCENT }}>
// //                 <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{ background: iconColor }}>
// //                     {opp.type.toUpperCase()}
// //                 </span>
// //                 <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: COLORS.SOFT_ACCENT, color: COLORS.DARK_TEXT }}>
// //                     Age: {opp.age_min}-{opp.age_max}
// //                 </span>
// //                 <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: COLORS.SOFT_ACCENT, color: COLORS.DARK_TEXT }}>
// //                     <MapPin className="w-3 h-3 inline mr-1" />{opp.region}
// //                 </span>
// //             </div>
            
// //             <p className="text-sm font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.TERTIARY_ACCENT }}>
// //                 <Sparkles className="w-4 h-4" /> {opp.feature_text}
// //             </p>

// //             {/* Action Button */}
// //             <button 
// //                 className="w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:scale-[1.01]"
// //                 style={{ background: `linear-gradient(to right, ${COLORS.PRIMARY_ACCENT}, ${COLORS.TERTIARY_ACCENT})`, color: COLORS.NEUTRAL_BASE }}
// //                 onClick={() => window.open(opp.link, '_blank')}
// //             >
// //                 View Details
// //                 <ExternalLink className="w-4 h-4" />
// //             </button>
// //         </div>
// //     );
// // };


// // const OpportunitiesGrid = ({ data }) => {
// //     // Use the mock data if no data prop is provided
// //     const opportunities = data || mockOpportunities;

// //     const [filterType, setFilterType] = useState('All');
// //     const [filterInterest, setFilterInterest] = useState('All');

// //     // Dynamically gather all available types and interests
// //     const allTypes = ['All', ...new Set(opportunities.map(o => o.type))];
// //     const allInterests = ['All', ...new Set(opportunities.flatMap(o => o.interest.split(', ').map(i => i.trim())))];
    
// //     // Sort interests alphabetically and ensure 'All' is first
// //     allInterests.sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : a.localeCompare(b)));

// //     // Filtering logic
// //     const filteredOpportunities = opportunities.filter(opp => {
// //         const typeMatch = filterType === 'All' || opp.type === filterType;
// //         const interestMatch = filterInterest === 'All' || opp.interest.includes(filterInterest);
// //         return typeMatch && interestMatch;
// //     }).sort((a, b) => b.score - a.score); // Sort by score descending

// //     return (
// //         <div style={{ backgroundColor: COLORS.NEUTRAL_BASE }} className="min-h-screen py-16">
// //             <div className="max-w-7xl mx-auto px-6">
                
// //                 <header className="text-center mb-12">
// //                     <h2 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: COLORS.DARK_TEXT }}>
// //                         Top Opportunities for You
// //                     </h2>
// //                     <p className="text-xl max-w-3xl mx-auto" style={{ color: COLORS.DARK_TEXT, opacity: 0.7 }}>
// //                         Explore curated programs, scholarships, and fellowships matched to your interests and age.
// //                     </p>
// //                 </header>

// //                 {/* Filter Controls */}
// //                 <div className="mb-10 p-6 rounded-3xl shadow-inner" style={{ backgroundColor: COLORS.SOFT_ACCENT }}>
// //                     <div className="grid md:grid-cols-2 gap-6">
                        
// //                         {/* Type Filter */}
// //                         <div>
// //                             <label className="block text-sm font-bold mb-2" style={{ color: COLORS.DARK_TEXT }}>
// //                                 <Layers className="w-4 h-4 inline mr-2" style={{ color: COLORS.PRIMARY_ACCENT }} /> Opportunity Type
// //                             </label>
// //                             <select 
// //                                 value={filterType}
// //                                 onChange={(e) => setFilterType(e.target.value)}
// //                                 className="w-full p-3 rounded-xl border-2 appearance-none cursor-pointer"
// //                                 style={{ backgroundColor: COLORS.NEUTRAL_BASE, borderColor: COLORS.PRIMARY_ACCENT, color: COLORS.DARK_TEXT }}
// //                             >
// //                                 {allTypes.map(type => (
// //                                     <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
// //                                 ))}
// //                             </select>
// //                         </div>
                        
// //                         {/* Interest Filter */}
// //                         <div>
// //                             <label className="block text-sm font-bold mb-2" style={{ color: COLORS.DARK_TEXT }}>
// //                                 <Target className="w-4 h-4 inline mr-2" style={{ color: COLORS.PRIMARY_ACCENT }} /> Focus Area
// //                             </label>
// //                             <select 
// //                                 value={filterInterest}
// //                                 onChange={(e) => setFilterInterest(e.target.value)}
// //                                 className="w-full p-3 rounded-xl border-2 appearance-none cursor-pointer"
// //                                 style={{ backgroundColor: COLORS.NEUTRAL_BASE, borderColor: COLORS.PRIMARY_ACCENT, color: COLORS.DARK_TEXT }}
// //                             >
// //                                 {allInterests.map(interest => (
// //                                     <option key={interest} value={interest}>{interest}</option>
// //                                 ))}
// //                             </select>
// //                         </div>

// //                     </div>
                    
// //                     <p className="text-center text-sm mt-4 font-semibold" style={{ color: COLORS.TERTIARY_ACCENT }}>
// //                         Showing {filteredOpportunities.length} of {opportunities.length} Total Matches (Sorted by Relevance)
// //                     </p>
// //                 </div>
                
// //                 {/* Opportunities Grid */}
// //                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {filteredOpportunities.map(opp => (
// //                         <OpportunityCard key={opp.id} opp={opp} />
// //                     ))}
// //                 </div>

// //                 {filteredOpportunities.length === 0 && (
// //                      <div className="text-center p-16 rounded-3xl" style={{ backgroundColor: COLORS.SOFT_ACCENT }}>
// //                         <h3 className="text-2xl font-bold mb-3" style={{ color: COLORS.TERTIARY_ACCENT }}>No Matches Found</h3>
// //                         <p className="text-lg" style={{ color: COLORS.DARK_TEXT, opacity: 0.8 }}>Try adjusting your filters or explore other guidance options!</p>
// //                      </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default OpportunitiesGrid;