'use client'
import { useState, memo } from 'react'
import { ApplicationStatus } from '@/features/jobs/types/jobs'
import { STATUS_CFG } from '@/features/jobs/constants/jobConstants'

const ALL_STATUSES = Object.keys(STATUS_CFG) as ApplicationStatus[]

export const StatusDropdown = memo(function StatusDropdown({ current, onChange }: {
  current: ApplicationStatus; onChange: (s: ApplicationStatus) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={e => { e.preventDefault(); setOpen(o => !o) }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#6b5847] border border-[#d4c4b5] hover:text-[#4a3728] hover:border-[#4a3728]/30 hover:bg-[#f7f3ef] transition-all"
      >
        Update
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-20 bg-white border border-[#d4c4b5] rounded-xl shadow-lg overflow-hidden min-w-[160px]">
            {ALL_STATUSES.map(s => {
              const c = STATUS_CFG[s]
              return (
                <button key={s}
                  onClick={e => { e.preventDefault(); onChange(s); setOpen(false) }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-medium text-left transition-colors
                    ${s === current ? `${c.bg} ${c.color}` : 'text-[#4a3728] hover:bg-[#f7f3ef]'}`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                  {c.label}
                  {s === current && (
                    <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
})