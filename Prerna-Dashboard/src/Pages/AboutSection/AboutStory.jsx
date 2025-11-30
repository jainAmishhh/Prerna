import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { storySlides } from "./AboutConstants";

const AboutStory = () => {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        {/* Badge: Soft Pink background, Coral text */}
        <div className="inline-flex items-center bg-[#F9E8EC] border border-[#D9534F]/30 text-[#D9534F] px-6 py-2 rounded-full mb-4 shadow-lg shadow-[#F9E8EC]/50">
          <BookOpen size={20} className="mr-2" />
          <span className="font-semibold">Our Story</span>
        </div>
        {/* Title Gradient: Yellow to Coral */}
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-[#FFC843] to-[#D9534F] mb-4">
          How Prerna Was Born
        </h2>
        <p className="text-[#555555] text-xl max-w-3xl mx-auto">
          From a simple question to a powerful movement
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left: Dynamic Image */}
        <div className="w-full lg:w-1/2 relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#D9534F]/30">
          {storySlides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${activeStory === idx ? 'opacity-100' : 'opacity-0'}`}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                {/* Icon Badge uses dynamic color from constants */}
                <div className={`inline-block p-3 rounded-xl bg-linear-to-r ${slide.color} mb-4`}>
                  {React.cloneElement(slide.icon, { size: 28 })}
                </div>
                <h3 className="text-3xl font-bold">{slide.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Timeline Selection */}
        <div className="w-full lg:w-1/2 space-y-4">
          {storySlides.map((slide, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStory(idx)}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 flex gap-4 items-start ${
                activeStory === idx
                  ? "bg-[#F9E8EC] border-[#D9534F] shadow-lg scale-105" // Active: Soft Pink border, Dark Coral text
                  : "bg-white/70 border-gray-100 hover:bg-[#FBFBFB] hover:shadow-md" // Inactive: White/Creamy
              }`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-linear-to-br ${slide.color}`}>
                  {idx + 1}
              </div>
              <div>
                <h4 className={`text-lg font-bold mb-1 ${activeStory === idx ? 'text-[#D9534F]' : 'text-[#555555]'}`}>
                    {slide.title}
                </h4>
                <p className={`text-sm leading-relaxed ${activeStory === idx ? 'text-gray-700' : 'text-gray-500 line-clamp-2'}`}>
                    {slide.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutStory;
