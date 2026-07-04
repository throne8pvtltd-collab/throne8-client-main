'use client';

import { memo } from 'react';

type Metric = {
  label: string;
  value: number | null;
  growth?: number | null;
};

type Props = {
  metrics: Metric[] | null;
};

function MetricsGrid({ metrics }: Props) {  
  const safeMetrics = Array.isArray(metrics) ? metrics : [];

  if (!safeMetrics.length) {
    return (
      <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm text-sm text-[#4a3728]/60 text-center">
        No metrics available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {safeMetrics.map((metric) => {
        const safeValue = Number(metric.value ?? 0);
        const safeGrowth = Number(metric.growth ?? 0);

        return (
          <div
            key={metric.label}
            className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-5 shadow-sm"
          >
            <p className="text-xs text-[#4a3728]/60 mb-2">
              {metric.label}
            </p>

            <p className="text-xl font-bold text-[#4a3728]">
              {safeValue.toLocaleString()}
            </p>

            <p
              className={`text-xs mt-2 font-medium ${
                safeGrowth >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {safeGrowth >= 0 ? '+' : ''}
              {safeGrowth}%
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default memo(MetricsGrid);