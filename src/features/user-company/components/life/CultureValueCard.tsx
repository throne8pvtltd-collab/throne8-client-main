'use client';

import { CultureValue } from "@/features/company/type/company.types";

export function CultureValueCard({ value: v }: { value: CultureValue }) {
  return (
    <div className="group p-4 rounded-xl border border-brand-beige hover:border-brand-tan hover:bg-brand-beige/30 transition-all duration-200">
      <div className="w-9 h-9 bg-brand-brown/8 rounded-lg flex items-center justify-center mb-3 group-hover:bg-brand-brown group-hover:shadow-md transition-all duration-300">
        <svg className="w-4 h-4 text-brand-brown group-hover:text-brand-cream transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={v.iconPath} />
        </svg>
      </div>
      <h3 className="text-sm font-bold text-brand-brown mb-1">{v.title}</h3>
      <p className="text-xs text-brand-brown/65 leading-relaxed">{v.description}</p>
    </div>
  );
}
