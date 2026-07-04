import { memo, useCallback } from 'react'
import { JobPostForm, COMPANY_SIZES } from '../../types/postJob'
import { Field, inputCls } from './FormPrimitives'

interface Props {
  form: JobPostForm
  setField: <K extends keyof JobPostForm>(k: K, v: JobPostForm[K]) => void
}

// memo — only re-renders if form.companyName/companyWebsite/companySize/companyLogo changes
export const StepCompany = memo(function StepCompany({ form, setField }: Props) {

  const handleLogoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setField('companyLogo', URL.createObjectURL(file))
  }, [setField])

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-[#2d1f14] text-base border-b border-[#f0ece6] pb-4">
        Company Info
      </h2>

      <Field label="Company Name" required>
        <input
          className={inputCls}
          value={form.companyName}
          onChange={e => setField('companyName', e.target.value)}
          placeholder="e.g. Acme Corp"
          autoComplete="organization"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Website" required>
          <input
            className={inputCls}
            value={form.companyWebsite}
            onChange={e => setField('companyWebsite', e.target.value)}
            placeholder="https://acme.com"
            type="url"
            autoComplete="url"
          />
        </Field>
        <Field label="Company Size">
          <select
            className={inputCls}
            value={form.companySize}
            onChange={e => setField('companySize', e.target.value)}
          >
            <option value="">Select size</option>
            {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Company Logo" hint="Square image, min 200×200px. Shown next to your listing.">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#f5f0ea] border border-[#e8e0d6] flex items-center justify-center text-[#9d8876] text-xs font-bold overflow-hidden shrink-0">
            {form.companyLogo
              ? <img src={form.companyLogo} className="w-full h-full object-cover" alt="Logo preview" />
              : 'LOGO'
            }
          </div>
          <label className="cursor-pointer px-4 py-2 border border-[#e8e0d6] rounded-xl text-sm font-semibold text-[#6b5847] hover:bg-[#f5f0ea] transition-colors">
            Upload Image
            <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          </label>
          {form.companyLogo && (
            <button
              type="button"
              onClick={() => setField('companyLogo', '')}
              className="text-xs text-[#9d8876] hover:text-rose-500 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </Field>
    </div>
  )
})