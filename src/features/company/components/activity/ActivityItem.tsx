import { memo, useCallback } from 'react';
import type { ActivityType, ReviewData } from '../../types';
import ReviewCard from './ReviewCard';

export interface ActivityItemData {
  id: string;
  type: ActivityType;
  user: string;
  avatar: string;
  color: string;
  action: string;
  time: string;
  read: boolean;
  review?: ReviewData;
}

const TYPE_ICONS: Record<ActivityType, string> = {
  follow:  'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  like:    'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  comment: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  share:   'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z',
  apply:   'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  review:  'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  event:   'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
};

interface Props {
  item: ActivityItemData;
  postedResponse?: string;
  onMarkRead: (id: string) => void;
  onRespond: (id: string, text: string) => void;
}

// memo — without this, typing in the review response textarea causes ALL
// activity items to re-render because postedResponses state lives in the parent
const ActivityItem = memo(function ActivityItem({ item, postedResponse, onMarkRead, onRespond }: Props) {
  const handleClick = useCallback(() => {
    if (item.type !== 'review') onMarkRead(item.id);
  }, [item.id, item.type, onMarkRead]);

  return (
    <div className={`rounded-2xl border transition-all duration-200
      ${!item.read ? 'bg-[#4a3728]/5 border-[#4a3728]/20' : 'bg-[#f6ede8]/60 border-[#e0d8cf]'}`}>

      {/* Row */}
      <div
        className={`flex items-start gap-4 p-4 ${item.type !== 'review' ? 'cursor-pointer hover:opacity-80' : ''}`}
        onClick={handleClick}
      >
        <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
          {item.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#4a3728]">
            <span className="font-semibold">{item.user}</span>
            <span className="text-[#4a3728]/70"> {item.action}</span>
          </p>
          <p className="text-xs text-[#4a3728]/40 mt-0.5">{item.time}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-[#e0d8cf] rounded-lg flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#4a3728]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={TYPE_ICONS[item.type]} />
            </svg>
          </div>
          {!item.read && <div className="w-2 h-2 bg-[#4a3728] rounded-full" />}
        </div>
      </div>

      {/* Inline review — only for review type */}
      {item.type === 'review' && item.review && (
        <ReviewCard
          itemId={item.id}
          review={item.review}
          postedResponse={postedResponse}
          onMarkRead={onMarkRead}
          onRespond={onRespond}
        />
      )}
    </div>
  );
});

export default ActivityItem;