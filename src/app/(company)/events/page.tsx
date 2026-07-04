'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import EventCard from '../../../features/company/components/events/EventCard';
import { useAppDispatch, useAppSelector } from '@/core/store/store.hooks';
import { addEvent, deleteEvent, setEvents, setLoading, setError } from '@/features/company/store/slices/eventSlice';
import { Event } from '@/features/company/store/slices/eventSlice';
import CompanyService from '@/lib/api/company.service';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { EventStatusFilter, TABS } from '@/features/company/constants/data';

const CreateEventModal = dynamic(() => import('../../../features/company/modal/CreateEventModal'), {
  loading: () => null,
});

export type { Event };



// ✅ Backend response ko Event shape mein convert karo
function mapBackendEvent(e: any): Event {
  return {
    id: e._id,
    eventId: e.eventId,
    title: e.title,
    type: e.type || 'Event',
    mode: e.mode || 'Offline',
    status: e.status || 'Upcoming',
    startDate: e.startDate,
    date: e.startDate
      ? new Date(e.startDate).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
      : 'TBD',
    endDate: e.endDate,
    location: e.location?.venue || e.location?.city || 'TBD',
    capacity: e.capacity || 0,
    registered: e.registeredCount || 0,
    waitlist: 0,
    banner: e.media?.find((m: any) => m.isPrimary)?.url || e.banner,
    description: e.description,
    visibility: e.visibility,
    startTimeOfDay: e.startTimeOfDay,
    agenda: e.agenda,
    speakers: e.speakers,
  };
}

export default function EventsPage() {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { userProfileData, loadProfile } = useProfile();
  const events = useAppSelector(s => s.events?.items ?? []);
  const loading = useAppSelector(s => s.events?.loading ?? false);

  const [tab, setTab] = useState<EventStatusFilter>('all');
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => { if (user) loadProfile(); }, [user]);

  const companyId = userProfileData?.companyId ?? null;
  // console.log("aa gayi company id=> >>", companyId)

  // ✅ Events fetch on mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        dispatch(setLoading(true));
        const res = await CompanyService.getAllEvents(1, 20);
        // Response structure: res.data.events ya res.data.items
        const raw = res?.data?.events || res?.data?.items || res?.data || [];
        const mapped = Array.isArray(raw) ? raw.map(mapBackendEvent) : [];
        dispatch(setEvents(mapped));
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to load events'));
      }
    };
    fetchEvents();
  }, [dispatch]);

  const filtered = useMemo(
    () => tab === 'all' ? events : events.filter(e => e.status === tab),
    [tab, events]
  );

  const stats = useMemo(() => ({
    upcoming: events.filter(e => e.status === 'Upcoming').length,
    ongoing: events.filter(e => e.status === 'Ongoing').length,
    totalReg: events.reduce((a, e) => a + (e.registered || 0), 0),
    waitlist: events.reduce((a, e) => a + (e.waitlist || 0), 0),
  }), [events]);

  const openCreate = useCallback(() => setShowCreate(true), []);
  const closeCreate = useCallback(() => setShowCreate(false), []);

  // ✅ Event add hone par Redux update
  const handleAdd = useCallback((e: Event) => {
    dispatch(addEvent(e));
  }, [dispatch]);

  const handleDelete = useCallback((id: string) => dispatch(deleteEvent(id)), [dispatch]);

  const STAT_ITEMS = [
    { label: 'Upcoming', value: stats.upcoming, color: 'text-blue-600' },
    { label: 'Ongoing', value: stats.ongoing, color: 'text-green-600' },
    { label: 'Total Registered', value: stats.totalReg, color: 'text-[#4a3728]' },
    { label: 'On Waitlist', value: stats.waitlist, color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4a3728]">Events</h1>
          <p className="text-sm text-[#4a3728]/60 mt-0.5">Manage conferences, webinars & meetups</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-[#4a3728] text-[#f6ede8] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#6b4e3d] transition-colors shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {STAT_ITEMS.map(s => (
          <div key={s.label} className="bg-[#f6ede8]/80 border border-[#e0d8cf] rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#4a3728]/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#e0d8cf]/50 rounded-xl p-1 w-fit flex-wrap">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-200
              ${tab === t ? 'bg-[#4a3728] text-[#f6ede8]' : 'text-[#4a3728]/60 hover:text-[#4a3728]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-[#4a3728]/50 text-sm">Loading events...</div>
      )}

      {/* Events Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center py-10 text-[#4a3728]/40 text-sm">
              No events found
            </div>
          ) : (
            filtered.map(event => (
              <EventCard key={event.id} event={event} onDelete={handleDelete} />
            ))
          )}
        </div>
      )}

      {showCreate && companyId && (
        <CreateEventModal
          onClose={closeCreate}
          onAdd={handleAdd}
          companyId={companyId} 
        />
      )}
    </div>
  );
}