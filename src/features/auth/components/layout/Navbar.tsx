'use client'
import Link from 'next/link'
import { memo } from 'react'

export const Navbar = memo(function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d4c4b5] bg-[#f7f3ef]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/jobs" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#4a3728] flex items-center justify-center">
            <span className="text-[#e0d8cf] font-black text-[11px]">T8</span>
          </div>
          <span className="text-[#4a3728] font-bold text-sm tracking-tight">throne8</span>
          <span className="text-[#d4c4b5] text-sm mx-1">/</span>
          <span className="text-[#6b5847] text-sm font-medium">Jobs</span>
        </Link>
        <button className="px-3.5 py-1.5 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#e0d8cf] text-sm font-semibold rounded-lg transition-colors">
          Post a Job
        </button>
      </div>
    </header>
  )
})