'use client'
import Link from 'next/link'
import { memo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { SectionView } from '@/features/jobs/types/jobs'
import { FilterSidebar } from './FilterSidebar'

const INTERNAL_TABS: { id: SectionView; label: string }[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'recent',      label: 'Recent'      },
]

export const JobsTopNav = memo(function JobsTopNav() {
  const { activeSection, savedCount, appliedCount, handleSetSection } = useJobs()
  const pathname = usePathname()
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <>
      <div className="border-b border-[#d4c4b5] sticky top-0 z-30 shadow-sm bg-[#f7f3ef]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 h-12">

            {INTERNAL_TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleSetSection(id)}
                className={`px-3 sm:px-4 h-full text-xs sm:text-sm font-semibold border-b-2 transition-all
                  ${activeSection === id
                    ? 'border-[#4a3728] text-[#4a3728]'
                    : 'border-transparent text-[#6b5847] hover:text-[#4a3728] hover:border-[#d4c4b5]'
                  }`}
              >
                {label}
              </button>
            ))}

            <div className="h-5 w-px bg-[#d4c4b5] mx-1 sm:mx-2" />

            {/* Saved — hidden on mobile (in bottom nav) */}
            <Link
              href="/job/saved"
              className="hidden sm:flex items-center gap-2 px-4 h-full text-sm font-semibold border-b-2 border-transparent text-[#6b5847] hover:text-[#4a3728] hover:border-[#d4c4b5] transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Saved
              {savedCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#e0d8cf] text-[#4a3728] text-[10px] font-bold">{savedCount}</span>
              )}
            </Link>

            {/* Applications — hidden on mobile */}
            <Link
              href="/job/applied"
              className="hidden sm:flex items-center gap-2 px-4 h-full text-sm font-semibold border-b-2 border-transparent text-[#6b5847] hover:text-[#4a3728] hover:border-[#d4c4b5] transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
              Applications
              {appliedCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">{appliedCount}</span>
              )}
            </Link>

            {/* Prepare — hidden on mobile */}
            <Link
              href="/job/prepare"
              className={`hidden sm:flex items-center gap-2 px-4 h-full text-sm font-semibold border-b-2 transition-all
                ${pathname?.startsWith('/job/prepare')
                  ? 'border-[#4a3728] text-[#4a3728]'
                  : 'border-transparent text-[#6b5847] hover:text-[#4a3728] hover:border-[#d4c4b5]'}`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Prepare
            </Link>

            <div className="ml-auto flex items-center gap-2">
              {/* Filter button — mobile only */}
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d4c4b5] bg-white text-[#4a3728] text-xs font-semibold"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filters
              </button>

              {/* Post a Job */}
              <Link
                href="/job/post-job"
                className="px-3 sm:px-3.5 py-1.5 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#e0d8cf] text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[#f7f3ef] rounded-t-3xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#d4c4b5]">
              <p className="font-bold text-[#4a3728]">Filters</p>
              <button onClick={() => setFilterOpen(false)} className="p-1 rounded-lg hover:bg-[#e0d8cf]">
                <svg className="w-5 h-5 text-[#4a3728]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 pb-safe">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  )
})