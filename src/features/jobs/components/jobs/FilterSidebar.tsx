'use client'
import { memo } from 'react'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { CATEGORIES } from '@/lib/mockdata/mockData'
import { JobType, ExperienceLevel, WorkMode } from '@/features/jobs/types/jobs'

const JOB_TYPES: { value: JobType; label: string }[] = [
  { value: 'full-time',  label: 'Full-time'  },
  { value: 'part-time',  label: 'Part-time'  },
  { value: 'freelance',  label: 'Freelance'  },
  { value: 'internship', label: 'Internship' },
]

const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: 'entry',  label: 'Entry Level' },
  { value: 'mid',    label: 'Mid Level'   },
  { value: 'senior', label: 'Senior'      },
]

const WORK_MODES: { value: WorkMode; label: string; dot: string }[] = [
  { value: 'remote', label: 'Remote',  dot: 'bg-emerald-500' },
  { value: 'hybrid', label: 'Hybrid',  dot: 'bg-amber-500'   },
  { value: 'onsite', label: 'On-site', dot: 'bg-rose-500'    },
]

const Checkbox = memo(function Checkbox({ label, checked, onChange, dot }: {
  label: string; checked: boolean; onChange: () => void; dot?: string
}) {
  return (
    <button
      onClick={onChange}
      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-colors
        ${checked ? 'bg-[#4a3728]/[0.07] text-[#4a3728]' : 'text-[#6b5847] hover:text-[#4a3728] hover:bg-[#e0d8cf]/40'}`}
    >
      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors
        ${checked ? 'bg-[#4a3728] border-[#4a3728]' : 'bg-white border-[#d4c4b5]'}`}>
        {checked && (
          <svg className="w-2.5 h-2.5 text-[#e0d8cf]" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {dot && <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />}
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
})

const Section = memo(function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-3 border-b border-[#e8ddd4] last:border-0">
      <p className="text-[10px] font-bold tracking-widest text-[#6b5847] uppercase mb-1.5 px-1">{title}</p>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
})

export const FilterSidebar = memo(function FilterSidebar() {
  const {
    filters, activeFilterCount,
    handleToggleType, handleToggleExp, handleToggleWorkMode,
    handleToggleCategory, handleClearFilters,
  } = useJobs()

  return (
    // On desktop: fixed width sidebar. On mobile: full width inside drawer
    <aside className="w-full">
      <div className="bg-white border border-[#d4c4b5] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-4 py-3.5 border-b border-[#e8ddd4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#4a3728]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            <span className="text-sm font-bold text-[#4a3728]">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#4a3728] text-[#e0d8cf] text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button onClick={handleClearFilters} className="text-xs text-[#6b5847] hover:text-[#4a3728] transition-colors font-medium">
              Clear all
            </button>
          )}
        </div>

        <div className="px-2 overflow-y-auto hide-scrollbar max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-80px)]">
          <Section title="Work Mode">
            {WORK_MODES.map(m => (
              <Checkbox key={m.value} label={m.label} dot={m.dot}
                checked={filters.workMode.includes(m.value)}
                onChange={() => handleToggleWorkMode(m.value)} />
            ))}
          </Section>
          <Section title="Job Type">
            {JOB_TYPES.map(t => (
              <Checkbox key={t.value} label={t.label}
                checked={filters.types.includes(t.value)}
                onChange={() => handleToggleType(t.value)} />
            ))}
          </Section>
          <Section title="Experience">
            {EXPERIENCE_LEVELS.map(e => (
              <Checkbox key={e.value} label={e.label}
                checked={filters.experience.includes(e.value)}
                onChange={() => handleToggleExp(e.value)} />
            ))}
          </Section>
          <Section title="Category">
            {CATEGORIES.map(c => (
              <Checkbox key={c} label={c}
                checked={filters.categories.includes(c)}
                onChange={() => handleToggleCategory(c)} />
            ))}
          </Section>
        </div>
      </div>
    </aside>
  )
})