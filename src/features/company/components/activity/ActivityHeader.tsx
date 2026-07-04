import { memo } from 'react';

interface Props {
  unreadCount: number;
  onMarkAllRead: () => void;
}

// memo — only re-renders when unreadCount changes
const ActivityHeader = memo(function ActivityHeader({ unreadCount, onMarkAllRead }: Props) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-[#4a3728]">Activity</h1>
        <p className="text-sm text-[#4a3728]/60 mt-0.5">
          {unreadCount > 0
            ? <><span className="font-semibold text-[#4a3728]">{unreadCount} unread</span> notifications</>
            : 'All caught up!'}
        </p>
      </div>
      {unreadCount > 0 && (
        <button
          onClick={onMarkAllRead}
          className="text-xs font-semibold text-[#4a3728] bg-[#e0d8cf] px-3 py-1.5 rounded-lg hover:bg-[#4a3728] hover:text-[#f6ede8] transition-all duration-200"
        >
          Mark all read
        </button>
      )}
    </div>
  );
});

export default ActivityHeader;