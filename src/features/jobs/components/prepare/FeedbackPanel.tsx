import { memo } from 'react'
import { AnswerFeedback } from '../../types/prepare'

interface Props { feedback: AnswerFeedback; onNext: () => void; isLast: boolean }

const sc = (s: number) => s >= 8 ? { color: '#10b981', bg: 'bg-emerald-50', bar: 'bg-emerald-500', label: '🔥 Strong answer' }
                         : s >= 6 ? { color: '#f59e0b', bg: 'bg-amber-50',   bar: 'bg-amber-500',   label: '👍 Good answer' }
                         :          { color: '#f43f5e', bg: 'bg-rose-50',    bar: 'bg-rose-500',    label: '📈 Needs work' }

export const FeedbackPanel = memo(function FeedbackPanel({ feedback, onNext, isLast }: Props) {
  const style = sc(feedback.score)
  return (
    <div className="space-y-3">
      {/* Score */}
      <div className={`${style.bg} border border-[#d4c4b5] rounded-2xl p-5 shadow-sm`}>
        <div className="flex items-center gap-4 mb-3">
          <div>
            <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-1">AI Feedback</p>
            <p className="text-xl font-black text-[#2d1f14]">{style.label}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-3xl font-black" style={{ color: style.color }}>{feedback.score}<span className="text-base text-[#9d8876]">/10</span></p>
          </div>
        </div>
        <div className="w-full h-2 bg-[#e8ddd4] rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-700 ${style.bar}`} style={{ width: `${feedback.score * 10}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-3">✓ What you nailed</p>
          {feedback.strengths.map((s, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span className="text-sm text-[#4a3728] leading-snug">{s}</span>
            </div>
          ))}
        </div>
        <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-3">↑ Improve here</p>
          {feedback.improvements.map((s, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span className="text-sm text-[#6b5847] leading-snug">{s}</span>
            </div>
          ))}
        </div>
      </div>

      {feedback.keywords.length > 0 && (
        <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 shadow-sm">
          <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-3">🔑 Key concepts to include</p>
          <div className="flex flex-wrap gap-2">
            {feedback.keywords.map(k => (
              <span key={k} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#4a3728]/8 text-[#4a3728] border border-[#4a3728]/15">{k}</span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border border-[#d4c4b5] rounded-2xl p-5 shadow-sm">
        <p className="text-[10px] font-bold text-[#9d8876] uppercase tracking-[0.15em] mb-2">⭐ Sample strong answer</p>
        <p className="text-sm text-[#6b5847] leading-relaxed">{feedback.idealAnswer}</p>
      </div>

      <div className="flex justify-end">
        <button onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#e8d5b8] text-sm font-bold rounded-xl transition-colors">
          {isLast ? 'View Summary →' : 'Next Question →'}
        </button>
      </div>
    </div>
  )
})