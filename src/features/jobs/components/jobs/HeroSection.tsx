'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const router = useRouter()

  const trending = ['Product Designer', 'Frontend Engineer', 'Remote', 'AI / ML', 'Senior']

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (role) params.set('q', role)
    if (location) params.set('location', location)
    router.push(`/job/jobs?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f3ef] mt-0">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(#4a3728 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#d4c4b5] opacity-30 blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-10 left-[15%] w-48 h-48 rounded-full bg-[#e0d8cf] opacity-25 blur-[50px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

        {/* LEFT */}
        <div className="relative">
          <p className="text-[11px] font-bold text-[#c9a882] uppercase tracking-[0.2em] mb-3">— Your next chapter</p>
          <h1
            className="relative font-black text-[#2d1f14] leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(28px, 5vw, 50px)' }}
          >
            Find Your{' '}
            <em className="not-italic text-[#6b5040]">Next</em>
            <br />
            <span className="relative inline-block">
              Opportunity<span className="text-[#c9a882]">.</span>
            </span>
          </h1>

          <div className="flex gap-3 mt-4 max-w-[360px]">
            <div className="w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-[#c9a882] via-[#c9a882]/40 to-transparent" />
            <p className="text-[#6b5847] text-[13px] leading-[1.75]">
              Roles at the most ambitious companies — from seed-stage startups to category-defining giants.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-2 sm:gap-2.5 mt-6 sm:mt-7">
            {[
              { n: '200+', l: 'Open Roles' },
              { n: '80+',  l: 'Companies'  },
              { n: '12k+', l: 'Applicants' },
            ].map(({ n, l }) => (
              <div key={l} className="flex-1 bg-white border border-[#d4c4b5] rounded-xl px-3 sm:px-3.5 py-2.5 sm:py-3 shadow-[0_1px_4px_rgba(74,55,40,0.07)]">
                <p className="text-lg sm:text-[21px] font-black text-[#2d1f14] leading-none tracking-tight">{n}</p>
                <p className="text-[9px] sm:text-[9.5px] text-[#6b5847]/50 font-semibold mt-1.5 uppercase tracking-[0.1em]">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — search */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white border border-[#d4c4b5] rounded-2xl p-2 shadow-sm">
            {/* Role */}
            <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl focus-within:bg-[#f7f3ef] transition-colors min-w-0">
              <svg className="w-4 h-4 text-[#6b5847]/50 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text" value={role} onChange={e => setRole(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Role or skill..."
                className="w-full bg-transparent text-[#2d1f14] placeholder:text-[#6b5847]/35 text-sm font-medium outline-none"
              />
            </div>
            {/* Divider */}
            <div className="h-px sm:h-6 sm:w-px w-full bg-[#d4c4b5] shrink-0" />
            {/* Location */}
            <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl focus-within:bg-[#f7f3ef] transition-colors min-w-0">
              <svg className="w-4 h-4 text-[#6b5847]/50 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text" value={location} onChange={e => setLocation(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                placeholder="Location..."
                className="w-full bg-transparent text-[#2d1f14] placeholder:text-[#6b5847]/35 text-sm font-medium outline-none"
              />
            </div>
            {/* Search btn */}
            <button
              onClick={handleSearch}
              className="shrink-0 w-full sm:w-auto px-5 py-2.5 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#f0e8e0] text-sm font-bold rounded-xl transition-all active:scale-[0.98]"
            >
              Search
            </button>
          </div>

          {/* Trending */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-[#6b5847]/45 font-medium">Trending:</span>
            {trending.map(tag => (
              <button key={tag} onClick={() => setRole(tag)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-[#f7f3ef] border border-[#d4c4b5] text-[#6b5847] hover:text-[#2d1f14] hover:border-[#4a3728]/20 hover:bg-[#ece5de] transition-all font-medium">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}