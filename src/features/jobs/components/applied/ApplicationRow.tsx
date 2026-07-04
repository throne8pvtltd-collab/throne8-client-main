import { memo } from 'react'
import Link from 'next/link'
import { Job, ApplicationStatus } from '@/features/jobs/types/jobs'
import { LOGO_BG, WORK_MODE_STYLE, formatSalary, timeAgo } from '@/features/jobs/constants/jobConstants'
import { StatusBadge }    from './StatusBadge'
import { StatusDropdown } from './StatusDropdown'
import { PipelineBar }    from './PipelineBar'

interface Props {
  job:            Job
  status:         ApplicationStatus
  appliedAt:      string
  onStatusChange: (s: ApplicationStatus) => void
}

export const ApplicationRow = memo(function ApplicationRow({ job, status, appliedAt, onStatusChange }: Props) {
  return (
    <div className="bg-white border border-[#d4c4b5] rounded-2xl p-4 sm:p-5 hover:border-[#4a3728]/30 hover:shadow-[0_4px_20px_rgba(74,55,40,0.09)] transition-all group">
      <div className="flex items-start gap-3 sm:gap-4">
        <Link href={`/jobs/${job.id}`} className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
            style={{ backgroundColor: LOGO_BG[job.companyLogo] ?? '#4a3728' }}>
            {job.companyLogo}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-[#6b5847] font-medium">{job.company}</p>
                <h3 className="text-[#4a3728] font-semibold text-sm group-hover:text-[#3a2a1e] transition-colors truncate">{job.title}</h3>
              </div>
              <StatusBadge status={status} />
            </div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 text-xs text-[#6b5847]">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium ${WORK_MODE_STYLE[job.workMode]}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)}
              </span>
              <span className="hidden sm:inline">{job.location}</span>
              <span className="text-[#d4c4b5] hidden sm:inline">·</span>
              <span className="font-semibold text-[#4a3728]">{formatSalary(job.salary.min, job.salary.max)}</span>
              <span className="text-[#d4c4b5]">·</span>
              <span>Applied {timeAgo(appliedAt)}</span>
            </div>
          </div>
        </Link>
        <StatusDropdown current={status} onChange={onStatusChange} />
      </div>

      <PipelineBar status={status} />

      {/* Prepare with AI — bold dark CTA */}
      <div className="mt-3 pt-3 border-t border-[#f0ece6] flex items-center justify-between gap-3">
        <p className="text-[11px] text-[#9d8876] hidden sm:block">Practice for your interview rounds</p>
        <Link
          href={`/prepare/${job.id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black ml-auto
            bg-[#2d1f14] text-[#e8d5b8] hover:bg-[#4a3728] transition-all shadow-sm tracking-wide"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          PREPARE WITH AI
        </Link>
      </div>
    </div>
  )
})