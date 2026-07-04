import { useMemo } from 'react'
import { useJobs } from '@/features/jobs/hooks/useJobs'

export function useSaved() {
  const { savedJobObjects, savedCount, handleToggleSave } = useJobs()

  const stats = useMemo(() => ({
    total:      savedCount,
    categories: new Set(savedJobObjects.map(j => j.category)).size,
    remote:     savedJobObjects.filter(j => j.workMode === 'remote').length,
  }), [savedJobObjects, savedCount])

  return {
    jobs:    savedJobObjects,
    stats,
    isEmpty: savedCount === 0,
    unsave:  handleToggleSave,
  }
}