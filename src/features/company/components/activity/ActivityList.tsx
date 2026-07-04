import { memo } from 'react';
import ActivityItem, { ActivityItemData } from './ActivityItem';

interface Props {
  items: ActivityItemData[];
  postedResponses: Record<string, string>;
  onMarkRead: (id: string) => void;
  onRespond: (id: string, text: string) => void;
}

const ActivityList = memo(function ActivityList({ items, postedResponses, onMarkRead, onRespond }: Props) {
  if (!items.length) {
    return (
      <div className="text-center py-12 text-[#4a3728]/40 text-sm">No activity here yet.</div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <ActivityItem
          key={item.id}
          item={item}
          postedResponse={postedResponses[item.id]}
          onMarkRead={onMarkRead}
          onRespond={onRespond}
        />
      ))}
    </div>
  );
});

export default ActivityList;