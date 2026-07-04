import { memo } from 'react';

interface Props {
  stats: { open: number; totalApps: number; inInterview: number; hired: number };
}

const ITEMS = [
  { key: 'open'        as const, label: 'Open Jobs',          color: 'text-green-600'   },
  { key: 'totalApps'   as const, label: 'Total Applications', color: 'text-[#4a3728]'  },
  { key: 'inInterview' as const, label: 'In Interview',        color: 'text-orange-500'  },
  { key: 'hired'       as const, label: 'Hired',               color: 'text-green-600'   },
];

const JobStats = memo(function JobStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {ITEMS.map(s => (
        <div key={s.key} className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-xl p-4 text-center">
          <p className={`text-2xl font-bold ${s.color}`}>{stats[s.key]}</p>
          <p className="text-xs text-[#4a3728]/60">{s.label}</p>
        </div>
      ))}
    </div>
  );
});

export default JobStats;