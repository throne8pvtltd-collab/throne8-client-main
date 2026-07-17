// src/profile/components/PeopleYouMayKnow.tsx (sidebar component)
'use client';
import React from 'react';

const PeopleYouMayKnow: React.FC = () => {
    return (
        <div className="w-full bg-[#f6ede8]/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-[#e0d8cf]/50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f6ede8]/50 to-[#e0d8cf]/50 rounded-3xl"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-[#4a3728] rounded-xl text-[#f6ede8]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-[#4a3728]">
                        People You May Know
                    </h3>
                </div>
                <p className="text-sm text-[#4a3728]/70 mb-6 font-medium">From your industry</p>
                <div className="space-y-4">
                    {[
                        {
                            name: 'Chhavi Arora',
                            title: 'AWS Cloud & DevOps | IoT Solutions | Sophomore @ IIIT...',
                            avatar: 'CA'
                        },
                        {
                            name: 'Manan Telrandhe',
                            title: 'Tech-savvy Software Developer',
                            avatar: 'MT'
                        },
                        {
                            name: 'Ankit Shinde',
                            title: 'Software Engineer @Techvalens || Nodejs Developer ||...',
                            avatar: 'AS'
                        },
                        {
                            name: 'Harshit Kushwah',
                            title: 'Software Engineer @NIMBLEdGE | Former iOS...',
                            avatar: 'HK'
                        },
                    ].map((person, idx) => (
                        <div
                            key={idx}
                            className="group flex items-center gap-4 p-5 bg-[#e0d8cf]/70 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0d8cf]/50 cursor-pointer"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-[#4a3728] rounded-2xl flex items-center justify-center text-[#f6ede8] font-bold text-lg shadow-lg">
                                    {person.avatar}
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-lg font-bold text-[#4a3728]">{person.name}</p>
                                </div>
                                <p className="text-sm text-[#4a3728]/70 mb-3 line-clamp-2">{person.title}</p>
                                <button className="px-4 py-2 bg-transparent border border-[#4a3728] text-[#4a3728] rounded-xl text-sm font-semibold shadow-lg hover:bg-[#4a3728] hover:text-[#f6ede8] transition-all duration-300 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Connect
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PeopleYouMayKnow;