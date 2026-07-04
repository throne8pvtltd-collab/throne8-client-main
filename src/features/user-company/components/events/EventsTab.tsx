// src/features/company/_components/tabs/EventsTab.tsx

'use client'
import { useAppSelector } from '@/core/store/store.hooks'

const STATUS_COLORS: Record<string, string> = {
    Upcoming: 'bg-emerald-100 text-emerald-700',
    Ongoing: 'bg-blue-100 text-blue-700',
    Completed: 'bg-gray-100 text-gray-500',
    Cancelled: 'bg-red-100 text-red-600',
};

const TYPE_COLORS: Record<string, string> = {
    Workshop: 'bg-purple-100 text-purple-700',
    Webinar: 'bg-sky-100 text-sky-700',
    Conference: 'bg-amber-100 text-amber-700',
    Meetup: 'bg-pink-100 text-pink-700',
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric',
    });
}

export function EventsTab() {
    const { items: list, loading: isLoading, error } = useAppSelector((s) => s.events);

    if (isLoading) {
        return (
            <div className="py-16 flex justify-center">
                <div className="w-5 h-5 border-2 border-[#d4c4b5] border-t-[#4a3728] rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return <p className="py-10 text-center text-red-500 text-sm">{error}</p>;
    }

    if (!list.length) {
        return (
            <div className="py-16 text-center text-[#6b5847]">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-medium">No events yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#2d1f14]">Events ({list.length})</h2>

            {list.map((event) => {
                const primaryMedia = event.media?.find((m: any) => m.isPrimary) || event.media?.[0];

                return (
                    <div
                        key={event._id}
                        className="bg-white rounded-2xl border border-[#e8ddd4] overflow-hidden hover:shadow-md transition-shadow"
                    >
                        {/* Cover Image */}
                        {primaryMedia?.url && (
                            <div className="relative h-44 w-full overflow-hidden">
                                <img
                                    src={primaryMedia.url}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Badges overlay */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[event.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {event.status}
                                    </span>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[event.type] || 'bg-gray-100 text-gray-600'}`}>
                                        {event.type}
                                    </span>
                                </div>
                            </div>
                        )}

                        <div className="p-4 sm:p-5">
                            {/* No image hone par badges yahan */}
                            {!primaryMedia?.url && (
                                <div className="flex gap-2 mb-3">
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[event.status] || 'bg-gray-100 text-gray-600'}`}>
                                        {event.status}
                                    </span>
                                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[event.type] || 'bg-gray-100 text-gray-600'}`}>
                                        {event.type}
                                    </span>
                                </div>
                            )}

                            <h3 className="text-base font-bold text-[#2d1f14] mb-1">{event.title}</h3>
                            <p className="text-sm text-[#6b5847] line-clamp-2 mb-4">{event.description}</p>

                            {/* Meta info grid */}
                            <div className="grid grid-cols-2 gap-3 text-xs text-[#6b5847]">
                                {/* Date */}
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{event.startDate ? formatDate(event.startDate) : event.date ? formatDate(event.date) : '—'} → {event.endDate ? formatDate(event.endDate) : '—'}</span>

                                </div>

                                {/* Mode */}
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                            d="M15 10l4.553-2.069A1 1 0 0121 8.82V15a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                                    </svg>
                                    <span>{event.mode}</span>
                                </div>

                                {/* Location */}
                                {event.location?.city && (
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{event.location.venue}, {event.location.city}</span>
                                    </div>
                                )}

                                {/* Capacity */}
                                {event.capacity && (
                                    <div className="flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{event.registeredCount ?? event.registered} / {event.capacity} registered</span>

                                    </div>
                                )}
                            </div>

                            {/* Company + Visibility footer */}
                            <div className="mt-4 pt-3 border-t border-[#f0e8e0] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {event.company?.media?.logo?.url && (
                                        <img
                                            src={event.company.media.logo.url}
                                            alt={event.company.companyName}
                                            className="w-6 h-6 rounded-full object-cover border border-[#e8ddd4]"
                                        />
                                    )}
                                    <span className="text-xs font-medium text-[#4a3728]">
                                        {event.company?.companyName}
                                    </span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${event.visibility === 'Public'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-yellow-50 text-yellow-600'
                                    }`}>
                                    {event.visibility}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}