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
