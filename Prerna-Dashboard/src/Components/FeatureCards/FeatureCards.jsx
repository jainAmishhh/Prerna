import React from 'react';
import { GraduationCap, BookOpen, Users, Award, Shield, Heart } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function FeatureCards() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-rose-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600 mb-4">
            {t("services.title")}
          </h2>
          <p className="text-gray-600 text-xl">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Licensed Child Care Card */}
          <div className="group relative bg-linear-to-br from-blue-500 to-blue-600 rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
            {/* Decorative Circle Top */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                <Users className="text-white" size={32} />
              </div>

              {/* Title */}
              <h3 className="text-white text-3xl font-bold mb-4">
                {t("services.childcare_title")}
              </h3>

              {/* Description */}
              <p className="text-white/90 text-base mb-6 leading-relaxed">
                {t("services.childcare_desc")}
              </p>

              {/* Image Section - Curved Shape */}
              <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
                    alt="Children playing"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-blue-900/40 to-transparent"></div>
                </div>
                {/* Small decorative circle on image */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-blue-300 rounded-full opacity-60"></div>
              </div>

              {/* Button */}
              <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
                <span>{t("services.learn_more")}</span>
                <Shield size={20} />
              </button>
            </div>
          </div>

          {/* High Quality Learning Card */}
          <div className="group relative bg-linear-to-br from-red-500 to-red-600 rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
            {/* Decorative Circle Top */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                <GraduationCap className="text-white" size={32} />
              </div>

              {/* Title */}
              <h3 className="text-white text-3xl font-bold mb-4">
                {t("services.learning_title")}
              </h3>

              {/* Description */}
              <p className="text-white/90 text-base mb-6 leading-relaxed">
                {t("services.learning_desc")}
              </p>

              {/* Image Section - Curved Shape */}
              <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                    alt="Student learning"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-red-900/40 to-transparent"></div>
                </div>
                {/* Small decorative circle on image */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-red-300 rounded-full opacity-60"></div>
              </div>

              {/* Button */}
              <button className="w-full bg-white text-red-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-red-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
                <span>{t("services.learn_more")}</span>
                <BookOpen size={20} />
              </button>
            </div>
          </div>

          {/* Trusted Staff Card */}
          <div className="group relative bg-linear-to-br from-orange-500 to-orange-600 rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
            {/* Decorative Circle Top */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-orange-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                <Award className="text-white" size={32} />
              </div>

              {/* Title */}
              <h3 className="text-white text-3xl font-bold mb-4">
                {t("services.staff_title")}
              </h3>

              {/* Description */}
              <p className="text-white/90 text-base mb-6 leading-relaxed">
              {t("services.staff_desc")}
              </p>

              {/* Image Section - Curved Shape */}
              <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
                    alt="Professional staff"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-orange-900/40 to-transparent"></div>
                </div>
                {/* Small decorative circle on image */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-orange-300 rounded-full opacity-60"></div>
              </div>

              {/* Button */}
              <button className="w-full bg-white text-orange-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
                <span>{t("services.learn_more")}</span>
                <Heart size={20} />
              </button>
            </div>
          </div>

        </div>

        {/* Women-Centric Version - Alternative Cards */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-pink-600 to-purple-600 mb-4">
              {t("services.women_programs_title")}
            </h2>
            <p className="text-gray-600 text-xl">
              {t("services.women_programs_subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Skill Development Card */}
            <div className="group relative bg-linear-to-br from-purple-500 to-purple-600 rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <GraduationCap className="text-white" size={32} />
                </div>

                <h3 className="text-white text-3xl font-bold mb-4">
                  {t("services.skill_title")}
                </h3>

                <p className="text-white/90 text-base mb-6 leading-relaxed">
                  {t("services.skill_desc")}
                </p>

                <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                      alt="Women learning"
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-purple-900/40 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-purple-300 rounded-full opacity-60"></div>
                </div>

                <button className="w-full bg-white text-purple-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
                  <span>{t("services.skill_btn")}</span>
                  <GraduationCap size={20} />
                </button>
              </div>
            </div>

            {/* Health & Wellness Card */}
            <div className="group relative bg-linear-to-br from-pink-500 to-pink-600 rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <Heart className="text-white fill-white animate-pulse" size={32} />
                </div>

                <h3 className="text-white text-3xl font-bold mb-4">
                  {t("services.health_title")}
                </h3>

                <p className="text-white/90 text-base mb-6 leading-relaxed">
                  {t("services.health_desc")}
                </p>

                <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                      alt="Women health"
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-pink-900/40 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-pink-300 rounded-full opacity-60"></div>
                </div>

                <button className="w-full bg-white text-pink-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-pink-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
                  <span>{t("services.health_btn")}</span>
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Community Support Card */}
            <div className="group relative bg-linear-to-br from-rose-500 to-rose-600 rounded-3xl overflow-visible shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 p-8">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-400 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="relative z-10">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                  <Users className="text-white" size={32} />
                </div>

                <h3 className="text-white text-3xl font-bold mb-4">
                  {t("services.community_title")}
                </h3>

                <p className="text-white/90 text-base mb-6 leading-relaxed">
                  {t("services.community_desc")}
                </p>

                <div className="relative mb-6 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="relative rounded-tl-[80px] rounded-tr-3xl rounded-bl-3xl rounded-br-[80px] overflow-hidden shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                      alt="Women community"
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-rose-900/40 to-transparent"></div>
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-rose-300 rounded-full opacity-60"></div>
                </div>

                <button className="w-full bg-white text-rose-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-rose-50 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl">
                  <span>{t("services.community_btn")}</span>
                  <Users size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}