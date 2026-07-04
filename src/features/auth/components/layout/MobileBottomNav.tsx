'use client'
import Link from 'next/link'
import { memo } from 'react'
import { usePathname } from 'next/navigation'

import { useJobs } from '@/features/jobs/hooks/useJobs'

export const MobileBottomNav = memo(function MobileBottomNav() {
  const pathname = usePathname()
  const { savedCount, appliedCount } = useJobs()

  const tabs = [
    {
      href: '/jobs',
      label: 'Jobs',
      active: pathname === '/jobs' || pathname.startsWith('/jobs/'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: '/saved',
      label: 'Saved',
      active: pathname === '/saved',
      badge: savedCount,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
    },
    {
      href: '/applied',
      label: 'Applied',
      active: pathname === '/applied',
      badge: appliedCount,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      href: '/prepare',
      label: 'Prepare',
      active: pathname === '/prepare' || pathname.startsWith('/prepare/'),
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      href: '/post-job',
      label: 'Post',
      active: pathname === '/post-job',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#f7f3ef]/95 backdrop-blur-xl border-t border-[#d4c4b5] safe-bottom">
      <div className="flex items-stretch h-16">
        {tabs.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-1 flex flex-col items-center justify-center gap-1 relative transition-colors
              ${tab.active ? 'text-[#4a3728]' : 'text-[#9d8876]'}`}
          >
            {/* Active indicator dot at top */}
            {tab.active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#4a3728]" />
            )}

            <div className="relative">
              {tab.icon}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-0.5 rounded-full bg-[#4a3728] text-[#e8d5b8] text-[9px] font-black flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-semibold ${tab.active ? 'font-bold' : ''}`}>{tab.label}</span>
          </Link>
        ))}
      </div>
      {/* Safe area spacer for iPhone home indicator */}
      <div className="h-safe-bottom" />
    </nav>
  )
})