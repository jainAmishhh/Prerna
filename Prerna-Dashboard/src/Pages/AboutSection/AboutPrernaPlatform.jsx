import React from "react";
import AboutStory from "./AboutStory";
import AboutMeaning from "./AboutMeaning";
import AboutMission from "./AboutMission";
import AboutFeatures from "./AboutFeatures";
import AboutPillars from "./AboutPillars";
import AboutAI from "./AboutAI";
import AboutCTA from "./AboutCTA";

export default function AboutPrernaPlatform() {
  // Base background is Creamy White
  return (
    <div className="min-h-screen bg-[#FBFBFB] mt-7"> 
      <AboutStory />
      <AboutMeaning />
      <AboutMission />
      <AboutFeatures />
      <AboutPillars />
      <AboutAI />
      <AboutCTA />
    </div>
  );
}
