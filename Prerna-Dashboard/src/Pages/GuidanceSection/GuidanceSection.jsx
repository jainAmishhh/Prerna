import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Zap } from 'lucide-react';

// Import remaining components (assuming they exist in the directory structure)
import GuidanceCategories from './GuidanceCategories'; 
import GuidanceAgeGroup from './GuidanceAgeGroup';
import GuidanceSchemes from './GuidanceSchemes';
import GuidanceLifeAreas from './GuidanceLifeAreas';
import GuidanceCTA from './GuidanceCTA';
import OpportunitiesGrid from '../../Components/Opportunities/Opportunities'; 

// --- THEME COLORS ---
const BRIGHT_CORAL = "D9534F";
const DEEP_ORANGE = "CD4628";
const SUNNY_YELLOW = "FFC843";
const SOFT_PINK = "F9E8EC";
const PRIMARY_TEXT = "333333";

// --- MOCK USER INPUTS FOR API DEMO ---
// NOTE: In a final app, these should come from user session/inputs.
const MOCK_USER_AGE = 22;
const MOCK_USER_REGION = "Maharashtra";
const MOCK_USER_INTERESTS = ["technology", "career", "skill development"];


const GuidanceSection = () => {
    const [opportunitiesData, setOpportunitiesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendedOpportunities = async () => {
            setIsLoading(true);
            setError(null);
            
            // Construct query parameters for the FastAPI endpoint
            const params = {
                age: MOCK_USER_AGE,
                region: MOCK_USER_REGION,
                interests: MOCK_USER_INTERESTS,
                top_k: 8 // Fetch up to 8 recommendations
            };

            try {
                // API URL is '/api/recommend' based on your FastAPI code
                const response = await axios.get('/api/recommend', { params });
                
                if (response.data.status === "success" && Array.isArray(response.data.data)) {
                    setOpportunitiesData(response.data.data);
                } else {
                    throw new Error(response.data.message || "Received invalid data structure from API.");
                }

            } catch (err) {
                console.error("Error fetching recommended data:", err);
                // Providing richer error feedback based on API integration failure
                setError(`Failed to connect to recommendation engine. Status: ${err.message || 'Network Error'}`); 
                setOpportunitiesData([]); 
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendedOpportunities();
    }, []);


    return (
        <div className="min-h-screen pt-20" style={{ backgroundColor: `#${SOFT_PINK}` }}>
            
            {/* 1. Main Categories & Introduction */}
            <GuidanceCategories />

            {/* --- Opportunity Grid Section --- */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="text-center mb-12">
                     {/* Badge: Yellow background, Deep Orange text */}
                    <div className={`inline-flex items-center bg-[#${SUNNY_YELLOW}]/40 border border-[#${DEEP_ORANGE}]/30 text-[#${DEEP_ORANGE}] px-6 py-2 rounded-full mb-4 shadow-sm`}>
                        <Zap size={20} className={`mr-2 text-[#${DEEP_ORANGE}]`} />
                        <span className="font-bold text-sm uppercase tracking-wider">Top Recommended Opportunities</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#333333] mb-2">
                        Your Next Step Starts Here
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Personalized recommendations for **Age {MOCK_USER_AGE}** in **{MOCK_USER_REGION}**, tailored to **{MOCK_USER_INTERESTS.join(', ')}** interests.
                    </p>
                    {error && (
                         <p className={`text-[#D9534F] font-semibold text-sm mt-4 p-2 border border-[#D9534F] bg-[#F9E8EC] inline-block rounded-lg`}>{error}</p>
                    )}
                </div>

                {isLoading ? (
                    <div className="text-center p-20 text-xl font-extrabold text-[#D9534F]">
                        <div className={`w-10 h-10 border-4 border-t-4 border-t-[#${BRIGHT_CORAL}] border-[#${SUNNY_YELLOW}] rounded-full animate-spin mx-auto mb-4`}></div>
                        Running recommendation engine...
                    </div>
                ) : (
                    // 2. Opportunities Grid Component - passes fetched data
                    <OpportunitiesGrid data={opportunitiesData} />
                )}
            </div>
            
            {/* Other Guidance Sections */}
            <GuidanceAgeGroup />
            <GuidanceSchemes />
            <GuidanceLifeAreas />
            <GuidanceCTA />
            
        </div>
    );
};

export default GuidanceSection;

// import React from "react";
// import GuidanceCategories from "./GuidanceCategories";
// import GuidanceAgeGroup from "./GuidanceAgeGroup";
// import GuidanceSchemes from "./GuidanceSchemes";
// import GuidanceLifeAreas from "./GuidanceLifeAreas";
// import GuidanceCTA from "./GuidanceCTA";

// const GuidanceSection = () => {
//   return (
//     // Updated Background: Creamy White/Soft Pink Mix
//     <div className="min-h-screen bg-gradient-to-br from-[#FBFBFB] via-[#F9E8EC] to-[#FBFBFB]">
//       <GuidanceCategories />
//       <GuidanceAgeGroup />
//       <GuidanceSchemes />
//       <GuidanceLifeAreas />
//       <GuidanceCTA />
//     </div>
//   );
// };

// export default GuidanceSection;

// // import React from "react";
// // import GuidanceCategories from "./GuidanceCategories";
// // import GuidanceAgeGroup from "./GuidanceAgeGroup";
// // import GuidanceSchemes from "./GuidanceSchemes";
// // import GuidanceLifeAreas from "./GuidanceLifeAreas";
// // import GuidanceCTA from "./GuidanceCTA";

// // const GuidanceSection = () => {
// //   return (
// //     <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-rose-50">
// //       <GuidanceCategories />
// //       <GuidanceAgeGroup />
// //       <GuidanceSchemes />
// //       <GuidanceLifeAreas />
// //       <GuidanceCTA />
// //     </div>
// //   );
// // };

// // export default GuidanceSection;

// // import React, { useState } from "react";
// // import {
// //   Briefcase, FileText, GraduationCap, Landmark, ShieldAlert,
// //   HeartHandshake, Sparkles, TrendingUp, Users, BookOpen,
// //   Award, MessageCircle, Video, Mic, ChevronRight, Check,
// //   Shield, Scale, DollarSign, Lightbulb, Target, Star,
// //   Phone, AlertCircle, Building2, Wallet, ScrollText,
// //   Heart,
// //   BadgeCheck
// // } from "lucide-react";

// // const GuidanceSection = () => {
// //   const [activeCategory, setActiveCategory] = useState("career");

// //   // Main Guidance Categories
// //   const guidanceCategories = [
// //     {
// //       id: "career",
// //       title: "Career Guidance & Planning",
// //       subtitle: "Your dream career starts here",
// //       icon: <Briefcase className="w-12 h-12" />,
// //       color: "from-purple-500 to-indigo-600",
// //       services: [
// //         "Personalized career path recommendations",
// //         "Industry-specific guidance for women",
// //         "Work-from-home & flexible job options",
// //         "Interview preparation & tips",
// //         "Salary negotiation strategies",
// //         "Career switch guidance"
// //       ],
// //       stats: "500+ Career Paths Explored",
// //       aiFeature: "Ask Sakhi: 'What career suits me?' - Get video guidance!"
// //     },
// //     {
// //       id: "resume",
// //       title: "Resume Building & Job Search",
// //       subtitle: "Land your dream job with confidence",
// //       icon: <FileText className="w-12 h-12" />,
// //       color: "from-pink-500 to-rose-600",
// //       services: [
// //         "AI-powered resume builder (Hindi & English)",
// //         "ATS-friendly resume templates",
// //         "Cover letter writing assistance",
// //         "LinkedIn profile optimization",
// //         "Women-friendly job board access",
// //         "Application tracking & reminders"
// //       ],
// //       stats: "50,000+ Jobs Listed",
// //       aiFeature: "Voice command: 'Create my resume' - Watch step-by-step video!"
// //     },
// //     {
// //       id: "skills",
// //       title: "Skill Development & Training",
// //       subtitle: "Learn, grow, and earn",
// //       icon: <GraduationCap className="w-12 h-12" />,
// //       color: "from-rose-500 to-pink-600",
// //       services: [
// //         "Government-certified skill courses",
// //         "Free & paid training programs",
// //         "Digital literacy & tech skills",
// //         "Vocational training opportunities",
// //         "Entrepreneurship development",
// //         "Age-specific skill recommendations"
// //       ],
// //       stats: "100+ Free Courses",
// //       aiFeature: "Speak: 'Show me tailoring courses' - Get location-based results!"
// //     },
// //     {
// //       id: "legal",
// //       title: "Legal Rights & Protection",
// //       subtitle: "Know your rights, claim your power",
// //       icon: <Landmark className="w-12 h-12" />,
// //       color: "from-indigo-600 to-purple-700",
// //       services: [
// //         "Women's legal rights explained simply",
// //         "Workplace harassment laws (POSH Act)",
// //         "Marriage & divorce rights",
// //         "Property inheritance rights",
// //         "Domestic violence protection",
// //         "Free legal aid resources"
// //       ],
// //       stats: "Legal Help in 5 Minutes",
// //       aiFeature: "Ask in Hindi: 'मेरे अधिकार क्या हैं?' - Get video explanation!"
// //     },
// //     {
// //       id: "finance",
// //       title: "Financial Literacy & Planning",
// //       subtitle: "Be financially independent & confident",
// //       icon: <HeartHandshake className="w-12 h-12" />,
// //       color: "from-purple-600 to-violet-700",
// //       services: [
// //         "Budgeting & saving strategies",
// //         "Government loan schemes for women",
// //         "Safe investment guidance",
// //         "Insurance planning for families",
// //         "Tax filing help for women",
// //         "Emergency fund creation tips"
// //       ],
// //       stats: "₹50L+ Loans Facilitated",
// //       aiFeature: "Voice query: 'How to save money?' - Get personalized video plan!"
// //     },
// //     {
// //       id: "safety",
// //       title: "Safety & Domestic Violence Help",
// //       subtitle: "Emergency support when you need it most",
// //       icon: <ShieldAlert className="w-12 h-12" />,
// //       color: "from-red-600 to-rose-700",
// //       services: [
// //         "24/7 emergency helpline access",
// //         "Safe exit planning assistance",
// //         "Protection order guidance",
// //         "Shelter home locations",
// //         "Counseling & trauma support",
// //         "Evidence collection tips"
// //       ],
// //       stats: "Immediate Help Available",
// //       aiFeature: "One-tap SOS - Instant video guide on what to do next"
// //     }
// //   ];

// //   // AI-Powered Guidance Features
// //   const aiGuidanceFeatures = [
// //     {
// //       icon: <Mic className="w-8 h-8 text-pink-600" />,
// //       title: "Voice-Activated Guidance",
// //       desc: "Speak your question in Hindi/English → Get instant video responses",
// //       example: "Try: 'मुझे नौकरी कैसे मिलेगी?'"
// //     },
// //     {
// //       icon: <Video className="w-8 h-8 text-purple-600" />,
// //       title: "Step-by-Step Video Tutorials",
// //       desc: "Complex guidance broken into easy-to-follow visual lessons",
// //       example: "Example: Resume building in 10 minutes"
// //     },
// //     {
// //       icon: <MessageCircle className="w-8 h-8 text-pink-600" />,
// //       title: "Sakhi - Your AI Mentor",
// //       desc: "24/7 chatbot companion for all your guidance needs",
// //       example: "Ask anything, get instant answers"
// //     },
// //     {
// //       icon: <Target className="w-8 h-8 text-purple-600" />,
// //       title: "Personalized Recommendations",
// //       desc: "Based on your age, location, education & goals",
// //       example: "Custom plans just for you"
// //     }
// //   ];

// //   // Government Schemes for Career & Skills
// //   const governmentSchemes = [
// //     {
// //       name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
// //       category: "Skill Training",
// //       benefit: "Free skill training + certification + job assistance",
// //       icon: <Award className="w-6 h-6 text-purple-600" />
// //     },
// //     {
// //       name: "Stand Up India Scheme",
// //       category: "Entrepreneurship",
// //       benefit: "₹10 lakh - ₹1 crore loan for women entrepreneurs",
// //       icon: <TrendingUp className="w-6 h-6 text-pink-600" />
// //     },
// //     {
// //       name: "Mahila E-Haat",
// //       category: "Business Platform",
// //       benefit: "Online marketplace for women entrepreneurs",
// //       icon: <Building2 className="w-6 h-6 text-purple-600" />
// //     },
// //     {
// //       name: "Mudra Yojana for Women",
// //       category: "Micro Loans",
// //       benefit: "Business loans up to ₹10 lakhs at low interest",
// //       icon: <Wallet className="w-6 h-6 text-pink-600" />
// //     },
// //     {
// //       name: "Beti Bachao Beti Padhao",
// //       category: "Education",
// //       benefit: "Scholarships & educational support for girls",
// //       icon: <BookOpen className="w-6 h-6 text-purple-600" />
// //     },
// //     {
// //       name: "Working Women Hostel Scheme",
// //       category: "Accommodation",
// //       benefit: "Safe, affordable housing for working women",
// //       icon: <Building2 className="w-6 h-6 text-pink-600" />
// //     }
// //   ];

// //   // Age-Specific Guidance
// //   const ageBasedGuidance = [
// //     {
// //       age: "13-18 years",
// //       focus: "Education & Career Foundation",
// //       guidance: ["Career exploration", "Stream selection", "Scholarship guidance", "Study tips"]
// //     },
// //     {
// //       age: "18-25 years",
// //       focus: "Higher Education & First Job",
// //       guidance: ["College selection", "Skill courses", "Resume building", "Interview prep"]
// //     },
// //     {
// //       age: "25-35 years",
// //       focus: "Career Growth & Work-Life Balance",
// //       guidance: ["Career advancement", "Maternity planning", "Entrepreneurship", "Upskilling"]
// //     },
// //     {
// //       age: "35-50 years",
// //       focus: "Leadership & Financial Planning",
// //       guidance: ["Leadership roles", "Investment planning", "Career transitions", "Mentorship"]
// //     },
// //     {
// //       age: "50+ years",
// //       focus: "Second Career & Retirement",
// //       guidance: ["Consulting opportunities", "Pension planning", "Senior jobs", "Social work"]
// //     }
// //   ];

// //   // Life Guidance Areas
// //   const lifeGuidanceAreas = [
// //     {
// //       icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
// //       title: "Confidence Building",
// //       topics: ["Public speaking", "Self-esteem", "Body positivity", "Leadership skills"]
// //     },
// //     {
// //       icon: <BookOpen className="w-8 h-8 text-blue-500" />,
// //       title: "Study & Education",
// //       topics: ["Study techniques", "Exam stress", "Online learning", "Time management"]
// //     },
// //     {
// //       icon: <Users className="w-8 h-8 text-pink-500" />,
// //       title: "Work-Life Balance",
// //       topics: ["Managing home & work", "Parenting tips", "Stress management", "Self-care"]
// //     },
// //     {
// //       icon: <Star className="w-8 h-8 text-purple-500" />,
// //       title: "Personal Growth",
// //       topics: ["Goal setting", "Habit building", "Communication skills", "Relationships"]
// //     }
// //   ];

// //   // Emergency Resources
// //   const emergencyResources = [
// //     { name: "Women Helpline", number: "1091", icon: <Phone className="w-5 h-5" /> },
// //     { name: "Domestic Violence", number: "181", icon: <Shield className="w-5 h-5" /> },
// //     { name: "Police Emergency", number: "100", icon: <AlertCircle className="w-5 h-5" /> },
// //     { name: "Legal Aid", number: "15100", icon: <Scale className="w-5 h-5" /> }
// //   ];

// //   return (
// //     <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-rose-50">
      
// //       {/* Hero Section */}
// //       <div className="inline-flex items-center bg-linear-to-r from-rose-500 to-pink-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg shadow-pink-200">
// //             <HeartPulse size={20} className="animate-pulse" />
// //             <span className="font-semibold ml-2">360° Wellness Coverage</span>
// //           </div>
// //       <section className="relative py-20 px-6 overflow-hidden">
// //         <div className="max-w-7xl mx-auto relative z-10">
// //           {/* Badge */}
// //           <div className="text-center mb-8">
// //             <div className="inline-flex items-center space-x-2 bg-linear-to-r from-pink-100 to-purple-100 px-6 py-2 rounded-full mb-6 border border-pink-200">
// //               <span className="text-pink-600 font-semibold">Your Personal Mentor - Prerna</span>
// //             </div>
// //           </div>

// //           {/* Main Title */}
// //           <div className="text-center mb-2"> 
// //             <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-pink-600 via-purple-600 to-pink-600 mb-6">
// //               Complete Guidance<br />for Every Woman
// //             </h1>
            
// //             <p className="text-gray-700 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
// //               From career planning to legal rights, financial freedom to personal growth — 
// //               get expert guidance in <span className="font-bold text-pink-600">Hindi & English</span> through 
// //               <span className="font-bold text-purple-600"> AI-powered voice & video</span>
// //             </p>

// //           </div>
// //         </div>
// //       </section>

// //       {/* Main Guidance Categories */}
// //       <section className="py-8 px-6">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
// //               Complete Support for Your Journey
// //             </h2>
// //             <p className="text-gray-600 text-lg">
// //               Every aspect of your life — career, legal, financial, safety & personal growth
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {guidanceCategories.map((category, i) => (
// //               <div key={i} className={`bg-linear-to-br ${category.color} rounded-3xl p-8 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}>
// //                 {/* Decorative Elements */}
// //                 <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full"></div>
// //                 <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full"></div>
                
// //                 <div className="relative z-10">
// //                   {/* Icon */}
// //                   <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
// //                     {category.icon}
// //                   </div>
                  
// //                   {/* Title */}
// //                   <h3 className="text-2xl md:text-3xl font-bold mb-2">{category.title}</h3>
// //                   <p className="text-white/90 mb-6 text-sm">{category.subtitle}</p>
                  
// //                   {/* Services List */}
// //                   <ul className="space-y-2 mb-6">
// //                     {category.services.map((service, idx) => (
// //                       <li key={idx} className="flex items-start space-x-2 text-sm">
// //                         <Check className="w-4 h-4 mt-0.5 shrink-0" />
// //                         <span>{service}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
                  
// //                   {/* Stats Badge */}
// //                   <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-flex items-center space-x-2 mb-4">
// //                     <Star className="w-4 h-4" />
// //                     <span className="text-sm font-semibold">{category.stats}</span>
// //                   </div>
                  
// //                   {/* AI Feature Highlight */}
// //                   <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 mb-4">
// //                     <div className="flex items-start space-x-2">
// //                       <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
// //                       <p className="text-sm italic">{category.aiFeature}</p>
// //                     </div>
// //                   </div>
                  
// //                   {/* Button */}
// //                   <button className="w-full bg-white text-gray-900 py-3 px-6 rounded-full font-bold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
// //                     <span>Get Guidance</span>
// //                     <ChevronRight className="w-5 h-5" />
// //                   </button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Age-Based Personalization */}
// //       <section className="py-16 px-6 bg-white">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
// //               Personalized for Your Life Stage
// //             </h2>
// //             <p className="text-gray-600 text-lg">
// //               Age-specific guidance that understands your unique needs
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
// //             {ageBasedGuidance.map((group, i) => (
// //               <div key={i} className="bg-linear-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100 hover:shadow-lg transition-all">
// //                 <div className="bg-linear-to-r from-pink-500 to-purple-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-3">
// //                   {i + 1}
// //                 </div>
// //                 <h3 className="text-lg font-bold text-gray-900 mb-2">{group.age}</h3>
// //                 <p className="text-sm text-pink-600 font-semibold mb-3">{group.focus}</p>
// //                 <ul className="space-y-1">
// //                   {group.guidance.map((item, idx) => (
// //                     <li key={idx} className="text-sm text-gray-600 flex items-center space-x-1">
// //                       <Check className="w-3 h-3 text-pink-500 shrink-0" />
// //                       <span>{item}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Government Schemes */}
// //       <section className="py-16 px-6 bg-linear-to-br from-purple-50 to-pink-50">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
// //               Government Schemes for Women
// //             </h2>
// //             <p className="text-gray-600 text-lg">
// //               Access career, business & education support from the government
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {governmentSchemes.map((scheme, i) => (
// //               <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-pink-100">
// //                 <div className="flex items-start space-x-4">
// //                   <div className="bg-linear-to-br from-pink-100 to-purple-100 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
// //                     {scheme.icon}
// //                   </div>
// //                   <div className="flex-1">
// //                     <div className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full inline-block mb-2 font-semibold">
// //                       {scheme.category}
// //                     </div>
// //                     <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.name}</h3>
// //                     <p className="text-gray-600 text-sm mb-3">{scheme.benefit}</p>
// //                     <button className="text-pink-600 font-semibold text-sm flex items-center space-x-1 hover:underline">
// //                       <span>Check Eligibility</span>
// //                       <ChevronRight className="w-4 h-4" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="text-center mt-8">
// //             <button className="bg-linear-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all inline-flex items-center space-x-2">
// //               <span>Explore All 100+ Schemes</span>
// //               <Award className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Life Guidance Areas */}
// //       <section className="py-16 px-6 bg-white">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-12">
// //             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
// //               Personal Growth & Life Guidance
// //             </h2>
// //             <p className="text-gray-600 text-lg">
// //               Beyond career — confidence, studies, work-life balance & more
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             {lifeGuidanceAreas.map((area, i) => (
// //               <div key={i} className="bg-linear-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100 hover:shadow-xl transition-all duration-300">
// //                 <div className="bg-white rounded-xl w-16 h-16 flex items-center justify-center mb-4 shadow-md">
// //                   {area.icon}
// //                 </div>
// //                 <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
// //                 <ul className="space-y-2">
// //                   {area.topics.map((topic, idx) => (
// //                     <li key={idx} className="text-sm text-gray-600 flex items-center space-x-2">
// //                       <Check className="w-4 h-4 text-pink-500 shrink-0" />
// //                       <span>{topic}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>


// //       {/* Final CTA */}
// //       <div className="max-w-7xl mx-auto px-6 py-20">
// //         <div className="relative bg-linear-to-br from-pink-500 via-purple-500 to-rose-500 rounded-[60px] p-16 text-center overflow-hidden shadow-2xl">
// //           {/* Background Decoration */}
// //           <div className="absolute inset-0 overflow-hidden">
// //             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-48 -translate-y-48"></div>
// //             <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full transform -translate-x-48 translate-y-48"></div>
// //           </div>

// //           {/* Foreground Content */}
// //           <div className="relative z-10">
// //             <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6">
// //               <BadgeCheck 
// //                 className="text-white  animate-pulse"
// //                 size={48}
// //               />
// //             </div>

// //             <h2 className="text-5xl font-bold text-white mb-6">
// //               Your Success Journey Starts Here
// //             </h2>

// //             <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
// //               Join 50,000+ women who transformed their lives with Prerna's guidance
// //             </p>

// //             <div className="flex justify-center gap-6 flex-wrap">
// //               <button className="bg-white text-pink-600 font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
// //                 <Mic size={22} /> Start with Your Voice
// //               </button>

// //               <button className="bg-white/20 backdrop-blur-md text-white font-semibold px-10 py-4 rounded-full text-lg shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 flex items-center gap-2">
// //                 <MessageCircle size={22} />
// //                 <span>Chat with Sakhi</span>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default GuidanceSection;