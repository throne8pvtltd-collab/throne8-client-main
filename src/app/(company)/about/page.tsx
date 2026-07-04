'use client';
// ─── about/page.tsx ───────────────────────────────────────────────────────────
// Main entry — composes all section components.

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { AboutSection } from '@/features/company/types';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/features/profile/hooks/useProfile';
import IdentityEditModal from '@/features/company/modal/IdentityEditModal';
import { NAV_SECTIONS } from '@/features/company/constants/data';
import StorySection from '@/features/company/components/about/StorySection';
import TimelineSection from '@/features/company/components/about/TimelineSection';
import TestimonialsSection from '@/features/company/components/about/TestimonialsSection';
import ProductSection from '@/features/company/components/about/ProductSection';
import CultureSection from '@/features/company/components/about/CultureSection';


// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const [active, setActive] = useState<AboutSection>('story');
  const [showEditModal, setShowEditModal] = useState(false);
  const [timelineRefresh, setTimelineRefresh] = useState(0);
  const [testimonialsRefresh, setTestimonialsRefresh] = useState(0);
  const [productRefresh, setProductRefresh] = useState(0);
  const [cultureRefresh, setCultureRefresh] = useState(0);

  const { user } = useAuth();
  const router = useRouter();
  const {
    userProfileData,
    isLoadingProfile,
    loadProfile
  } = useProfile();

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const companyId = userProfileData?.companyId || '';

  // // console.log('👤 [SETUP_PAGE] Current User:', user);
  // console.log('👤 [SETUP_PAGE] User Profile Data:', companyId);

  return (
    <>
      <div className="min-h-screen bg-[#f6ede8]">

        {/* ── Sticky header ── */}
        <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md border-b border-[#e0d8cf]/80 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-lg font-black text-[#4a3728] tracking-tight">About Page</h1>
              <p className="text-[11px] text-[#4a3728]/45 mt-0.5">
                Manage what the world sees about your company
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#4a3728]/70 border border-[#e0d8cf] rounded-2xl bg-white/70 hover:bg-[#f6ede8] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Public
            </Link> */}
              {/* <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#4a3728] text-[#f6ede8] rounded-2xl hover:bg-[#3a2a1e] active:scale-95 transition-all shadow-md">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Section
            </button> */}
            </div>
          </div>
        </header>

        {/* ── Content ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">

          {/* Section nav pills */}
          <nav className="flex gap-2 overflow-x-auto pb-2 mb-7 scrollbar-none items-center">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`
                flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold
                whitespace-nowrap flex-shrink-0 border transition-all duration-200
                ${active === s.id
                    ? 'bg-[#4a3728] text-[#f6ede8] border-[#4a3728] shadow-md'
                    : 'bg-white/65 text-[#4a3728]/65 border-[#e0d8cf] hover:bg-[#ede4da] hover:text-[#4a3728]'
                  }
              `}
              >
                <span className="text-base leading-none">{s.icon}</span>
                {s.label}
              </button>
            ))}
            <button onClick={() => setShowEditModal(true)} className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#4a3728] text-[#f6ede8] rounded-2xl hover:bg-[#3a2a1e] active:scale-95 transition-all shadow-md flex-shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Section
            </button>
          </nav>

          {/* Active section */}
          {active === 'story' && (
            <StorySection
              companyId={companyId}
              onEditClick={() => setShowEditModal(true)}
            />
          )}
          {active === 'timeline' && (
            <TimelineSection
              companyId={companyId}
              refreshTrigger={timelineRefresh}
            />
          )}
          {active === 'testimonials' && (
            <TestimonialsSection
              companyId={companyId}
              refreshTrigger={testimonialsRefresh}
            />
          )}
          {active === 'product' && (
            <ProductSection
              companyId={companyId}
              refreshTrigger={productRefresh}
            />
          )}
          {active === 'culture' && (
            <CultureSection
              companyId={companyId}
              refreshTrigger={cultureRefresh}
            />
          )}
        </div>
      </div>

      {showEditModal && companyId && (
        <IdentityEditModal
          companyId={companyId}
          activeSection={active}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            if (active === 'timeline') setTimelineRefresh(prev => prev + 1);
            if (active === 'testimonials') setTestimonialsRefresh(prev => prev + 1);
            if (active === 'product') setProductRefresh(prev => prev + 1);
            if (active === 'culture') setCultureRefresh(prev => prev + 1);  // ← add karo
            setShowEditModal(false);
          }}
        />
      )}
    </>

  );
}