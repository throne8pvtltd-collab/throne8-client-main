import { memo } from 'react';
import Link from 'next/link';

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
  color: string;
}

interface ActivityFeedProps {
  items: ActivityItem[];
}

const ActivityFeed = memo(function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-[#4a3728]">Recent Activity</h3>
        <Link href="/activity" className="text-xs font-semibold text-[#4a3728] hover:underline">
          View all →
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#e0d8cf]/40 transition-colors duration-200 group"
          >
            <div
              className={`w-8 h-8 ${item.color} text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0`}
            >
              {item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#4a3728]">
                <span className="font-semibold">{item.user}</span>{' '}
                <span className="text-[#4a3728]/70">{item.action}</span>
              </p>
            </div>
            <span className="text-[10px] text-[#4a3728]/40 flex-shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ActivityFeed;