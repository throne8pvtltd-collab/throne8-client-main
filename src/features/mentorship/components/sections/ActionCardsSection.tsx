"use client";

import React from "react";
import { Search, Users, ArrowRight } from "lucide-react";

interface ActionCardsSectionProps {
    onBecomeMentorClick: () => void;
    onFindMentorClick: () => void;
    isMentor?: boolean;
}

export default function ActionCardsSection({ onBecomeMentorClick, onFindMentorClick, isMentor }: ActionCardsSectionProps) {
    return (
        <>
            <section className="px-6 pb-16 max-w-5xl mx-auto">
                <div className={`grid gap-8 ${isMentor ? 'grid-cols-1 max-w-lg mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {/* Find Mentor Card */}
                    <div
                        onClick={onFindMentorClick}
                        className="group relative bg-white rounded-[32px] p-6 border border-[#ece7e2] shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden hover:-translate-y-2 animate-float-slow">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4a3728]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-[#4a3728] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md">
                                <Search className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-black mb-2 group-hover:text-[#8b7355] transition-colors">
                                Find Mentor
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mb-3 leading-relaxed">
                                Connect with 500+ industry experts from top tech companies. Get
                                personalized 1:1 guidance.
                            </p>
                            <div className="flex items-center gap-2 text-[#8b7355] font-bold text-xs group-hover:gap-4 transition-all">
                                Explore Mentors{" "}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* Become Mentor Card */}
                    {!isMentor && (
                        <div className="group relative bg-white rounded-[32px] p-6 border border-[#ece7e2] shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden hover:-translate-y-2 animate-float-slow-delayed"
                            onClick={onBecomeMentorClick}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8b7355]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8b7355]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-[#8b7355] rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-md">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-black mb-2 group-hover:text-[#4a3728] transition-colors">
                                    Become Mentor
                                </h3>
                                <p className="text-xs text-slate-500 font-medium mb-3 leading-relaxed">
                                    Share your expertise with aspiring professionals. Build your personal
                                    brand and earn.
                                </p>
                                <div className="flex items-center gap-2 text-[#4a3728] font-bold text-xs group-hover:gap-4 transition-all">
                                    Apply Now{" "}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}