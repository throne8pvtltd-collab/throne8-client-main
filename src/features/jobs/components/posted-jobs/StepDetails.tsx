import { memo, useState } from 'react'
import { JobPostForm } from '../../types/postJob'
import { textareaCls } from './FormPrimitives'

interface Props {
  form:     JobPostForm
  setField: <K extends keyof JobPostForm>(k: K, v: JobPostForm[K]) => void
}

function AIButton({ onClick, loading }: { onClick: () => void; loading: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-[#d4c4b5] text-[#6b5847] hover:border-[#4a3728] hover:text-[#4a3728] hover:bg-[#f5f0ea] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {loading ? (
        <span className="w-2.5 h-2.5 border-2 border-[#6b5847]/30 border-t-[#6b5847] rounded-full animate-spin" />
      ) : (
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )}
      {loading ? 'Generating...' : 'AI'}
    </button>
  )
}

function AIField({ label, hint, required, onAI, aiLoading, children }: {
  label:     string
  hint?:     string
  required?: boolean
  onAI:      () => void
  aiLoading: boolean
  children:  React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#2d1f14]">
          {label}{required && <span className="text-rose-500 ml-0.5">*</span>}
          {hint && <span className="text-[#9d8876] font-normal ml-1.5">{hint}</span>}
        </label>
        <AIButton onClick={onAI} loading={aiLoading} />
      </div>
      {children}
    </div>
  )
}

export const StepDetails = memo(function StepDetails({ form, setField }: Props) {
  const [descAI, setDescAI] = useState(false)
  const [reqAI,  setReqAI]  = useState(false)

  const descLen   = form.description.length
  const descValid = descLen >= 100

  async function generateDescription() {
    if (!form.title) return
    setDescAI(true)
    await new Promise(r => setTimeout(r, 1200))
    setField('description',
      `We're looking for a talented ${form.title} to join our growing team. ` +
      `In this role, you'll work closely with cross-functional teams to deliver ` +
      `high-impact projects and drive measurable results. You'll have the opportunity ` +
      `to shape our product direction and mentor junior team members.`
    )
    setDescAI(false)
  }

  async function generateRequirements() {
    if (!form.title) return
    setReqAI(true)
    await new Promise(r => setTimeout(r, 1200))
    setField('requirements',
      `• 3+ years of experience in a similar ${form.title} role\n` +
      `• Strong communication and collaboration skills\n` +
      `• Proven track record of delivering results\n` +
      `• Experience working in a fast-paced environment\n` +
      `• Bachelor's degree or equivalent practical experience`
    )
    setReqAI(false)
  }


  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-[#2d1f14] text-sm border-b border-[#f0ece6] pb-3">
        Job Description
      </h2>

      {/* About the Role — full width */}
      <AIField label="About the Role" required hint="(min 100 chars)" onAI={generateDescription} aiLoading={descAI}>
        <textarea
          className={textareaCls}
          rows={4}
          value={form.description}
          onChange={e => setField('description', e.target.value)}
          placeholder="We're looking for a Senior Engineer to join our platform team..."
        />
        <p className={`text-[10px] text-right transition-colors ${descValid ? 'text-[#c4b8ab]' : 'text-rose-400'}`}>
          {descLen} / 100 min
        </p>
      </AIField>

      <AIField label="Requirements" required hint="(one per line)" onAI={generateRequirements} aiLoading={reqAI}>
        <textarea
          className={textareaCls}
          rows={4}
          value={form.requirements}
          onChange={e => setField('requirements', e.target.value)}
          placeholder={'• 5+ years TypeScript\n• Distributed systems\n• AWS or GCP'}
        />
      </AIField>
    </div>
  )
})