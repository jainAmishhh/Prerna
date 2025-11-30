import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Award,
  Briefcase,
  ChevronRight,
  Droplet,
  GraduationCap,
  Heart,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Load from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fallback values (optional)
const DEFAULT_USER_AGE = import.meta.env.VITE_DEFAULT_USER_AGE || 25;
const DEFAULT_USER_REGION = import.meta.env.VITE_DEFAULT_USER_REGION || "India";


/* CATEGORY METADATA (STATIC – NO TEXT HERE) */
const CATEGORY_METADATA = [
  {
    id: "education",
    api: "scholarships",
    iconKey: "GraduationCap",
    linear: "from-purple-500 via-purple-600 to-indigo-600",
    bgImage:
      "https://images.unsplash.com/photo-1589104760192-ccab0ce0d90f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "health",
    api: "healthcare",
    iconKey: "Heart",
    linear: "from-pink-500 via-rose-500 to-pink-600",
    bgImage: "https://plus.unsplash.com/premium_photo-1666299679745-2190f8f94352?q=80&w=800",
  },
  {
    id: "menstrual",
    api: "schemes",
    iconKey: "Droplet",
    linear: "from-rose-500 via-pink-500 to-rose-600",
    bgImage:
      "https://images.unsplash.com/photo-1589395937921-fddc324ccdd2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "safety",
    api: "schemes",
    iconKey: "ShieldCheck",
    linear: "from-indigo-500 via-purple-500 to-pink-500",
    bgImage:
      "https://images.unsplash.com/photo-1609601242635-5c9678e15f20?q=80&w=800",
  },
  {
    id: "employment",
    api: "schemes",
    iconKey: "Briefcase",
    linear: "from-purple-500 via-indigo-500 to-purple-600",
    bgImage:
      "https://images.unsplash.com/photo-1684259499086-93cb3e555803?q=80&w=800",
  },
  {
    id: "sports",
    api: "sports",
    iconKey: "Award",
    linear: "from-pink-500 via-rose-500 to-purple-500",
    bgImage:
      "https://plus.unsplash.com/premium_photo-1668612845709-b1e5fd3629bb?q=80&w=800",
  },
];

const ICON_MAP = {
  GraduationCap: <GraduationCap size={40} className="text-white" />,
  Heart: <Heart size={40} className="text-white" />,
  Droplet: <Droplet size={40} className="text-white" />,
  ShieldCheck: <ShieldCheck size={40} className="text-white" />,
  Briefcase: <Briefcase size={40} className="text-white" />,
  Award: <Award size={40} className="text-white" />,
};

export default function MainCategorySection() {
  const { t } = useTranslation();

  /* ░░ DYNAMIC TRANSLATION-BASED CATEGORY DATA ░░ */
  const translatedCategories = CATEGORY_METADATA.map((cat) => ({
    ...cat,
    title: t(`MainCategory.categories.${cat.id}.title`),
    description: t(`MainCategory.categories.${cat.id}.description`),
    features: t(`MainCategory.categories.${cat.id}.features`, {
      returnObjects: true,
    }),
  }));

  const [categoriesData, setCategoriesData] = useState(
    translatedCategories.map((cat) => ({
      ...cat,
      schemes: [],
      loading: true,
      error: null,
    }))
  );

  /* FETCHING ALL SCHEMES */
  useEffect(() => {
    const fetchSchemes = async (category) => {
      const endpoint = `${API_BASE_URL}/${category.api}?age=${DEFAULT_USER_AGE}&region=${DEFAULT_USER_REGION}`;
      const key = category.api;

      try {
        const response = await axios.get(endpoint);

        if (response.data && Array.isArray(response.data[key])) {
          const schemes = response.data[key].slice(0, 4).map((item) => ({
            name: item.title || item.name || "Untitled Scheme",
            age: `Ages ${item.age_min || "N/A"} - ${item.age_max || "N/A"}`,
            link: item.link || "#",
          }));

          return { schemes, loading: false, error: null };
        } else {
          return {
            schemes: [],
            loading: false,
            error: t("MainCategory.no_schemes"),
          };
        }
      } catch (e) {
        return {
          schemes: [],
          loading: false,
          error: "Failed to connect to API",
        };
      }
    };

    const loadAll = async () => {
      const results = await Promise.all(
        translatedCategories.map((c) => fetchSchemes(c))
      );

      setCategoriesData((prev) =>
        prev.map((cat, index) => ({ ...cat, ...results[index] }))
      );
    };

    loadAll();
  }, [t]);

  /* INITIAL LOADING */
  if (categoriesData.some((c) => c.loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-purple-600">
        {t("MainCategory.loading_text")}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <h2 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-linear-to-r from-yellow-400 to-red-500 mb-10">
          {t("MainCategory.hero_title")}
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition p-0 overflow-hidden relative"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-48">
                <img
                  src={category.bgImage}
                  alt={category.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.linear} opacity-90`}
                ></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
                  <div className="bg-white/25 backdrop-blur-md w-20 h-20 rounded-2xl flex items-center justify-center mb-3 shadow-xl">
                    {ICON_MAP[category.iconKey]}
                  </div>

                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-6">
                <p className="text-gray-600 mb-4">{category.description}</p>

                {/* Schemes */}
                <h4 className="text-sm font-bold text-purple-700 mb-2">
                  {t("MainCategory.relevant_schemes")}
                </h4>

                {category.schemes.length > 0 ? (
                  category.schemes.map((scheme, i) => (
                    <a
                      key={i}
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-pink-50 hover:bg-pink-100 p-4 rounded-xl border border-pink-200 mb-2 transition"
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-bold">{scheme.name}</span>
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                      <span className="text-xs text-purple-600 font-medium bg-white px-2 py-1 rounded-full shadow-sm">
                        {scheme.age}
                      </span>
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">
                    {t("MainCategory.no_schemes")}
                  </p>
                )}

                {/* FEATURES */}
                <div className="bg-purple-50 p-4 rounded-xl mt-4">
                  <p className="text-xs font-bold text-purple-700 flex items-center gap-2 mb-3">
                    <Sparkles size={14} /> {t("MainCategory.features_title")}
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    {category.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1">
                        <Star size={12} className="text-pink-500" />
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${category.linear}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

