'use client';

import { SocialLinks } from '../../types';

interface Props {
  social: SocialLinks;
  setSocialField: (key: keyof SocialLinks, value: string) => void;
}

const FIELDS: { key: keyof SocialLinks; label: string; placeholder: string }[] = [
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/company/throne8' },
  { key: 'twitter', label: 'Twitter / X', placeholder: 'https://twitter.com/throne8' },
  { key: 'github', label: 'GitHub', placeholder: 'https://github.com/throne8' },
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/throne8' },
];

export function SocialLinksSection({ social, setSocialField }: Props) {
  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#4a3728]">Social Links</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map(f => (
          <div key={f.key}>
            <label className="text-xs font-semibold text-[#4a3728]/70 mb-1 block">{f.label}</label>
            <input type="url" value={social[f.key]} placeholder={f.placeholder}
              onChange={e => setSocialField(f.key, e.target.value)}
              className="w-full bg-white/60 border border-[#e0d8cf] rounded-xl px-3 py-2.5 text-sm text-[#4a3728] placeholder-[#4a3728]/30 focus:outline-none focus:ring-2 focus:ring-[#4a3728]/20" />
          </div>
        ))}
      </div>
    </div>
  );
}