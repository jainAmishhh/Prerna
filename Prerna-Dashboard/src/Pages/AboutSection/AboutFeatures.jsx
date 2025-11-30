import React from "react";
import { Zap, Play } from "lucide-react";
import { coreFeatures } from "./AboutConstants";

const AboutFeatures = () => {
  return (
    // Background: Creamy White/Soft Pink Mix
    <div className="bg-gradient-to-br from-[#FBFBFB] via-[#F9E8EC] to-[#FBFBFB] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {/* Badge: Soft Pink background, Coral text */}
          <div className="inline-flex items-center bg-[#F9E8EC] border border-[#D9534F]/30 text-[#D9534F] px-6 py-2 rounded-full mb-4 shadow-sm">
            <Zap size={20} className="mr-2 fill-[#D9534F]/20" />
            <span className="font-semibold">Revolutionary Technology</span>
          </div>
          <h2 className="text-5xl font-bold text-[#333333] mb-4">
            What Makes Prerna Special
          </h2>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto">
            First-of-its-kind Voice-to-Video AI platform designed exclusively for
            women empowerment
          </p>
        </div>

        <div className="space-y-16">
          {coreFeatures.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-8 items-center ${
                idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              {/* Visual Side */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl group h-80 md:h-96 shadow-[#D9534F]/30">
                    <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    {/* Overlay uses linear color from constants */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.linear} opacity-60 mix-blend-multiply`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Icon Container: Coral/White accent */}
                        <div className="bg-white/30 backdrop-blur-md w-24 h-24 rounded-3xl flex items-center justify-center text-white shadow-lg border border-white/50">
                            {React.cloneElement(feature.icon, { size: 40 })}
                        </div>
                    </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                {/* Subtitle Badge uses linear color from constants */}
                <div className={`inline-block bg-gradient-to-r ${feature.linear} text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider`}>
                    {feature.subtitle}
                </div>
                <h3 className="text-3xl font-bold text-[#333333] mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{feature.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {feature.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-sm font-bold text-[#D9534F] text-center">
                        {stat}
                    </div>
                  ))}
                </div>

                {/* How It Works Box */}
                <div className="bg-[#F9E8EC] rounded-2xl p-5 border border-[#D9534F]/20 shadow-inner">
                    <div className="flex items-center gap-2 text-[#CD4628] font-bold text-sm mb-3 uppercase">
                        <Play size={14} fill="currentColor" /> How It Works
                    </div>
                    <div className="space-y-2">
                        {feature.howItWorks.map((step, hIdx) => (
                            <div key={hIdx} className="flex gap-3 text-sm text-gray-700">
                                {/* Step number accent: Deep Burnt Orange */}
                                <span className="font-bold text-[#CD4628] shrink-0">{hIdx + 1}.</span>
                                {step}
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutFeatures;
