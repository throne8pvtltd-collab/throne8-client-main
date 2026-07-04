import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import {
  Job, JobsState, FilterState, JobType, ExperienceLevel, WorkMode,
  ApplicationRecord, ApplicationStatus,
} from '@/features/jobs/types/jobs'
import { MOCK_JOBS } from '@/lib/mockdata/mockData'

const defaultFilters: FilterState = {
  search: '', types: [], experience: [], workMode: [],
  categories: [], salaryMin: 0, salaryMax: 500000, location: '',
}

const initialState: JobsState = {
  jobs:          MOCK_JOBS,
  filteredJobs:  MOCK_JOBS,
  savedJobs:     ['2', '5'],
  applications: [
    { jobId: '1', status: 'interview', appliedAt: '2025-02-20T10:00:00Z', updatedAt: '2025-03-01T09:00:00Z' },
    { jobId: '4', status: 'reviewing', appliedAt: '2025-02-28T14:00:00Z', updatedAt: '2025-03-02T11:00:00Z' },
  ],
  filters:       defaultFilters,
  activeSection: 'recommended',
  loading:       false,
  error:         null,
}

function applyFilters(jobs: Job[], f: FilterState): Job[] {
  return jobs.filter(job => {
    if (f.search) {
      const q = f.search.toLowerCase()
      const hit =
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some(t => t.toLowerCase().includes(q)) ||
        job.location.toLowerCase().includes(q)
      if (!hit) return false
    }
    if (f.types.length      && !f.types.includes(job.type))            return false
    if (f.experience.length && !f.experience.includes(job.experience)) return false
    if (f.workMode.length   && !f.workMode.includes(job.workMode))     return false
    if (f.categories.length && !f.categories.includes(job.category))   return false
    if (job.salary.min < f.salaryMin || job.salary.max > f.salaryMax)  return false
    if (f.location && !job.location.toLowerCase().includes(f.location.toLowerCase())) return false
    return true
  })
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload
      state.filteredJobs   = applyFilters(state.jobs, state.filters)
    },
    setLocation(state, action: PayloadAction<string>) {
      state.filters.location = action.payload
      state.filteredJobs     = applyFilters(state.jobs, state.filters)
    },
    toggleFilterType(state, action: PayloadAction<JobType>) {
      const idx = state.filters.types.indexOf(action.payload)
      idx >= 0 ? state.filters.types.splice(idx, 1) : state.filters.types.push(action.payload)
      state.filteredJobs = applyFilters(state.jobs, state.filters)
    },
    toggleFilterExperience(state, action: PayloadAction<ExperienceLevel>) {
      const idx = state.filters.experience.indexOf(action.payload)
      idx >= 0 ? state.filters.experience.splice(idx, 1) : state.filters.experience.push(action.payload)
      state.filteredJobs = applyFilters(state.jobs, state.filters)
    },
    toggleFilterWorkMode(state, action: PayloadAction<WorkMode>) {
      const idx = state.filters.workMode.indexOf(action.payload)
      idx >= 0 ? state.filters.workMode.splice(idx, 1) : state.filters.workMode.push(action.payload)
      state.filteredJobs = applyFilters(state.jobs, state.filters)
    },
    toggleFilterCategory(state, action: PayloadAction<string>) {
      const idx = state.filters.categories.indexOf(action.payload)
      idx >= 0 ? state.filters.categories.splice(idx, 1) : state.filters.categories.push(action.payload)
      state.filteredJobs = applyFilters(state.jobs, state.filters)
    },
    setSalaryRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.filters.salaryMin = action.payload.min
      state.filters.salaryMax = action.payload.max
      state.filteredJobs      = applyFilters(state.jobs, state.filters)
    },
    clearFilters(state) {
      state.filters      = defaultFilters
      state.filteredJobs = state.jobs
    },
    toggleSaveJob(state, action: PayloadAction<string>) {
      const idx = state.savedJobs.indexOf(action.payload)
      idx >= 0 ? state.savedJobs.splice(idx, 1) : state.savedJobs.push(action.payload)
    },
    applyToJob(state, action: PayloadAction<string>) {
      if (!state.applications.find(a => a.jobId === action.payload)) {
        state.applications.push({
          jobId:     action.payload,
          status:    'applied',
          appliedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      }
    },
    updateApplicationStatus(state, action: PayloadAction<{ jobId: string; status: ApplicationStatus }>) {
      const app = state.applications.find(a => a.jobId === action.payload.jobId)
      if (app) {
        app.status    = action.payload.status
        app.updatedAt = new Date().toISOString()
      }
    },
    setActiveSection(state, action: PayloadAction<JobsState['activeSection']>) {
      state.activeSection = action.payload
    },
  },
})

export const {
  setSearch, setLocation,
  toggleFilterType, toggleFilterExperience, toggleFilterWorkMode, toggleFilterCategory,
  setSalaryRange, clearFilters,
  toggleSaveJob, applyToJob, updateApplicationStatus,
  setActiveSection,
} = jobsSlice.actions

export default jobsSlice.reducer

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectAllJobs       = (s: { jobBoard: JobsState }) => s.jobBoard.jobs
export const selectFilteredJobs  = (s: { jobBoard: JobsState }) => s.jobBoard.filteredJobs
export const selectFilters       = (s: { jobBoard: JobsState }) => s.jobBoard.filters
export const selectSavedJobIds   = (s: { jobBoard: JobsState }) => s.jobBoard.savedJobs
export const selectApplications  = (s: { jobBoard: JobsState }) => s.jobBoard.applications
export const selectActiveSection = (s: { jobBoard: JobsState }) => s.jobBoard.activeSection
export const selectAppliedJobIds = (s: { jobBoard: JobsState }) => s.jobBoard.applications.map(a => a.jobId)

// Memoized selectors — only recompute when inputs change
export const selectFeaturedJobs = createSelector(
  selectAllJobs,
  jobs => (jobs ?? []).filter(j => j.featured)
)

export const selectRecentJobs = createSelector(
  selectAllJobs,
  jobs => [...(jobs ?? [])].sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()).slice(0, 6)
)

// Recommended = non-featured jobs sorted by applicants (popularity), up to 6
export const selectRecommendedJobs = createSelector(
  selectAllJobs,
  jobs => [...(jobs ?? [])].filter(j => !j.featured).sort((a, b) => b.applicants - a.applicants).slice(0, 6)
)

export const selectSavedJobObjects = createSelector(
  selectAllJobs, selectSavedJobIds,
  (jobs, ids) => (jobs ?? []).filter(j => ids.includes(j.id))
)

export const selectAppliedJobObjects = createSelector(
  selectAllJobs, selectApplications,
  (jobs, apps) => (jobs ?? []).filter(j => apps.some(a => a.jobId === j.id))
)

export const selectJobById = (id: string) =>
  createSelector(selectAllJobs, jobs => (jobs ?? []).find(j => j.id === id))