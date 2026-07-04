// src/features/mentor/components/sections/MentorDiscoverySection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Sidebar from "../layout/Sidebar";
import { MentorCard } from "@/features/index";
import MentorService from "@/lib/api/mentorship.service";

interface MentorDiscoverySectionProps {
    toggleCompare: (id: number) => void;
    compareList: number[];
}

export default function MentorDiscoverySection({ toggleCompare, compareList }: MentorDiscoverySectionProps) {
    const [allMentors, setAllMentors] = useState<any[]>([]);
    const [filteredMentors, setFilteredMentors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtering, setFiltering] = useState(false);

    // Filter states
    const [companySearch, setCompanySearch] = useState("");
    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
    const [selectedExps, setSelectedExps] = useState<string[]>([]);

    useEffect(() => {
        MentorService.getAllMentors({ page: 1, limit: 50 })
            .then((res) => {
                const list = Array.isArray(res.data) ? res.data : [];
                const mapped = list.map((m: any) => ({
                    id: m.mentorId,
                    name: `${m.user?.firstName ?? ""} ${m.user?.lastName ?? ""}`.trim(),
                    role: m.experience?.currentRole?.split(" at ")[0] ?? "Mentor",
                    company: m.experience?.currentRole?.split(" at ")[1] ?? "",
                    rating: m.stats?.averageRating || 0,
                    sessions: m.stats?.totalSessions || 0,
                    price: m.pricing?.quickCall || 0,
                    match: 90,
                    image: m.profilePic ?? "",
                    tags: m.skills?.slice(0, 2) ?? [],
                    exp: `${m.experience?.total ?? 0} Yrs`,
                    expTotal: m.experience?.total ?? 0,
                    domains: m.domains ?? [],
                    isDummy: false,
                }));
                setAllMentors(mapped);
                setFilteredMentors(mapped);
            })
            .catch(() => { setAllMentors([]); setFilteredMentors([]); })
            .finally(() => setLoading(false));
    }, []);

    // Domain mapping — sidebar labels → API domain values
    const DOMAIN_MAP: Record<string, string[]> = {
        "Tech/Engineering": ["web_development", "interview_prep", "open_source"],
        "Product/Design": ["product_management", "ui_ux_design"],
        "Marketing/Growth": ["career_guidance", "entrepreneurship"],
        "Data Science/AI": ["data_science", "machine_learning"],
    };

    // Experience mapping — sidebar labels → year ranges
    const EXP_MAP: Record<string, [number, number]> = {
        "0-3 Yrs": [0, 3],
        "3-7 Yrs": [3, 7],
        "7-12 Yrs": [7, 12],
        "12+ Yrs": [12, 999],
    };

    const handleApplyFilters = () => {
        setFiltering(true);
        setTimeout(() => {
            let result = [...allMentors];

            // Company search filter
            if (companySearch.trim()) {
                result = result.filter(m =>
                    m.company?.toLowerCase().includes(companySearch.toLowerCase()) ||
                    m.name?.toLowerCase().includes(companySearch.toLowerCase())
                );
            }

            // Domain filter
            if (selectedDomains.length > 0) {
                const apiDomains = selectedDomains.flatMap(d => DOMAIN_MAP[d] ?? []);
                result = result.filter(m =>
                    m.domains.some((d: string) => apiDomains.includes(d))
                );
            }

            // Experience filter
            if (selectedExps.length > 0) {
                result = result.filter(m =>
                    selectedExps.some(exp => {
                        const [min, max] = EXP_MAP[exp];
                        return m.expTotal >= min && m.expTotal <= max;
                    })
                );
            }

            setFilteredMentors(result);
            setFiltering(false);
        }, 500); // small delay for loader feel
    };

    const handleClearFilters = () => {
        setCompanySearch("");
        setSelectedDomains([]);
        setSelectedExps([]);
        setFilteredMentors(allMentors);
    };

    const displayMentors = filteredMentors;
    const isFiltered = companySearch || selectedDomains.length > 0 || selectedExps.length > 0;

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
            <Sidebar
                companySearch={companySearch}
                setCompanySearch={setCompanySearch}
                selectedDomains={selectedDomains}
                setSelectedDomains={setSelectedDomains}
                selectedExps={selectedExps}
                setSelectedExps={setSelectedExps}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
            />

            <div>
                {(loading || filtering) ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {Array(6).fill(0).map((_, i) => (
                            <div key={i} className="w-full h-[320px] rounded-[32px] bg-[#e0d8cf] animate-pulse" />
                        ))}
                    </div>
                ) : displayMentors.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <p className="text-2xl font-black text-[#8b7355]">
                            {isFiltered ? "No Mentors Found" : "No Mentors Yet"}
                        </p>
                        <p className="text-slate-400 text-sm mt-2">
                            {isFiltered ? "Try different filters" : "Be the first to join as a mentor!"}
                        </p>
                        {isFiltered && (
                            <button
                                onClick={handleClearFilters}
                                className="mt-4 px-6 py-2 bg-[#4a3728] text-white rounded-2xl text-sm font-bold"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {displayMentors.map((mentor, i) => (
                            <MentorCard key={i} mentor={mentor} />
                        ))}
                    </div>
                )}

                {!loading && !filtering && displayMentors.length > 0 && (
                    <div className="reveal-on-scroll mt-8">
                        <button className="group relative w-full py-4 bg-[#FAF9F6] text-[#4a3728] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 overflow-hidden">
                            <span className="absolute inset-0 bg-[#ece7e2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                            <span className="relative z-10">Show all</span>
                            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
