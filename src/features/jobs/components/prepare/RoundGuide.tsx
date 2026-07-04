import { memo } from 'react'
import { InterviewRound, ROUND_MAP } from '../../types/prepare'

interface Props { round: InterviewRound; jobTags: string[]; onStart: () => void; isLoading: boolean }

export const RoundGuide = memo(function RoundGuide({ round, jobTags, onStart, isLoading }: Props) {
  const r = ROUND_MAP[round]
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-[11px] font-bold text-[#c9a882] uppercase tracking-[0.2em] mb-2">— Interview Prep</p>
        <h1 className="text-[#2d1f14] font-black leading-tight mb-2" style={{ fontSize: 'clamp(26px,4vw,36px)', fontFamily: "'Playfair Display', serif" }}>
          {r.icon} {r.label}<span className="text-[#c9a882]">.</span>
        </h1>
        <p className="text-[#6b5847] text-sm leading-relaxed">{r.desc}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-3">What's Tested</p>
          {r.focus.map(f => (
            <div key={f} className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4a3728] shrink-0" />
              <span className="text-sm text-[#4a3728] font-medium">{f}</span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-3">Pro Tips</p>
          {r.tips.map(t => (
            <div key={t} className="flex items-start gap-2 mb-2">
              <span className="text-[#c9a882] text-xs mt-0.5 shrink-0">✦</span>
              <span className="text-sm text-[#6b5847] leading-snug">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {jobTags.length > 0 && (
        <div className="bg-white border border-[#d4c4b5] rounded-2xl p-4 mb-4 shadow-sm flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-[#9d8876]">Your skills:</span>
          {jobTags.map(t => <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#4a3728] text-[#e8d5b8]">{t}</span>)}
        </div>
      )}

      <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f7f3ef] border border-[#d4c4b5] flex items-center justify-center text-[#4a3728]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2"/></svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#2d1f14]">{r.dur} · 5 questions</p>
            <p className="text-xs text-[#9d8876]">Voice or text answers · instant AI feedback</p>
          </div>
        </div>
        <button onClick={onStart} disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-[#4a3728] hover:bg-[#3a2a1e] disabled:opacity-60 text-[#e8d5b8] text-sm font-bold rounded-xl transition-colors">
          {isLoading
            ? <><span className="w-4 h-4 border-2 border-[#e8d5b8]/30 border-t-[#e8d5b8] rounded-full animate-spin" />Generating...</>
            : <>Start Practice →</>}
        </button>
      </div>
    </div>
  )
})