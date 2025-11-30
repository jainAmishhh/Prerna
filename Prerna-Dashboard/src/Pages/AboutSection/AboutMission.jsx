import React from "react";
import { Target, Compass, CheckCircle, Star } from "lucide-react";

const AboutMission = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission Card (Deep Coral/Red Theme) */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-[#D9534F]/50 group min-h-[500px]">
           {/* Background Image */}
           <div 
             className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
             style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1669904022334-e40da006a0a3?q=80&w=1169&auto=format&fit=crop')" }}
           />
           {/* Overlay: Deep Burnt Orange to Coral */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#CD4628]/90 via-[#D9534F]/80 to-[#CD4628]/90" />

           <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-center text-white">
             <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Target size={32} />
             </div>
             <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
             <p className="text-lg text-white/90 mb-8 leading-relaxed">
               To create an accessible, AI-powered ecosystem where every woman in India—regardless of age, location, education, or language—can discover opportunities and find support through simple voice commands.
             </p>
             <ul className="space-y-3">
               {[
                 "Break language and literacy barriers",
                 "Make government schemes accessible",
                 "Empower through knowledge"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3">
                     {/* Checkmark: Sunny Yellow for contrast */}
                     <CheckCircle className="text-[#FFC843] shrink-0" size={20} />
                     <span>{item}</span>
                   </li>
                 ))}
             </ul>
           </div>
        </div>

        {/* Vision Card (Deep Burnt Orange/Yellow Theme) */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-[#CD4628]/50 group min-h-[500px]">
           {/* Background Image */}
           <div 
             className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop')" }}
           />
           {/* Overlay: Deep Burnt Orange to Yellow */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#CD4628]/90 via-[#D9534F]/80 to-[#FFC843]/90" />

           <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-center text-white">
             <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                <Compass size={32} />
             </div>
             <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
             <p className="text-lg text-white/90 mb-8 leading-relaxed">
               To become India's most trusted digital companion for women, creating a future where every girl and woman is informed, empowered, and confident—using technology to bridge the gap.
             </p>
             <ul className="space-y-3">
               {[
                   "Reach 10 million women by 2026",
                   "Support in 50+ Indian languages",
                   "100% free, forever"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3">
                     {/* Star: Yellow accent */}
                     <Star className="text-[#FFC843] shrink-0" size={20} />
                     <span>{item}</span>
                   </li>
                 ))}
             </ul>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMission;
