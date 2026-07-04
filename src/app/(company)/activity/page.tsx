'use client';

import { useCallback, useMemo, useState } from 'react';
import ActivityHeader from '@/features/company/components/activity/ActivityHeader';
import ActivityFilters, { FilterValue } from '@/features/company/components/activity/ActivityFilters';
import ActivityList from '@/features/company/components/activity/ActivityList';
import { ActivityItemData } from '@/features/company/components/activity/ActivityItem';
import { useAppDispatch } from '@/core/store/store.hooks';
import { useAppSelector } from '@/core/store/store.hooks';
import { markRead } from '@/features/company/store/slices/activitySlice';
import { RICH_ACTIVITIES } from '@/features/company/constants/data';


export default function ActivityPage() {
  const dispatch = useAppDispatch();
  const sliceItems = useAppSelector(s => s.activity?.items ?? []);

  const [filter, setFilter] = useState<FilterValue>('all');
  const [postedResponses, setPostedResponses] = useState<Record<string, string>>({});

  const activities = useMemo<ActivityItemData[]>(() => {
    const readMap = Object.fromEntries((sliceItems ?? []).map(i => [i.id, i.read]));
    return RICH_ACTIVITIES.map(a => ({ ...a, read: readMap[a.id] ?? a.read }));
  }, [sliceItems]);

  const unreadCount = useMemo(() => activities.filter(a => !a.read).length, [activities]);

  const filtered = useMemo(() => {
    if (filter === 'all') return activities;
    if (filter === 'unread') return activities.filter(a => !a.read);
    return activities.filter(a => a.type === filter);
  }, [activities, filter]);

  const markReadHandler = useCallback((id: string) => dispatch(markRead(id)), [dispatch]);

  const markAllRead = useCallback(() => {
    activities.forEach(a => { if (!a.read) dispatch(markRead(a.id)); });
  }, [dispatch, activities]);

  // FIXED: stores the response and marks read
  const handleRespond = useCallback((id: string, text: string) => {
    setPostedResponses(prev => ({ ...prev, [id]: text }));
    dispatch(markRead(id));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <ActivityHeader unreadCount={unreadCount} onMarkAllRead={markAllRead} />
      <ActivityFilters active={filter} unreadCount={unreadCount} onChange={setFilter} />
      <ActivityList
        items={filtered}
        postedResponses={postedResponses}
        onMarkRead={markReadHandler}
        onRespond={handleRespond}
      />
    </div>
  );
}