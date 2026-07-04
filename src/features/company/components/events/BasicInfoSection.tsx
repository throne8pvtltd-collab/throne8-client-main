'use client';

import { CompanyFormValues } from "../../types";

const SIZE_OPTIONS = ['1-10', '11-50', '51-200', '201-500', '500+'];
const inputBase = 'flex-1 bg-white/60 border border-[#e0d8cf] px-3 py-2.5 text-sm text-[#4a3728] focus:outline-none focus:ring-2 focus:ring-[#4a3728]/20';

interface Props {
  form: CompanyFormValues;
  errors: Partial<Record<keyof CompanyFormValues, string>>;
  setField: <K extends keyof CompanyFormValues>(key: K, value: CompanyFormValues[K]) => void;
}

export function BasicInfoSection({ form, errors, setField }: Props) {
  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#4a3728]">Basic Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {([
          { key: 'name', label: 'Company Name' },
          { key: 'slug', label: 'URL Slug', prefix: 'throne8.com/' },
          { key: 'industry', label: 'Industry' },
          { key: 'location', label: 'Location' },
          { key: 'founded', label: 'Founded Year' },
        ] as { key: keyof CompanyFormValues; label: string; prefix?: string }[]).map(f => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">{f.label}</label>
            <div className="flex">
              {f.prefix && <span className="px-3 py-2.5 bg-[#e0d8cf] border border-r-0 border-[#e0d8cf] rounded-l-xl text-xs text-[#4a3728]/60">{f.prefix}</span>}
              <input type="text" value={form[f.key] as string} onChange={e => setField(f.key, e.target.value)}
                className={`${inputBase} ${f.prefix ? 'rounded-r-xl' : 'rounded-xl'}`} />
            </div>
            {errors[f.key] && <p className="text-xs text-red-500 mt-1">{errors[f.key]}</p>}
          </div>
        ))}
        <div>
          <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">Company Size</label>
          <select value={form.size} onChange={e => setField('size', e.target.value)} className={`w-full ${inputBase} rounded-xl`}>
            {SIZE_OPTIONS.map(o => <option key={o} value={o}>{o} employees</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">Website</label>
          <input type="url" value={form.website} onChange={e => setField('website', e.target.value)} className={`w-full ${inputBase} rounded-xl`} />
          {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">Tagline</label>
        <input type="text" value={form.tagline} onChange={e => setField('tagline', e.target.value)} maxLength={160} className={`w-full ${inputBase} rounded-xl`} />
        <p className="text-xs text-[#4a3728]/40 mt-1 text-right">{form.tagline?.length ?? 0}/160</p>
      </div>
      <div>
        <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">About / Description</label>
        <textarea value={form.description} onChange={e => setField('description', e.target.value)} rows={4} maxLength={1000} className={`w-full ${inputBase} rounded-xl resize-none`} />
        <p className="text-xs text-[#4a3728]/40 mt-1 text-right">{form.description?.length ?? 0}/1000</p>
      </div>
    </div>
  );
}