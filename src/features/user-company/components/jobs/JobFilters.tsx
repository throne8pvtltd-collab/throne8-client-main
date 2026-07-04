'use client';

import Button from '@/shared/uiComponents/Button';
import type { JobFilters as JobFiltersType } from '@/features/company/type/company.types';
  
interface FilterDef {
  key:   keyof JobFiltersType;
  label: string;
  opts:  string[];
}

interface Props {
  filters:         JobFiltersType;
  departments:     string[];
  locations:       string[];
  types:           string[];
  hasActiveFilters: boolean;
  onFilterChange:  (key: keyof JobFiltersType, value: string) => void;
  onClearFilters:  () => void;
}

export function JobFilters({ filters, departments, locations, types, hasActiveFilters, onFilterChange, onClearFilters }: Props) {
  const filterDefs: FilterDef[] = [
    { key: 'department', label: 'Department', opts: departments },
    { key: 'location',   label: 'Location',   opts: locations   },
    { key: 'type',       label: 'Job Type',   opts: types       },
  ];

  return (
    <div className="flex flex-wrap items-end gap-4">
      {filterDefs.map(({ key, label, opts }) => (
        <div key={key} className="min-w-[9rem]">
          <label htmlFor={`filter-${key}`} className="block text-xs text-brand-brown/50 font-semibold mb-1.5 ml-1">
            {label}
          </label>
          <select
            id={`filter-${key}`}
            value={filters[key]}
            onChange={(e) => onFilterChange(key, e.target.value)}
            className="w-full bg-brand-cream border border-brand-beige rounded-xl px-3 py-2 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-brown/30 focus:border-brand-brown transition-colors cursor-pointer"
          >
            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      ))}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="self-end mb-0.5">
          Clear all
        </Button>
      )}
    </div>
  );
}
