'use client'
import Link from 'next/link'
import { usePostJob }    from '../../../features/jobs/hooks/usePostJob'
import { StepIndicator } from '@/features/jobs/components/posted-jobs/FormPrimitives'
import { SuccessScreen } from '@/features/jobs/components/posted-jobs/SuccessScreen'
import { StepRole } from '@/features/jobs/components/posted-jobs/StepRole'
import { StepDetails } from '@/features/jobs/components/posted-jobs/StepDetails'
import { StepPlan } from '@/features/jobs/components/posted-jobs/StepPlan'


export default function PostJobPage() {
  const {
    step, form, submitted, loading,
    isLastStep, setField, addTag, removeTag,
    next, back, submit, reset,
  } = usePostJob()

  if (submitted) return <SuccessScreen onPostAnother={reset} />

  return (
    <div className="min-h-screen bg-[#f7f3ef]">

      {/* ── Nav ── */}
      <header className="sticky top-0 z-40 border-b border-[#d4c4b5] bg-[#f7f3ef]/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 h-12 flex items-center gap-4">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#6b5847] hover:text-[#4a3728] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Jobs
          </Link>
          <div className="h-4 w-px bg-[#d4c4b5]" />
          <span className="text-[#2d1f14] text-sm font-bold">Post a Job</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* ── Header ── */}
        <div className="mb-8">
          <p className="text-[11px] font-bold text-[#c9a882] uppercase tracking-[0.2em] mb-2">— Hiring</p>
          <h1
            className="font-black text-[#2d1f14] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(26px, 4vw, 36px)' }}
          >
            Post a Job<span className="text-[#c9a882]">.</span>
          </h1>
          <p className="text-[#6b5847] text-sm mt-1.5">
            Reach thousands of qualified candidates instantly
          </p>
        </div>

        <StepIndicator current={step} />

        {/* ── Form card ── */}
        <div className="bg-white border border-[#e8e0d6] rounded-2xl p-8 shadow-sm">

          {step === 0 && <StepRole    form={form} setField={setField} addTag={addTag} removeTag={removeTag} />}
          {step === 1 && <StepDetails form={form} setField={setField} />}
          {step === 2 && <StepPlan    form={form} setField={setField} />}

          {/* ── Navigation ── */}
          <div className={`flex items-center mt-8 pt-6 border-t border-[#f0ece6] ${step === 0 ? 'justify-end' : 'justify-between'}`}>

            {step > 0 && (
              <button
                type="button"
                onClick={back}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#6b5847] hover:text-[#2d1f14] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            )}

            {!isLastStep ? (
              <button
                type="button"
                onClick={next}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#2d1f14] hover:bg-[#4a3728] text-[#e0d8cf] text-sm font-bold rounded-xl transition-colors"
              >
                Continue
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#2d1f14] hover:bg-[#4a3728] disabled:opacity-60 disabled:cursor-not-allowed text-[#e0d8cf] text-sm font-bold rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#e0d8cf]/30 border-t-[#e0d8cf] rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {form.plan === 'basic' ? 'Publish for Free' : 'Pay & Publish'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}