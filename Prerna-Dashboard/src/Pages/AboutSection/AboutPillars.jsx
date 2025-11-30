import React from "react";
import { CheckCircle } from "lucide-react";
import { platformPillars } from "./AboutConstants";

const AboutPillars = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-[#333333] mb-4">
          Four Pillars of Empowerment
        </h2>
        <p className="text-[#555555] text-xl">
          Complete support across every aspect of life
        </p>
        <div className="h-1.5 w-24 bg-gradient-to-r from-[#D9534F] to-[#FFC843] mx-auto rounded-full mt-4"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformPillars.map((pillar, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-4xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-[#D9534F]/20 flex flex-col"
          >
            {/* Image Header */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={pillar.image}
                alt={pillar.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay uses linear color from constants */}
              <div className={`absolute inset-0 bg-gradient-to-t ${pillar.color} opacity-80 mix-blend-multiply`}></div>
              
              {/* Floating Icon */}
              <div className="absolute -bottom-6 left-6">
                {/* Icon uses linear color from constants */}
                  <div className={`bg-gradient-to-br ${pillar.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white group-hover:rotate-12 transition-transform duration-300`}>
                      {pillar.icon}
                  </div>
              </div>
            </div>

            <div className="p-6 pt-10 grow flex flex-col">
              <h3 className="text-xl font-bold text-[#333333] mb-2">{pillar.title}</h3>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">{pillar.desc}</p>

              <div className="space-y-2 mt-auto">
                {pillar.examples.map((example, eIdx) => (
                  <div key={eIdx} className="flex items-center gap-2 text-xs font-bold text-[#555555]">
                    {/* Checkmark: Coral accent */}
                    <CheckCircle size={14} className="text-[#D9534F] shrink-0" />
                    {example}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPillars;
