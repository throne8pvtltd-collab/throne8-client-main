import { memo } from 'react';
import StatCard from './StatCard';

export interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: string;
}

interface StatsGridProps {
  stats: Stat[];
}

const StatsGrid = memo(function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>
  );
});

export default StatsGrid;