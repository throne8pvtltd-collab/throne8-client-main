// mentorDashboard/components/ReviewsPage.tsx
import React from "react"
import { Star, Users, CheckCircle, Sparkles } from "lucide-react"

export default function ReviewsPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#4a3728" }}>
          <Star className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold" style={{ color: "#4a3728" }}>
            Reviews & Ratings
          </h2>
          <p style={{ color: "#8a7a6a" }} className="text-sm">
            What students say about you
          </p>
        </div>
      </div>

      {/* Rating Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Overall Rating", value: "4.8", icon: Star },
          { label: "Total Reviews", value: "156", icon: Users },
          { label: "Positive", value: "95%", icon: CheckCircle },
          { label: "5 Star", value: "142", icon: Sparkles },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all duration-300 border-2 border-[#e0d8cf]"
          >
            <div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: "#fbf7f3", border: "2px solid #e0d8cf" }}
            >
              <stat.icon className="w-8 h-8" style={{ color: "#7a5c3e" }} />
            </div>
            <div className="text-4xl font-bold mb-2" style={{ color: "#4a3728" }}>
              {stat.value}
            </div>
            <p style={{ color: "#8a7a6a" }} className="font-semibold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Reviews */}
      <div className="bg-white p-8 rounded-2xl shadow-xl space-y-4 border-2 border-[#e0d8cf]">
        <h3 className="text-xl font-bold mb-6" style={{ color: "#4a3728" }}>
          Recent Reviews
        </h3>

        {[
          {
            name: "Amit Sharma",
            rating: 5,
            comment:
              "Excellent mentor! Very knowledgeable and patient. Helped me land my dream job.",
            time: "2 days ago",
          },
          {
            name: "Priya Singh",
            rating: 5,
            comment:
              "Great experience. Learned a lot in just one session. Highly recommended!",
            time: "4 days ago",
          },
          {
            name: "Rahul Verma",
            rating: 4,
            comment:
              "Good mentoring, would recommend to others. Very professional approach.",
            time: "1 week ago",
          },
          {
            name: "Neha Gupta",
            rating: 5,
            comment:
              "Best mentor I have worked with. Clear explanations and practical examples.",
            time: "1 week ago",
          },
        ].map((review, idx) => (
          <div
            key={idx}
            className="p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-300"
            style={{ borderColor: "#e0d8cf", backgroundColor: "#fbf7f3" }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  style={{ backgroundColor: "#4a3728" }}
                >
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-bold" style={{ color: "#4a3728" }}>
                    {review.name}
                  </p>
                  <div className="flex mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-sm" style={{ color: "#8a7a6a" }}>
                {review.time}
              </span>
            </div>
            <p style={{ color: "#8a7a6a" }} className="leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}