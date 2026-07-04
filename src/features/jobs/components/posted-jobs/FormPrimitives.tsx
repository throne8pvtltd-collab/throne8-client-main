import { memo } from 'react'
import { STEP_LABELS, TOTAL_STEPS } from '../../types/postJob'

// ── Shared class strings (defined outside components — never recreated) ────────
export const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl border border-[#e8e0d6] bg-white text-[#2d1f14] text-sm ' +
  'placeholder:text-[#c4b8ab] focus:outline-none focus:border-[#4a3728] ' +
  'focus:ring-2 focus:ring-[#4a3728]/10 transition-all'

export const textareaCls = inputCls + ' resize-none'

// ── Field wrapper ─────────────────────────────────────────────────────────────
interface FieldProps {
  label:     string
  hint?:     string
  required?: boolean
  children:  React.ReactNode
}

export const Field = memo(function Field({ label, hint, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-[#2d1f14]">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-[#9d8876] -mt-0.5">{hint}</p>}
      {children}
    </div>
  )
})

// ── Step indicator ────────────────────────────────────────────────────────────
export const StepIndicator = memo(function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center mb-10">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={[
              'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
              i < current   ? 'bg-[#4a3728] text-[#e0d8cf]' :
              i === current ? 'bg-[#2d1f14] text-[#e0d8cf] ring-4 ring-[#2d1f14]/20' :
                              'bg-[#e8e0d6] text-[#9d8876]',
            ].join(' ')}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={[
              'text-xs font-semibold hidden sm:block',
              i === current ? 'text-[#2d1f14]' :
              i < current   ? 'text-[#4a3728]' : 'text-[#9d8876]',
            ].join(' ')}>
              {label}
            </span>
          </div>
          {i < TOTAL_STEPS - 1 && (
            <div className={`flex-1 max-w-[48px] h-px mx-3 transition-colors ${i < current ? 'bg-[#4a3728]' : 'bg-[#e8e0d6]'}`} />
          )}
        </div>
      ))}
    </div>
  )
})

// ── Toggle button group ───────────────────────────────────────────────────────
interface ToggleGroupProps<T extends string> {
  options:  readonly { value: T; label: string }[]
  value:    T | ''
  onChange: (v: T) => void
}

export function ToggleGroup<T extends string>({ options, value, onChange }: ToggleGroupProps<T>) {
  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
          className={[
            'flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all',
            value === opt.value
              ? 'bg-[#2d1f14] text-[#e0d8cf] border-[#2d1f14]'
              : 'bg-white text-[#6b5847] border-[#e8e0d6] hover:border-[#4a3728]',
          ].join(' ')}>
          {opt.label}
        </button>
      ))}
    </div>
  )
}