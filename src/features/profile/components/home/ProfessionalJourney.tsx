// src/profile/components/ProfessionalJourney.tsx

'use client';
import React from 'react';
import { UserProfileData } from '@/types/profile.types';

// Capitalize only the first word
const capitalizeFirstWord = (text: string): string => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Capitalize each word separated by spaces, hyphens, or dots
const toTitleCaseWithSeparators = (text: string): string => {
    if (!text) return '';
    return text
        .toLowerCase()
        .split(/(\s|-|\.)/g)
        .map((word) => {
            if (word.match(/^(\s|-|\.)$/)) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
};

interface ProfessionalJourneyProps {
    userProfileData: UserProfileData | null;
    educationList?: any[];
    experienceList?: any[];
}

const ProfessionalJourney: React.FC<ProfessionalJourneyProps> = ({
    userProfileData,
    educationList = [],
    experienceList = []
}) => {
    const journeyItems: any[] = [];

    // ✅ PRIORITY 1: Experience from API (educationList)
    if (experienceList && experienceList.length > 0) {
        const currentExp = experienceList.find(exp => exp.current) || experienceList[0];

        journeyItems.push({
            type: 'work',
            userType: 'Working',
            title: currentExp.company || 'Company',
            role: currentExp.position || 'Position',
            company: currentExp.company || '',
            period: currentExp.period || 'Present',
            color: "from-[#4a3728] to-[#6b4e3d]",
        });
    }
    // ✅ FALLBACK: Experience from Onboarding
    else if (userProfileData?.onboarding?.userType === 'working' &&
        userProfileData?.onboarding?.workingProfile) {
        const workProfile = userProfileData.onboarding.workingProfile;

        const startYear = workProfile.startDate ? new Date(workProfile.startDate).getFullYear() : '';
        const endYear = workProfile.endDate
            ? new Date(workProfile.endDate).getFullYear()
            : 'Present';

        journeyItems.push({
            type: 'work',
            userType: 'Working',
            title: workProfile.companyName || 'Company',
            role: workProfile.jobTitle || 'Position',
            company: workProfile.companyName || '',
            period: startYear ? `${startYear} – ${endYear}` : 'Present',
            color: "from-[#4a3728] to-[#6b4e3d]",
        });
    }

    // ✅ PRIORITY 2: Education from API (educationList)
    if (educationList && educationList.length > 0) {
        const currentEdu = educationList[0];

        const startYear = currentEdu.startDate ? new Date(currentEdu.startDate).getFullYear() : '';
        const endYear = currentEdu.isOngoing
            ? 'Present'
            : (currentEdu.endDate ? new Date(currentEdu.endDate).getFullYear() : 'Present');

        journeyItems.push({
            type: 'education',
            userType: 'Student',
            title: currentEdu.schoolCollegeName || 'College',
            role: currentEdu.degree || 'Degree',
            company: currentEdu.specialization || currentEdu.degreeType || '',
            period: startYear ? `${startYear} – ${endYear}` : 'Present',
            color: "from-[#6b4e3d] to-[#8b6f47]",
        });
    }
    // ✅ FALLBACK: Education from Onboarding
    else if (userProfileData?.onboarding?.userType === 'student' &&
        userProfileData?.onboarding?.studentProfile) {
        const eduProfile = userProfileData.onboarding.studentProfile;

        const gradYear = eduProfile.graduationYear
            ? parseInt(eduProfile.graduationYear)
            : new Date().getFullYear();
        const startYear = gradYear - 4;

        journeyItems.push({
            type: 'education',
            userType: 'Student',
            title: eduProfile.collegeName || 'College',
            role: eduProfile.degree || 'Degree',
            company: eduProfile.fieldOfStudy || '',
            period: `${startYear} – ${gradYear}`,
            color: "from-[#6b4e3d] to-[#8b6f47]",
        });
    }

    // ✅ If no data available, don't show anything
    if (journeyItems.length === 0) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-[#f6ede8]/80 backdrop-blur-md rounded-xl p-3 shadow-xl border border-[#e0d8cf]/50 mb-4 relative overflow-hidden group">
                <div className="relative my-3 overflow-visible">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#8b6f47]/20 via-[#4a3728]/10 to-[#6b4e3d]/20 rounded-full blur-3xl"></div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                            <div className="relative inline-block">
                                <h2 className="text-3xl md:text-4xl font-black text-[#4a3728] tracking-tighter leading-none">
                                    Professional<br />Journey
                                </h2>
                            </div>
                            <p className="text-sm text-[#4a3728]/80 font-medium max-w-md leading-relaxed">
                                {journeyItems.some(item => item.type === 'work')
                                    ? 'Building innovative solutions and driving impact in the tech industry.'
                                    : 'Pursuing excellence in education and preparing for a bright future.'}
                            </p>
                        </div>
                        <div className="space-y-3">
                            {journeyItems.map((item, idx) => (
                                <div key={idx} className="group transition-transform duration-500 hover:scale-105">
                                    <div className="relative bg-gradient-to-br from-[#e0d8cf]/80 via-[#e0d8cf]/60 to-[#e0d8cf]/40 p-3 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-[#e0d8cf]/30 backdrop-blur-sm overflow-hidden">
                                        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} rounded-t-xl`}></div>
                                        <div className="relative flex items-start justify-between pt-1">
                                            <div className="space-y-3">
                                                <div>
                                                    <h3 className="TitleTag text-lg font-bold text-[#4a3728]">
                                                        {item.userType} at {item.title}
                                                    </h3>
                                                    <p className="RoleTag text-md text-[#6b4e3d] font-semibold mt-1">
                                                        {toTitleCaseWithSeparators(item.role)}
                                                    </p>
                                                    {item.company && (
                                                        <p className="text-sm text-[#4a3728]/80">
                                                            {toTitleCaseWithSeparators(item.company)}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 bg-[#4a3728] rounded-full"></div>
                                                    <span className="text-sm font-medium text-[#4a3728]/80">
                                                        {item.period}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110`}>
                                                <svg className="w-12 h-12 text-[#f6ede8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d={item.type === 'work'
                                                            ? "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5"
                                                            : "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"}
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalJourney;
