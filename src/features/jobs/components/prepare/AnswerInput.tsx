'use client'
import { memo, useState, useCallback, useEffect, useRef } from 'react'
import { useVoiceInput } from '../../hooks/useVoiceInput'
import { PrepAnswer } from '../../types/prepare'

interface Props { questionId: string; onSubmit: (a: PrepAnswer) => void; isLoading: boolean }

export const AnswerInput = memo(function AnswerInput({ questionId, onSubmit, isLoading }: Props) {
  const [text, setText]     = useState('')
  const [mode, setMode]     = useState<'text' | 'voice'>('text')
  const startRef            = useRef(Date.now())
  const handleT             = useCallback((t: string) => setText(t), [])
  const { isRecording, isSupported, start, stop, clear } = useVoiceInput(handleT)

  const switchMode = useCallback((m: 'text' | 'voice') => {
    setMode(m); if (m === 'voice') { clear(); setText('') } else stop()
  }, [clear, stop])

  const handleSubmit = useCallback(() => {
    if (!text.trim()) return
    onSubmit({ questionId, text: text.trim(), durationSec: Math.round((Date.now() - startRef.current) / 1000), via: mode })
  }, [text, questionId, mode, onSubmit])

  const words = text.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="bg-white border border-[#d4c4b5] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-[#2d1f14]">Your Answer</p>
        <div className="flex gap-1 p-1 bg-[#f7f3ef] rounded-lg border border-[#e8ddd4]">
          {(['text', 'voice'] as const).map(m => (
            <button key={m} onClick={() => switchMode(m)} disabled={m === 'voice' && !isSupported}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all disabled:opacity-40
                ${mode === m ? 'bg-white shadow-sm text-[#4a3728]' : 'text-[#9d8876] hover:text-[#4a3728]'}`}>
              {m === 'text' ? '✏️ Type' : '🎙 Voice'}
            </button>
          ))}
        </div>
      </div>

      {mode === 'voice' && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border mb-3 ${isRecording ? 'bg-rose-50 border-rose-200' : 'bg-[#f7f3ef] border-[#d4c4b5]'}`}>
          <button onClick={isRecording ? stop : start}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all
              ${isRecording ? 'bg-rose-500 shadow-[0_0_0_5px_rgba(244,63,94,0.15)] animate-pulse' : 'bg-[#4a3728] hover:bg-[#3a2a1e]'}`}>
            {isRecording
              ? <span className="w-3 h-3 rounded-sm bg-white" />
              : <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z"/></svg>}
          </button>
          <p className={`text-xs font-semibold ${isRecording ? 'text-rose-700' : 'text-[#4a3728]'}`}>
            {isRecording ? 'Recording — click to stop' : 'Click mic to start recording'}
          </p>
        </div>
      )}

      <textarea
        value={text} onChange={e => setText(e.target.value)} rows={5}
        placeholder={mode === 'voice' ? 'Your spoken answer will appear here...' : 'Type your answer here. For behavioral questions use STAR format...'}
        readOnly={mode === 'voice' && isRecording}
        className="w-full px-4 py-3 rounded-xl border border-[#e8ddd4] bg-[#fafaf9] text-sm text-[#2d1f14] placeholder:text-[#c4b8ab] resize-none
          focus:outline-none focus:border-[#4a3728] focus:ring-2 focus:ring-[#4a3728]/8 transition-all"
      />

      <div className="flex items-center justify-between mt-3">
        <p className={`text-xs transition-colors ${words >= 50 ? 'text-[#4a3728] font-semibold' : 'text-[#9d8876]'}`}>
          {words} words {words < 50 ? '· aim for 50+' : '· ✓ good length'}
        </p>
        <button onClick={handleSubmit} disabled={!text.trim() || isLoading || (mode === 'voice' && isRecording)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#4a3728] hover:bg-[#3a2a1e] disabled:opacity-50
            text-[#e8d5b8] text-sm font-bold rounded-xl transition-colors">
          {isLoading
            ? <><span className="w-3.5 h-3.5 border-2 border-[#e8d5b8]/30 border-t-[#e8d5b8] rounded-full animate-spin" />Analysing...</>
            : <>Get Feedback →</>}
        </button>
      </div>
    </div>
  )
})