// mentorDashboard/components/CommunityPage.tsx
import React from "react"
import {Star, Users, Calendar } from "lucide-react"

export default function CommunityPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#4a3728" }}>
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold" style={{ color: "#4a3728" }}>
            Community
          </h2>
          <p style={{ color: "#8a7a6a" }} className="text-sm">
            Connect with other mentors
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Discussion Forums */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#e0d8cf]">
          <h3 className="text-xl font-bold mb-6" style={{ color: "#4a3728" }}>
            Discussion Forums
          </h3>
          <div className="space-y-4">
            {[
              { topic: "Best Practices for Mentoring", replies: 12, time: "2 hours ago" },
              { topic: "How to Handle Difficult Students", replies: 23, time: "5 hours ago" },
              { topic: "Pricing Strategies", replies: 18, time: "1 day ago" },
              { topic: "Building Your Personal Brand", replies: 31, time: "2 days ago" },
            ].map((forum, idx) => (
              <div
                key={idx}
                className="p-4 border-2 rounded-xl hover:shadow-lg cursor-pointer transition-all duration-300"
                style={{ borderColor: "#e0d8cf", backgroundColor: "#fbf7f3" }}
              >
                <p className="font-bold mb-1" style={{ color: "#4a3728" }}>
                  {forum.topic}
                </p>
                <p className="text-sm" style={{ color: "#8a7a6a" }}>
                  {forum.replies} replies · {forum.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Mentors */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#e0d8cf]">
          <h3 className="text-xl font-bold mb-6" style={{ color: "#4a3728" }}>
            Top Mentors
          </h3>
          <div className="space-y-4">
            {[
              { name: "Dr. Sharma", field: "Data Science", rating: 4.9, sessions: 250 },
              { name: "Prof. Gupta", field: "Machine Learning", rating: 4.8, sessions: 180 },
              { name: "Ms. Patel", field: "Web Development", rating: 4.8, sessions: 200 },
              { name: "Mr. Khan", field: "Mobile Development", rating: 4.7, sessions: 150 },
            ].map((mentor, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border-2 rounded-xl hover:shadow-lg transition-all duration-300"
                style={{ borderColor: "#e0d8cf", backgroundColor: "#fbf7f3" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                    style={{ backgroundColor: "#4a3728" }}
                  >
                    {mentor.name[0]}
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: "#4a3728" }}>
                      {mentor.name}
                    </p>
                    <p className="text-sm" style={{ color: "#8a7a6a" }}>
                      {mentor.field} · {mentor.sessions} sessions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold" style={{ color: "#4a3728" }}>
                    {mentor.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#e0d8cf]">
        <h3 className="text-xl font-bold mb-6" style={{ color: "#4a3728" }}>
          Upcoming Community Events
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Mentor Meet & Greet", date: "Jan 28, 2026", participants: 45 },
            { title: "Best Practices Workshop", date: "Feb 2, 2026", participants: 32 },
            { title: "Networking Session", date: "Feb 10, 2026", participants: 28 },
          ].map((event, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border-2 hover:shadow-lg transition-all"
              style={{ borderColor: "#e0d8cf", backgroundColor: "#fbf7f3" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#4a3728" }}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-2" style={{ color: "#4a3728" }}>
                {event.title}
              </h4>
              <p className="text-sm mb-3" style={{ color: "#8a7a6a" }}>
                {event.date}
              </p>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" style={{ color: "#7a5c3e" }} />
                <span className="text-sm font-semibold" style={{ color: "#7a5c3e" }}>
                  {event.participants} attending
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}