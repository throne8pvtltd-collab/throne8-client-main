'use client';

import { useEffect, useState } from 'react';
import { Card, SectionHeader } from './ui/AboutPrimitives';
import CompanyService from '@/lib/api/company.service';
import type { TimelineItem } from '../../types';

const TYPE_COLORS: Record<string, string> = {
    Founding: 'bg-violet-50 text-violet-700 border-violet-200',
    Funding: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Product Launch': 'bg-blue-50 text-blue-700 border-blue-200',
    Milestone: 'bg-amber-50 text-amber-700 border-amber-200',
};

interface TimelineSectionProps {
    companyId: string;
    refreshTrigger?: number; // increment karo jab modal se naya entry add ho
}

export default function TimelineSection({ companyId, refreshTrigger = 0 }: TimelineSectionProps) {
    const [items, setItems] = useState<TimelineItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) return;
        const fetchTimeline = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await CompanyService.getTimeline(companyId);
                // API response structure ke hisaab se adjust karo
                const raw = res?.data?.items ?? [];
                const entries = Array.isArray(raw) ? raw : [];
                const published = entries.filter((t: TimelineItem) => t.isPublished);
                setItems(published);
            } catch (err: any) {
                setError(err.message || 'Failed to load timeline');
            } finally {
                setLoading(false);
            }
        };
        fetchTimeline();
    }, [companyId, refreshTrigger]);

    if (loading) return (
        <section className="mb-10">
            <SectionHeader label="Journey" title="Company Timeline" />
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-start animate-pulse">
                        <div className="w-14 h-14 rounded-2xl bg-[#4a3728]/10 flex-shrink-0" />
                        <div className="flex-1 bg-white/75 border border-[#e0d8cf]/80 rounded-3xl p-5 space-y-2">
                            <div className="h-4 bg-[#4a3728]/10 rounded-full w-1/3" />
                            <div className="h-3 bg-[#4a3728]/07 rounded-full w-2/3" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );

    if (error) return (
        <section className="mb-10">
            <SectionHeader label="Journey" title="Company Timeline" />
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">{error}</p>
        </section>
    );

    if (items.length === 0) return (
        <section className="mb-10">
            <SectionHeader label="Journey" title="Company Timeline" subtitle="No timeline entries yet. Add your first milestone!" />
        </section>
    );

    return (
        <section className="mb-10">
            <SectionHeader
                label="Journey"
                title="Company Timeline"
                subtitle="Every milestone that shaped us."
            />
            <div className="relative pl-2">
                <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#4a3728]/30 via-[#4a3728]/15 to-transparent hidden md:block" />
                <div className="space-y-4">
                    {items.map((item, idx) => {
                        const date = new Date(item.year, item.month - 1).toLocaleString('en-IN', {
                            month: 'short', year: 'numeric',
                        });
                        return (
                            <div key={idx} className="relative flex gap-4 md:gap-5 items-start group">
                                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-[#4a3728] flex items-center justify-center shadow-lg text-2xl ring-4 ring-[#f6ede8] group-hover:scale-105 transition-transform duration-200">
                                    {item.icon}
                                    {idx === items.length - 1 && (
                                        <span className="absolute inset-0 rounded-2xl ring-2 ring-[#4a3728]/30 animate-ping opacity-60" />
                                    )}
                                </div>
                                <Card className="flex-1 p-5 group-hover:border-[#c8bfb5] transition-colors duration-200">
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-sm font-bold text-[#4a3728]">{item.title}</span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${TYPE_COLORS[item.type] ?? 'bg-[#4a3728]/10 text-[#4a3728] border-[#4a3728]/20'}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-[#4a3728]/45 font-semibold tabular-nums bg-[#f6ede8] px-2.5 py-1 rounded-xl border border-[#e0d8cf]">
                                            {date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#4a3728]/65 leading-relaxed">{item.description}</p>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}