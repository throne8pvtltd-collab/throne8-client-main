'use client'
import Link from 'next/link'
import { memo } from 'react'
import { useApplied, TabFilter } from '../../../features/jobs/hooks/useApplied'
import { ApplicationRow } from '../../../features/jobs/components/applied/ApplicationRow'
import { STATUS_CFG } from '@/features/jobs/constants/jobConstants'
import { ApplicationStatus } from '@/features/jobs/types/jobs'

const StatsBar = memo(function StatsBar({ total, active, interview, offers }: {
  total: number; active: number; interview: number; offers: number
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
      {[
        { label: 'Total',     value: total,     color: 'text-[#4a3728]'   },
        { label: 'Active',    value: active,    color: 'text-blue-600'    },
        { label: 'Interview', value: interview, color: 'text-violet-600'  },
        { label: 'Offers',    value: offers,    color: 'text-emerald-600' },
      ].map(({ label, value, color }) => (
        <div key={label} className="bg-white border border-[#d4c4b5] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
          <p className={`text-2xl sm:text-[28px] font-black leading-none ${color}`}>{value}</p>
          <p className="text-[10px] text-[#6b5847] font-semibold mt-1.5 uppercase tracking-[0.1em]">{label}</p>
        </div>
      ))}
    </div>
  )
})

const StatusTabs = memo(function StatusTabs({ tabs, activeTab, countByStatus, totalCount, onTabChange }: {
  tabs: { id: TabFilter; label: string }[]
  activeTab: TabFilter
  countByStatus: Record<string, number>
  totalCount: number
  onTabChange: (t: TabFilter) => void
}) {
  return (
    <div className="flex gap-1.5 mb-5 sm:mb-6 overflow-x-auto pb-1 [scrollbar-width:none]">
      {tabs.map(({ id, label }) => {
        const count    = id === 'all' ? totalCount : (countByStatus[id] ?? 0)
        const isActive = activeTab === id
        return (
          <button key={id} onClick={() => onTabChange(id)}
            className={`flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
              ${isActive ? 'bg-[#4a3728] text-[#e0d8cf] shadow-sm' : 'bg-white border border-[#d4c4b5] text-[#6b5847] hover:text-[#4a3728] hover:border-[#4a3728]/20'}`}
          >
            {id !== 'all' && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_CFG[id as ApplicationStatus].dot}`} />}
            {label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${isActive ? 'bg-white/20 text-[#e0d8cf]' : 'bg-[#e0d8cf] text-[#4a3728]'}`}>
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
})

export default function AppliedPage() {
  const {
    displayedJobs, stats, isEmpty,
    activeTab, setActiveTab,
    visibleTabs, countByStatus, appliedCount,
    getJobStatus, getAppliedAt, updateStatus,
  } = useApplied()

  return (
    <div className="min-h-screen bg-[#f7f3ef]">
      <header className="sticky top-0 z-40 border-b border-[#d4c4b5] bg-[#f7f3ef]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-3 sm:gap-4">
          <Link href="/jobs" className="flex items-center gap-1.5 text-[#6b5847] hover:text-[#4a3728] transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Browse Jobs</span>
          </Link>
          <div className="h-4 w-px bg-[#d4c4b5]" />
          <span className="text-[#6b5847] text-sm font-medium">Application Tracker</span>
          <Link href="/saved" className="ml-auto text-sm font-semibold text-[#6b5847] hover:text-[#4a3728] transition-colors hidden sm:block">
            View Saved →
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <p className="text-[11px] font-bold text-[#c9a882] uppercase tracking-[0.2em] mb-2">— Your applications</p>
          <h1 className="font-black text-[#2d1f14] leading-tight tracking-tight" style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}>
            Application Tracker<span className="text-[#c9a882]">.</span>
          </h1>
          <p className="text-[#6b5847] text-sm mt-1.5">
            {appliedCount > 0 ? `${appliedCount} application${appliedCount === 1 ? '' : 's'} tracked` : 'No applications yet'}
          </p>
        </div>

        {!isEmpty && <StatsBar {...stats} />}
        {!isEmpty && (
          <StatusTabs
            tabs={visibleTabs} activeTab={activeTab}
            countByStatus={countByStatus} totalCount={appliedCount}
            onTabChange={setActiveTab}
          />
        )}

        {isEmpty ? (
          <div className="text-center py-16 sm:py-20 bg-white border border-[#d4c4b5] rounded-2xl shadow-sm">
            <p className="text-4xl mb-4">◉</p>
            <p className="text-[#4a3728] font-semibold text-lg mb-1">No applications yet</p>
            <p className="text-[#6b5847] text-sm mb-6">Browse open roles and start applying</p>
            <Link href="/jobs" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#e0d8cf] text-sm font-bold rounded-xl transition-all">
              Browse Jobs →
            </Link>
          </div>
        ) : displayedJobs.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#d4c4b5] rounded-2xl shadow-sm">
            <p className="text-[#6b5847] text-sm font-medium">No applications with this status</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {displayedJobs.map(job => (
              <ApplicationRow
                key={job.id} job={job}
                status={getJobStatus(job.id) ?? 'applied'}
                appliedAt={getAppliedAt(job.id) ?? new Date().toISOString()}
                onStatusChange={s => updateStatus(job.id, s)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}