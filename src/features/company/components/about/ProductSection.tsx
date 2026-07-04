'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, SectionHeader, Badge } from './ui/AboutPrimitives';
import CompanyService from '@/lib/api/company.service';
import type { ProductData } from '../../types';
interface ProductSectionProps {
    companyId: string;
    refreshTrigger?: number;
}

export default function ProductSection({ companyId, refreshTrigger = 0 }: ProductSectionProps) {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) return;
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await CompanyService.getProduct(companyId);
                console.log('Product API response:', JSON.stringify(res, null, 2));
                const data = res?.data ?? res;
                if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    setProduct(data);
                } else {
                    setProduct(null);
                }
            } catch (err: any) {
                // 404 matlab data abhi create nahi hua — error mat dikhao
                if (err.message?.includes('404') || err.message?.includes('not found') || err.message?.toLowerCase().includes('not found')) {
                    setProduct(null);
                } else {
                    setError(err.message || 'Failed to load product');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [companyId, refreshTrigger]);

    if (loading) return (
        <section className="mb-10">
            <SectionHeader label="Product" title="Our Product" />
            <div className="space-y-4 animate-pulse">
                <div className="bg-white/75 border border-[#e0d8cf]/80 rounded-3xl p-6 h-40" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white/75 border border-[#e0d8cf]/80 rounded-3xl p-5 h-32" />
                    ))}
                </div>
            </div>
        </section>
    );

    if (error) return (
        <section className="mb-10">
            <SectionHeader label="Product" title="Our Product" />
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">{error}</p>
        </section>
    );

    if (!product) return (
        <section className="mb-10">
            <SectionHeader label="Product" title="Our Product" subtitle="No product info added yet." />
            <div className="mt-4 p-6 bg-white/75 border border-dashed border-[#e0d8cf] rounded-3xl text-center">
                <p className="text-sm text-[#4a3728]/50 mb-3">
                    Product details haven't been added yet. Click "Edit Section" to add your product info.
                </p>
            </div>
        </section>
    );

    return (
        <section className="mb-10">
            <SectionHeader
                label="Product"
                title={product.name}
                subtitle={product.tagline}
            />

            {/* Overview card */}
            <Card className="p-6 mb-5">
                <p className="text-sm text-[#4a3728]/70 leading-relaxed mb-5 max-w-2xl">
                    {product.description}
                </p>
                <div className="flex flex-wrap gap-3">
                    {product.demoLink && (
                        <Link
                            href={product.demoLink}
                            target="_blank"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4a3728] text-[#f6ede8] text-sm font-semibold rounded-2xl hover:bg-[#3a2a1e] active:scale-95 transition-all duration-150 shadow-md"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Live Demo
                        </Link>
                    )}
                </div>
            </Card>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.features.map((feature, idx) => {
                    const isActive = activeIdx === idx;
                    return (
                        <button
                            key={idx}
                            onClick={() => setActiveIdx(isActive ? null : idx)}
                            className={`text-left p-5 rounded-3xl border transition-all duration-200 group
                                ${isActive
                                    ? 'bg-[#4a3728] border-[#4a3728] shadow-xl scale-[1.01]'
                                    : 'bg-white/70 border-[#e0d8cf] hover:border-[#b8a99a] hover:shadow-sm hover:-translate-y-0.5'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-2xl">{feature.icon}</span>
                                <Badge className={isActive ? '!bg-white/15 !text-[#f6ede8] !border-transparent' : ''}>
                                    {feature.category}
                                </Badge>
                            </div>
                            <p className={`text-sm font-bold mb-1.5 ${isActive ? 'text-[#f6ede8]' : 'text-[#4a3728]'}`}>
                                {feature.title}
                            </p>
                            <p className={`text-xs leading-relaxed ${isActive ? 'text-[#f6ede8]/70' : 'text-[#4a3728]/55'}`}>
                                {feature.description}
                            </p>
                            <div className={`mt-3 flex items-center gap-1 text-[10px] font-semibold transition-opacity ${isActive ? 'opacity-100 text-[#f6ede8]/60' : 'opacity-0'}`}>
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Selected
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}