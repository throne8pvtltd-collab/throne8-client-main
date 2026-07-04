import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectFilteredJobs, selectFeaturedJobs, selectRecentJobs, selectRecommendedJobs,
  selectSavedJobObjects, selectAppliedJobObjects,
  selectSavedJobIds, selectApplications,
  selectFilters, selectActiveSection,
  setSearch, setLocation,
  toggleFilterType, toggleFilterExperience, toggleFilterWorkMode, toggleFilterCategory,
  clearFilters, toggleSaveJob, applyToJob, updateApplicationStatus, setActiveSection,
} from '@/features/jobs/jobsSlice'
import { JobType, ExperienceLevel, WorkMode, SectionView, ApplicationStatus } from '@/features/jobs/types/jobs'

export function useJobs() {
  const dispatch = useDispatch()

  const filters           = useSelector(selectFilters)
  const filteredJobs      = useSelector(selectFilteredJobs)
  const featuredJobs      = useSelector(selectFeaturedJobs)
  const recentJobs        = useSelector(selectRecentJobs)
  const recommendedJobs   = useSelector(selectRecommendedJobs)
  const savedJobObjects   = useSelector(selectSavedJobObjects)
  const appliedJobObjects = useSelector(selectAppliedJobObjects)
  const applications      = useSelector(selectApplications)
  const savedJobIds       = useSelector(selectSavedJobIds)
  const activeSection     = useSelector(selectActiveSection)

  const isFiltering =
    !!filters.search || !!filters.location ||
    filters.types.length > 0 || filters.experience.length > 0 ||
    filters.workMode.length > 0 || filters.categories.length > 0 ||
    filters.salaryMin > 0 || filters.salaryMax < 500000

  const activeFilterCount =
    filters.types.length + filters.experience.length +
    filters.workMode.length + filters.categories.length +
    (filters.search ? 1 : 0) + (filters.location ? 1 : 0) +
    (filters.salaryMin > 0 || filters.salaryMax < 500000 ? 1 : 0)

  // Stable callbacks — won't cause unnecessary re-renders in child components
  const handleSearch         = useCallback((q: string)         => dispatch(setSearch(q)),                       [dispatch])
  const handleLocation       = useCallback((v: string)         => dispatch(setLocation(v)),                     [dispatch])
  const handleToggleType     = useCallback((t: JobType)         => dispatch(toggleFilterType(t)),               [dispatch])
  const handleToggleExp      = useCallback((e: ExperienceLevel) => dispatch(toggleFilterExperience(e)),         [dispatch])
  const handleToggleWorkMode = useCallback((m: WorkMode)        => dispatch(toggleFilterWorkMode(m)),           [dispatch])
  const handleToggleCategory = useCallback((c: string)          => dispatch(toggleFilterCategory(c)),           [dispatch])
  const handleClearFilters   = useCallback(()                   => dispatch(clearFilters()),                     [dispatch])
  const handleToggleSave     = useCallback((id: string)         => dispatch(toggleSaveJob(id)),                 [dispatch])
  const handleApply          = useCallback((id: string)         => dispatch(applyToJob(id)),                    [dispatch])
  const handleUpdateStatus   = useCallback((jobId: string, status: ApplicationStatus) =>
                                dispatch(updateApplicationStatus({ jobId, status })),                            [dispatch])
  const handleSetSection     = useCallback((s: SectionView)     => dispatch(setActiveSection(s)),               [dispatch])

  return {
    // state
    filters, filteredJobs, featuredJobs, recentJobs, recommendedJobs,
    savedJobObjects, appliedJobObjects, applications,
    activeSection, isFiltering, activeFilterCount,
    savedCount:   savedJobObjects.length,
    appliedCount: appliedJobObjects.length,

    // helpers (stable — defined inline is fine since they only read from closed-over arrays)
    isJobSaved:   (id: string) => savedJobIds.includes(id),
    isJobApplied: (id: string) => applications.some(a => a.jobId === id),
    getJobStatus: (id: string) => applications.find(a => a.jobId === id)?.status ?? null,
    getAppliedAt: (id: string) => applications.find(a => a.jobId === id)?.appliedAt ?? null,

    // actions
    handleSearch, handleLocation,
    handleToggleType, handleToggleExp, handleToggleWorkMode, handleToggleCategory,
    handleClearFilters, handleToggleSave, handleApply, handleUpdateStatus, handleSetSection,
  }
}