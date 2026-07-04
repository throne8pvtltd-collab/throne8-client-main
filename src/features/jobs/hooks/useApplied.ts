import { useState, useMemo } from 'react'
import { ApplicationStatus } from '@/features/jobs/types/jobs'
import { useJobs } from '@/features/jobs/hooks/useJobs';

export type TabFilter = 'all' | ApplicationStatus

export const STATUS_TABS: { id: TabFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'applied', label: 'Applied' },
  { id: 'reviewing', label: 'In Review' },
  { id: 'interview', label: 'Interview' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'offer', label: 'Offer' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'withdrawn', label: 'Withdrawn' },
]

export function useApplied() {
  const { appliedJobObjects, appliedCount, getJobStatus, getAppliedAt, handleUpdateStatus } = useJobs()
  const [activeTab, setActiveTab] = useState<TabFilter>('all')

  const countByStatus = useMemo(() =>
    appliedJobObjects.reduce<Record<string, number>>((acc, j) => {
      const s = getJobStatus(j.id) ?? 'applied'
      acc[s] = (acc[s] ?? 0) + 1
      return acc
    }, {}),
    [appliedJobObjects, getJobStatus]
  )

  const displayedJobs = useMemo(() =>
    activeTab === 'all'
      ? appliedJobObjects
      : appliedJobObjects.filter(j => getJobStatus(j.id) === activeTab),
    [appliedJobObjects, activeTab, getJobStatus]
  )

  const stats = useMemo(() => ({
    total: appliedCount,
    active: appliedJobObjects.filter(j => !['rejected', 'withdrawn'].includes(getJobStatus(j.id) ?? '')).length,
    interview: countByStatus['interview'] ?? 0,
    offers: countByStatus['offer'] ?? 0,
  }), [appliedJobObjects, appliedCount, countByStatus, getJobStatus])

  const visibleTabs = STATUS_TABS.filter(t => t.id === 'all' || (countByStatus[t.id] ?? 0) > 0)

  return {
    displayedJobs, stats, activeTab, setActiveTab,
    visibleTabs, countByStatus, appliedCount,
    isEmpty: appliedCount === 0,
    getJobStatus, getAppliedAt, updateStatus: handleUpdateStatus,
  }
}