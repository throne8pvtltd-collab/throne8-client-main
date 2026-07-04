import { memo } from 'react'
import Link from 'next/link'
import { Job } from '@/features/jobs/types/jobs'
import { PremiumJobCard } from './PremiumJobCard'

interface Props {
  jobs:       Job[]
  savedIds:   string[]
  appliedIds: string[]
  onSave:     (id: string) => void
}

export const PremiumSection = memo(function PremiumSection({ jobs, savedIds, appliedIds, onSave }: Props) {
  if (jobs.length === 0) return null

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h2 className="text-[#2d1f14] font-bold text-base">Featured Jobs</h2>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#2d1f14] text-[#c9a882] text-[10px] font-bold tracking-wider uppercase">
            <span>✦</span> Premium
          </span>
          <span className="px-2 py-0.5 rounded-md bg-[#e0d8cf] text-[#6b5847] text-xs font-semibold">
            {jobs.length}
          </span>
        </div>
        
      </div>

      {/* Horizontal scroll row */}
      <div className="relative">
        {/* Fade right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f7f3ef] to-transparent z-10 pointer-events-none rounded-r-2xl" />

        <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory
          [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {jobs.map(job => (
            <div key={job.id} className="snap-start">
              <PremiumJobCard
                job={job}
                isSaved={savedIds.includes(job.id)}
                isApplied={appliedIds.includes(job.id)}
                onSave={onSave}
              />
            </div>
          ))}
          {/* Spacer so last card isn't hidden behind fade */}
          <div className="shrink-0 w-8" />
        </div>
      </div>
    </section>
  )
})