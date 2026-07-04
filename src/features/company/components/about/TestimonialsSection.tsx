'use client';

import { useEffect, useState } from 'react';
import { Card, SectionHeader, StarRating, AvatarPlaceholder, TabBar, Badge } from './ui/AboutPrimitives';
import CompanyService from '@/lib/api/company.service';
import type { Testimonial, TestimonialFilter } from '../../types';

const FILTER_TABS: { id: TestimonialFilter; label: string }[] = [
    { id: 'All', label: 'All' },
    { id: 'User', label: 'Users' },
    { id: 'Client', label: 'Clients' },
];

interface TestimonialsSectionProps {
    companyId: string;
    refreshTrigger?: number;
}

export default function TestimonialsSection({ companyId, refreshTrigger = 0 }: TestimonialsSectionProps) {
    const [filter, setFilter] = useState<TestimonialFilter>('All');
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) return;
        const fetchTestimonials = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await CompanyService.getTestimonials(companyId, { isPublished: true });
                const raw = res?.data?.items ?? res?.data ?? [];
                setItems(Array.isArray(raw) ? raw : []);
            } catch (err: any) {
                setError(err.message || 'Failed to load testimonials');
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, [companyId, refreshTrigger]);

    const filtered = items.filter(
        (t) => filter === 'All' || t.source === filter
    );

    if (loading) return (
        <section className="mb-10">
            <SectionHeader label="What People Say" title="Testimonials" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white/75 border border-[#e0d8cf]/80 rounded-3xl p-5 space-y-3 animate-pulse">
                        <div className="h-3 bg-[#4a3728]/10 rounded-full w-1/2" />
                        <div className="h-3 bg-[#4a3728]/07 rounded-full w-full" />
                        <div className="h-3 bg-[#4a3728]/07 rounded-full w-2/3" />
                    </div>
                ))}
            </div>
        </section>
    );

    if (error) return (
        <section className="mb-10">
            <SectionHeader label="What People Say" title="Testimonials" />
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">{error}</p>
        </section>
    );

    return (
        <section className="mb-10">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <SectionHeader label="What People Say" title="Testimonials" />
                <TabBar tabs={FILTER_TABS} active={filter} onChange={setFilter} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((t, idx) => (
                    <Card
                        key={idx}
                        hover
                        className={`p-5 flex flex-col gap-3 ${t.isFeatured
                            ? 'border-[#4a3728]/25 bg-gradient-to-br from-[#4a3728]/5 to-[#4a3728]/10 ring-1 ring-[#4a3728]/10'
                            : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            {t.isFeatured ? <Badge variant="dark">⭐ Featured</Badge> : <span />}
                            <Badge variant={t.source === 'User' ? 'blue' : 'green'}>{t.source}</Badge>
                        </div>
                        <StarRating count={t.rating} />
                        <p className="text-sm text-[#4a3728]/75 leading-relaxed flex-1 italic">"{t.message}"</p>
                        <div className="flex items-center gap-3 pt-3 border-t border-[#e0d8cf]/70">
                            <AvatarPlaceholder name={t.authorName} size="sm" />
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-[#4a3728] truncate">{t.authorName}</p>
                                <p className="text-[10px] text-[#4a3728]/50 truncate">
                                    {t.authorTitle} · {t.authorCompany}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-[#4a3728]/40 text-sm">
                    No {filter.toLowerCase()} testimonials yet.
                </div>
            )}
        </section>
    );
}