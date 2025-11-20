import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Users, Award, Shield, Heart, ChevronRight } from 'lucide-react';
// import { useTranslation } from "react-i18next"; 
import axios from 'axios';

// --- Configuration and Constants ---

// Using hardcoded URL as requested for compilation environment.
const API_BASE_URL = "http://127.0.0.1:8000"; 
const RECOMMEND_ENDPOINT = `${API_BASE_URL}/recommend`;
const ALL_OPPORTUNITIES_ROUTE = "/all-opportunities"; // Placeholder route for the new button

// A mapping for icons based on the data 'type' or a category in your DB
const iconMap = {
  'scheme': Shield,
  'scholarship': GraduationCap,
  'sport': BookOpen,
  'motivation': Award,
  'health': Heart,
  'default': Users,
};

// Helper function to get the appropriate icon component
const getIcon = (type) => iconMap[type.toLowerCase()] || iconMap.default;

// Dynamic card styling logic, now using Tailwind class strings for robustness and clarity.
const cardStyles = [
  // Card 1: Coral Background (#D9534F) - FIX: White Button, Coral Text/Icon for contrast
  { 
    bg: 'bg-[#D9534F]', accent: '#FFC843', text: 'text-white', 
    buttonBg: 'bg-white', buttonText: 'text-[#D9534F]', // Explicit contrast color
    buttonHover: 'hover:bg-[#FFC843]/50', borderColor: '' 
  }, 
  // Card 2: Creamy White Background (#FBFBFB) - Coral Button, White Text/Icon
  { 
    bg: 'bg-[#FBFBFB]', accent: '#D9534F', text: 'text-[#333333]', 
    buttonBg: 'bg-[#D9534F]', buttonText: 'text-white', 
    buttonHover: 'hover:bg-[#FFC843]', borderColor: 'border border-[#FFC843]' 
  }, 
  // Card 3: Yellow Background (#FFC843) - Coral Button, White Text/Icon
  { 
    bg: 'bg-[#FFC843]', accent: '#D9534F', text: 'text-[#333333]', 
    buttonBg: 'bg-[#D9534F]', buttonText: 'text-white', 
    buttonHover: 'hover:bg-white hover:text-[#D9534F]', borderColor: '' // Add text color change for hover
  }, 
];


