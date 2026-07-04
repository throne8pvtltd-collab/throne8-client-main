// mentorDashboard/components/TrustScorePage.tsx
import React from "react"
import { Shield } from "lucide-react"

export default function TrustScorePage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#4a3728" }}>
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold" style={{ color: "#4a3728" }}>
            Trust Score
          </h2>
          <p style={{ color: "#8a7a6a" }} className="text-sm">
            Your credibility score
          </p>
        </div>
      </div>

      {/* Main Score Card */}
      <div className="bg-white p-12 rounded-2xl shadow-xl text-center border-2 border-[#e0d8cf]">
        <div
          className="inline-block p-12 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: "#4a3728" }}
        >
          <span className="text-7xl font-bold text-white">92</span>
        </div>
        <p className="text-2xl font-bold mt-6" style={{ color: "#4a3728" }}>
          Excellent Trust Score
        </p>
        <p className="mt-2" style={{ color: "#8a7a6a" }}>
          You're in the top 10% of mentors!
        </p>
      </div>

      {/* Two-column breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Breakdown */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#e0d8cf]">
          <h3 className="font-bold text-xl mb-6" style={{ color: "#4a3728" }}>
            Score Breakdown
          </h3>

          {[
            { label: "Profile Completeness", score: 95 },
            { label: "Response Rate", score: 98 },
            { label: "Session Completion", score: 88 },
            { label: "Student Satisfaction", score: 92 },
          ].map((item, idx) => (
            <div key={idx} className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold" style={{ color: "#8a7a6a" }}>
                  {item.label}
                </span>
                <span className="text-sm font-bold" style={{ color: "#4a3728" }}>
                  {item.score}%
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#d8cec4]">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: "#4a3728",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* How to Improve */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#e0d8cf]">
          <h3 className="font-bold text-xl mb-6" style={{ color: "#4a3728" }}>
            How to Improve
          </h3>

          <ul className="space-y-4">
            {[
              "Complete 5 more sessions this month",
              "Respond to inquiries within 2 hours",
              "Get 3 more 5-star reviews",
              "Update your profile with recent achievements",
            ].map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl hover:shadow-md transition-all duration-300 bg-[#fbf7f3] border border-[#e0d8cf]"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-[#7a5c3e] text-white text-xs font-bold"
                >
                  {idx + 1}
                </div>
                <span style={{ color: "#8a7a6a" }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}