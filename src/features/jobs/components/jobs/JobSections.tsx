'use client'
import { memo, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { Job } from '@/features/jobs/types/jobs'
import { JobCard } from './JobCard'
import { PremiumSection } from './PremiumSection'
import { LOGO_BG, WORK_MODE_STYLE, formatSalary, timeAgo } from '@/features/jobs/constants/jobConstants'

// ── Section header ────────────────────────────────────────────────────────────
const SectionHeader = memo(function SectionHeader({
  title, count, badge,
}: {
  title: string; count?: number; badge?: string
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4 flex-wrap">
      <h2 className="text-[#4a3728] font-bold text-sm sm:text-base">{title}</h2>
      {count != null && count > 0 && (
        <span className="px-2 py-0.5 rounded-md bg-[#e0d8cf] text-[#6b5847] text-xs font-semibold">{count}</span>
      )}
      {badge && (
        <span className="px-2 py-0.5 rounded-md bg-[#4a3728]/[0.07] text-[#4a3728] text-xs font-semibold border border-[#4a3728]/10">
          {badge}
        </span>
      )}
    </div>
  )
})

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyState = memo(function EmptyState({ icon, title, subtitle }: {
  icon: string; title: string; subtitle: string
}) {
  return (
    <div className="py-12 sm:py-16 text-center">
      <p className="text-3xl mb-3">{icon}</p>
      <p className="text-[#4a3728] font-semibold text-sm sm:text-base">{title}</p>
      <p className="text-[#6b5847] text-xs sm:text-sm mt-1">{subtitle}</p>
    </div>
  )
})

// ── Regular job grid ──────────────────────────────────────────────────────────
const JobGrid = memo(function JobGrid({ jobs, savedIds, appliedIds, onSave }: {
  jobs: Job[]; savedIds: string[]; appliedIds: string[]; onSave: (id: string) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {jobs.map(job => (
        <JobCard
          key={job.id}
          job={job}
          isSaved={savedIds.includes(job.id)}
          isApplied={appliedIds.includes(job.id)}
          onSave={onSave}
        />
      ))}
    </div>
  )
})

// ── Recommended card — full card, grid layout ─────────────────────────────────
const RecommendedCard = memo(function RecommendedCard({ job, isSaved, isApplied, onSave }: {
  job: Job; isSaved: boolean; isApplied: boolean; onSave: (id: string) => void
}) {
  const handleSave = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    onSave(job.id)
  }, [onSave, job.id])

  return (
    <Link href={`/job/jobs/${job.id}`} className="group block">
      <article className="
        relative bg-white border border-[#c8b89a]/60 rounded-2xl p-5
        transition-all duration-200
        hover:border-[#4a3728]/25
        hover:shadow-[0_4px_20px_rgba(74,55,40,0.10)]
        shadow-[0_1px_4px_rgba(74,55,40,0.05)]
      ">
        {/* ★ For You pill — top right */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4a3728]/[0.07] border border-[#4a3728]/10 text-[#4a3728] text-[9px] font-bold tracking-wider uppercase">
          <span className="text-[8px]">★</span> Match
        </div>

        {/* Logo + company + save */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 pr-16">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
              style={{ backgroundColor: LOGO_BG[job.companyLogo] ?? '#4a3728' }}
            >
              {job.companyLogo}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#6b5847] font-medium truncate">{job.company}</p>
              <h3 className="text-[#4a3728] font-semibold text-sm truncate group-hover:text-[#3a2a1e] transition-colors">
                {job.title}
              </h3>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="shrink-0 p-1.5 rounded-lg hover:bg-[#e0d8cf]/60 transition-colors mt-0.5"
            aria-label={isSaved ? 'Unsave job' : 'Save job'}
          >
            <svg
              className={`w-4 h-4 transition-colors ${isSaved ? 'text-[#4a3728] fill-[#4a3728]' : 'text-[#d4c4b5] fill-none'}`}
              stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border font-medium ${WORK_MODE_STYLE[job.workMode]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#f7f3ef] border border-[#d4c4b5] text-[#6b5847] font-medium capitalize">
            {job.experience}
          </span>
        </div>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          {job.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-md text-[11px] bg-[#e0d8cf]/50 text-[#4a3728] border border-[#d4c4b5] font-medium">
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="px-2 py-0.5 text-[11px] text-[#6b5847]">+{job.tags.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-[#e8ddd4] flex items-end justify-between">
          <div>
            <p className="text-[#4a3728] font-bold text-sm">{formatSalary(job.salary.min, job.salary.max)}</p>
            <p className="text-[#6b5847] text-xs mt-0.5">{job.location}</p>
          </div>
          <div className="text-right">
            {isApplied ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Applied
              </span>
            ) : (
              <p className="text-[#6b5847] text-xs">{timeAgo(job.postedAt)}</p>
            )}
            <p className="text-[#d4c4b5] text-[11px] mt-0.5">{job.applicants} applicants</p>
          </div>
        </div>
      </article>
    </Link>
  )
})

// ── Recommended section — full grid, warm tinted background ───────────────────
const RecommendedSection = memo(function RecommendedSection({ jobs, savedIds, appliedIds, onSave }: {
  jobs: Job[]; savedIds: string[]; appliedIds: string[]; onSave: (id: string) => void
}) {
  if (jobs.length === 0) return null

  return (
    <section className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-5 sm:py-6 bg-[#f0e9e0]/50 rounded-2xl border border-[#d4c4b5]/50">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        <h2 className="text-[#2d1f14] font-bold text-sm sm:text-base">Recommended Jobs</h2>
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4a3728]/10 text-[#4a3728] text-[10px] font-bold tracking-wider uppercase border border-[#4a3728]/15">
          <span>★</span> For You
        </span>
        <span className="px-2 py-0.5 rounded-md bg-[#e0d8cf] text-[#6b5847] text-xs font-semibold">
          {jobs.length}
        </span>
      </div>

      {/* Full grid — no scroll, see all at once */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {jobs.map(job => (
          <RecommendedCard
            key={job.id}
            job={job}
            isSaved={savedIds.includes(job.id)}
            isApplied={appliedIds.includes(job.id)}
            onSave={onSave}
          />
        ))}
      </div>
    </section>
  )
})

// ── Main component ────────────────────────────────────────────────────────────
export const JobSections = memo(function JobSections() {
  const {
    filteredJobs, featuredJobs, recentJobs, recommendedJobs,
    activeSection, isFiltering,
    savedJobObjects, applications,
    handleToggleSave,
  } = useJobs()

  const savedIds   = useMemo(() => savedJobObjects.map(j => j.id), [savedJobObjects])
  const appliedIds = useMemo(() => applications.map(a => a.jobId), [applications])
  const handleSave = useCallback((id: string) => handleToggleSave(id), [handleToggleSave])

  const engineeringJobs = useMemo(() => filteredJobs.filter(j => j.category === 'Engineering').slice(0, 4), [filteredJobs])
  const designJobs      = useMemo(() => filteredJobs.filter(j => j.category === 'Design').slice(0, 4),      [filteredJobs])
  const productJobs     = useMemo(() => filteredJobs.filter(j => j.category === 'Product').slice(0, 4),     [filteredJobs])

  const gridProps        = { savedIds, appliedIds, onSave: handleSave }
  const premiumProps     = { ...gridProps, jobs: featuredJobs }
  const recommendedProps = { ...gridProps, jobs: recommendedJobs }

  // ── Search/filter active ───────────────────────────────────────────────────
  if (isFiltering) {
    return (
      <div>
        <SectionHeader title="Search Results" count={filteredJobs.length} />
        {filteredJobs.length === 0
          ? <EmptyState icon="🔍" title="No jobs match your filters" subtitle="Try adjusting your search or clearing some filters" />
          : <JobGrid jobs={filteredJobs} {...gridProps} />
        }
      </div>
    )
  }

  // ── Recent tab ─────────────────────────────────────────────────────────────
  if (activeSection === 'recent') {
    return (
      <div>
        <SectionHeader title="Recently Posted" count={recentJobs.length} />
        <JobGrid jobs={recentJobs} {...gridProps} />
      </div>
    )
  }

  // ── Recommended tab ────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ① Recommended — full grid, tinted section bg */}
      <RecommendedSection {...recommendedProps} />

      {/* ② Premium / Featured — horizontal scroll (unchanged) */}
      <PremiumSection {...premiumProps} />

      {/* ③ Recently Posted */}
      <section>
        <SectionHeader title="Recently Posted" count={recentJobs.length} />
        <JobGrid jobs={recentJobs} {...gridProps} />
      </section>

      {/* ④ Category sections */}
      {engineeringJobs.length > 0 && (
        <section>
          <SectionHeader title="Engineering Roles" count={engineeringJobs.length} />
          <JobGrid jobs={engineeringJobs} {...gridProps} />
        </section>
      )}
      {designJobs.length > 0 && (
        <section>
          <SectionHeader title="Design Roles" count={designJobs.length} />
          <JobGrid jobs={designJobs} {...gridProps} />
        </section>
      )}
      {productJobs.length > 0 && (
        <section>
          <SectionHeader title="Product Roles" count={productJobs.length} />
          <JobGrid jobs={productJobs} {...gridProps} />
        </section>
      )}
    </div>
  )
})