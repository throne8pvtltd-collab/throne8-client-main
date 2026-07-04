import { memo } from 'react'
import Link from 'next/link'
import { InterviewRound, ROUNDS } from '../../types/prepare'

interface Props {
  jobTitle:      string
  company:       string
  activeRound:   InterviewRound
  onRoundChange: (r: InterviewRound) => void
  progress:      number
  phase:         string
}

export const PrepHeader = memo(function PrepHeader({ jobTitle, company, activeRound, onRoundChange, progress, phase }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d4c4b5] bg-[#f7f3ef]/95 backdrop-blur-xl">
      <div className="max-w-3xl mx-auto px-6">
        <div className="h-12 flex items-center gap-3">
          <Link href="/applied" className="text-sm font-semibold text-[#6b5847] hover:text-[#4a3728] transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back
          </Link>
          <span className="text-[#d4c4b5]">|</span>
          <span className="text-sm font-medium text-[#6b5847] truncate">{company} — {jobTitle}</span>
          {phase !== 'idle' && (
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <div className="w-20 h-1.5 bg-[#e8ddd4] rounded-full overflow-hidden">
                <div className="h-full bg-[#4a3728] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] font-bold text-[#9d8876]">{progress}%</span>
            </div>
          )}
        </div>
        {/* Round tabs */}
        <div className="flex overflow-x-auto [scrollbar-width:none]">
          {ROUNDS.map((r, i) => (
            <button key={r.id} onClick={() => onRoundChange(r.id)}
              className={`flex items-center gap-2 px-3.5 h-10 text-xs font-semibold whitespace-nowrap border-b-2 transition-all
                ${activeRound === r.id ? 'border-[#4a3728] text-[#4a3728]' : 'border-transparent text-[#9d8876] hover:text-[#4a3728]'}`}>
              <span className={`w-[18px] h-[18px] rounded-full text-[9px] font-black flex items-center justify-center shrink-0 transition-all
                ${activeRound === r.id ? 'bg-[#4a3728] text-white' : 'bg-[#e8ddd4] text-[#6b5847]'}`}>{i + 1}</span>
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
})