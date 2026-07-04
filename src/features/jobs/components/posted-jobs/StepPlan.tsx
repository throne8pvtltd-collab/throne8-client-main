import { memo, useMemo } from 'react'
import { JobPostForm, PLANS, PostJobPlan } from '../../types/postJob'

interface Props {
  form:     JobPostForm
  setField: <K extends keyof JobPostForm>(k: K, v: JobPostForm[K]) => void
}

export const StepPlan = memo(function StepPlan({ form, setField }: Props) {
  // Memoize summary rows — only recomputes when relevant fields change
  const summaryRows = useMemo(() => [
    ['Company',   form.companyName  || '—'],
    ['Role',      form.title        || '—'],
    ['Location',  form.location     || '—'],
    ['Work Mode', form.workMode     || '—'],
    ['Plan',      form.plan],
  ] as const, [form.companyName, form.title, form.location, form.workMode, form.plan])

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-[#2d1f14] text-base border-b border-[#f0ece6] pb-4">
        Choose a Plan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PLANS.map(plan => {
          const isSelected = form.plan === plan.id
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setField('plan', plan.id as PostJobPlan)}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-[#4a3728]' : 'hover:border-[#c9a882]'}`}
              style={{
                background:   plan.dark ? '#2d1f14' : plan.bg,
                borderColor:  isSelected ? '#2d1f14' : plan.border,
              }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#c9a882] text-white text-[10px] font-bold rounded-full uppercase tracking-wide whitespace-nowrap">
                  Popular
                </span>
              )}
              <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.dark ? 'text-[#c9a882]' : 'text-[#9d8876]'}`}>
                {plan.name}
              </p>
              <p className={`text-2xl font-black mb-1 ${plan.dark ? 'text-white' : 'text-[#2d1f14]'}`}>
                {plan.price}
              </p>
              <p className={`text-xs mb-4 ${plan.dark ? 'text-[#c4b8ab]' : 'text-[#9d8876]'}`}>
                {plan.desc}
              </p>
              <ul className="flex flex-col gap-1.5">
                {plan.perks.map(perk => (
                  <li key={perk} className={`text-xs flex items-start gap-1.5 ${plan.dark ? 'text-[#e0d8cf]' : 'text-[#6b5847]'}`}>
                    <span className="text-[#c9a882] mt-0.5 shrink-0">✓</span>
                    {perk}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>

      {/* Listing summary — memoized rows */}
      <div className="bg-[#f5f0ea] rounded-xl p-5 border border-[#e8e0d6]">
        <p className="text-xs font-bold text-[#9d8876] uppercase tracking-wider mb-3">
          Listing Summary
        </p>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          {summaryRows.map(([label, value]) => (
            <>
              <span key={`l-${label}`} className="text-[#9d8876]">{label}</span>
              <span key={`v-${label}`} className="font-semibold text-[#2d1f14] capitalize">{value}</span>
            </>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-[#9d8876] text-center">
        By posting you agree to our{' '}
        <a href="/terms" className="underline hover:text-[#4a3728] transition-colors">Terms of Service</a>
        {' '}and{' '}
        <a href="/content-policy" className="underline hover:text-[#4a3728] transition-colors">Content Policy</a>.
        All listings are reviewed before going live.
      </p>
    </div>
  )
})