'use client';
import { useCounter } from '../../hooks/useCounter';
import { Card } from '../ui';
import type { CompanyStat } from '@/features/company/type/company.types';

interface Props { stat: CompanyStat; animate: boolean; }

export function StatCard({ stat, animate }: Props) {
  const numeric = parseFloat(stat.value);
  const isDecimal = stat.value.includes('.');
  const count = useCounter(isDecimal ? numeric * 10 : numeric, 1400, animate);
  const display = isDecimal ? (count / 10).toFixed(1) : count.toString();

  return (
    <Card hoverable padding="md" className="text-center">
      <div className="mb-2 mx-auto w-9 h-9 bg-brand-brown/8 rounded-xl flex items-center justify-center">
        <svg className="w-4 h-4 text-brand-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.iconPath} />
        </svg>
      </div>
      <p className="text-3xl sm:text-4xl font-black text-brand-brown font-display">
        {display}<span className="text-brand-light text-xl">{stat.suffix}</span>
      </p>
      <p className="text-sm font-semibold text-brand-brown mt-1">{stat.label}</p>
      <p className="text-xs text-brand-brown/55 mt-1 leading-relaxed">{stat.description}</p>
    </Card>
  );
}
