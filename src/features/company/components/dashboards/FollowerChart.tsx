import { memo, useMemo, useCallback } from 'react';
import Link from 'next/link';

interface WeeklyData {
  day: string;
  followers: number;
}

interface FollowerChartProps {
  data: WeeklyData[];
  activeRange: 'week' | 'month';
  onRangeChange: (range: 'week' | 'month') => void;
}

const FollowerChart = memo(function FollowerChart({ data, activeRange, onRangeChange }: FollowerChartProps) {
  // useMemo — only recalculates when data changes, not on every parent render
  const maxVal = useMemo(() => Math.max(...data.map(d => d.followers)), [data]);
  const total = useMemo(() => data.reduce((sum, d) => sum + d.followers, 0), [data]);

  const handleWeek = useCallback(() => onRangeChange('week'), [onRangeChange]);
  const handleMonth = useCallback(() => onRangeChange('month'), [onRangeChange]);

  return (
    <div className="lg:col-span-2 bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-[#4a3728]">Follower Growth</h3>
          <p className="text-xs text-[#4a3728]/60 mt-0.5">New followers over time</p>
        </div>
        <div className="flex gap-1 bg-[#e0d8cf]/60 rounded-xl p-1">
          <button
            onClick={handleWeek}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 capitalize ${activeRange === 'week' ? 'bg-[#4a3728] text-[#f6ede8] shadow-sm' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}
          >
            week
          </button>
          <button
            onClick={handleMonth}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 capitalize ${activeRange === 'month' ? 'bg-[#4a3728] text-[#f6ede8] shadow-sm' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}
          >
            month
          </button>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-36">
        {data.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] text-[#4a3728]/60 font-medium">{d.followers}</span>
            <div className="w-full">
              <div
                className="w-full bg-[#4a3728] rounded-t-lg transition-all duration-500 hover:bg-[#6b4e3d] cursor-pointer"
                style={{ height: `${(d.followers / maxVal) * 100}px` }}
              />
            </div>
            <span className="text-[10px] text-[#4a3728]/50">{d.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#e0d8cf] flex items-center justify-between">
        <span className="text-xs text-[#4a3728]/60">
          Total this {activeRange}: <strong className="text-[#4a3728]">{total}</strong>
        </span>
        <Link href="/analytics" className="text-xs font-semibold text-[#4a3728] hover:underline">
          Full Analytics →
        </Link>
      </div>
    </div>
  );
});

export default FollowerChart;