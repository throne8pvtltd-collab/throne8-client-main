import { memo } from 'react'
import Link from 'next/link'
import { PrepSession, ROUND_MAP } from '../../types/prepare'

interface Props { session: PrepSession; avgScore: number | null; onRetry: () => void }

export const SessionSummary = memo(function SessionSummary({ session, avgScore, onRetry }: Props) {
  const avg   = avgScore ?? 0
  const color = avg >= 7 ? '#10b981' : avg >= 5 ? '#f59e0b' : '#f43f5e'
  const r     = Math.min(avg * 10, 100)

  return (
    <div className="max-w-xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e8ddd4" strokeWidth="3" />
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
              strokeDasharray={`${r} 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.8s ease' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-black" style={{ color }}>{avg}</span>
            <span className="text-[9px] font-bold text-[#9d8876]">/10</span>
          </div>
        </div>
        <p className="text-2xl font-black text-[#2d1f14]" style={{ fontFamily: "'Playfair Display', serif" }}>Session Complete</p>
        <p className="text-sm text-[#6b5847] mt-1">{ROUND_MAP[session.round].label} · {session.questions.length} questions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { l: 'Avg Score', v: `${avg}/10`,                                          c: color },
          { l: 'Strong',    v: session.feedbacks.filter(f => f.score >= 7).length,  c: '#10b981' },
          { l: 'Needs Work',v: session.feedbacks.filter(f => f.score < 5).length,   c: '#f59e0b' },
        ].map(s => (
          <div key={s.l} className="bg-white border border-[#d4c4b5] rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-black mb-1" style={{ color: s.c }}>{s.v}</p>
            <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-wider">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Q breakdown */}
      <div className="bg-white border border-[#d4c4b5] rounded-2xl overflow-hidden shadow-sm mb-5">
        <div className="px-5 py-3 border-b border-[#e8ddd4]">
          <p className="text-xs font-bold text-[#2d1f14]">Question Breakdown</p>
        </div>
        {session.questions.map((q, i) => {
          const fb  = session.feedbacks[i]
          const s   = fb?.score ?? 0
          const bar = s >= 7 ? 'bg-emerald-500' : s >= 5 ? 'bg-amber-500' : 'bg-rose-500'
          const txt = s >= 7 ? 'text-emerald-600' : s >= 5 ? 'text-amber-600' : 'text-rose-600'
          return (
            <div key={q.id} className="flex items-center gap-3 px-5 py-3 border-b border-[#f0ece6] last:border-0">
              <span className="w-5 h-5 rounded-full bg-[#f7f3ef] text-[#6b5847] text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
              <p className="text-sm text-[#4a3728] flex-1 truncate">{q.text}</p>
              <div className="w-16 h-1.5 bg-[#e8ddd4] rounded-full overflow-hidden shrink-0">
                <div className={`h-full rounded-full ${bar}`} style={{ width: `${s * 10}%` }} />
              </div>
              <span className={`text-xs font-bold w-8 text-right shrink-0 ${txt}`}>{s}/10</span>
            </div>
          )
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onRetry} className="flex-1 py-3.5 border border-[#d4c4b5] bg-white rounded-xl text-sm font-bold text-[#6b5847] hover:text-[#4a3728] hover:border-[#4a3728]/30 transition-colors">
          ← New Session
        </button>
        <Link href="/applied" className="flex-1 py-3.5 bg-[#4a3728] hover:bg-[#3a2a1e] rounded-xl text-sm font-bold text-[#e8d5b8] text-center transition-colors">
          Back to Applications
        </Link>
      </div>
    </div>
  )
})