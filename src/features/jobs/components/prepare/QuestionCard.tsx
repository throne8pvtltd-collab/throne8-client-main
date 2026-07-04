import { memo } from 'react'
import { PrepQuestion } from '../../types/prepare'
import { ROUND_MAP } from '../../types/prepare';

const DIFF_STYLE = {
  easy:   'bg-emerald-50 text-emerald-700 border-emerald-200',
  medium: 'bg-amber-50   text-amber-700   border-amber-200',
  hard:   'bg-rose-50    text-rose-700    border-rose-200',
}

interface Props { question: PrepQuestion; index: number; total: number; showHint: boolean; onShowHint: () => void }

export const QuestionCard = memo(function QuestionCard({ question, index, total, showHint, onShowHint }: Props) {
  const round = ROUND_MAP[question.round]
  return (
    <div className="bg-white border border-[#d4c4b5] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#4a3728] text-[#e8d5b8]">{round.label}</span>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${DIFF_STYLE[question.difficulty]}`}>{question.difficulty}</span>
        </div>
        <span className="text-xs font-semibold text-[#9d8876]">{index + 1} / {total}</span>
      </div>
      <p className="text-[#2d1f14] font-semibold text-[16px] leading-relaxed mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{question.text}</p>
      {question.hint && (
        showHint
          ? <div className="flex gap-2.5 px-4 py-3 bg-[#fdf8f3] border border-[#e8d5b8] rounded-xl">
              <span className="shrink-0 mt-0.5">💡</span>
              <p className="text-sm text-[#6b5847] leading-relaxed m-0">{question.hint}</p>
            </div>
          : <button onClick={onShowHint} className="text-xs text-[#9d8876] hover:text-[#4a3728] font-semibold transition-colors flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4M12 8h.01"/></svg>
              Show hint
            </button>
      )}
    </div>
  )
})