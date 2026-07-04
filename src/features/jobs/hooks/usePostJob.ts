
import { useCallback, useReducer } from 'react'
import { JobPostForm, INITIAL_FORM, PostJobPlan, ApplyType, TOTAL_STEPS } from '../types/postJob'
import { WorkMode, JobType } from '@/features/jobs/types/jobs'

// ── Reducer — avoids stale closure issues with useState ───────────────────────
type FormAction =
  | { type: 'SET_FIELD'; key: keyof JobPostForm; value: JobPostForm[keyof JobPostForm] }
  | { type: 'ADD_TAG';   tag: string }
  | { type: 'REMOVE_TAG'; tag: string }
  | { type: 'RESET' }

function formReducer(state: JobPostForm, action: FormAction): JobPostForm {
  switch (action.type) {
    case 'SET_FIELD':  return { ...state, [action.key]: action.value }
    case 'ADD_TAG':    return { ...state, tags: [...state.tags, action.tag], tagInput: '' }
    case 'REMOVE_TAG': return { ...state, tags: state.tags.filter(t => t !== action.tag) }
    case 'RESET':      return INITIAL_FORM
    default:           return state
  }
}

type StepAction = { type: 'NEXT' } | { type: 'BACK' } | { type: 'RESET' }

function stepReducer(state: number, action: StepAction): number {
  switch (action.type) {
    case 'NEXT':  return Math.min(state + 1, TOTAL_STEPS - 1)
    case 'BACK':  return Math.max(state - 1, 0)
    case 'RESET': return 0
    default:      return state
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function usePostJob() {
  const [form,      dispatchForm] = useReducer(formReducer, INITIAL_FORM)
  const [step,      dispatchStep] = useReducer(stepReducer, 0)
  const [submitted, setSubmitted] = useReducer((s: boolean, v: boolean) => v, false)
  const [loading,   setLoading]   = useReducer((s: boolean, v: boolean) => v, false)

  // Stable setters — useCallback ensures children don't re-render unnecessarily
  const setField = useCallback(<K extends keyof JobPostForm>(key: K, value: JobPostForm[K]) => {
    dispatchForm({ type: 'SET_FIELD', key, value })
  }, [])

  const addTag = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && form.tagInput.trim()) {
      e.preventDefault()
      const tag = form.tagInput.trim()
      if (form.tags.length < 8 && !form.tags.includes(tag)) {
        dispatchForm({ type: 'ADD_TAG', tag })
      } else {
        dispatchForm({ type: 'SET_FIELD', key: 'tagInput', value: '' })
      }
    }
  }, [form.tagInput, form.tags])

  const removeTag = useCallback((tag: string) => {
    dispatchForm({ type: 'REMOVE_TAG', tag })
  }, [])

  const next = useCallback(() => dispatchStep({ type: 'NEXT' }), [])
  const back = useCallback(() => dispatchStep({ type: 'BACK' }), [])

  const submit = useCallback(async () => {
    setLoading(true)
    try {
      // Production flow:
      // 1. validate all fields
      // 2. POST /api/jobs/post with form data
      // 3. if paid plan (featured/premium) → redirect to Stripe checkout
      // 4. on payment success → Stripe webhook publishes job after moderation
      // 5. send confirmation email via Resend/SES
      await new Promise(r => setTimeout(r, 800)) // TODO: replace with real API call
      setSubmitted(true)
    } catch (err) {
      console.error('[PostJob] submit error:', err)
      // TODO: show toast error
    } finally {
      setLoading(false)
    }
  }, [form])

  const reset = useCallback(() => {
    dispatchForm({ type: 'RESET' })
    dispatchStep({ type: 'RESET' })
    setSubmitted(false)
  }, [])

  return {
    step,
    form,
    submitted,
    loading,
    isLastStep: step === TOTAL_STEPS - 1,
    setField,
    addTag,
    removeTag,
    next,
    back,
    submit,
    reset,
  }
}