import React from "react";
import { ChevronRight, Award, Briefcase, GraduationCap, Star, Target, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

// --- THEME COLORS ---
const BRIGHT_CORAL = "D9534F";
const DEEP_ORANGE = "CD4628";
const SUNNY_YELLOW = "FFC843";
const SOFT_PINK = "F9E8EC";

// Helper function to render appropriate icon
const getTypeIcon = (type) => {
    // Assuming 'type' field exists in MongoDB document
    switch (type ? type.toLowerCase() : '') {
        case 'job':
        case 'internship':
            return <Briefcase size={20} />;
        case 'grant':
        case 'scholarship':
        case 'fellowship':
            return <Award size={20} />;
        case 'training':
        case 'program':
        case 'skill':
            return <GraduationCap size={20} />;
        case 'event':
            return <Star size={20} />;
        default:
            return <Zap size={20} />;
    }
}

// Helper function to format score into visual confidence level
const getConfidenceLevel = (score) => {
    if (typeof score !== 'number' || score < 0.2) return 'Low';
    if (score < 0.4) return 'Moderate';
    if (score < 0.7) return 'High';
    return 'Excellent';
};

const OpportunitiesGrid = ({ data }) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 bg-[#FBFBFB] font-semibold border-2 border-[#D9534F]/30 rounded-xl mx-4">
                No recommended opportunities found for your criteria.
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {data.map((opportunity, i) => (
                <div
                    key={opportunity._id || i} // Use MongoDB _id or index
                    className="group bg-white rounded-xl p-5 shadow-lg border border-[#F9E8EC] hover:shadow-2xl hover:shadow-[#D9534F]/30 transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            {/* Icon Circle: Yellow background, Deep Orange icon */}
                            <div className={`w-10 h-10 rounded-full bg-[#${SUNNY_YELLOW}]/40 flex items-center justify-center text-[#${DEEP_ORANGE}]`}>
                                {getTypeIcon(opportunity.type)}
                            </div>
                            {/* Type Badge: Deep Orange text */}
                            <span className="text-xs font-extrabold uppercase text-[#CD4628]">
                                {opportunity.category || opportunity.type}
                            </span>
                        </div>
                        {/* Score Display (Confidence) */}
                        <div className="text-xs font-semibold text-gray-600">
                            Confidence: <span className="text-[#D9534F] font-extrabold">
                                {getConfidenceLevel(opportunity.score)}
                            </span>
                        </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#333333] mb-2 group-hover:text-[#D9534F] transition-colors line-clamp-2" title={opportunity.title}>
                        {opportunity.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                        {opportunity.description}
                    </p>
                    
                    {/* Region Display */}
                    <p className="text-xs text-gray-500 mb-4 italic">
                        Region: {opportunity.region} | Min Age: {opportunity.age_min}
                    </p>

                    {/* CTA Button: Deep Orange text */}
                    <NavLink
                    to="/opportunities"
                    className={`w-full text-[#CD4628] font-bold text-sm flex items-center space-x-1 hover:space-x-2 transition-all`}>
                        <span>Apply / View Details</span>
                        <ChevronRight className="w-4 h-4" />
                    </NavLink>
                </div>
            ))}
        </div>
    );
};

export default OpportunitiesGrid;
