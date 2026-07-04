'use client'
import Link from 'next/link'
import { useSaved }    from '../../../features/jobs/hooks/useSaved'
import { SavedJobRow } from '../../../features/jobs/components/saved/SavedJobRow'

export default function SavedPage() {
  const { jobs, stats, isEmpty, unsave } = useSaved()

  return (
    <div className="min-h-screen bg-[#f7f3ef]">
      <header className="sticky top-14 z-40 border-b border-[#d4c4b5] bg-[#f7f3ef]/90 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center gap-4">
          <Link href="/jobs" className="flex items-center gap-2 text-[#6b5847] hover:text-[#4a3728] transition-colors text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Browse Jobs
          </Link>
          <div className="h-4 w-px bg-[#d4c4b5]" />
          <span className="text-[#6b5847] text-sm font-medium">Saved Jobs</span>
          <Link href="/applied" className="ml-auto text-sm font-semibold text-[#6b5847] hover:text-[#4a3728] transition-colors">
            View Applications →
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-[11px] font-bold text-[#c9a882] uppercase tracking-[0.2em] mb-2">— Bookmarked</p>
          <h1 className="font-black text-[#2d1f14] leading-tight tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>
            Saved Jobs<span className="text-[#c9a882]">.</span>
          </h1>
          {isEmpty
            ? <p className="text-[#6b5847] text-sm mt-1.5">Nothing saved yet</p>
            : <p className="text-[#6b5847] text-sm mt-1.5">
                {stats.total} job{stats.total === 1 ? '' : 's'} bookmarked
                {stats.remote > 0 && <span className="text-[#9d8876]"> · <span className="text-emerald-600 font-semibold">{stats.remote} remote</span></span>}
                {stats.categories > 0 && <span className="text-[#9d8876]"> · {stats.categories} categories</span>}
              </p>
          }
        </div>

        {isEmpty ? (
          <div className="text-center py-20 bg-white border border-[#d4c4b5] rounded-2xl shadow-sm">
            <p className="text-4xl mb-4">◈</p>
            <p className="text-[#4a3728] font-semibold text-lg mb-1">No saved jobs yet</p>
            <p className="text-[#6b5847] text-sm mb-6">Tap the bookmark on any job to save it here</p>
            <Link href="/jobs" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#e0d8cf] text-sm font-bold rounded-xl transition-all">
              Browse Jobs →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {jobs.map(job => (
              <SavedJobRow key={job.id} job={job} onUnsave={() => unsave(job.id)} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}