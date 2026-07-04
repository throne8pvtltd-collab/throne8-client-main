'use client';
import { Search, X } from 'lucide-react';

interface Props {
  value:    string;
  onChange: (v: string) => void;
}

export function JobSearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-light pointer-events-none" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search roles, skills, departments…"
        aria-label="Search jobs"
        className="w-full pl-10 pr-10 py-2.5 bg-brand-cream border border-brand-beige rounded-xl text-sm text-brand-brown placeholder-brand-brown/40 focus:outline-none focus:ring-2 focus:ring-brand-brown/30 focus:border-brand-brown transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-brown/40 hover:text-brand-brown transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
