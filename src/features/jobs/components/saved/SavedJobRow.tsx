import { memo } from 'react'
import Link from 'next/link'
import { Job } from '@/features/jobs/types/jobs'
import { LOGO_BG, WORK_MODE_STYLE, formatSalary } from '@/features/jobs/constants/jobConstants'

export const SavedJobRow = memo(function SavedJobRow({ job, onUnsave }: { job: Job; onUnsave: () => void }) {
  return (
    <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 hover:border-[#4a3728]/30 hover:shadow-[0_4px_20px_rgba(74,55,40,0.09)] transition-all group">
      <div className="flex items-start gap-4">
        <Link href={`/jobs/${job.id}`} className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
            style={{ backgroundColor: LOGO_BG[job.companyLogo] ?? '#4a3728' }}>
            {job.companyLogo}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-[#6b5847] font-medium">{job.company}</p>
            <h3 className="text-[#4a3728] font-semibold text-sm group-hover:text-[#3a2a1e] transition-colors">{job.title}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border font-medium ${WORK_MODE_STYLE[job.workMode]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)}
              </span>
              <span className="text-xs text-[#6b5847]">{job.location}</span>
              <span className="text-xs font-bold text-[#4a3728]">{formatSalary(job.salary.min, job.salary.max)}</span>
            </div>
          </div>
        </Link>
        <button onClick={onUnsave}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6b5847] border border-[#d4c4b5] hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Unsave
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3 ml-16">
        {job.tags.slice(0, 4).map(tag => (
          <span key={tag} className="px-2 py-0.5 rounded-md text-[11px] bg-[#e0d8cf]/50 text-[#4a3728] border border-[#d4c4b5] font-medium">{tag}</span>
        ))}
      </div>
    </div>
  )
})