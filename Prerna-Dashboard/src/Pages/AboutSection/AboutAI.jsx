import React from "react";
import { Mic, Video } from "lucide-react";
import { aiFeatures } from "./AboutConstants";

const AboutAI = () => {
  return (
    <section className="py-20 px-6 bg-[#FBFBFB]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4">
            Revolutionary <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC843] to-[#D9534F]">AI Technology</span>
          </h2>
          <p className="text-[#555555] text-lg">
            Breaking barriers with voice-to-video AI that understands your language
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {aiFeatures.map((feature, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-[#F9E8EC] text-center hover:shadow-xl hover:shadow-[#FFC843]/30 transition-all">
              <div className="bg-[#FFC843]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                {feature.icon}
              </div>
              {/* Badge: Soft Pink background, Deep Orange text */}
              <div className="inline-block bg-[#F9E8EC] border border-[#D9534F]/30 text-[#CD4628] text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                {feature.badge}
              </div>
              <h3 className="text-lg font-bold text-[#333333] mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* How Voice Works Showcase */}
        <div className="bg-gradient-to-r from-[#D9534F] via-[#CD4628] to-[#D9534F] rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-[#CD4628]/50 relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

             <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                 <div>
                     <h3 className="text-3xl md:text-4xl font-bold mb-6">How Voice-to-Video Works</h3>
                     <div className="space-y-6">
                         {[
                             "Speak your health query in Hindi or English",
                             "AI converts voice to text instantly",
                             "Smart engine understands context",
                             "Watch personalized video response"
                         ].map((step, i) => (
                             <div key={i} className="flex items-center gap-4">
                                 <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm border border-white/30">
                                     {i + 1}
                                 </div>
                                 <p className="text-lg font-medium text-white/90">{step}</p>
                             </div>
                         ))}
                     </div>
                     {/* Button: Yellow background, Deep Orange text */}
                     <button className="mt-8 bg-[#FFC843] text-[#CD4628] px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg">
                         <Mic size={20} /> Try Voice Assistant
                     </button>
                 </div>

                 <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col items-center text-center">
                     <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                         <Video size={40} className="text-white" />
                     </div>
                     <p className="text-xl font-medium italic opacity-90">
                         "No more reading complex medical terms — just speak and watch!"
                     </p>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAI;
