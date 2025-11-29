import React, { useEffect, useState } from "react";
import { Heart, NotebookPen, ChevronRight } from "lucide-react";
import { FaMicrophone } from "react-icons/fa";
import { BsWechat } from "react-icons/bs";
import { MdVaccines } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FeatureCards from "../FeatureCards/FeatureCards";
import SchemesCards from "../SchemesCards/SchemesCards";
import ScholarshipCards from "../ScholarshipCards/ScholarshipCards";
import HealthCards from "../HealthCards/HealthCards";
import SportsCards from "../SportsCards/SportsCards";
import MotivationCards from "../MotivationCards/MotivationCards";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { t } = useTranslation();
  const [isFloating, setIsFloating] = useState(false);
  const navigate = useNavigate();

  const openDidiFrontend = () => {
    window.location.href = "/frontend/index.html";
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Updated Background: FBFBFB (Creamy White)
    <div className="min-h-screen bg-[#FBFBFB] pt-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative Blurs - Updated Colors (FFC843, D9534F) */}
        {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFC843] rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-[#D9534F] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#FFC843] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        </div> */}

        <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-8">
              {/* Title Gradient Updated: FFC843 to D9534F */}
              <h3 className="text-4xl md:text-7xl font-extrabold leading-tight text-transparent bg-clip-text bg-linear-to-r from-[#FFC843] via-[#D9534F] to-[#FFC843]">
                {t("title")} –
              </h3>

              <p className="text-[#333333] text-xl md:text-2xl font-bold mt-2">
                {t("hero_title")}
              </p>

              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mt-4 max-w-2xl">
                {t("hero_description")}
                {/* Accent Color Updated to D9534F */}
                <span className="block mt-3 text-[#D9534F] font-extrabold text-lg md:text-xl">
                  {t("dream_to_mission")}
                </span>
              </p>

              <div className="relative">
                {/* Normal Buttons */}
                {!isFloating && (
                  <div className="flex flex-wrap gap-4">
                    {/* Voice Button Primary Gradient */}
                    <NavLink
                      to="/ask-Didi"
                      className="bg-linear-to-r from-[#D9534F] to-[#FFC843] w-[35%] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105"
                    >
                      <FaMicrophone className="text-white" size={30} />
                    </NavLink>

                    {/* Explore Button Secondary Accent */}
                    <button className="border-2 border-[#D9534F] text-[#D9534F] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#FFC843]/30 transition-all flex items-center space-x-2 transform hover:scale-105">
                      {t("explore_now")}
                      <ChevronRight />
                    </button>
                  </div>
                )}

                {/* Floating Microphone Button */}
                {isFloating && (
                  <NavLink
                    to="/ask-Didi"
                    className="fixed bottom-6 left-6 bg-linear-to-r from-[#D9534F] to-[#FFC843] text-white shadow-2xl shadow-[#333333]/50 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-100"
                  >
                    <FaMicrophone size={32} />
                  </NavLink>
                )}
              </div>

              {/* Sakhi Floating Chatbot Button */}
              <NavLink
                to="/sakhi"
                className="fixed bottom-6 right-6 bg-linear-to-br from-[#D9534F] to-[#FFC843] text-white shadow-2xl shadow-[#333333]/50 rounded-full w-20 h-20 flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50"
                title="Chat with Sakhi"
              >
                <span className="text-2xl font-bold">
                  <BsWechat size={50} className=" rotate-12" />
                </span>
              </NavLink>
            </div>

            {/* Image + Design */}
            <div className="relative">
              <div className="relative z-10">
                {/* Image Container using Bright Coral Hues */}
                <div className="bg-linear-to-br from-[#D9534F] to-[#FFC843] rounded-tl-full rounded-tr-[40%] rounded-bl-[30%] rounded-br-[50%] overflow-hidden shadow-2xl">
                  <div className="relative">
                    {/* Inner Decorative Circle - Updated Color */}
                    <div className="absolute top-8 left-8 w-32 h-32 bg-[#FFC843] rounded-full opacity-90"></div>

                    <img
                      src="https://plus.unsplash.com/premium_photo-1681483508948-74f8391ea3ef?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Happy woman"
                      className="relative z-10 w-full h-[500px] object-cover opacity-95"
                    />

                    {/* Gradient Overlay - Softening the bottom image edge */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#D9534F]/40 to-transparent"></div>
                  </div>
                </div>

                {/* Floating Text Block */}
                <div className="absolute bottom-7 right-0 transform translate-x-8 z-10">
                  <div className="bg-[#D9534F] text-white px-8 py-6 rounded-lg shadow-2xl">
                    <div className="text-4xl font-extrabold mb-2">
                      {t("be_your_voice_title")}
                    </div>
                    <div className="text-lg border-t-2 border-white/30 pt-2">
                      {t("be_your_voice_subtitle")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Circles - High Contrast Hues */}
              <div className="absolute -top-7 right-10 w-12 h-12 bg-[#FFC843] rounded-full opacity-70"></div>
              <div className="absolute top-32 left-0 w-8 h-8 bg-[#D9534F] rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 left-12 w-10 h-10 bg-[#FFC843] rounded-full opacity-70"></div>
              <div className="absolute bottom-1 -right-6 w-12 h-12 bg-[#D9534F] rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Solid Blocks of Color */}
      <div className="grid md:grid-cols-3 gap-0">
        {/* Schemes (Yellow-Orange Mix) */}
        <div className="relative bg-linear-to-br from-[#FFC843] via-[#FFD67C] to-[#D9534F] p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D9534F] rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FFC843] rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <div className="bg-white/40 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
              <MdVaccines className="text-white" size={40} />
            </div>
            <h3 className="text-[#333333] text-3xl font-bold mb-3">
              {t("vaccine_card_title_1")}
            </h3>
            <h3 className="text-[#333333] text-3xl font-bold mb-4">
              {t("vaccine_card_title_2")}
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {t("vaccine_card_description")}
            </p>
            <button className="bg-white text-[#D9534F] px-8 py-3 rounded-full hover:bg-[#FFC843]/50 transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
              <span>{t("vaccine_card_button")}</span>
              <MdVaccines size={18} />
            </button>
          </div>
        </div>

        {/* Health (Bright Coral Block) */}
        <div className="relative bg-[#D9534F] p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#CC0000] rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FFC843] rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <div className="bg-white/40 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
              <Heart
                className="text-white fill-white animate-pulse"
                size={40}
              />
            </div>
            <h3 className="text-white text-3xl font-bold mb-3">
              {t("health_card_title_1")}
            </h3>
            <h3 className="text-white text-3xl font-bold mb-4">
              {t("health_card_title_2")}
            </h3>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              {t("health_card_description")}
            </p>
            <button className="bg-white text-[#D9534F] px-8 py-3 rounded-full hover:bg-[#FFC843]/50 transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
              <span>{t("health_card_button")}</span>
              <Heart size={18} />
            </button>
          </div>
        </div>

        {/* Assignments (Yellow Block) */}
        <div className="relative bg-[#FFC843] p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D9534F] rounded-full opacity-20 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white rounded-full opacity-30 transform -translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <div className="bg-[#D9534F]/50 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
              <NotebookPen className="text-white" size={40} />
            </div>
            <h3 className="text-[#333333] text-3xl font-bold mb-3">
              {t("assignment_card_title_1")}
            </h3>
            <h3 className="text-[#333333] text-3xl font-bold mb-4">
              {t("assignment_card_title_2")}
            </h3>
            <p className="text-gray-800 text-lg mb-6 leading-relaxed">
              {t("assignment_card_description")}
            </p>
            <button className="bg-[#D9534F] text-white px-8 py-3 rounded-full hover:bg-white transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
              <span>{t("assignment_card_button")}</span>
              <NotebookPen size={18} />
            </button>
          </div>
        </div>
      </div>

      <FeatureCards />
      <SchemesCards />
      <ScholarshipCards />
      <HealthCards />
      <SportsCards />
      <MotivationCards />
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { Heart, NotebookPen, ChevronRight } from "lucide-react";
// import { FaMicrophone } from "react-icons/fa";
// import { BsWechat } from "react-icons/bs";
// import { MdVaccines } from "react-icons/md";
// import { NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import FeatureCards from "../FeatureCards/FeatureCards";

// export default function DashboardPage() {
//   const { t } = useTranslation();
//   const [isFloating, setIsFloating] = useState(false);

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setIsFloating(true);
//       } else {
//         setIsFloating(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     // Updated Background: FBF8F6 (Creamy White)
//     <div className="min-h-screen bg-[#FBF8F6] pt-8">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         {/* Decorative Blurs - Updated Colors */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-[#E2A6B2] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
//           <div className="absolute top-40 right-20 w-96 h-96 bg-[#FCE8EB] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
//           <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-[#D0687C] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Text */}
//             <div className="space-y-8">
//               {/* Title Gradient Updated: E2A6B2 to D0687C */}
//               <h3 className="text-4xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-linear-to-r from-[#E2A6B2] via-[#D0687C] to-[#E2A6B2]">
//                 {t("title")} –
//               </h3>

//               <p className="text-[#555555] text-xl md:text-2xl font-bold mt-2">
//                 {t("hero_title")}
//               </p>

//               <p className="text-gray-600 text-lg md:text-xl leading-relaxed mt-4 max-w-2xl">
//                 {t("hero_description")}
//                 {/* Accent Color Updated to D0687C */}
//                 <span className="block mt-3 text-[#D0687C] font-extrabold text-lg md:text-xl">
//                   {t("dream_to_mission")}
//                 </span>
//               </p>

//               <div className="relative">
//                 {/* Normal Buttons */}
//                 {!isFloating && (
//                   <div className="flex flex-wrap gap-4">
//                     {/* Voice Button Primary Gradient */}
//                     <button className="bg-linear-to-r from-[#D0687C] to-[#E2A6B2] w-[35%] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105">
//                       <FaMicrophone className="text-white" size={30} />
//                     </button>

//                     {/* Explore Button Secondary Accent */}
//                     <button className="border-2 border-[#E2A6B2] text-[#D0687C] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#FCE8EB] transition-all flex items-center space-x-2 transform hover:scale-105">
//                       {t("explore_now")}
//                       <ChevronRight />
//                     </button>
//                   </div>
//                 )}

//                 {/* Floating Microphone Button */}
//                 {isFloating && (
//                   <button className="fixed bottom-6 left-6 bg-linear-to-r from-[#D0687C] to-[#E2A6B2] text-white shadow-2xl shadow-gray-700/50 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-100">
//                     <FaMicrophone size={32} />
//                   </button>
//                 )}
//               </div>

//               {/* Sakhi Floating Chatbot Button */}
//               <NavLink
//                 to="/sakhi"
//                 className="fixed bottom-6 right-6 bg-linear-to-br from-[#E2A6B2] to-[#D0687C] text-white shadow-2xl shadow-gray-700/50 rounded-full w-20 h-20 flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50"
//                 title="Chat with Sakhi"
//               >
//                 <span className="text-2xl font-bold">
//                   <BsWechat size={50} className=" rotate-12" />
//                 </span>
//               </NavLink>

//             </div>

//             {/* Image + Design */}
//             <div className="relative">
//               <div className="relative z-10">
//                 {/* Image Container using Soft Rose Hues */}
//                 <div className="bg-linear-to-br from-[#E2A6B2] to-[#D0687C] rounded-tl-full rounded-tr-[40%] rounded-bl-[30%] rounded-br-[50%] overflow-hidden shadow-2xl">
//                   <div className="relative">
//                     {/* Inner Decorative Circle */}
//                     <div className="absolute top-8 left-8 w-32 h-32 bg-[#FCE8EB] rounded-full opacity-90"></div>

//                     <img
//                       src="https://plus.unsplash.com/premium_photo-1681483508948-74f8391ea3ef?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                       alt="Happy woman"
//                       className="relative z-10 w-full h-[500px] object-cover opacity-95"
//                     />

//                     {/* Gradient Overlay - Softening the bottom image edge */}
//                     <div className="absolute inset-0 bg-linear-to-t from-[#D0687C]/40 to-transparent"></div>
//                   </div>
//                 </div>

//                 {/* Floating Text Block */}
//                 <div className="absolute bottom-7 right-0 transform translate-x-8 z-10">
//                   <div className="bg-linear-to-br from-[#E2A6B2] to-[#D0687C] text-white px-8 py-6 rounded-lg shadow-2xl">
//                     <div className="text-4xl font-extrabold mb-2">
//                       {t("be_your_voice_title")}
//                     </div>
//                     <div className="text-lg border-t-2 border-white/30 pt-2">
//                       {t("be_your_voice_subtitle")}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative Circles - Soft Hues */}
//               <div className="absolute -top-7 right-10 w-12 h-12 bg-[#FCE8EB] rounded-full opacity-70"></div>
//               <div className="absolute top-32 left-0 w-8 h-8 bg-[#E2A6B2] rounded-full opacity-70"></div>
//               <div className="absolute -bottom-6 left-12 w-10 h-10 bg-[#D0687C] rounded-full opacity-70"></div>
//               <div className="absolute bottom-1 -right-6 w-12 h-12 bg-[#FCE8EB] rounded-full opacity-70"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section - Soft Blocks */}
//       <div className="grid md:grid-cols-3 gap-0">
//         {/* Schemes (Sage -> Soft Green/Pink) */}
//         <div className="relative bg-linear-to-br from-[#E2A6B2] via-[#FCE8EB] to-[#D0687C] p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-[#E2A6B2] rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FCE8EB] rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

//           <div className="relative z-10">
//             <div className="bg-white/40 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//               <MdVaccines className="text-[#D0687C]" size={40} />
//             </div>
//             <h3 className="text-[#555555] text-3xl font-bold mb-3">
//               {t("vaccine_card_title_1")}
//             </h3>
//             <h3 className="text-[#555555] text-3xl font-bold mb-4">{t("vaccine_card_title_2")}</h3>
//             <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//               {t("vaccine_card_description")}
//             </p>
//             <button className="bg-[#D0687C] text-white px-8 py-3 rounded-full hover:bg-[#E2A6B2] transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
//               <span>{t("vaccine_card_button")}</span>
//               <MdVaccines size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Health (Red/Brown -> Soft Rose Accent) */}
//         <div className="relative bg-linear-to-br from-[#D0687C] via-[#E2A6B2] to-[#D0687C] p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-[#E2A6B2] rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D0687C] rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

//           <div className="relative z-10">
//             <div className="bg-white/40 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//               <Heart
//                 className="text-[#D0687C] fill-[#D0687C] animate-pulse"
//                 size={40}
//               />
//             </div>
//             <h3 className="text-[#555555] text-3xl font-bold mb-3">{t("health_card_title_1")}</h3>
//             <h3 className="text-[#555555] text-3xl font-bold mb-4">{t("health_card_title_2")}</h3>
//             <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//               {t("health_card_description")}
//             </p>
//             <button className="bg-[#D0687C] text-white px-8 py-3 rounded-full hover:bg-[#E2A6B2] transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
//               <span>{t("health_card_button")}</span>
//               <Heart size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Assignments (Mustard/Orange -> Dusty White/Rose Accent) */}
//         <div className="relative bg-linear-to-br from-[#FCE8EB] via-[#FBF8F6] to-[#E2A6B2] p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-[#E2A6B2] rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FCE8EB] rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

//           <div className="relative z-10">
//             <div className="bg-white/40 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//               <NotebookPen className="text-[#D0687C]" size={40} />
//             </div>
//             <h3 className="text-[#555555] text-3xl font-bold mb-3">{t("assignment_card_title_1")}</h3>
//             <h3 className="text-[#555555] text-3xl font-bold mb-4">{t("assignment_card_title_2")}</h3>
//             <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//               {t("assignment_card_description")}
//             </p>
//             <button className="bg-[#D0687C] text-white px-8 py-3 rounded-full hover:bg-[#E2A6B2] transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
//               <span>{t("assignment_card_button")}</span>
//               <NotebookPen size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <FeatureCards />
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Heart, NotebookPen, ChevronRight } from "lucide-react";
// import { FaMicrophone } from "react-icons/fa";
// import { BsWechat } from "react-icons/bs";
// import { MdVaccines } from "react-icons/md";
// import { NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import FeatureCards from "../FeatureCards/FeatureCards";

// export default function DashboardPage() {
//   const { t } = useTranslation();
//   const [isFloating, setIsFloating] = useState(false);

//   // Detech scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 100) {
//         setIsFloating(true);
//       } else {
//         setIsFloating(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-rose-50 pt-8">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
//           <div className="absolute top-40 right-20 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
//           <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-rose-300 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Text */}
//             <div className="space-y-8">
//               <h3 className="text-4xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-linear-to-r from-pink-600 via-purple-600 to-pink-600">
//                 {t("title")} –
//               </h3>

//               <p className="text-gray-900 text-xl md:text-2xl font-semibold mt-2">
//                 {t("hero_title")}
//               </p>

//               <p className="text-gray-700 text-lg md:text-xl leading-relaxed mt-4 max-w-2xl">
//                 {t("hero_description")}
//                 <span className="block mt-3 text-pink-600 font-semibold text-lg md:text-xl">
//                   {t("dream_to_mission")}
//                 </span>
//               </p>

//               <div className="relative">
//                 {/* Normal Buttons (Visible only when NOT floating) */}
//                 {!isFloating && (
//                   <div className="flex flex-wrap gap-4">
//                     <button className="bg-linear-to-r from-pink-500 to-purple-500 w-[35%] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105">
//                       <FaMicrophone className="text-white" size={30} />
//                     </button>

//                     <button className="border-2 border-pink-400 text-pink-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-pink-50 transition-all flex items-center space-x-2 transform hover:scale-105">
//                       {t("explore_now")}
//                       <ChevronRight />
//                     </button>
//                   </div>
//                 )}

//                 {/* Floating Microphone Button (Visible only when scrolling down) */}
//                 {isFloating && (
//                   <button className="fixed bottom-6 left-6 bg-linear-to-r from-pink-500 to-purple-500 text-white shadow-2xl shadow-black rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-100">
//                     <FaMicrophone size={32} />
//                   </button>
//                 )}
//               </div>

//               {/* Sakhi Floating Chatbot Button */}
//               <NavLink
//                 to="/sakhi"
//                 className="fixed bottom-6 right-6 bg-linear-to-br from-pink-400 to-purple-500 text-white shadow-2xl shadow-black rounded-full w-20 h-20 flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50"
//                 title="Chat with Sakhi"
//               >
//                 <span className="text-2xl font-bold">
//                   <BsWechat size={50} className=" rotate-12" />
//                 </span>
//               </NavLink>

//               {/* Stats */}
//               {/* <div className="flex flex-wrap gap-8 pt-8">
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-linear-to-br from-pink-400 to-purple-500 p-3 rounded-full">
//                     <Users className="text-white" size={24} />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-gray-900">1M+</div>
//                     <div className="text-sm text-gray-600">Women Empowered</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="bg-linear-to-br from-purple-400 to-pink-500 p-3 rounded-full">
//                     <Award className="text-white" size={24} />
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-gray-900">500+</div>
//                     <div className="text-sm text-gray-600">
//                       Schemes Available
//                     </div>
//                   </div>
//                 </div>
//               </div> */}
//             </div>

//             {/* Image + Design */}
//             <div className="relative">
//               <div className="relative z-10">
//                 <div className="bg-linear-to-br from-pink-400 to-rose-500 rounded-tl-full rounded-tr-[40%] rounded-bl-[30%] rounded-br-[50%] overflow-hidden shadow-2xl">
//                   <div className="relative">
//                     <div className="absolute top-8 left-8 w-32 h-32 bg-linear-to-br from-yellow-400 to-pink-500 rounded-full opacity-90"></div>

//                     <img
//                       src="https://plus.unsplash.com/premium_photo-1681483508948-74f8391ea3ef?q=80&w=1100&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                       alt="Happy woman"
//                       className="relative z-10 w-full h-[500px] object-cover opacity-95"
//                     />

//                     <div className="absolute inset-0 bg-linear-to-t from-rose-600/40 to-transparent"></div>
//                   </div>
//                 </div>

//                 <div className="absolute bottom-7 right-0 transform translate-x-8 z-10">
//                   <div className="bg-linear-to-br from-pink-400 to-pink-600 text-white px-8 py-6 rounded-lg shadow-2xl">
//                     <div className="text-4xl font-bold mb-2">
//                       {t("be_your_voice_title")}
//                     </div>
//                     <div className="text-lg border-t-2 border-white/30 pt-2">
//                       {t("be_your_voice_subtitle")}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Decorative Circles */}
//               <div className="absolute -top-7 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-60 "></div>
//               <div className="absolute top-32 left-0 w-8 h-8 bg-rose-300 rounded-full opacity-60"></div>
//               <div className="absolute -bottom-6 left-12 w-10 h-10 bg-yellow-300 rounded-full opacity-60"></div>
//               <div className="absolute bottom-1 -right-6 w-12 h-12 bg-blue-300 rounded-full opacity-60"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="grid md:grid-cols-3 gap-0">
//         {/* Schemes */}
//         <div className="relative bg-linear-to-br from-purple-500 via-purple-600 to-indigo-600 p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-400 rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

//           <div className="relative z-10">
//             <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//               <MdVaccines className="text-white" size={40} />
//             </div>
//             <h3 className="text-white text-3xl font-bold mb-3">
//               {t("vaccine_card_title_1")}
//             </h3>
//             <h3 className="text-white text-3xl font-bold mb-4">{t("vaccine_card_title_2")}</h3>
//             <p className="text-white/90 text-lg mb-6 leading-relaxed">
//               {t("vaccine_card_description")}
//             </p>
//             <button className="bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-purple-50 transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
//               <span>{t("vaccine_card_button")}</span>
//               <MdVaccines size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Health */}
//         <div className="relative bg-linear-to-br from-pink-500 via-rose-500 to-pink-600 p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-pink-400 rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-400 rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

//           <div className="relative z-10">
//             <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//               <Heart
//                 className="text-white fill-white animate-pulse"
//                 size={40}
//               />
//             </div>
//             <h3 className="text-white text-3xl font-bold mb-3">{t("health_card_title_1")}</h3>
//             <h3 className="text-white text-3xl font-bold mb-4">{t("health_card_title_2")}</h3>
//             <p className="text-white/90 text-lg mb-6 leading-relaxed">
//               {t("health_card_description")}
//             </p>
//             <button className="bg-white text-pink-600 px-8 py-3 rounded-full hover:bg-pink-50 transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
//               <span>{t("health_card_button")}</span>
//               <Heart size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Assignments */}
//         <div className="relative bg-linear-to-br from-rose-500 via-red-500 to-rose-600 p-14 min-h-[350px] overflow-hidden hover:shadow-2xl transition-all duration-300 group">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-rose-400 rounded-full opacity-10 transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform duration-700"></div>
//           <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-400 rounded-full opacity-10 transform -translate-x-20 translate-y-20"></div>

//           <div className="relative z-10">
//             <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
//               <NotebookPen className="text-white" size={40} />
//             </div>
//             <h3 className="text-white text-3xl font-bold mb-3">{t("assignment_card_title_1")}</h3>
//             <h3 className="text-white text-3xl font-bold mb-4">{t("assignment_card_title_2")}</h3>
//             <p className="text-white/90 text-lg mb-6 leading-relaxed">
//               {t("assignment_card_description")}
//             </p>
//             <button className="bg-white text-rose-600 px-8 py-3 rounded-full hover:bg-rose-50 transition-all font-bold flex items-center space-x-2 group-hover:shadow-xl transform group-hover:translate-x-2 duration-300">
//               <span>{t("assignment_card_button")}</span>
//               <NotebookPen size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       <FeatureCards />
//     </div>
//   );
// }
