"use client";

import React from "react";
import { Search, Globe, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavigationProps {
    activeTimezone: string;
    currentUserId?: string;
    isMentor?: boolean;
    mentorUserId?: string;
}

export default function Navigation({
    activeTimezone,
    currentUserId,
    isMentor = false,
    mentorUserId
}: NavigationProps) {
    const router = useRouter();

    const handleHomePage = () => {
        router.push('/dashboard');
    };

    return (
        <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b border-[#ece7e2] px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2 cursor-pointer" onClick={handleHomePage}>
                    <div className="w-8 h-8 bg-[#4a3728] rounded-lg" />
                    <h1 className="text-xl font-black tracking-tighter">THRONE</h1>
                </div>
                <div className="hidden lg:flex relative group">
                    <Search className="absolute left-4 top-3 w-4 h-4 text-slate-400" />
                    <input
                        className="bg-[#f8f6f4] border-none rounded-full py-2.5 pl-11 pr-4 text-[11px] w-[350px] font-medium focus:ring-1 ring-[#4a3728]"
                        placeholder="Search by name, skills or company..."
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-[#8b7355] bg-[#f8f6f4] px-4 py-2 rounded-full border border-[#ece7e2]">
                    <Globe className="w-3.5 h-3.5" /> {activeTimezone}
                </div>
                <button
                    onClick={() => {
                        if (isMentor && mentorUserId) {
                            router.push(`/mentorship/mentorProfile/${mentorUserId}`);
                        }
                    }}
                    className="my-dashboard bg-[#4a3728] text-white px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[2px] shadow-lg hover:bg-[#8b7355] transition-all flex items-center gap-2"
                >
                    MY DASHBOARD
                    <User className="w-4 h-4" />
                </button>
            </div>
        </nav>
    );
}