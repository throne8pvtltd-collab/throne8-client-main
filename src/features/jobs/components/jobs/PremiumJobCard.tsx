import { memo, useCallback } from 'react'
import Link from 'next/link'
import { Job } from '@/features/jobs/types/jobs'
import { LOGO_BG, WORK_MODE_STYLE, formatSalary } from '@/features/jobs/constants/jobConstants'

interface Props {
  job: Job
  isSaved: boolean
  isApplied: boolean
  onSave: (id: string) => void
}

const BOOKMARK_PATH = "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
const CHECK_PATH = "M5 13l4 4L19 7"

export const PremiumJobCard = memo(function PremiumJobCard({
  job,
  isSaved,
  isApplied,
  onSave
}: Props) {

  const handleSave = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    onSave(job.id)
  }, [onSave, job.id])

  return (
    <Link href={`/job/jobs/${job.id}`} className="block shrink-0 w-[276px]">

      <article className="
        relative flex flex-col h-[230px] rounded-2xl p-5 overflow-hidden

        border border-[#e7dacb]

        bg-white

        shadow-[0_1px_4px_rgba(74,55,40,0.06)]

        transition-all duration-200
        hover:-translate-y-[2px]
        hover:border-[#d4a373]
        hover:shadow-[0_6px_16px_rgba(74,55,40,0.12)]
      ">

        {/* Premium golden border accent */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none border border-transparent hover:border-[#d4a373]/40"/>

        {/* Premium ribbon */}
        <div className="
          absolute top-0 right-0
          bg-[#d4a373]
          text-white
          text-[9px]
          font-bold
          tracking-[0.14em]
          px-3 py-1
          rounded-bl-xl
        ">
          PREMIUM
        </div>

        {/* subtle highlight */}
        <div className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_top,rgba(212,163,115,0.08),transparent_60%)]
        "/>

        {/* Logo + company */}
        <div className="flex items-center gap-3 mt-1 pr-16">

          <div
            className="
              w-10 h-10 rounded-xl
              flex items-center justify-center
              text-white font-black text-sm shrink-0
              shadow-[0_2px_6px_rgba(0,0,0,0.12)]
            "
            style={{ backgroundColor: LOGO_BG[job.companyLogo] ?? '#4a3728' }}
          >
            {job.companyLogo}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium text-[#6b5847] truncate">
              {job.company}
            </p>

            <h3 className="text-[15px] font-bold text-[#2d1f14] leading-tight line-clamp-1">
              {job.title}
            </h3>
          </div>

        </div>

        {/* Work mode + experience */}
        <div className="flex gap-2 mt-3 flex-wrap">

          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] border font-medium ${WORK_MODE_STYLE[job.workMode]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current"/>
            {job.workMode.charAt(0).toUpperCase() + job.workMode.slice(1)}
          </span>

          <span className="
            px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize
            bg-[#faf6f1] border border-[#e2d6c8] text-[#6b5847]
          ">
            {job.experience}
          </span>

        </div>

        {/* Tags */}
        <div className="flex gap-1 mt-2.5">

          {job.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="
                px-2 py-0.5
                rounded-md
                text-[11px]
                font-medium
                bg-[#faf6f1]
                border border-[#e2d6c8]
                text-[#4a3728]
                truncate max-w-[80px]
              "
            >
              {tag}
            </span>
          ))}

          {job.tags.length > 3 && (
            <span className="px-1.5 py-0.5 text-[11px] text-[#9d8876] shrink-0">
              +{job.tags.length - 3}
            </span>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#efe4da]">

          <div>
            <p className="text-[17px] font-extrabold text-[#2d1f14]">
              {formatSalary(job.salary.min, job.salary.max)}
            </p>

            <p className="text-[10px] text-[#9d8876] mt-0.5">
              {job.applicants} applicants
            </p>
          </div>

          <div className="flex items-center gap-1.5">

            {isApplied && (
              <span className="
                inline-flex items-center gap-1
                px-2 py-0.5
                rounded-lg
                text-[11px] font-semibold
                bg-emerald-50 text-emerald-700
                border border-emerald-200
              ">
                <svg width={10} height={10} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={CHECK_PATH}/>
                </svg>
                Applied
              </span>
            )}

            <button
              onClick={handleSave}
              aria-label={isSaved ? 'Unsave job' : 'Save job'}
              className={`p-1.5 rounded-lg transition-colors
                ${isSaved
                  ? 'bg-[#4a3728]/8 text-[#4a3728]'
                  : 'text-[#d4c4b5] hover:bg-[#f7f3ef]'
                }
              `}
            >
              <svg
                width={15}
                height={15}
                fill={isSaved ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={BOOKMARK_PATH}/>
              </svg>
            </button>

          </div>

        </div>

      </article>

    </Link>
  )
})

PremiumJobCard.displayName = 'PremiumJobCard'