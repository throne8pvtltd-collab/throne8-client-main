// mentorDashboard/components/BookingsPage.tsx
import React, { useEffect, useState } from "react"
import {
  Calendar,
  Clock,
  CheckCircle,
  Filter,
  Search,
  Eye,
  Edit,
  Download,
  Star,
} from "lucide-react"
import SessionService from "@/lib/api/session.service";

interface BookingProps {
  mentorData: any;
}

export default function BookingsPage({ mentorData }: BookingProps) {
  const [bookingTab, setBookingTab] = useState('upcoming');
  const [sessions, setSessions] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!mentorData?.mentorId) return;
    setLoadingData(true);
    SessionService.getAllSessionsFromDB()
      .then((res) => {
        const all = res.data as any[];
        const filtered = all.filter(
          (s) => s.mentorId === mentorData.mentorId && (s.bookings?.length ?? 0) > 0
        );
        setSessions(filtered);
      })
      .catch(console.error)
      .finally(() => setLoadingData(false));
  }, [mentorData?.mentorId]);

  const upcomingBookings = sessions.filter((s) =>
    s.bookings?.some((b: any) => b.status === 'pending' || b.status === 'confirmed')
  );
  const completedBookings = sessions.filter((s) =>
    s.bookings?.some((b: any) => b.status === 'completed')
  );

  const currentBookings = bookingTab === 'upcoming' ? upcomingBookings : completedBookings;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });

  const formatTime = (session: any) =>
    session.slotTime ??
    new Date(session.scheduledAt).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit"
    });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#4a3728' }}>
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold" style={{ color: '#4a3728' }}>Bookings</h2>
            <p style={{ color: '#8a7a6a' }} className="text-sm">Manage your sessions</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all" style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e', border: '2px solid #e0d8cf' }}>
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all" style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e', border: '2px solid #e0d8cf' }}>
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {bookingTab === 'upcoming' ? [
          { label: 'Total Upcoming', value: upcomingBookings.length.toString(), icon: Calendar, color: '#4a3728' },
          { label: 'Confirmed', value: upcomingBookings.filter(b => b.status === 'confirmed').length.toString(), icon: CheckCircle, color: '#10b981' },
          { label: 'Pending', value: upcomingBookings.filter(b => b.status === 'pending').length.toString(), icon: Clock, color: '#f59e0b' },
          {
            label: 'This Week', value: upcomingBookings.filter(b => {
              const d = new Date(b.scheduledAt);
              const now = new Date();
              const weekEnd = new Date();
              weekEnd.setDate(now.getDate() + 7);
              return d >= now && d <= weekEnd;
            }).length.toString(), icon: Calendar, color: '#7a5c3e'
          }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300" style={{ border: '2px solid #e0d8cf' }}>
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              <span className="text-3xl font-bold" style={{ color: '#4a3728' }}>{stat.value}</span>
            </div>
            <p className="font-semibold" style={{ color: '#8a7a6a' }}>{stat.label}</p>
          </div>
        )) : [
          { label: 'Total Completed', value: completedBookings.length.toString(), icon: CheckCircle, color: '#10b981' },
          {
            label: 'This Month', value: completedBookings.filter(b => {
              const d = new Date(b.scheduledAt);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length.toString(), icon: Calendar, color: '#4a3728'
          },
          { label: 'Avg Rating', value: 'N/A', icon: Star, color: '#f59e0b' },
          {
            label: 'Total Hours', value: completedBookings.reduce((acc, b) => acc + (b.duration ?? 0), 0) > 0
              ? Math.round(completedBookings.reduce((acc, b) => acc + (b.duration ?? 0), 0) / 60).toString()
              : '0', icon: Clock, color: '#7a5c3e'
          }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300" style={{ border: '2px solid #e0d8cf' }}>
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              <span className="text-3xl font-bold" style={{ color: '#4a3728' }}>{stat.value}</span>
            </div>
            <p className="font-semibold" style={{ color: '#8a7a6a' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="bg-white p-2 rounded-2xl shadow-xl" style={{ border: '2px solid #e0d8cf' }}>
        <div className="flex gap-2">
          <button
            onClick={() => setBookingTab('upcoming')}
            className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${bookingTab === 'upcoming' ? 'shadow-lg scale-105' : 'hover:shadow-md'}`}
            style={{
              backgroundColor: bookingTab === 'upcoming' ? '#4a3728' : '#fbf7f3',
              color: bookingTab === 'upcoming' ? '#fff' : '#7a5c3e'
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6" />
              <span>Upcoming</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${bookingTab === 'upcoming' ? 'bg-white' : 'bg-gray-200'}`}
                style={{ color: bookingTab === 'upcoming' ? '#4a3728' : '#7a5c3e' }}>
                {upcomingBookings.length}
              </span>
            </div>
          </button>

          <button
            onClick={() => setBookingTab('completed')}
            className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${bookingTab === 'completed' ? 'shadow-lg scale-105' : 'hover:shadow-md'}`}
            style={{
              backgroundColor: bookingTab === 'completed' ? '#4a3728' : '#fbf7f3',
              color: bookingTab === 'completed' ? '#fff' : '#7a5c3e'
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <span>Completed</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${bookingTab === 'completed' ? 'bg-white' : 'bg-gray-200'}`}
                style={{ color: bookingTab === 'completed' ? '#4a3728' : '#7a5c3e' }}>
                {completedBookings.length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '2px solid #e0d8cf' }}>
        <div className="overflow-x-auto">

          {/* Loading state */}
          {loadingData ? (
            <div className="flex items-center justify-center py-16" style={{ color: '#8a7a6a' }}>
              <Clock className="w-6 h-6 animate-spin mr-3" />
              <span className="text-lg font-semibold">Loading bookings...</span>
            </div>
          ) : currentBookings.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-16" style={{ color: '#8a7a6a' }}>
              <Calendar className="w-12 h-12 mb-4" style={{ color: '#d8cec4' }} />
              <p className="text-lg font-semibold">No {bookingTab} bookings found</p>
              <p className="text-sm mt-1">Bookings will appear here once mentees book your sessions</p>
            </div>
          ) : (
            <table className="w-full">
              <thead style={{ backgroundColor: '#fbf7f3' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Student</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Service</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Time</th>
                  {bookingTab === 'completed' && (
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Rating</th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#e0d8cf' }}>
                {currentBookings.map((booking, idx) => (
                  <tr key={booking.sessionId ?? idx} className="transition-colors duration-200 hover:bg-opacity-50"
                    style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#fbf7f3' }}>

                    {/* Student */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                          style={{ backgroundColor: '#4a3728' }}>
                          {booking.bookedMenteeName?.[0]?.toUpperCase() ?? booking.bookings?.[0]?.menteeId?.[0]?.toUpperCase() ?? "?"}
                        </div>
                        <span className="font-semibold" style={{ color: '#4a3728' }}>
                          {booking.bookedMenteeName ?? `Mentee (${booking.bookings?.[0]?.menteeId?.slice(0, 8) ?? "Unknown"})`}
                        </span>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-6 py-4" style={{ color: '#8a7a6a' }}>
                      {booking.title ?? booking.sessionType ?? "—"}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4" style={{ color: '#8a7a6a' }}>
                      {formatDate(booking.scheduledAt)}
                    </td>

                    {/* Time */}
                    <td className="px-6 py-4" style={{ color: '#8a7a6a' }}>
                      {formatTime(booking)}
                    </td>

                    {/* Rating (completed only) */}
                    {bookingTab === 'completed' && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-gray-300" />
                          ))}
                          <span className="ml-2 font-bold" style={{ color: '#8a7a6a' }}>N/A</span>
                        </div>
                      </td>
                    )}

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:shadow-md transition-all"
                          style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e' }}
                          title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {bookingTab === 'upcoming' ? (
                          <button className="p-2 rounded-lg hover:shadow-md transition-all"
                            style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e' }}
                            title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        ) : (
                          <button className="p-2 rounded-lg hover:shadow-md transition-all"
                            style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e' }}
                            title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}









// // mentorDashboard/components/BookingsPage.tsx
// import React, { useState } from "react"
// import {
//   Calendar,
//   Clock,
//   CheckCircle,
//   X,
//   Filter,
//   Search,
//   Eye,
//   Edit,
//   Download,
//   Star,
// } from "lucide-react"

// interface BookingProps {
//   mentorData: any;
// }

// export default function BookingsPage({ mentorData }: BookingProps) {
//   const [bookingTab, setBookingTab] = useState('upcoming');

//   const upcomingBookings = [
//     { name: 'Amit Sharma', service: '1-on-1 Mentoring', date: '24 Jan 2026', time: '10:00 AM', status: 'Confirmed' },
//     { name: 'Priya Singh', service: 'Code Review', date: '25 Jan 2026', time: '2:00 PM', status: 'Pending' },
//     { name: 'Rahul Verma', service: 'Group Session', date: '26 Jan 2026', time: '4:00 PM', status: 'Confirmed' },
//     { name: 'Neha Gupta', service: 'Career Guidance', date: '27 Jan 2026', time: '11:00 AM', status: 'Pending' },
//     { name: 'Suresh Kumar', service: '1-on-1 Mentoring', date: '28 Jan 2026', time: '3:00 PM', status: 'Confirmed' }
//   ];

//   const completedBookings = [
//     { name: 'Vikram Rao', service: 'Code Review', date: '15 Jan 2026', time: '10:00 AM', status: 'Completed', rating: 5 },
//     { name: 'Anjali Mehta', service: '1-on-1 Mentoring', date: '16 Jan 2026', time: '2:00 PM', status: 'Completed', rating: 4 },
//     { name: 'Deepak Singh', service: 'Group Session', date: '17 Jan 2026', time: '11:00 AM', status: 'Completed', rating: 5 },
//     { name: 'Kavita Sharma', service: 'Career Guidance', date: '18 Jan 2026', time: '4:00 PM', status: 'Completed', rating: 5 },
//     { name: 'Ravi Kumar', service: 'Code Review', date: '19 Jan 2026', time: '1:00 PM', status: 'Completed', rating: 4 },
//     { name: 'Sonia Gupta', service: '1-on-1 Mentoring', date: '20 Jan 2026', time: '3:00 PM', status: 'Completed', rating: 5 }
//   ];

//   const currentBookings = bookingTab === 'upcoming' ? upcomingBookings : completedBookings;
//   return (
//     <div className="space-y-8 animate-fadeIn">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#4a3728' }}>
//             <Calendar className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold" style={{ color: '#4a3728' }}>Bookings</h2>
//             <p style={{ color: '#8a7a6a' }} className="text-sm">Manage your sessions</p>
//           </div>
//         </div>
//         <div className="flex gap-3">
//           <button className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all" style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e', border: '2px solid #e0d8cf' }}>
//             <Filter className="w-4 h-4" />
//             Filter
//           </button>
//           <button className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all" style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e', border: '2px solid #e0d8cf' }}>
//             <Search className="w-4 h-4" />
//             Search
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {bookingTab === 'upcoming' ? [
//           { label: 'Total Upcoming', value: upcomingBookings.length.toString(), icon: Calendar, color: '#4a3728' },
//           { label: 'Confirmed', value: upcomingBookings.filter(b => b.status === 'Confirmed').length.toString(), icon: CheckCircle, color: '#10b981' },
//           { label: 'Pending', value: upcomingBookings.filter(b => b.status === 'Pending').length.toString(), icon: Clock, color: '#f59e0b' },
//           { label: 'This Week', value: '3', icon: Calendar, color: '#7a5c3e' }
//         ].map((stat, idx) => (
//           <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300" style={{ border: '2px solid #e0d8cf' }}>
//             <div className="flex items-center justify-between mb-4">
//               <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
//               <span className="text-3xl font-bold" style={{ color: '#4a3728' }}>{stat.value}</span>
//             </div>
//             <p className="font-semibold" style={{ color: '#8a7a6a' }}>{stat.label}</p>
//           </div>
//         )) : [
//           { label: 'Total Completed', value: completedBookings.length.toString(), icon: CheckCircle, color: '#10b981' },
//           { label: 'This Month', value: '6', icon: Calendar, color: '#4a3728' },
//           { label: 'Avg Rating', value: '4.7', icon: Star, color: '#f59e0b' },
//           { label: 'Total Hours', value: '45', icon: Clock, color: '#7a5c3e' }
//         ].map((stat, idx) => (
//           <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300" style={{ border: '2px solid #e0d8cf' }}>
//             <div className="flex items-center justify-between mb-4">
//               <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
//               <span className="text-3xl font-bold" style={{ color: '#4a3728' }}>{stat.value}</span>
//             </div>
//             <p className="font-semibold" style={{ color: '#8a7a6a' }}>{stat.label}</p>
//           </div>
//         ))}
//       </div>
//       <div className="bg-white p-2 rounded-2xl shadow-xl" style={{ border: '2px solid #e0d8cf' }}>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setBookingTab('upcoming')}
//             className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${bookingTab === 'upcoming' ? 'shadow-lg scale-105' : 'hover:shadow-md'
//               }`}
//             style={{
//               backgroundColor: bookingTab === 'upcoming' ? '#4a3728' : '#fbf7f3',
//               color: bookingTab === 'upcoming' ? '#fff' : '#7a5c3e'
//             }}
//           >
//             <div className="flex items-center justify-center gap-3">
//               <Clock className="w-6 h-6" />
//               <span>Upcoming</span>
//               <span className={`px-3 py-1 rounded-full text-sm font-bold ${bookingTab === 'upcoming' ? 'bg-white text-black' : 'bg-gray-200'
//                 }`} style={{ color: bookingTab === 'upcoming' ? '#4a3728' : '#7a5c3e' }}>
//                 {upcomingBookings.length}
//               </span>
//             </div>
//           </button>

//           <button
//             onClick={() => setBookingTab('completed')}
//             className={`flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${bookingTab === 'completed' ? 'shadow-lg scale-105' : 'hover:shadow-md'
//               }`}
//             style={{
//               backgroundColor: bookingTab === 'completed' ? '#4a3728' : '#fbf7f3',
//               color: bookingTab === 'completed' ? '#fff' : '#7a5c3e'
//             }}
//           >
//             <div className="flex items-center justify-center gap-3">
//               <CheckCircle className="w-6 h-6" />
//               <span>Completed</span>
//               <span className={`px-3 py-1 rounded-full text-sm font-bold ${bookingTab === 'completed' ? 'bg-white text-black' : 'bg-gray-200'
//                 }`} style={{ color: bookingTab === 'completed' ? '#4a3728' : '#7a5c3e' }}>
//                 {completedBookings.length}
//               </span>
//             </div>
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ border: '2px solid #e0d8cf' }}>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead style={{ backgroundColor: '#fbf7f3' }}>
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Student</th>
//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Service</th>
//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Date</th>
//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Time</th>
//                 {bookingTab === 'completed' && (
//                   <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>
//                     Rating
//                   </th>
//                 )}
//                 <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#4a3728' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y" style={{ borderColor: '#e0d8cf' }}>
//               {currentBookings.map((booking, idx) => (
//                 <tr key={idx} className="transition-colors duration-200 hover:bg-opacity-50" style={{ backgroundColor: idx % 2 === 0 ? '#fff' : '#fbf7f3' }}>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md" style={{ backgroundColor: '#4a3728' }}>
//                         {booking.name[0]}
//                       </div>
//                       <span className="font-semibold" style={{ color: '#4a3728' }}>{booking.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4" style={{ color: '#8a7a6a' }}>{booking.service}</td>
//                   <td className="px-6 py-4" style={{ color: '#8a7a6a' }}>{booking.date}</td>
//                   <td className="px-6 py-4" style={{ color: '#8a7a6a' }}>{booking.time}</td>
//                   {bookingTab === 'completed' && (
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`w-4 h-4 ${i < booking.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
//                           />
//                         ))}
//                         <span className="ml-2 font-bold" style={{ color: '#4a3728' }}>{booking.rating}.0</span>
//                       </div>
//                     </td>
//                   )}
//                   <td className="px-6 py-4">
//                     <div className="flex gap-2">
//                       <button className="p-2 rounded-lg hover:shadow-md transition-all" style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e' }}>
//                         <Eye className="w-4 h-4" />
//                       </button>
//                       {bookingTab === 'upcoming' ? (
//                         <button className="p-2 rounded-lg hover:shadow-md transition-all" style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e' }}>
//                           <Edit className="w-4 h-4" />
//                         </button>
//                       ) : (
//                         <button className="p-2 rounded-lg hover:shadow-md transition-all" style={{ backgroundColor: '#fbf7f3', color: '#7a5c3e' }}>
//                           <Download className="w-4 h-4" />
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }