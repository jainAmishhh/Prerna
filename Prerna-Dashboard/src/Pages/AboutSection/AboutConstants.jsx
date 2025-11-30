import React from "react";
import {
  Sunrise, Lightbulb, Sparkles, Crown, Flower2, Hand,
  GraduationCap, Heart, Shield, Mic, MessageCircle, Target, Globe,
  Video, MessagesSquare
} from "lucide-react";

// --- THEME COLORS ---
const BRIGHT_CORAL = "D9534F";
const DEEP_ORANGE = "CD4628";
const SUNNY_YELLOW = "FFC843";
const SOFT_PINK = "F9E8EC"; // Used as a subtle mix/accent

// --- 1. Story Slides ---
export const storySlides = [
  {
    title: "The Beginning",
    text: "In rural India, a young girl asked her mother about education schemes. The mother didn't know where to find information. Language barriers and complex processes kept opportunities hidden.",
    icon: <Sunrise />,
    // Updated: Yellow/Coral gradient
    color: `from-[#${SUNNY_YELLOW}] to-[#${DEEP_ORANGE}]`,
    image: "https://images.unsplash.com/photo-1604682727296-7711f165f823?q=80&w=1170&auto=format&fit=crop"
  },
  {
    title: "The Realization",
    text: "Millions of women across India face similar challenges - unable to access government schemes, health information, and opportunities simply because information isn't in their language or format.",
    icon: <Lightbulb />,
    // Updated: Coral/Deep Orange gradient
    color: `from-[#${BRIGHT_CORAL}] to-[#${DEEP_ORANGE}]`,
    image: "https://images.unsplash.com/photo-1650978810653-112cb6018092?q=80&w=1170&auto=format&fit=crop"
  },
  {
    title: "The Solution",
    text: "What if women could simply speak their questions and get video answers? What if every scheme, every opportunity was just a voice command away? Thus, Prerna was born.",
    icon: <Sparkles />,
    // Updated: Deep Orange/Coral gradient
    color: `from-[#${DEEP_ORANGE}] to-[#${BRIGHT_CORAL}]`,
    image: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?q=80&w=1024&auto=format&fit=crop"
  },
  {
    title: "The Mission Today",
    text: "Prerna now empowers women from ages 0-60+, covering health, education, safety, and opportunities. Every voice matters. Every woman deserves access to information that can change her life.",
    icon: <Crown />,
    // Updated: Yellow/Deep Orange gradient
    color: `from-[#${SUNNY_YELLOW}] to-[#${DEEP_ORANGE}]`,
    image: "https://images.unsplash.com/photo-1521316730702-829a8e30dfd0?q=80&w=1170&auto=format&fit=crop"
  },
];

// --- 2. Why Prerna ---
export const whyPrernaMeans = [
  {
    icon: <Flower2 size={32} />,
    title: "प्रेरणा (Prerna)",
    subtitle: "Inspiration",
    desc: "Every woman is an inspiration. Prerna exists to inspire and be inspired by the strength of women.",
    // Updated: Coral/Deep Orange gradient
    color: `from-[#${BRIGHT_CORAL}] to-[#${DEEP_ORANGE}]`,
  },
  {
    icon: <Hand size={32} />,
    title: "सखी (Sakhi)",
    subtitle: "Friend & Companion",
    desc: "Our AI chatbot Sakhi is your trusted friend, always there to guide and support you through every question.",
    // Updated: Deep Orange/Yellow gradient
    color: `from-[#${DEEP_ORANGE}] to-[#${SUNNY_YELLOW}]`,
  },
  {
    icon: <Sunrise size={32} />,
    title: "नई शुरुआत",
    subtitle: "New Beginning",
    desc: "Every interaction with Prerna is a step towards empowerment, knowledge, and a brighter future.",
    // Updated: Coral/Yellow gradient
    color: `from-[#${BRIGHT_CORAL}] to-[#${SUNNY_YELLOW}]`,
  },
];

// --- 3. Core Features (Detailed) ---
export const coreFeatures = [
  {
    icon: <Mic size={40} />,
    title: "Voice-to-Video AI",
    subtitle: "Revolutionary Technology",
    description: "Speak in Hindi or English. We convert your voice to text, process your question, and generate easy-to-understand video responses. Perfect for all literacy levels.",
    // Updated: Deep Orange/Coral gradient
    linear: `from-[#${DEEP_ORANGE}] to-[#${BRIGHT_CORAL}]`,
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=600&auto=format&fit=crop",
    stats: ["Voice Recognition", "Text Processing", "Video Generation", "Multi-language"],
    howItWorks: ["Speak your question naturally", "AI converts voice to text instantly", "System understands context", "Generates video answer"]
  },
  {
    icon: <MessageCircle size={40} />,
    title: "Sakhi AI Chatbot",
    subtitle: "Your 24/7 Companion",
    description: "Sakhi understands your age, location, and needs. Get personalized guidance on schemes, health, education, and opportunities - always available, always helpful.",
    // Updated: Yellow/Deep Orange gradient
    linear: `from-[#${SUNNY_YELLOW}] to-[#${DEEP_ORANGE}]`,
    image: "https://plus.unsplash.com/premium_photo-1681466343764-b0a04153bc07?q=80&w=1057&auto=format&fit=crop",
    stats: ["Contextual AI", "24/7 Available", "Bilingual", "Personalized"],
    howItWorks: ["Share age & state", "Sakhi learns preferences", "Ask any question", "Receive tailored help"]
  },
  {
    icon: <Target size={40} />,
    title: "Age-Based Personalization",
    subtitle: "From Birth to Senior Years",
    description: "Content filtered by life stage. Schemes for newborns, education for children, career for young adults, health for seniors - perfectly matched to your needs.",
    // Updated: Coral/Yellow gradient
    linear: `from-[#${BRIGHT_CORAL}] to-[#${SUNNY_YELLOW}]`,
    image: "https://images.unsplash.com/photo-1542800950-a0fd5c06bd11?q=80&w=687&auto=format&fit=crop",
    stats: ["0-2 Years", "3-12 Years", "13-60 Years", "60+ Years"],
    howItWorks: ["Sign up with details", "Get curated content", "Track milestones", "Access opportunities"]
  },
  {
    icon: <Globe size={40} />,
    title: "Bilingual Support",
    subtitle: "Breaking Language Barriers",
    description: "Full support in Hindi and English. Rural or urban, educated or not - everyone deserves access to information in their preferred language.",
    // Updated: Deep Orange/Coral gradient
    linear: `from-[#${DEEP_ORANGE}] to-[#${BRIGHT_CORAL}]`,
    image: "https://images.unsplash.com/photo-1739442703639-e7201aeb2118?q=80&w=1001&auto=format&fit=crop",
    stats: ["Hindi Content", "English Content", "Voice in Both", "Video Subtitles"],
    howItWorks: ["Choose language", "Switch with one tap", "Voice works in both", "Videos auto-subtitled"]
  }
];

// --- 4. Platform Pillars ---
export const platformPillars = [
  {
    icon: <GraduationCap size={32} />,
    title: "Education & Opportunities",
    desc: "Scholarships, fellowships, skill training, sports programs & career guidance.",
    // Updated: Deep Orange/Yellow gradient
    color: `from-[#${DEEP_ORANGE}] to-[#${SUNNY_YELLOW}]`,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    examples: ["500+ Schemes", "Career Paths", "Scholarship Alerts", "Skill Courses"]
  },
  {
    icon: <Heart size={32} />,
    title: "Health & Wellness",
    desc: "Vaccination schedules, menstrual health, maternal care & mental health support.",
    // Updated: Coral/Deep Orange gradient
    color: `from-[#${BRIGHT_CORAL}] to-[#${DEEP_ORANGE}]`,
    image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=1106&auto=format&fit=crop",
    examples: ["Vaccination Tracker", "Period Calendar", "Health Tips", "Doctor Finder"]
  },
  {
    icon: <Shield size={32} />,
    title: "Safety & Legal Rights",
    desc: "Emergency helplines, legal aid, safety tools & rights awareness.",
    // Updated: Deep Burnt Orange/Coral gradient (Retaining a deep, serious tone)
    color: `from-[#CD4628] to-[#D9534F]`, 
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
    examples: ["SOS Button", "Helpline 181", "Legal Guidance", "Safety Tips"]
  },
  {
    icon: <Sparkles size={32} />,
    title: "Government Schemes",
    desc: "Complete database of central and state schemes with easy application processes.",
    // Updated: Yellow/Coral gradient
    color: `from-[#${SUNNY_YELLOW}] to-[#${BRIGHT_CORAL}]`,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    examples: ["Scheme Finder", "Eligibility Check", "Application Help", "Status Tracker"]
  }
];

// --- 5. AI Features ---
export const aiFeatures = [
  {
    icon: <Mic className={`w-8 h-8 text-[#${BRIGHT_CORAL}]`} />,
    title: "Voice to Video",
    desc: "Speak in Hindi/English → AI generates personalized video responses",
    badge: "AI Powered",
  },
  {
    icon: <MessagesSquare className={`w-8 h-8 text-[#${DEEP_ORANGE}]`} />,
    title: "Sakhi Companion",
    desc: "24/7 bilingual chatbot for instant health answers & support",
    badge: "Always Available",
  },
  {
    icon: <Video className={`w-8 h-8 text-[#${BRIGHT_CORAL}]`} />,
    title: "Visual Education",
    desc: "Complex topics explained through easy-to-understand videos",
    badge: "Multilingual",
  },
  {
    icon: <Sparkles className={`w-8 h-8 text-[#${DEEP_ORANGE}]`} />,
    title: "Smart Recommendations",
    desc: "Age & location-based health guidance tailored just for you",
    badge: "Personalized",
  },
];
