import { useReducer, useCallback, useMemo } from 'react'
import { PrepSession, PrepAnswer, AnswerFeedback, InterviewRound, PrepQuestion } from '../types/prepare'

type Action =
  | { type: 'SET_ROUND';     round:     InterviewRound }
  | { type: 'SET_QUESTIONS'; questions: PrepQuestion[] }
  | { type: 'START' }
  | { type: 'SUBMIT_ANSWER'; answer:   PrepAnswer }
  | { type: 'SET_FEEDBACK';  feedback: AnswerFeedback }
  | { type: 'NEXT' }
  | { type: 'RESET' }

function reducer(s: PrepSession, a: Action): PrepSession {
  switch (a.type) {
    case 'SET_ROUND':
      return { ...s, round: a.round, questions: [], answers: [], feedbacks: [], currentIdx: 0, phase: 'idle' }
    case 'SET_QUESTIONS':
      return { ...s, questions: a.questions }
    case 'START':
      return { ...s, phase: 'question', startedAt: new Date().toISOString() }
    case 'SUBMIT_ANSWER':
      return { ...s, answers: [...s.answers, a.answer], phase: 'feedback' }
    case 'SET_FEEDBACK':
      return { ...s, feedbacks: [...s.feedbacks, a.feedback] }
    case 'NEXT':
      const next = s.currentIdx + 1
      return next >= s.questions.length
        ? { ...s, phase: 'summary' }
        : { ...s, currentIdx: next, phase: 'question' }
    case 'RESET':
      return { ...s, answers: [], feedbacks: [], currentIdx: 0, phase: 'idle', startedAt: null }
    default: return s
  }
}

export function usePrepSession(jobId: string, jobTitle: string, company: string) {
  const [session, dispatch] = useReducer(reducer, {
    jobId, jobTitle, company,
    round: 'screening', questions: [], answers: [], feedbacks: [],
    currentIdx: 0, phase: 'idle', startedAt: null,
  })

  const setRound      = useCallback((r: InterviewRound)   => dispatch({ type: 'SET_ROUND',     round: r }),     [])
  const setQuestions  = useCallback((q: PrepQuestion[])   => dispatch({ type: 'SET_QUESTIONS', questions: q }), [])
  const start         = useCallback(()                    => dispatch({ type: 'START' }),                       [])
  const submitAnswer  = useCallback((a: PrepAnswer)       => dispatch({ type: 'SUBMIT_ANSWER', answer: a }),    [])
  const setFeedback   = useCallback((f: AnswerFeedback)   => dispatch({ type: 'SET_FEEDBACK',  feedback: f }),  [])
  const next          = useCallback(()                    => dispatch({ type: 'NEXT' }),                        [])
  const reset         = useCallback(()                    => dispatch({ type: 'RESET' }),                       [])

  const currentQuestion = session.questions[session.currentIdx] ?? null
  const currentFeedback = useMemo(
    () => session.feedbacks.find(f => f.questionId === currentQuestion?.id) ?? null,
    [session.feedbacks, currentQuestion?.id]
  )
  const progress = session.questions.length > 0
    ? Math.round((session.currentIdx / session.questions.length) * 100) : 0
  const avgScore = session.feedbacks.length > 0
    ? +(session.feedbacks.reduce((s, f) => s + f.score, 0) / session.feedbacks.length).toFixed(1) : null

  return {
    session, currentQuestion, currentFeedback, progress, avgScore,
    setRound, setQuestions, start, submitAnswer, setFeedback, next, reset,
  }
}