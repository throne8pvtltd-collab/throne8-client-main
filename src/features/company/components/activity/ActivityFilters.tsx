import { memo } from 'react';
import type { ActivityType } from '../../types';

export type FilterValue = 'all' | 'unread' | ActivityType;

const FILTERS: FilterValue[] = ['all', 'unread', 'review', 'follow', 'like', 'comment', 'apply', 'event'];

interface Props {
  active: FilterValue;
  unreadCount: number;
  onChange: (f: FilterValue) => void;
}

// memo — only re-renders when active filter or unreadCount changes
const ActivityFilters = memo(function ActivityFilters({ active, unreadCount, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200
            ${active === f
              ? 'bg-[#4a3728] text-[#f6ede8]'
              : 'bg-[#e0d8cf]/60 text-[#4a3728]/70 hover:text-[#4a3728] hover:bg-[#e0d8cf]'}`}
        >
          {f === 'unread' && unreadCount > 0 ? `Unread (${unreadCount})` : f}
        </button>
      ))}
    </div>
  );
});

export default ActivityFilters;