// src/profile/components/ProfileProgress.tsx
'use client';
import React from 'react';

const ProfileProgress: React.FC = () => {
    return (
        <div className="bg-[#f6ede8]/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#e0d8cf]/50 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f6ede8]/50 to-[#f6ede8]/50 rounded-3xl"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#4a3728] rounded-xl text-[#f6ede8]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#4a3728]">
                        Profile Progress
                    </h3>
                </div>
                <div className="space-y-6">
                    {[
                        {
                            label: 'Profile Completion',
                            progress: 85,
                            description: 'Add more skills to reach 100%',
                            icon: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            )
                        },
                        {
                            label: 'Network Growth',
                            progress: 60,
                            description: 'Connect with 20 more professionals',
                            icon: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            )
                        },
                        {
                            label: 'Content Engagement',
                            progress: 40,
                            description: 'Share 3 more posts this week',
                            icon: (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            )
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative p-6 bg-[#e0d8cf]/70 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0d8cf]/50 cursor-pointer"
                        >
                            <div className={`absolute inset-0 bg-[#4a3728]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#4a3728] rounded-xl text-[#f6ede8] shadow-lg">
                                            {item.icon}
                                        </div>
                                        <span className="text-lg font-bold text-[#4a3728]">{item.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent">
                                            {item.progress}%
                                        </span>
                                    </div>
                                </div>
                                <div className="relative mb-4">
                                    <div className="w-full bg-[#4a3728]/20 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-3 rounded-full bg-[#4a3728] shadow-lg transition-all duration-1000 ease-out relative"
                                            style={{ width: `${item.progress}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-[#4a3728]/70 font-medium">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileProgress;