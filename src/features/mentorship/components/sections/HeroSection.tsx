"use client";

import React from "react";

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#8b7355]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4a3728]/5 rounded-full blur-3xl" />

            {/* Floating Mentor Avatars - Left Side */}
            <div className="hidden lg:block">
                <div className="absolute left-[6%] top-[22%] w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl animate-float opacity-90 hover:opacity-100 transition-all hover:scale-110 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
                        alt="Mentor"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute left-[3%] top-[42%] w-36 h-36 rounded-3xl overflow-hidden border-4 border-white shadow-2xl animate-float-delayed opacity-85 hover:opacity-100 transition-all hover:scale-110 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
                        alt="Mentor"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute left-[8%] top-[64%] w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl animate-float opacity-75 hover:opacity-100 transition-all hover:scale-110 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
                        alt="Mentor"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Floating Mentor Avatars - Right Side */}
            <div className="hidden lg:block">
                <div className="absolute right-[6%] top-[22%] w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl animate-float opacity-75 hover:opacity-100 transition-all hover:scale-110 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
                        alt="Mentor"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute right-[3%] top-[42%] w-36 h-36 rounded-3xl overflow-hidden border-4 border-white shadow-2xl animate-float-delayed opacity-85 hover:opacity-100 transition-all hover:scale-110 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400"
                        alt="Mentor"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute right-[8%] top-[64%] w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-xl animate-float opacity-90 hover:opacity-100 transition-all hover:scale-110 cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400"
                        alt="Mentor"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative mt-16 z-10 max-w-5xl mx-auto" style={{ marginTop: '4vw' }}>
                <div className="text-center mb-12 reveal-on-scroll">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
                        LEVEL UP <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a3728] to-[#8b7355] italic uppercase">
                            Faster.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 font-medium max-w-3xl mx-auto leading-relaxed">
                        Direct access to the world's most successful tech leaders. Built for
                        serious builders.
                    </p>
                </div>
            </div>
        </section>
    );
}