export default function FeatureCards() {
  const t = (key, fallback) => {
    // Mock translation function: returns hardcoded English fallbacks
    if (key === "services.title") return "Personalized Opportunities";
    if (key === "services.subtitle") return "Recommendations based on your profile.";
    if (key === "services.learn_more") return "Read More";
    if (key === "services.more_opportunities") return "More Opportunities"; // New key
    return fallback;
  }; 
  
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Data from FastAPI Endpoint ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("prerna_user")) || {};

    const userAge = storedUser.age || 18;
    const userRegion = storedUser.region || "India";
    const userInterests = storedUser.interests || [
      "skill development",
      "child care",
      "trusted staff"
    ];

    const interestsQuery = userInterests.map(i => `interests=${i}`).join('&');
    const url = `${RECOMMEND_ENDPOINT}?age=${userAge}&region=${userRegion}&${interestsQuery}&top_k=3`;

    axios.get(url)
      .then(response => {
        if (response.data.status === 'success') {
          setOpportunities(response.data.data);
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
        Loading personalized opportunities...
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
  
  const opportunitiesToDisplay = opportunities.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FBFBFB] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#FFC843] to-[#D9534F] mb-4">
            {t("services.title")}
          </h2>
          <p className="text-[#333333] text-xl">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Card Grid */}
        {opportunitiesToDisplay.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No personalized opportunities found matching your criteria. Try adjusting your profile!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            
            {opportunitiesToDisplay.map((item, index) => {
              const style = cardStyles[index % cardStyles.length]; // Cycle through the three defined styles
              const IconComponent = getIcon(item.type || 'default');
              const ButtonIcon = getIcon(item.type || 'default');
              
              // Determine if the card itself has a coral background
              const isCoralCardBg = style.bg === 'bg-[#D9534F]';
              
              // Determine if the button is white, requiring colored text/icon
              const isWhiteButton = style.buttonBg === 'bg-white';

              return (
                <a 
                  href={item.link || '#'} 
                  key={item._id} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  // Apply dynamic background and border styles
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
                      {item.title || "Untitled Opportunity"}
                    </h3>

                    {/* Description (Dynamic) */}
                    <p className={`${style.text} ${isCoralCardBg ? 'text-white/90' : 'text-gray-700'} text-base mb-6 leading-relaxed`}>
                      {item.description || "A detailed description is not available for this recommendation."}
                    </p>

                    {/* Image Section - Curved Shape (Dynamic) */}
                    <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                      <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
                        <img 
                          src={item.image_url || "https://placehold.co/400x224/A0A0A0/ffffff?text=Image+Missing"} 
                          alt={item.title || "Opportunity"}
                          className="w-full h-56 object-cover"
                          onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://placehold.co/400x224/A0A0A0/ffffff?text=Image+Missing";
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
                      <span>{t("services.learn_more")}</span>
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
                <span>{t("services.more_opportunities")}</span>
                <ChevronRight size={20} />
            </a>
        </div>

      </div>
    </div>
  );
}

// import React from 'react';
// import { GraduationCap, BookOpen, Users, Award, Shield, Heart } from 'lucide-react';
// import { useTranslation } from 'react-i18next';

// const Card = ({
//   title,
//   description,
//   icon: Icon,
//   imgSrc,
//   bgColor = 'bg-white',
//   iconBg = 'bg-white/30',
//   buttonBg = 'bg-white',
//   buttonTextColor = 'text-gray-800',
//   buttonHoverBg = 'hover:bg-gray-200',
//   buttonIcon: ButtonIcon,
// }) => {
//   return (
//     <div className={`group relative ${bgColor} overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8`}>
//       {/* Decorative Circle Top */}
//       <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>

//       <div className="relative z-10">
//         {/* Icon */}
//         <div className={`flex items-center justify-center mb-6 w-16 h-16 rounded-2xl ${iconBg} transform group-hover:rotate-12 transition-transform duration-300`}>
//           <Icon className="text-white" size={32} />
//         </div>

//         {/* Title */}
//         <h3 className="text-3xl font-bold mb-4">{title}</h3>

//         {/* Description */}
//         <p className="text-base mb-6 leading-relaxed">{description}</p>

//         {/* Image */}
//         <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
//           <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
//             <img src={imgSrc} alt={title} className="w-full h-56 object-cover" />
//             <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
//           </div>
//           <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
//         </div>

//         {/* Button */}
//         <button className={`w-full ${buttonBg} ${buttonTextColor} py-3 px-6 rounded-full font-bold text-lg flex items-center justify-center space-x-2 transition-all duration-300 ${buttonHoverBg} group-hover:shadow-xl`}>
//           <span>{title}</span>
//           {ButtonIcon && <ButtonIcon size={20} />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default function FeatureCards() {
//   const { t } = useTranslation();

//   const services = [
//     {
//       title: t('services.childcare_title'),
//       description: t('services.childcare_desc'),
//       icon: Users,
//       imgSrc: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?q=80&w=1074&auto=format&fit=crop',
//       bgColor: 'bg-[#D9534F]',
//       iconBg: 'bg-white/30',
//       buttonBg: 'bg-white',
//       buttonTextColor: 'text-[#D9534F]',
//       buttonHoverBg: 'hover:bg-[#FFC843]/50',
//       buttonIcon: Shield,
//     },
//     {
//       title: t('services.learning_title'),
//       description: t('services.learning_desc'),
//       icon: GraduationCap,
//       imgSrc: 'https://plus.unsplash.com/premium_photo-1663047551367-a47365e55907?q=80&w=1170&auto=format&fit=crop',
//       bgColor: 'bg-[#FBFBFB] border border-[#FFC843]',
//       iconBg: 'bg-[#D9534F]/40',
//       buttonBg: 'bg-[#D9534F]',
//       buttonTextColor: 'text-white',
//       buttonHoverBg: 'hover:bg-[#FFC843]',
//       buttonIcon: BookOpen,
//     },
//     {
//       title: t('services.staff_title'),
//       description: t('services.staff_desc'),
//       icon: Award,
//       imgSrc: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1170&auto=format&fit=crop',
//       bgColor: 'bg-[#FFC843]',
//       iconBg: 'bg-[#D9534F]/40',
//       buttonBg: 'bg-[#D9534F]',
//       buttonTextColor: 'text-white',
//       buttonHoverBg: 'hover:bg-white',
//       buttonIcon: Heart,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#FBFBFB] py-20 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#FFC843] to-[#D9534F] mb-4">
//             {t('services.title')}
//           </h2>
//           <p className="text-[#333333] text-xl">{t('services.subtitle')}</p>
//         </div>

//         {/* Services Cards */}
//         <div className="grid md:grid-cols-3 gap-8">
//           {services.map((service, idx) => (
//             <Card key={idx} {...service} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React from 'react';
// import { GraduationCap, BookOpen, Users, Award, Shield, Heart } from 'lucide-react';
// import { useTranslation } from "react-i18next";

// export default function FeatureCards() {
//   const { t } = useTranslation();
  
//   return (
//     // Updated Background: FBFBFB (Creamy White)
//     <div className="min-h-screen bg-[#FBFBFB] py-20 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           {/* Header Gradient Updated: FFC843 to D9534F */}
//           <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#FFC843] to-[#D9534F] mb-4">
//             {t("services.title")}
//           </h2>
//           <p className="text-[#333333] text-xl">
//             {t("services.subtitle")}
//           </p>
//         </div>

//         {/* Cards Grid - Old Services (High Contrast Blocks) */}
//         <div className="grid md:grid-cols-3 gap-8">
          
//           {/* Licensed Child Care Card (Coral Block) */}
//           <div className="group relative bg-[#D9534F] overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8">
//             {/* Decorative Circle Top */}
//             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFC843] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
//             <div className="relative z-10">
//               {/* Icon */}
//               <div className="bg-white/30 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//                 <Users className="text-white" size={32} />
//               </div>

//               {/* Title */}
//               <h3 className="text-white text-3xl font-bold mb-4">
//                 {t("services.childcare_title")}
//               </h3>

//               {/* Description */}
//               <p className="text-white/90 text-base mb-6 leading-relaxed">
//                 {t("services.childcare_desc")}
//               </p>

//               {/* Image Section - Curved Shape */}
//               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
//                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
//                   <img 
//                     src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?q=80&w=1074&auto=format&fit=crop"
//                     alt="Children playing"
//                     className="w-full h-56 object-cover"
//                   />
//                   {/* Overlay color adjusted */}
//                   <div className="absolute inset-0 bg-linear-to-t from-[#D9534F]/60 to-transparent"></div>
//                 </div>
//                 {/* Small decorative circle on image */}
//                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FFC843] rounded-full opacity-80"></div>
//               </div>

//               {/* Button */}
//               <button className="w-full bg-white text-[#D9534F] py-3 px-6 rounded-full font-bold text-lg hover:bg-[#FFC843]/50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
//                 <span>{t("services.learn_more")}</span>
//                 <Shield size={20} />
//               </button>
//             </div>
//           </div>

//           {/* High Quality Learning Card (White Block with Coral/Yellow Accents) */}
//           <div className="group relative bg-[#FBFBFB] overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-[#FFC843]">
//             {/* Decorative Circle Top */}
//             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFC843] rounded-full opacity-80 group-hover:scale-110 transition-transform duration-500"></div>
            
//             <div className="relative z-10">
//               {/* Icon */}
//               <div className="bg-[#D9534F]/40 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//                 <GraduationCap className="text-white" size={32} />
//               </div>

//               {/* Title */}
//               <h3 className="text-[#333333] text-3xl font-bold mb-4">
//                 {t("services.learning_title")}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-700 text-base mb-6 leading-relaxed">
//                 {t("services.learning_desc")}
//               </p>

//               {/* Image Section - Curved Shape */}
//               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
//                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
//                   <img 
//                     src="https://plus.unsplash.com/premium_photo-1663047551367-a47365e55907?q=80&w=1170&auto=format&fit=crop"
//                     alt="Student learning"
//                     className="w-full h-56 object-cover"
//                   />
//                   {/* Overlay color adjusted */}
//                   <div className="absolute inset-0 bg-linear-to-t from-[#D9534F]/60 to-transparent"></div>
//                 </div>
//                 {/* Small decorative circle on image */}
//                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#D9534F] rounded-full opacity-80"></div>
//               </div>

//               {/* Button */}
//               <button className="w-full bg-[#D9534F] text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-[#FFC843] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
//                 <span>{t("services.learn_more")}</span>
//                 <BookOpen size={20} />
//               </button>
//             </div>
//           </div>

//           {/* Trusted Staff Card (Yellow Block) */}
//           <div className="group relative bg-[#FFC843] overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8">
//             {/* Decorative Circle Top */}
//             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D9534F] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
//             <div className="relative z-10">
//               {/* Icon */}
//               <div className="bg-[#D9534F]/40 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//                 <Award className="text-white" size={32} />
//               </div>

//               {/* Title */}
//               <h3 className="text-[#333333] text-3xl font-bold mb-4">
//                 {t("services.staff_title")}
//               </h3>

//               {/* Description */}
//               <p className="text-gray-800 text-base mb-6 leading-relaxed">
//               {t("services.staff_desc")}
//               </p>

//               {/* Image Section - Curved Shape */}
//               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
//                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
//                   <img 
//                     src="https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1170&auto=format&fit=crop"
//                     alt="Professional staff"
//                     className="w-full h-56 object-cover"
//                   />
//                   {/* Overlay color adjusted */}
//                   <div className="absolute inset-0 bg-linear-to-t from-[#D9534F]/60 to-transparent"></div>
//                 </div>
//                 {/* Small decorative circle on image */}
//                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#D9534F] rounded-full opacity-80"></div>
//               </div>

//               {/* Button */}
//               <button className="w-full bg-[#D9534F] text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
//                 <span>{t("services.learn_more")}</span>
//                 <Heart size={20} />
//               </button>
//             </div>
//           </div>

//         </div>

//         {/* Women-Centric Version - Alternative Cards */}
//         <div className="mt-20">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-[#D9534F] to-[#FFC843] mb-4">
//               {t("services.women_programs_title")}
//             </h2>
//             <p className="text-[#333333] text-xl">
//               {t("services.women_programs_subtitle")}
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
            
//             {/* Skill Development Card (Coral Block) */}
//             <div className="group relative bg-[#D9534F] overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
//               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFC843] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
//               <div className="relative z-10">
//                 <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//                   <GraduationCap className="text-white" size={32} />
//                 </div>

//                 <h3 className="text-white text-3xl font-bold mb-4">
//                   {t("services.skill_title")}
//                 </h3>

//                 <p className="text-white/90 text-base mb-6 leading-relaxed">
//                   {t("services.skill_desc")}
//                 </p>

//                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
//                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
//                     <img 
//                       src="https://plus.unsplash.com/premium_photo-1666299356280-963e38aa5f91?q=80&w=1170&auto=format&fit=crop"
//                       alt="Women learning"
//                       className="w-full h-56 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-linear-to-t from-[#FFC843]/60 to-transparent"></div>
//                   </div>
//                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-white rounded-full opacity-60"></div>
//                 </div>

//                 <button className="w-full bg-white text-[#D9534F] py-3 px-6 rounded-full font-bold text-lg hover:bg-[#FFC843]/80 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
//                   <span>{t("services.skill_btn")}</span>
//                   <GraduationCap size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Health & Wellness Card (White Block with Coral/Yellow Accents) */}
//             <div className="group relative bg-[#FBFBFB] overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-[#D9534F]">
//               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FFC843] rounded-full opacity-80 group-hover:scale-110 transition-transform duration-500"></div>
              
//               <div className="relative z-10">
//                 <div className="bg-[#D9534F]/40 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//                   <Heart className="text-white fill-white animate-pulse" size={32} />
//                 </div>

//                 <h3 className="text-[#333333] text-3xl font-bold mb-4">
//                   {t("services.health_title")}
//                 </h3>

//                 <p className="text-gray-700 text-base mb-6 leading-relaxed">
//                   {t("services.health_desc")}
//                 </p>

//                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
//                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
//                     <img 
//                       src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1170&auto=format&fit=crop"
//                       alt="Women health"
//                       className="w-full h-56 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-linear-to-t from-[#D9534F]/60 to-transparent"></div>
//                   </div>
//                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FFC843] rounded-full opacity-80"></div>
//                 </div>

//                 <button className="w-full bg-[#D9534F] text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-[#FFC843] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
//                   <span>{t("services.health_btn")}</span>
//                   <Heart size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Community Support Card (Yellow Block) */}
//             <div className="group relative bg-[#FFC843] overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
//               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D9534F] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
//               <div className="relative z-10">
//                 <div className="bg-[#D9534F]/40 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//                   <Users className="text-white" size={32} />
//                 </div>

//                 <h3 className="text-[#333333] text-3xl font-bold mb-4">
//                   {t("services.community_title")}
//                 </h3>

//                 <p className="text-gray-800 text-base mb-6 leading-relaxed">
//                   {t("services.community_desc")}
//                 </p>

//                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
//                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
//                     <img 
//                       src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
//                       alt="Women community"
//                       className="w-full h-56 object-cover"
//                     />
//                     <div className="absolute inset-0 bg-linear-to-t from-[#D9534F]/60 to-transparent"></div>
//                   </div>
//                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-white rounded-full opacity-80"></div>
//                 </div>

//                 <button className="w-full bg-[#D9534F] text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
//                   <span>{t("services.community_btn")}</span>
//                   <Users size={20} />
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // import React from 'react';
// // import { GraduationCap, BookOpen, Users, Award, Shield, Heart } from 'lucide-react';
// // import { useTranslation } from "react-i18next";

// // export default function FeatureCards() {
// //   const { t } = useTranslation();
  
// //   return (
// //     // Updated Background: FBF8F6 (Creamy White)
// //     <div className="min-h-screen bg-[#FBF8F6] py-20 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Section Header */}
// //         <div className="text-center mb-16">
// //           {/* Header Gradient Updated: E2A6B2 to D0687C */}
// //           <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#E2A6B2] to-[#D0687C] mb-4">
// //             {t("services.title")}
// //           </h2>
// //           <p className="text-gray-600 text-xl">
// //             {t("services.subtitle")}
// //           </p>
// //         </div>

// //         {/* Cards Grid - Old Services (using Soft Rose linears) */}
// //         <div className="grid md:grid-cols-3 gap-8">
          
// //           {/* Licensed Child Care Card (Soft Rose/White mix) */}
// //           <div className="group relative bg-linear-to-br from-[#FBF8F6] to-[#FCE8EB] overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-[#E2A6B2]/50">
// //             {/* Decorative Circle Top */}
// //             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E2A6B2] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
// //             <div className="relative z-10">
// //               {/* Icon */}
// //               <div className="bg-[#E2A6B2]/40 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                 <Users className="text-[#D0687C]" size={32} />
// //               </div>

// //               {/* Title */}
// //               <h3 className="text-[#555555] text-3xl font-bold mb-4">
// //                 {t("services.childcare_title")}
// //               </h3>

// //               {/* Description */}
// //               <p className="text-gray-700 text-base mb-6 leading-relaxed">
// //                 {t("services.childcare_desc")}
// //               </p>

// //               {/* Image Section - Curved Shape */}
// //               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
// //                   <img 
// //                     src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?q=80&w=1074&auto=format&fit=crop"
// //                     alt="Children playing"
// //                     className="w-full h-56 object-cover"
// //                   />
// //                   {/* Overlay color adjusted */}
// //                   <div className="absolute inset-0 bg-linear-to-t from-[#E2A6B2]/60 to-transparent"></div>
// //                 </div>
// //                 {/* Small decorative circle on image */}
// //                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FCE8EB] rounded-full opacity-80"></div>
// //               </div>

// //               {/* Button */}
// //               <button className="w-full bg-[#D0687C] text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-[#E2A6B2] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                 <span>{t("services.learn_more")}</span>
// //                 <Shield size={20} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* High Quality Learning Card (Soft Rose/White mix) */}
// //           <div className="group relative bg-linear-to-br from-[#FCE8EB] to-[#E2A6B2] overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-[#E2A6B2]/50">
// //             {/* Decorative Circle Top */}
// //             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D0687C] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
// //             <div className="relative z-10">
// //               {/* Icon */}
// //               <div className="bg-[#D0687C]/40 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                 <GraduationCap className="text-white" size={32} />
// //               </div>

// //               {/* Title */}
// //               <h3 className="text-[#555555] text-3xl font-bold mb-4">
// //                 {t("services.learning_title")}
// //               </h3>

// //               {/* Description */}
// //               <p className="text-gray-700 text-base mb-6 leading-relaxed">
// //                 {t("services.learning_desc")}
// //               </p>

// //               {/* Image Section - Curved Shape */}
// //               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
// //                   <img 
// //                     src="https://plus.unsplash.com/premium_photo-1663047551367-a47365e55907?q=80&w=1170&auto=format&fit=crop"
// //                     alt="Student learning"
// //                     className="w-full h-56 object-cover"
// //                   />
// //                   {/* Overlay color adjusted */}
// //                   <div className="absolute inset-0 bg-linear-to-t from-[#D0687C]/60 to-transparent"></div>
// //                 </div>
// //                 {/* Small decorative circle on image */}
// //                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FCE8EB] rounded-full opacity-80"></div>
// //               </div>

// //               {/* Button */}
// //               <button className="w-full bg-[#D0687C] text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-[#E2A6B2] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                 <span>{t("services.learn_more")}</span>
// //                 <BookOpen size={20} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* Trusted Staff Card (Soft Rose/White mix) */}
// //           <div className="group relative bg-linear-to-br from-[#E2A6B2] to-[#FCE8EB] overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 p-8 border border-[#E2A6B2]/50">
// //             {/* Decorative Circle Top */}
// //             <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E2A6B2] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
// //             <div className="relative z-10">
// //               {/* Icon */}
// //               <div className="bg-[#D0687C]/40 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                 <Award className="text-white" size={32} />
// //               </div>

// //               {/* Title */}
// //               <h3 className="text-[#555555] text-3xl font-bold mb-4">
// //                 {t("services.staff_title")}
// //               </h3>

// //               {/* Description */}
// //               <p className="text-gray-700 text-base mb-6 leading-relaxed">
// //               {t("services.staff_desc")}
// //               </p>

// //               {/* Image Section - Curved Shape */}
// //               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-xl">
// //                   <img 
// //                     src="https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1170&auto=format&fit=crop"
// //                     alt="Professional staff"
// //                     className="w-full h-56 object-cover"
// //                   />
// //                   {/* Overlay color adjusted */}
// //                   <div className="absolute inset-0 bg-linear-to-t from-[#D0687C]/60 to-transparent"></div>
// //                 </div>
// //                 {/* Small decorative circle on image */}
// //                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FCE8EB] rounded-full opacity-80"></div>
// //               </div>

// //               {/* Button */}
// //               <button className="w-full bg-[#D0687C] text-white py-3 px-6 rounded-full font-bold text-lg hover:bg-[#E2A6B2] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                 <span>{t("services.learn_more")}</span>
// //                 <Heart size={20} />
// //               </button>
// //             </div>
// //           </div>

// //         </div>

// //         {/* Women-Centric Version - Alternative Cards */}
// //         <div className="mt-20">
// //           <div className="text-center mb-16">
// //             <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#E2A6B2] to-[#D0687C] mb-4">
// //               {t("services.women_programs_title")}
// //             </h2>
// //             <p className="text-gray-600 text-xl">
// //               {t("services.women_programs_subtitle")}
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
            
// //             {/* Skill Development Card (Deep Rose Accent) */}
// //             <div className="group relative bg-linear-to-br from-[#D0687C] to-[#E2A6B2] overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FCE8EB] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
// //               <div className="relative z-10">
// //                 <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                   <GraduationCap className="text-white" size={32} />
// //                 </div>

// //                 <h3 className="text-white text-3xl font-bold mb-4">
// //                   {t("services.skill_title")}
// //                 </h3>

// //                 <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                   {t("services.skill_desc")}
// //                 </p>

// //                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                     <img 
// //                       src="https://plus.unsplash.com/premium_photo-1666299356280-963e38aa5f91?q=80&w=1170&auto=format&fit=crop"
// //                       alt="Women learning"
// //                       className="w-full h-56 object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-linear-to-t from-[#D0687C]/60 to-transparent"></div>
// //                   </div>
// //                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FCE8EB] rounded-full opacity-60"></div>
// //                 </div>

// //                 <button className="w-full bg-white text-[#D0687C] py-3 px-6 rounded-full font-bold text-lg hover:bg-[#FBF8F6] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                   <span>{t("services.skill_btn")}</span>
// //                   <GraduationCap size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Health & Wellness Card (Soft Rose Accent) */}
// //             <div className="group relative bg-linear-to-br from-[#E2A6B2] to-[#D0687C] overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FCE8EB] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
// //               <div className="relative z-10">
// //                 <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                   <Heart className="text-white fill-white animate-pulse" size={32} />
// //                 </div>

// //                 <h3 className="text-white text-3xl font-bold mb-4">
// //                   {t("services.health_title")}
// //                 </h3>

// //                 <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                   {t("services.health_desc")}
// //                 </p>

// //                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                     <img 
// //                       src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1170&auto=format&fit=crop"
// //                       alt="Women health"
// //                       className="w-full h-56 object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-linear-to-t from-[#D0687C]/60 to-transparent"></div>
// //                   </div>
// //                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FCE8EB] rounded-full opacity-60"></div>
// //                 </div>

// //                 <button className="w-full bg-white text-[#D0687C] py-3 px-6 rounded-full font-bold text-lg hover:bg-[#FBF8F6] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                   <span>{t("services.health_btn")}</span>
// //                   <Heart size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Community Support Card (Deep Rose/Cream) */}
// //             <div className="group relative bg-linear-to-br from-[#D0687C] to-[#FCE8EB] overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //               <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E2A6B2] rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
// //               <div className="relative z-10">
// //                 <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                   <Users className="text-white" size={32} />
// //                 </div>

// //                 <h3 className="text-white text-3xl font-bold mb-4">
// //                   {t("services.community_title")}
// //                 </h3>

// //                 <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                   {t("services.community_desc")}
// //                 </p>

// //                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                     <img 
// //                       src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
// //                       alt="Women community"
// //                       className="w-full h-56 object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-linear-to-t from-[#D0687C]/60 to-transparent"></div>
// //                   </div>
// //                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-[#FCE8EB] rounded-full opacity-60"></div>
// //                 </div>

// //                 <button className="w-full bg-white text-[#D0687C] py-3 px-6 rounded-full font-bold text-lg hover:bg-[#FBF8F6] transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                   <span>{t("services.community_btn")}</span>
// //                   <Users size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import React from 'react';
// // import { GraduationCap, BookOpen, Users, Award, Shield, Heart } from 'lucide-react';
// // import { useTranslation } from "react-i18next";

// // export default function FeatureCards() {
// //   const { t } = useTranslation();
  
// //   return (
// //     <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-rose-50 py-20 px-6">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Section Header */}
// //         <div className="text-center mb-16">
// //           <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600 mb-4">
// //             {t("services.title")}
// //           </h2>
// //           <p className="text-gray-600 text-xl">
// //             {t("services.subtitle")}
// //           </p>
// //         </div>

// //         {/* Cards Grid */}
// //         <div className="grid md:grid-cols-3 gap-8">
          
// //           {/* Licensed Child Care Card */}
// //           <div className="group relative bg-linear-to-br from-blue-500 to-blue-600 overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //             {/* Decorative Circle Top */}
// //             <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
// //             <div className="relative z-10">
// //               {/* Icon */}
// //               <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                 <Users className="text-white" size={32} />
// //               </div>

// //               {/* Title */}
// //               <h3 className="text-white text-3xl font-bold mb-4">
// //                 {t("services.childcare_title")}
// //               </h3>

// //               {/* Description */}
// //               <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                 {t("services.childcare_desc")}
// //               </p>

// //               {/* Image Section - Curved Shape */}
// //               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                   <img 
// //                     src="https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?q=80&w=1074&auto=format&fit=crop"
// //                     alt="Children playing"
// //                     className="w-full h-56 object-cover"
// //                   />
// //                   <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent"></div>
// //                 </div>
// //                 {/* Small decorative circle on image */}
// //                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-blue-300 rounded-full opacity-60"></div>
// //               </div>

// //               {/* Button */}
// //               <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                 <span>{t("services.learn_more")}</span>
// //                 <Shield size={20} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* High Quality Learning Card */}
// //           <div className="group relative bg-linear-to-br from-red-500 to-red-600 overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //             {/* Decorative Circle Top */}
// //             <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
// //             <div className="relative z-10">
// //               {/* Icon */}
// //               <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                 <GraduationCap className="text-white" size={32} />
// //               </div>

// //               {/* Title */}
// //               <h3 className="text-white text-3xl font-bold mb-4">
// //                 {t("services.learning_title")}
// //               </h3>

// //               {/* Description */}
// //               <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                 {t("services.learning_desc")}
// //               </p>

// //               {/* Image Section - Curved Shape */}
// //               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                   <img 
// //                     src="https://plus.unsplash.com/premium_photo-1663047551367-a47365e55907?q=80&w=1170&auto=format&fit=crop"
// //                     alt="Student learning"
// //                     className="w-full h-56 object-cover"
// //                   />
// //                   <div className="absolute inset-0 bg-linear-to-t from-red-900/40 to-transparent"></div>
// //                 </div>
// //                 {/* Small decorative circle on image */}
// //                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-red-300 rounded-full opacity-60"></div>
// //               </div>

// //               {/* Button */}
// //               <button className="w-full bg-white text-red-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                 <span>{t("services.learn_more")}</span>
// //                 <BookOpen size={20} />
// //               </button>
// //             </div>
// //           </div>

// //           {/* Trusted Staff Card */}
// //           <div className="group relative bg-linear-to-br from-orange-500 to-orange-600 overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //             {/* Decorative Circle Top */}
// //             <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
// //             <div className="relative z-10">
// //               {/* Icon */}
// //               <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                 <Award className="text-white" size={32} />
// //               </div>

// //               {/* Title */}
// //               <h3 className="text-white text-3xl font-bold mb-4">
// //                 {t("services.staff_title")}
// //               </h3>

// //               {/* Description */}
// //               <p className="text-white/90 text-base mb-6 leading-relaxed">
// //               {t("services.staff_desc")}
// //               </p>

// //               {/* Image Section - Curved Shape */}
// //               <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                 <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                   <img 
// //                     src="https://images.unsplash.com/photo-1583321500900-82807e458f3c?q=80&w=1170&auto=format&fit=crop"
// //                     alt="Professional staff"
// //                     className="w-full h-56 object-cover"
// //                   />
// //                   <div className="absolute inset-0 bg-linear-to-t from-orange-900/40 to-transparent"></div>
// //                 </div>
// //                 {/* Small decorative circle on image */}
// //                 <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-orange-300 rounded-full opacity-60"></div>
// //               </div>

// //               {/* Button */}
// //               <button className="w-full bg-white text-orange-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                 <span>{t("services.learn_more")}</span>
// //                 <Heart size={20} />
// //               </button>
// //             </div>
// //           </div>

// //         </div>

// //         {/* Women-Centric Version - Alternative Cards */}
// //         <div className="mt-20">
// //           <div className="text-center mb-16">
// //             <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600 mb-4">
// //               {t("services.women_programs_title")}
// //             </h2>
// //             <p className="text-gray-600 text-xl">
// //               {t("services.women_programs_subtitle")}
// //             </p>
// //           </div>

// //           <div className="grid md:grid-cols-3 gap-8">
            
// //             {/* Skill Development Card */}
// //             <div className="group relative bg-linear-to-br from-purple-500 to-purple-600 overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //               <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
// //               <div className="relative z-10">
// //                 <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                   <GraduationCap className="text-white" size={32} />
// //                 </div>

// //                 <h3 className="text-white text-3xl font-bold mb-4">
// //                   {t("services.skill_title")}
// //                 </h3>

// //                 <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                   {t("services.skill_desc")}
// //                 </p>

// //                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                     <img 
// //                       src="https://plus.unsplash.com/premium_photo-1666299356280-963e38aa5f91?q=80&w=1170&auto=format&fit=crop"
// //                       alt="Women learning"
// //                       className="w-full h-56 object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-linear-to-t from-purple-900/40 to-transparent"></div>
// //                   </div>
// //                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-purple-300 rounded-full opacity-60"></div>
// //                 </div>

// //                 <button className="w-full bg-white text-purple-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                   <span>{t("services.skill_btn")}</span>
// //                   <GraduationCap size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Health & Wellness Card */}
// //             <div className="group relative bg-linear-to-br from-pink-500 to-pink-600 overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //               <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
// //               <div className="relative z-10">
// //                 <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                   <Heart className="text-white fill-white animate-pulse" size={32} />
// //                 </div>

// //                 <h3 className="text-white text-3xl font-bold mb-4">
// //                   {t("services.health_title")}
// //                 </h3>

// //                 <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                   {t("services.health_desc")}
// //                 </p>

// //                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                     <img 
// //                       src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1170&auto=format&fit=crop"
// //                       alt="Women health"
// //                       className="w-full h-56 object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-linear-to-t from-pink-900/40 to-transparent"></div>
// //                   </div>
// //                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-pink-300 rounded-full opacity-60"></div>
// //                 </div>

// //                 <button className="w-full bg-white text-pink-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-pink-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                   <span>{t("services.health_btn")}</span>
// //                   <Heart size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Community Support Card */}
// //             <div className="group relative bg-linear-to-br from-rose-500 to-rose-600 overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
// //               <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
// //               <div className="relative z-10">
// //                 <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
// //                   <Users className="text-white" size={32} />
// //                 </div>

// //                 <h3 className="text-white text-3xl font-bold mb-4">
// //                   {t("services.community_title")}
// //                 </h3>

// //                 <p className="text-white/90 text-base mb-6 leading-relaxed">
// //                   {t("services.community_desc")}
// //                 </p>

// //                 <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
// //                   <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
// //                     <img 
// //                       src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop"
// //                       alt="Women community"
// //                       className="w-full h-56 object-cover"
// //                     />
// //                     <div className="absolute inset-0 bg-linear-to-t from-rose-900/40 to-transparent"></div>
// //                   </div>
// //                   <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-rose-300 rounded-full opacity-60"></div>
// //                 </div>

// //                 <button className="w-full bg-white text-rose-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-rose-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
// //                   <span>{t("services.community_btn")}</span>
// //                   <Users size={20} />
// //                 </button>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }