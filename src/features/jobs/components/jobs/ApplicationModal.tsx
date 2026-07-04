'use client'
import { useState, useRef, useEffect } from 'react'
import { Job } from '@/features/jobs/types/jobs'

interface Props {
  job: Job
  onSubmit: () => void
  onClose: () => void
}

interface FormValues {
  name: string
  email: string
  phone: string
  linkedin: string
  portfolio: string
  coverLetter: string
  resume: File | null
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMPTY_FORM: FormValues = {
  name: '', email: '', phone: '', linkedin: '',
  portfolio: '', coverLetter: '', resume: null,
}

function validate(form: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Required'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Valid email required'
  if (!form.resume) errors.resume = 'Required'
  return errors
}

export function ApplicationModal({ job, onSubmit, onClose }: Props) {
  const [step,       setStep]       = useState<'form' | 'success'>('form')
  const [submitting, setSubmitting] = useState(false)
  const [form,       setForm]       = useState<FormValues>(EMPTY_FORM)
  const [errors,     setErrors]     = useState<FormErrors>({})
  const overlayRef                  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function setField(field: keyof FormValues, value: string | File | null) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    setSubmitting(false)
    setStep('success')
    onSubmit()
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4a3728]/25 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg bg-white border border-[#d4c4b5] rounded-2xl overflow-hidden shadow-xl">
        {step === 'success'
          ? <SuccessView job={job} onClose={onClose} />
          : <FormView job={job} form={form} errors={errors} submitting={submitting}
              setField={setField} onSubmit={handleSubmit} onClose={onClose} />
        }
      </div>
    </div>
  )
}

function SuccessView({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="relative mx-auto w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping" />
        <div className="relative w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
          <svg className="w-9 h-9 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
              style={{ strokeDasharray: 30, strokeDashoffset: 30, animation: 'dash 0.5s ease 0.2s forwards' }} />
          </svg>
        </div>
      </div>
      <style>{`@keyframes dash { to { stroke-dashoffset: 0 } }`}</style>

      <h2 className="text-xl font-black text-[#4a3728] mb-2">Application Sent! 🎉</h2>
      <p className="text-[#6b5847] text-sm">
        Your application for <span className="text-[#4a3728] font-semibold">{job.title}</span>
        {' '}at <span className="text-[#4a3728] font-semibold">{job.company}</span> has been submitted.
      </p>
      <p className="text-[#6b5847]/60 text-xs mt-2 mb-7">
        You'll typically hear back within 5–7 business days. Good luck! ✨
      </p>
      <div className="space-y-2.5">
        <button onClick={onClose}
          className="w-full py-3 bg-[#4a3728] hover:bg-[#3a2a1e] text-[#e0d8cf] text-sm font-bold rounded-xl transition-colors">
          Back to Jobs
        </button>
        <button onClick={onClose}
          className="w-full py-3 bg-[#f7f3ef] hover:bg-[#e0d8cf] text-[#6b5847] text-sm font-medium rounded-xl transition-colors border border-[#d4c4b5]">
          View Applied Jobs
        </button>
      </div>
    </div>
  )
}

function FormView({ job, form, errors, submitting, setField, onSubmit, onClose }: {
  job: Job; form: FormValues; errors: FormErrors; submitting: boolean
  setField: (f: keyof FormValues, v: string | File | null) => void
  onSubmit: (e: React.MouseEvent) => void; onClose: () => void
}) {
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8ddd4]">
        <div>
          <p className="text-xs text-[#6b5847] font-medium">{job.company}</p>
          <h2 className="text-[#4a3728] font-bold">{job.title}</h2>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#f7f3ef] text-[#6b5847] hover:text-[#4a3728] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Full Name *" placeholder="Jane Smith" value={form.name}
            error={errors.name} onChange={(v) => setField('name', v)} />
          <Field label="Email *" placeholder="jane@email.com" value={form.email} type="email"
            error={errors.email} onChange={(v) => setField('email', v)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone" placeholder="+1 (555) 000-0000" value={form.phone}
            onChange={(v) => setField('phone', v)} />
          <Field label="LinkedIn" placeholder="linkedin.com/in/..." value={form.linkedin}
            onChange={(v) => setField('linkedin', v)} />
        </div>
        <Field label="Portfolio / Website" placeholder="yoursite.com" value={form.portfolio}
          onChange={(v) => setField('portfolio', v)} />

        <div>
          <label className="block text-xs font-bold text-[#6b5847] uppercase tracking-wider mb-1.5">Resume / CV *</label>
          <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors
            ${errors.resume  ? 'border-red-300 bg-red-50'
            : form.resume    ? 'border-emerald-300 bg-emerald-50'
            : 'border-[#d4c4b5] bg-[#f7f3ef] hover:border-[#4a3728]/30'}`}>
            <svg className={`w-5 h-5 shrink-0 ${form.resume ? 'text-emerald-600' : 'text-[#6b5847]'}`}
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className={`text-sm font-medium ${form.resume ? 'text-emerald-700' : 'text-[#6b5847]'}`}>
              {form.resume ? (form.resume as File).name : 'Upload PDF, DOC, or DOCX'}
            </span>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden"
              onChange={(e) => setField('resume', e.target.files?.[0] ?? null)} />
          </label>
          {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6b5847] uppercase tracking-wider mb-1.5">
            Cover Letter <span className="text-[#6b5847]/50 normal-case font-normal">(optional)</span>
          </label>
          <textarea rows={4} placeholder="Tell them why you're the right fit..."
            value={form.coverLetter} onChange={(e) => setField('coverLetter', e.target.value)}
            className="w-full bg-[#f7f3ef] border border-[#d4c4b5] rounded-xl px-4 py-3 text-sm text-[#4a3728]
              placeholder:text-[#6b5847]/40 outline-none resize-none focus:border-[#4a3728]/40 focus:bg-white transition-colors" />
        </div>
      </div>

      <div className="px-6 py-4 border-t border-[#e8ddd4] flex gap-3">
        <button onClick={onClose}
          className="flex-1 py-3 bg-[#f7f3ef] border border-[#d4c4b5] text-[#6b5847] text-sm font-semibold rounded-xl hover:text-[#4a3728] transition-colors">
          Cancel
        </button>
        <button onClick={onSubmit} disabled={submitting}
          className="flex-1 py-3 bg-[#4a3728] hover:bg-[#3a2a1e] disabled:opacity-60 text-[#e0d8cf] text-sm font-bold rounded-xl transition-colors active:scale-[0.98]">
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </span>
          ) : 'Submit Application'}
        </button>
      </div>
    </>
  )
}

function Field({ label, placeholder, value, type = 'text', error, onChange }: {
  label: string; placeholder: string; value: string
  type?: string; error?: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#6b5847] uppercase tracking-wider mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-[#f7f3ef] border rounded-xl px-4 py-2.5 text-sm text-[#4a3728]
          placeholder:text-[#6b5847]/40 outline-none focus:bg-white transition-colors
          ${error ? 'border-red-300 focus:border-red-400' : 'border-[#d4c4b5] focus:border-[#4a3728]/40'}`} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}