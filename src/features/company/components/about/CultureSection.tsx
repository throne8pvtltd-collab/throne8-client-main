'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, SectionHeader, AvatarPlaceholder, Badge, TabBar } from './ui/AboutPrimitives';
import CompanyService from '@/lib/api/company.service';
import type { CultureData, CultureTab } from '../../types';


const CULTURE_TABS: { id: CultureTab; label: string }[] = [
    { id: 'values', label: 'Values' },
    { id: 'perks', label: 'Perks' },
    { id: 'team', label: 'Team' },
    { id: 'gallery', label: 'Gallery' },
];

const GALLERY_ICONS: Record<string, string> = {
    Office: '🏢', Team: '👥', Event: '🎤',
};

interface CultureSectionProps {
    companyId: string;
    refreshTrigger?: number;
}

// ── Sub-panels ────────────────────────────────────────────────────────────────

function ValuesPanel({ values }: { values: CultureData['values'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, idx) => (
                <Card key={idx} hover className="p-5">
                    <div className="flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0 mt-0.5">{v.icon}</span>
                        <div>
                            <p className="text-sm font-bold text-[#4a3728] mb-1.5">{v.title}</p>
                            <p className="text-xs text-[#4a3728]/60 leading-relaxed">{v.description}</p>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

function PerksPanel({ perks }: { perks: CultureData['perks'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((perk, idx) => (
                <Card key={idx} hover className="p-5 flex flex-col">
                    <span className="text-3xl mb-3">{perk.icon}</span>
                    <Badge className="mb-2 self-start">{perk.category}</Badge>
                    <p className="text-sm font-bold text-[#4a3728] mb-1.5">{perk.title}</p>
                    <p className="text-xs text-[#4a3728]/60 leading-relaxed flex-1">{perk.description}</p>
                </Card>
            ))}
        </div>
    );
}

function TeamPanel({ teamMembers }: { teamMembers: CultureData['teamMembers'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...teamMembers]
                .sort((a, b) => a.order - b.order)
                .map((member, idx) => (
                    <Card key={idx} hover className="p-5 flex flex-col">
                        <div className="flex items-center gap-3 mb-3.5">
                            {member.avatar ? (
                                <Image src={member.avatar} alt={member.name} width={56} height={56}
                                    className="w-14 h-14 rounded-2xl object-cover flex-shrink-0" unoptimized />
                            ) : (
                                <AvatarPlaceholder name={member.name} size="lg" />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#4a3728] truncate">{member.name}</p>
                                <p className="text-[11px] text-[#4a3728]/50 truncate">{member.designation}</p>
                            </div>
                        </div>
                        <p className="text-xs text-[#4a3728]/60 leading-relaxed flex-1 mb-4">{member.bio}</p>
                        <Link href={member.linkedinUrl} target="_blank"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4a3728]/60 hover:text-[#4a3728] transition-colors w-fit">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            LinkedIn Profile
                        </Link>
                    </Card>
                ))}
        </div>
    );
}

function GalleryPanel({ gallery }: { gallery: CultureData['gallery'] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...gallery]
                .sort((a, b) => a.order - b.order)
                .map((item, idx) => (
                    <Card key={idx} className="overflow-hidden group cursor-pointer">
                        <div className="relative h-44 bg-gradient-to-br from-[#d4c8be] to-[#b8a99a] overflow-hidden">
                            {item.url ? (
                                <Image src={item.url} alt={item.caption} fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                    <span className="text-4xl">{GALLERY_ICONS[item.type] ?? '🖼️'}</span>
                                    <p className="text-xs text-[#4a3728]/50 font-medium">{item.type}</p>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-[#4a3728]/0 group-hover:bg-[#4a3728]/10 transition-colors duration-200" />
                        </div>
                        <div className="p-4">
                            <Badge className="mb-2">{item.type}</Badge>
                            <p className="text-xs text-[#4a3728]/65 leading-relaxed">{item.caption}</p>
                        </div>
                    </Card>
                ))}
        </div>
    );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonGrid({ count = 3 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="bg-white/75 border border-[#e0d8cf]/80 rounded-3xl p-5 h-32 animate-pulse" />
            ))}
        </div>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function CultureSection({ companyId, refreshTrigger = 0 }: CultureSectionProps) {
    const [activeTab, setActiveTab] = useState<CultureTab>('values');
    const [culture, setCulture] = useState<CultureData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (!companyId) return;
        const fetchLife = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await CompanyService.getLife(companyId);
                const d = res?.data ?? res;
                setCulture(d);
            } catch (err: any) {
                // 404 = data abhi create nahi hua
                if (err.message?.toLowerCase().includes('not found') || err.message?.includes('404')) {
                    setCulture(null);
                } else {
                    setError(err.message || 'Failed to load culture data');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchLife();
    }, [companyId, refreshTrigger]);

    if (loading) return (
        <section className="mb-10">
            <SectionHeader label="Inside the Company" title="Life at the Company" />
            <SkeletonGrid count={4} />
        </section>
    );

    if (error) return (
        <section className="mb-10">
            <SectionHeader label="Inside the Company" title="Life at the Company" />
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">{error}</p>
        </section>
    );

    if (!culture) return (
        <section className="mb-10">
            <SectionHeader label="Inside the Company" title="Life at the Company" />
            <div className="mt-4 p-6 bg-white/75 border border-dashed border-[#e0d8cf] rounded-3xl text-center">
                <p className="text-sm text-[#4a3728]/50">
                    Culture info hasn't been added yet. Click "Edit Section" to get started.
                </p>
            </div>
        </section>
    );

    return (
        <section className="mb-10">
            <SectionHeader label="Inside the Company" title="Life at the Company" />
            <TabBar tabs={CULTURE_TABS} active={activeTab} onChange={setActiveTab} className="mb-5 overflow-x-auto" />
            {activeTab === 'values' && <ValuesPanel values={culture.values ?? []} />}
            {activeTab === 'perks' && <PerksPanel perks={culture.perks ?? []} />}
            {activeTab === 'team' && <TeamPanel teamMembers={culture.teamMembers ?? []} />}
            {activeTab === 'gallery' && <GalleryPanel gallery={culture.gallery ?? []} />}
        </section>
    );
}