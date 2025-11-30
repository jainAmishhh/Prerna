import React from "react";
import { Heart, Mic, MessageCircle, ArrowRight } from "lucide-react";

const AboutCTA = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="relative bg-gradient-to-br from-[#D9534F] via-[#CD4628] to-[#D9534F] rounded-[60px] p-16 text-center overflow-hidden shadow-2xl shadow-[#CD4628]/50">
          {/* Background Decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full transform -translate-x-48 translate-y-48"></div>
          </div>

          {/* Foreground Content */}
          <div className="relative z-10">
            {/* Icon: White/Yellow accent */}
            <div className="bg-white/30 backdrop-blur-sm w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Heart className="text-white fill-white animate-pulse" size={48} />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Be Part of the Prerna Movement
            </h2>

            <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join millions of women who are transforming their lives with the
              power of voice, knowledge, and technology. Prerna is more than a
              platform — it’s a nationwide movement.
            </p>

            <div className="flex justify-center gap-6 flex-wrap">
              {/* Button 1: White background, Deep Coral text */}
              <button className="bg-white text-[#D9534F] font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                <Mic size={22} /> Start with Your Voice
              </button>

              {/* Button 2: White/Coral border, White text */}
              <button className="bg-white/20 backdrop-blur-md text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-[#FFC843]/50">
                <MessageCircle size={22} />
                <span>Chat with Sakhi</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final Closing Section - Soft Pink Background */}
      <div className="py-20 bg-[#F9E8EC]">
        <div className="max-w-5xl mx-auto text-center px-6">
          {/* Title Gradient: Coral to Deep Orange */}
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D9534F] to-[#CD4628] mb-6">
            Together, We Create Change
          </h2>
          <p className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Prerna is not just a platform — it is a revolution powered by every
            woman who chooses to learn, grow, and unlock her full potential.
            Your voice can inspire a million others.
          </p>

          {/* Button: Deep Coral to Yellow */}
          <button className="bg-gradient-to-r from-[#D9534F] to-[#FFC843] text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2 mx-auto">
            Start Your Journey <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default AboutCTA;
