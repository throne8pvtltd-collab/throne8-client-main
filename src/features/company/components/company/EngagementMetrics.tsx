import { memo } from 'react';

export interface Metric {
  id: string;
  label: string;
  value: string;
  desc: string;
  icon: string; 
}

interface EngagementMetricsProps {
  metrics: Metric[];
}

const EngagementMetrics = memo(function EngagementMetrics({ metrics }: EngagementMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((m) => (
        <div
          key={m.id}
          className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-5 shadow-sm flex items-center gap-4"
        >
          <span className="text-2xl">{m.icon}</span>
          <div>
            <p className="text-xl font-bold text-[#4a3728]">{m.value}</p>
            <p className="text-xs font-semibold text-[#4a3728]/80">{m.label}</p>
            <p className="text-[11px] text-[#4a3728]/50 mt-0.5">{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

export default EngagementMetrics;