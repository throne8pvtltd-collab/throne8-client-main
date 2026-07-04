import { memo } from 'react'
import { ApplicationStatus } from '@/features/jobs/types/jobs'
import { STATUS_CFG, APPLICATION_PIPELINE } from '@/features/jobs/constants/jobConstants'

export const PipelineBar = memo(function PipelineBar({ status }: { status: ApplicationStatus }) {
  const idx = APPLICATION_PIPELINE.indexOf(status)
  if (idx === -1) return null

  return (
    <div className="mt-3 ml-16 flex items-center">
      {APPLICATION_PIPELINE.map((s, i) => {
        const c         = STATUS_CFG[s]
        const isPast    = i < idx
        const isCurrent = i === idx
        return (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className={[
              'w-2 h-2 rounded-full shrink-0 transition-all',
              isCurrent ? `${c.dot} ring-2 ring-offset-1 ring-[#4a3728]/20` : '',
              isPast    ? 'bg-[#4a3728]' : '',
              !isPast && !isCurrent ? 'bg-[#d4c4b5]' : '',
            ].join(' ')} />
            {i < APPLICATION_PIPELINE.length - 1 && (
              <div className={`h-px flex-1 ${isPast || isCurrent ? 'bg-[#4a3728]/25' : 'bg-[#d4c4b5]'}`} />
            )}
          </div>
        )
      })}
      <span className="ml-3 text-[10px] font-semibold text-[#6b5847] whitespace-nowrap">
        {STATUS_CFG[status].label} · Step {idx + 1}/{APPLICATION_PIPELINE.length}
      </span>
    </div>
  )
})