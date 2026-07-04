'use client'
import { useState, useCallback, useEffect } from 'react'
import { useParams }         from 'next/navigation'
import { useAppSelector } from '@/core/store/store.hooks'
import { selectAllJobs, selectApplications } from '@/features/jobs/jobsSlice'
import { usePrepSession }    from '../../../../features/jobs/hooks/usePrepSession'
import { PrepHeader } from '@/features/jobs/components/prepare/PrepHeader'
import { RoundGuide } from '@/features/jobs/components/prepare/RoundGuide'
import { QuestionCard } from '@/features/jobs/components/prepare/QuestionCard'
import { AnswerInput } from '@/features/jobs/components/prepare/AnswerInput'
import { FeedbackPanel } from '@/features/jobs/components/prepare/FeedbackPanel'
import { SessionSummary } from '@/features/jobs/components/prepare/SessionSummary'
import { InterviewRound, PrepQuestion, AnswerFeedback } from '../../../../features/jobs/types/prepare'

async function fetchQuestions(jobTitle: string, company: string, round: InterviewRound, tags: string[]): Promise<PrepQuestion[]> {
  const res = await fetch('/api/prepare/questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jobTitle, company, round, tags }),
  })
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

async function fetchFeedback(question: PrepQuestion, answer: string, jobTitle: string): Promise<AnswerFeedback> {
  const res = await fetch('/api/prepare/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, answer, jobTitle }),
  })
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function PrepPage() {
  const { jobId }    = useParams<{ jobId: string }>()
  const allJobs      = useAppSelector(selectAllJobs)
  const applications = useAppSelector(selectApplications)
  const job          = allJobs.find(j => j.id === jobId)

  const {
    session, currentQuestion, currentFeedback, progress, avgScore,
    setRound, setQuestions, start, submitAnswer, setFeedback, next, reset,
  } = usePrepSession(jobId, job?.title ?? '', job?.company ?? '')

  const [isGenerating, setGenerating] = useState(false)
  const [isAnalysing,  setAnalysing]  = useState(false)
  const [showHint,     setShowHint]   = useState(false)
  const [error,        setError]      = useState<string | null>(null)

  useEffect(() => setShowHint(false), [session.currentIdx])

  const handleStart = useCallback(async () => {
    if (!job) return
    setGenerating(true); setError(null)
    try {
      const qs = await fetchQuestions(job.title, job.company, session.round, job.tags)
      setQuestions(qs); start()
    } catch { setError('Failed to generate questions — please try again.') }
    finally  { setGenerating(false) }
  }, [job, session.round, setQuestions, start])

  const handleAnswer = useCallback(async (answer: Parameters<typeof submitAnswer>[0]) => {
    if (!currentQuestion || !job) return
    submitAnswer(answer); setAnalysing(true); setError(null)
    try {
      const fb = await fetchFeedback(currentQuestion, answer.text, job.title)
      setFeedback(fb)
    } catch { setError('Failed to analyse answer — please try again.') }
    finally  { setAnalysing(false) }
  }, [currentQuestion, job, submitAnswer, setFeedback])

  if (!job) return (
    <div className="min-h-screen bg-[#f7f3ef] flex items-center justify-center">
      <p className="text-[#4a3728] font-semibold">Job not found</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f7f3ef]">
      <PrepHeader
        jobTitle={job.title} company={job.company}
        activeRound={session.round} onRoundChange={setRound}
        progress={progress} phase={session.phase}
      />

      <main className="max-w-3xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-5 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700 font-medium">
            ⚠ {error}
          </div>
        )}

        {/* Idle — round guide */}
        {session.phase === 'idle' && (
          <RoundGuide round={session.round} jobTags={job.tags} onStart={handleStart} isLoading={isGenerating} />
        )}

        {/* Active — question + answer/feedback */}
        {(session.phase === 'question' || session.phase === 'feedback') && currentQuestion && (
          <div className="max-w-2xl mx-auto space-y-4">
            <QuestionCard
              question={currentQuestion} index={session.currentIdx}
              total={session.questions.length} showHint={showHint}
              onShowHint={() => setShowHint(true)}
            />
            {session.phase === 'question' && (
              <AnswerInput questionId={currentQuestion.id} onSubmit={handleAnswer} isLoading={isAnalysing} />
            )}
            {session.phase === 'feedback' && currentFeedback && (
              <FeedbackPanel
                feedback={currentFeedback} onNext={next}
                isLast={session.currentIdx === session.questions.length - 1}
              />
            )}
          </div>
        )}

        {/* Summary */}
        {session.phase === 'summary' && (
          <SessionSummary session={session} avgScore={avgScore} onRetry={reset} />
        )}
      </main>
    </div>
  )
}