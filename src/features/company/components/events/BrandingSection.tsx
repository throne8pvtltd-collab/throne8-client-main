'use client';

import { useRef } from 'react';

interface Props {
  companyInitials?: string;
  logoUrl?: string;        
  bannerUrl?: string;      
  onLogoChange?: (file: File) => void;
  onBannerChange?: (file: File) => void;
}

export function BrandingSection({ companyInitials = 'T8', logoUrl, bannerUrl, onLogoChange, onBannerChange }: Props) {
  const logoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#4a3728]">Branding</h3>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <button type="button" onClick={() => logoRef.current?.click()}
            className="w-20 h-20 rounded-2xl overflow-hidden mb-2 hover:opacity-80 transition-opacity border border-[#e0d8cf]">
            {logoUrl
              ? <img src={logoUrl} alt="logo" className="w-full h-full object-cover" />
              : <span className="w-full h-full bg-[#4a3728] flex items-center justify-center text-[#f6ede8] text-2xl font-bold">{companyInitials}</span>
            }
          </button>
          <p className="text-xs text-[#4a3728]/60">Company Logo</p>
          <button type="button" onClick={() => logoRef.current?.click()} className="mt-1 text-xs font-semibold text-[#4a3728] hover:underline">Change</button>
          <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onLogoChange?.(f); }} />
        </div>
        <div className="flex-1">
          <button type="button" onClick={() => bannerRef.current?.click()}
            className="w-full h-24 rounded-xl overflow-hidden border border-[#e0d8cf] hover:opacity-80 transition-opacity relative">
            {bannerUrl
              ? <img src={bannerUrl} alt="banner" className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-[#e0d8cf] flex items-center justify-center border-2 border-dashed border-[#4a3728]/20">
                <div className="text-center">
                  <svg className="w-6 h-6 text-[#4a3728]/40 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-[#4a3728]/50">Upload Banner Image</p>
                </div>
              </div>
            }
          </button>
          <p className="text-xs text-[#4a3728]/60 mt-1">Recommended 1200×300px</p>
          <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) onBannerChange?.(f); }} />
        </div>
      </div>
    </div>
  );
}