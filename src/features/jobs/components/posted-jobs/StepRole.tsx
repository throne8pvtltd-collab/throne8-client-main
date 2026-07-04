import { memo } from 'react'
import { JobPostForm, POST_JOB_CATEGORIES, WORK_MODE_OPTIONS, JOB_TYPE_OPTIONS } from '../../types/postJob'
import { WorkMode } from '@/features/jobs/types/jobs'
import { Field, inputCls, ToggleGroup } from './FormPrimitives'

interface Props {
  form:      JobPostForm
  setField:  <K extends keyof JobPostForm>(k: K, v: JobPostForm[K]) => void
  addTag:    (e: React.KeyboardEvent<HTMLInputElement>) => void
  removeTag: (tag: string) => void
}

export const StepRole = memo(function StepRole({ form, setField, addTag, removeTag }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-[#2d1f14] text-sm border-b border-[#f0ece6] pb-3">
        Role Details
      </h2>

      {/* Title + Category side by side */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Job Title" required>
          <input
            className={inputCls}
            value={form.title}
            onChange={e => setField('title', e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            autoComplete="off"
          />
        </Field>
        <Field label="Category" required>
          <select
            className={inputCls}
            value={form.category}
            onChange={e => setField('category', e.target.value)}
          >
            <option value="">Select category</option>
            {POST_JOB_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      {/* Job Type + Work Mode side by side */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Job Type">
          <select
            className={inputCls}
            value={form.jobType}
            onChange={e => setField('jobType', e.target.value as JobPostForm['jobType'])}
          >
            {JOB_TYPE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Location">
          <input
            className={inputCls}
            value={form.location}
            onChange={e => setField('location', e.target.value)}
            placeholder="e.g. Bhopal"
          />
        </Field>
      </div>

      {/* Work Mode */}
      <Field label="Work Mode" required>
        <ToggleGroup<WorkMode>
          options={WORK_MODE_OPTIONS}
          value={form.workMode}
          onChange={v => setField('workMode', v)}
        />
      </Field>

      {/* Salary */}
      <Field label="Salary Range" hint="Listings with salary get 40% more applications">
        <div className="flex items-center gap-2">
          <select
            className={`${inputCls} w-[80px] shrink-0`}
            value={form.currency}
            onChange={e => setField('currency', e.target.value)}
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>INR</option>
          </select>
          <input
            className={inputCls}
            value={form.salaryMin}
            onChange={e => setField('salaryMin', e.target.value)}
            placeholder="Min e.g. 80000"
            type="number"
            min={0}
          />
          <span className="text-[#9d8876] text-sm shrink-0">–</span>
          <input
            className={inputCls}
            value={form.salaryMax}
            onChange={e => setField('salaryMax', e.target.value)}
            placeholder="Max e.g. 120000"
            type="number"
            min={0}
          />
        </div>
      </Field>

      {/* Tags */}
      <Field label="Skills / Tags" hint="Press Enter or comma · Max 8">
        <div className="w-full min-h-[42px] px-3 py-2 rounded-xl border border-[#e8e0d6] bg-white
          focus-within:border-[#4a3728] focus-within:ring-2 focus-within:ring-[#4a3728]/10
          transition-all flex flex-wrap gap-1.5 items-center">
          {form.tags.map(t => (
            <span key={t} className="flex items-center gap-1 px-2 py-0.5 bg-[#f5f0ea] text-[#4a3728] text-xs font-semibold rounded-md border border-[#e8e0d6]">
              {t}
              <button
                type="button"
                onClick={() => removeTag(t)}
                className="text-[#9d8876] hover:text-rose-500 transition-colors leading-none ml-0.5"
                aria-label={`Remove ${t}`}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className="flex-1 min-w-[120px] outline-none text-sm text-[#2d1f14] placeholder:text-[#c4b8ab] bg-transparent"
            value={form.tagInput}
            onChange={e => setField('tagInput', e.target.value)}
            onKeyDown={addTag}
            placeholder={form.tags.length === 0 ? 'React, TypeScript, AWS...' : ''}
            disabled={form.tags.length >= 8}
          />
        </div>
        {form.tags.length >= 8 && (
          <p className="text-[11px] text-amber-500">Maximum 8 tags reached</p>
        )}
      </Field>
    </div>
  )
})