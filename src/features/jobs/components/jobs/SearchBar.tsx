'use client'
import { useState, useCallback, useRef } from 'react'
import { useJobs } from '@/features/jobs/hooks/useJobs'
import { useDebounce } from '@/features/jobs/hooks/useDebounce'

const POPULAR = ['Product Designer', 'Frontend Engineer', 'Remote', 'Senior']

export function SearchBar() {
  const { filters, handleSearch, handleLocation, filteredJobs } = useJobs()
  const [localSearch,   setLocalSearch]   = useState(filters.search)
  const [localLocation, setLocalLocation] = useState(filters.location)
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearch   = useDebounce((v: string) => handleSearch(v),   300)
  const debouncedLocation = useDebounce((v: string) => handleLocation(v), 300)

  const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    debouncedSearch(e.target.value)
  }, [debouncedSearch])

  const onLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLocation(e.target.value)
    debouncedLocation(e.target.value)
  }, [debouncedLocation])

  const onPopular = (term: string) => {
    setLocalSearch(term)
    handleSearch(term)
    inputRef.current?.blur()
  }

  return (
    <div className={`bg-white border rounded-2xl shadow-sm transition-all duration-200
      ${focused ? 'border-[#4a3728]/40 shadow-[0_4px_28px_rgba(74,55,40,0.11)]' : 'border-[#d4c4b5]'}`}
    >
      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search input */}
          <div className="flex-1 flex items-center gap-2.5 bg-[#f7f3ef] border border-[#d4c4b5] rounded-xl px-4 py-3
            focus-within:border-[#4a3728]/40 focus-within:bg-white transition-colors">
            <svg className="w-4 h-4 text-[#6b5847] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Job title, skill, or company..."
              value={localSearch}
              onChange={onSearchChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              className="flex-1 bg-transparent text-[#4a3728] placeholder:text-[#6b5847]/50 text-sm font-medium outline-none"
            />
            {localSearch && (
              <button onClick={() => { setLocalSearch(''); handleSearch('') }}
                className="text-[#6b5847] hover:text-[#4a3728] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Location input */}
          <div className="sm:w-48 flex items-center gap-2.5 bg-[#f7f3ef] border border-[#d4c4b5] rounded-xl px-4 py-3
            focus-within:border-[#4a3728]/40 focus-within:bg-white transition-colors">
            <svg className="w-4 h-4 text-[#6b5847] shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Location..."
              value={localLocation}
              onChange={onLocationChange}
              className="flex-1 bg-transparent text-[#4a3728] placeholder:text-[#6b5847]/50 text-sm font-medium outline-none"
            />
          </div>

          <button className="px-7 py-3 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#e0d8cf] text-sm font-bold rounded-xl
            transition-colors active:scale-[0.98] shrink-0">
            Search
          </button>
        </div>

        {/* Bottom row — count + popular */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-[#6b5847]">
            <span className="text-[#4a3728] font-bold">{filteredJobs.length}</span> positions available
          </p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#6b5847]/50">Popular:</span>
            {POPULAR.map((term) => (
              <button key={term} onClick={() => onPopular(term)}
                className="text-xs px-2.5 py-1 rounded-lg bg-[#f7f3ef] border border-[#d4c4b5] text-[#6b5847]
                  hover:text-[#4a3728] hover:border-[#4a3728]/30 hover:bg-[#e0d8cf]/40 transition-colors font-medium">
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}