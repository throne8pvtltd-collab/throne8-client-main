'use client';

import { useEffect, useState } from 'react';
import { Card, SectionHeader } from './ui/AboutPrimitives';
import CompanyService from '@/lib/api/company.service';
import type { AboutIdentityData } from '../../types';

interface StorySectionProps {
    companyId: string;
    onEditClick: () => void; // page.tsx se edit modal trigger ke liye
}

export default function StorySection({ companyId, onEditClick }: StorySectionProps) {
    const [data, setData] = useState<AboutIdentityData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!companyId) return;
        const fetch = async () => {
            try {
                setLoading(true);
                const res = await CompanyService.getAboutIdentity(companyId);
                setData(res.data);
            } catch (err: any) {
                if (!err?.message?.includes('404') && !err?.message?.includes('not found') && !err?.message?.includes('Identity not found')) {
                    console.error('Failed to load identity:', err);
                }
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [companyId]);

    if (loading) return (
        <section className="mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-36 bg-[#e0d8cf]/40 rounded-3xl animate-pulse" />
                ))}
            </div>
            <div className="h-40 bg-[#e0d8cf]/40 rounded-3xl animate-pulse" />
        </section>
    );

    if (!data) return (
        <section className="mb-10">
            <SectionHeader label="Who We Are" title="Story, Mission & Vision" />
            <div className="text-center py-16 text-[#4a3728]/40 text-sm">
                No identity data added yet.{' '}
                <button onClick={onEditClick} className="underline text-[#4a3728]/60 hover:text-[#4a3728]">
                    Add now
                </button>
            </div>
        </section>
    );

    const PILLARS = [
        { label: 'Mission', icon: '🎯', text: data.mission, accent: 'from-[#4a3728]/5 to-[#4a3728]/10' },
        { label: 'Vision', icon: '🔭', text: data.vision, accent: 'from-[#7a5c4a]/5 to-[#7a5c4a]/10' },
        { label: 'Promises', icon: '🤝', text: data.promises?.join(' • '), accent: 'from-[#b8917a]/5 to-[#b8917a]/10' },
    ];

    return (
        <section className="mb-10">
            <SectionHeader label="Who We Are" title="Story, Mission & Vision" />

            {/* Story para */}
            {data.story && (
                <Card className="p-6 mb-4">
                    <p className="text-[10px] font-black text-[#4a3728]/35 uppercase tracking-widest mb-3">Our Story</p>
                    <p className="text-sm text-[#4a3728]/70 leading-relaxed">{data.story}</p>
                </Card>
            )}

            {/* Mission / Vision / Promises cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                {PILLARS.map((item) => (
                    <Card key={item.label} hover className={`p-6 bg-gradient-to-br ${item.accent}`}>
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-[11px] font-black text-[#4a3728] uppercase tracking-widest">
                                {item.label}
                            </span>
                        </div>
                        <p className="text-sm text-[#4a3728]/75 leading-relaxed">{item.text}</p>
                    </Card>
                ))}
            </div>

            {/* Impact stats — ab API ka data */}
            {data.impacts?.length > 0 && (
                <Card className="p-6">
                    <p className="text-[10px] font-black text-[#4a3728]/35 uppercase tracking-widest mb-4">
                        Our Impact So Far
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {data.impacts.map((stat, idx) => (
                            <div
                                key={idx}
                                className="relative text-center py-5 px-3 bg-gradient-to-b from-[#f6ede8] to-[#ede4da] rounded-2xl border border-[#e0d8cf] overflow-hidden hover:border-[#4a3728]/30 transition-colors"
                            >
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#4a3728]/5 rounded-full" />
                                <p className="text-2xl font-black text-[#4a3728] leading-none">{stat.metric}</p>
                                <p className="text-[11px] font-bold text-[#4a3728]/70 mt-1.5">{stat.title}</p>
                                <p className="text-[10px] text-[#4a3728]/45 mt-1 leading-tight">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </section>
    );
}