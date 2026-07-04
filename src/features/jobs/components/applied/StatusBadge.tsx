import { memo } from 'react'
import { ApplicationStatus } from '@/features/jobs/types/jobs'
import { STATUS_CFG } from '@/features/jobs/constants/jobConstants'

export const StatusBadge = memo(function StatusBadge({ status }: { status: ApplicationStatus }) {
  const c = STATUS_CFG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${c.bg} ${c.color} ${c.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  )
})