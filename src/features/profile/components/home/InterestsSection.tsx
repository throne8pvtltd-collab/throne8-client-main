// src/profile/components/InterestsSection.tsx
'use client';
import React from 'react';

const InterestsSection: React.FC = () => {
    return (
        <div className="relative bg-[#f6ede8]/95 via-[#f6ede8]/85 to-[#e0d8cf]/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-[#e0d8cf]/60 mb-8 overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-gradient-radial from-[#4a3728]/10 via-[#7a5c3e]/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-conic from-[#e0d8cf]/30 via-[#4a3728]/10 to-transparent rounded-full blur-2xl group-hover:rotate-180 transition-transform duration-[3000ms]"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse opacity-50"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#4a3728] via-[#7a5c3e] to-[#4a3728] rounded-2xl flex items-center justify-center shadow-xl">
                                <svg className="w-8 h-8 text-[#f6ede8] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728]/20 to-[#7a5c3e]/20 rounded-3xl blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-[#4a3728] tracking-tight mb-1">Interests</h3>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-[#4a3728]/10 to-[#7a5c3e]/10 px-5 py-3 rounded-2xl backdrop-blur-sm border border-[#e0d8cf]/50">
                        <div className="text-center">
                            <p className="text-lg font-bold text-[#4a3728]">127</p>
                            <p className="text-xs text-[#4a3728]/70 font-medium">Following</p>
                        </div>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-[#e0d8cf]/40 via-[#e0d8cf]/30 to-[#e0d8cf]/20 backdrop-blur-sm rounded-2xl p-2 shadow-inner">
                        <div className="flex">
                            {['Top Voices', 'Companies', 'Groups', 'Newsletters', 'Schools'].map((item) => (
                                <button
                                    key={item}
                                    className={`relative flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-500 ${item === 'Top Voices'
                                        ? 'text-[#f6ede8] bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] shadow-lg transform scale-105'
                                        : 'text-[#4a3728]/60 hover:text-[#4a3728] hover:bg-[#e0d8cf]/20'
                                        }`}
                                >
                                    {item}
                                    {item === 'Top Voices' && (
                                        <>
                                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-[#f6ede8] rounded-full"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728]/20 to-[#7a5c3e]/20 rounded-xl blur-lg scale-110 opacity-50"></div>
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    {[
                        {
                            name: 'Anushree Jain',
                            connection: '• 2nd',
                            title: 'Co-founder, SocialTAG | Helping brands with Strategy-led influencer marketing campaigns',
                            followers: '159,847 followers',
                            image: 'https://images.unsplash.com/photo-1494790108755-2616b2cd96c4?w=150&h=150&fit=crop&crop=face',
                            growth: '+12%',
                            expertise: ['Marketing', 'Strategy', 'Branding']
                        },
                        {
                            name: 'Ayush Wadhwa',
                            connection: '• 2nd',
                            title: 'Founder, OWLED | Forbes 30u30 | Mastering Content Creation + Influencer Marketing, Ad Films & AI/AR | Angel Investor',
                            followers: '58,018 followers',
                            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                            growth: '+8%',
                            expertise: ['AI/AR', 'Content', 'Investment']
                        },
                    ].map((interest, idx) => (
                        <div
                            key={idx}
                            className="group/card relative bg-gradient-to-r from-[#e0d8cf]/50 via-[#e0d8cf]/30 to-transparent backdrop-blur-sm rounded-3xl p-6 border border-[#e0d8cf]/40 hover:border-[#4a3728]/30 shadow-lg hover:shadow-2xl transform transition-all duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4a3728]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                {interest.growth}
                            </div>
                            <div className="flex items-start gap-5 relative z-10">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-[#e0d8cf] shadow-xl transition-all duration-500">
                                        <img src={interest.image} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="text-lg font-bold text-[#4a3728] group-hover/card:text-[#7a5c3e] transition-colors duration-300">
                                            {interest.name}
                                        </h4>
                                        <span className="text-sm text-[#4a3728]/60 font-medium">{interest.connection}</span>
                                    </div>
                                    <p className="text-sm text-[#4a3728]/70 leading-relaxed mb-3 line-clamp-2">{interest.title}</p>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {interest.expertise.map((tag, tagIdx) => (
                                            <span key={tagIdx} className="px-2 py-1 bg-[#4a3728]/10 text-[#4a3728] text-xs font-medium rounded-lg">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-xs text-[#4a3728]/60 font-medium flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            {interest.followers}
                                        </p>
                                    </div>
                                    <button className="group/btn relative px-6 py-2 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] text-[#f6ede8] rounded-2xl text-sm font-semibold duration-300 flex items-center gap-2 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#7a5c3e] to-[#4a3728] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                        <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="relative z-10">Following</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <button className="group/show relative inline-flex items-center gap-4 bg-gradient-to-r from-transparent via-[#e0d8cf]/30 to-transparent backdrop-blur-sm border-2 border-[#4a3728]/20 hover:border-[#4a3728] text-[#4a3728] px-8 py-4 rounded-2xl font-bold text-sm duration-500 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728]/5 via-[#7a5c3e]/5 to-[#4a3728]/5 opacity-0 group-hover/show:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex items-center gap-3">
                            <span>Show all Top Voices</span>
                            <div className="w-8 h-8 bg-gradient-to-r from-[#4a3728] to-[#7a5c3e] rounded-full flex items-center justify-center group-hover/show:rotate-180 transition-transform duration-500">
                                <svg className="w-4 h-4 text-[#f6ede8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterestsSection;