// src/profile/components/PremiumFeatures.tsx
'use client';
import React from 'react';

const PremiumFeatures: React.FC = () => {
    return (
        <div className="relative bg-[#f6ede8]/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-[#e0d8cf]/40 mb-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#e0d8cf]/15 via-[#d4c2b1]/10 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-[#4a3728]/8 via-[#6b4e3d]/5 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#4a3728]/20 rounded-full animate-ping"></div>
            <div className="absolute top-6 right-6 w-3 h-3 bg-[#4a3728]/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 right-12 w-2 h-2 bg-[#e0d8cf]/40 rounded-full animate-bounce"></div>
            <div className="relative z-10">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4a3728] via-[#6b4e3d] to-[#4a3728] rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-all duration-500 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#f6ede8]/20 to-transparent rounded-2xl"></div>
                            <svg className="w-8 h-8 text-[#f6ede8] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-[#4a3728] ml-0 mb-2">Premium Features</h3>
                        </div>
                    </div>
                    <p className="text-[#4a3728]/70 text-lg font-medium max-w-2xl mx-auto">
                        Enterprise-grade solutions designed for industry leaders
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                            title: 'AI Networking',
                            description: 'Connect smarter with AI-driven insights and predictive analytics.',
                        },
                        {
                            icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                            title: 'Security First',
                            description: 'Military-grade encryption with multi-layer security protocols.',
                        },
                        {
                            icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                            title: 'Scalable Innovation',
                            description: 'Built to handle millions of operations with seamless growth.',
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-[#e0d8cf]/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.05] hover:-translate-y-2 transition-all duration-700 border border-[#d4c2b1]/30 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728]/5 to-[#6b4e3d]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4a3728] via-[#6b4e3d] to-[#4a3728] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            <div className="relative z-10 text-center">
                                <div className="relative mx-auto mb-6 w-20 h-20">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#4a3728] to-[#6b4e3d] rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300"></div>
                                    <div className="absolute inset-0.5 bg-gradient-to-br from-[#f6ede8]/10 to-transparent rounded-2xl"></div>
                                    <div className="relative w-full h-full flex items-center justify-center text-[#f6ede8] group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                        </svg>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#4a3728] mb-3 group-hover:text-[#3d2e21] transition-colors duration-300">
                                    {item.title}
                                </h4>
                                <div className="w-12 h-0.5 bg-[#4a3728]/30 mx-auto mb-4 group-hover:w-16 group-hover:bg-[#4a3728] transition-all duration-300"></div>
                                <p className="text-sm text-[#4a3728]/80 leading-relaxed font-medium px-2">
                                    {item.description}
                                </p>
                                <div className="mt-6 flex justify-center">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-[#4a3728]/20 rounded-full group-hover:bg-[#4a3728] transition-colors duration-300"></div>
                                        <div className="w-1 h-1 bg-[#4a3728]/30 rounded-full mt-0.5 group-hover:bg-[#4a3728] transition-colors duration-300 delay-100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12 pt-8 border-t border-[#e0d8cf]/50">
                    <p className="text-[#4a3728]/60 text-sm font-medium">
                        Trusted by Fortune 500 companies worldwide
                    </p>
                    <div className="flex justify-center gap-2 mt-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 bg-[#4a3728]/30 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumFeatures;