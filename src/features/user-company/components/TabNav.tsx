'use client'
import { memo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setActiveTab } from '@/features/company/store/slices/uiSlice'
import { TABS } from '@/config/tabs.config'

export const TabNav = memo(function TabNav() {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((s) => s.ui.activeTab)
  const jobCount = useAppSelector((s) => s.company.jobs.filter((j) => j.isActive).length)

  return (
    <div className="border-b border-[#d4c4b5] sticky top-0 z-30 shadow-sm bg-[#f7f3ef]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          role="tablist">
          {TABS.map(({ id, label, iconPath }) => {
            const isActive = activeTab === id
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => dispatch(setActiveTab(id))}
                className={`relative flex items-center gap-1.5 px-3 sm:px-4 h-12 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${isActive
                  ? 'border-[#4a3728] text-[#4a3728]'
                  : 'border-transparent text-[#6b5847] hover:text-[#4a3728] hover:border-[#d4c4b5]'
                  }`}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
                </svg>
                {label}
                {id === 'jobs' && jobCount > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none ${isActive ? 'bg-[#4a3728] text-[#e0d8cf]' : 'bg-[#e0d8cf] text-[#4a3728]'
                    }`}>
                    {jobCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
})
