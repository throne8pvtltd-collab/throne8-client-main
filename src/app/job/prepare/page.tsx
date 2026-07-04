'use client'
import Link from 'next/link'
import { useAppSelector } from '@/core/store/store.hooks'
import { selectAllJobs, selectApplications } from '@/features/jobs/jobsSlice'
import { LOGO_BG } from '@/features/jobs/constants/jobConstants'

export default function PreparePage() {
  const allJobs    = useAppSelector(selectAllJobs)
  const applied    = useAppSelector(selectApplications)
  const appliedIds = new Set(applied.map(a => a.jobId))
  const jobs       = allJobs.filter(j => appliedIds.has(j.id))

  return (
    <div className="min-h-screen bg-[#f7f3ef]">
      {/* Nav */}
      <div className="sticky top-0 z-40 h-12 border-b border-[#d4c4b5] bg-[#f7f3ef]/95 backdrop-blur-xl flex items-center gap-3 px-6">
        <Link href="/applied" className="text-sm font-semibold text-[#6b5847] hover:text-[#4a3728] flex items-center gap-1.5 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Applications
        </Link>
        <span className="text-[#d4c4b5]">|</span>
        <span className="text-sm font-bold text-[#4a3728]">Interview Prep</span>
      </div>

      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-[11px] font-bold text-[#c9a882] uppercase tracking-[0.2em] mb-2">— AI-Powered</p>
          <h1 className="text-[#2d1f14] font-black leading-tight mb-3" style={{ fontSize: 'clamp(26px,4vw,36px)', fontFamily: "'Playfair Display', serif" }}>
            Prepare smarter.<br /><span className="text-[#c9a882]">Land the offer.</span>
          </h1>
          <p className="text-[#6b5847] text-sm leading-relaxed">Round-by-round mock interviews tailored to each job you applied for. Voice or text answers, instant AI feedback.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['Round guide', 'Voice answers', 'AI scoring', 'Score tracking'].map(f => (
            <span key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#d4c4b5] text-[#4a3728]">{f}</span>
          ))}
        </div>

        <p className="text-[11px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-4">Choose a job to prep for</p>

        {jobs.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-3xl mb-3">📋</p>
            <p className="text-[#4a3728] font-semibold">No applied jobs yet</p>
            <p className="text-[#9d8876] text-sm mt-1">Apply to jobs first to start interview prep</p>
            <Link href="/jobs" className="inline-block mt-4 px-5 py-2.5 bg-[#4a3728] text-[#e8d5b8] text-sm font-bold rounded-xl">Browse Jobs →</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map(job => (
              <Link key={job.id} href={`/prepare/${job.id}`}
                className="flex items-center gap-4 p-4 bg-white border border-[#d4c4b5] rounded-2xl shadow-sm
                  hover:border-[#4a3728]/40 hover:shadow-md transition-all group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm"
                  style={{ backgroundColor: LOGO_BG[job.companyLogo] ?? '#4a3728' }}>
                  {job.companyLogo}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-[#9d8876]">{job.company}</p>
                  <p className="text-sm font-bold text-[#2d1f14] truncate">{job.title}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Applied ✓</span>
                  <svg className="w-4 h-4 text-[#9d8876] group-hover:text-[#4a3728] transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}