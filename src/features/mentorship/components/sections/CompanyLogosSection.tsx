"use client";

import React from "react";

export default function CompanyLogosSection() {
    return (
        <section className="py-24 bg-[#FAF9F6] overflow-hidden border-y border-[#ece7e2]">
            <div className="text-center mb-16 px-6">
                <span className="text-[10px] font-black uppercase tracking-[5px] text-[#8b7355] block mb-4">
                    Trusted Partners
                </span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#4a3728]">
                    World-Class Companies
                </h2>
            </div>

            {/* You can add marquee company logos here if needed */}
            <div className="text-center text-slate-400 text-sm">
                Company logos section - Add your logos here
            </div>
        </section>
    );
}