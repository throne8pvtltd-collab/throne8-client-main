// mentorDashboard/components/AnalyticsPage.tsx
import React from "react"
import {
  BarChart3,
  ArrowUp,
  ArrowDown,
} from "lucide-react"

interface AnalyticsPageProps {
  // If you later want to pass real data from parent or context, you can add props here
  // For now it's static like your original code
}

export default function AnalyticsPage({}: AnalyticsPageProps) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#4a3728" }}>
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold" style={{ color: "#4a3728" }}>
            Analytics
          </h2>
          <p style={{ color: "#8a7a6a" }} className="text-sm">
            Track your growth
          </p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Profile Views",
            value: "1,234",
            change: "+12%",
            trend: "up",
          },
          {
            label: "Booking Rate",
            value: "68%",
            change: "+5%",
            trend: "up",
          },
          {
            label: "Avg Session Duration",
            value: "52 min",
            change: "-2%",
            trend: "down",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-[#e0d8cf]"
          >
            <p className="text-sm font-semibold mb-2" style={{ color: "#8a7a6a" }}>
              {stat.label}
            </p>
            <p className="text-4xl font-bold mb-3" style={{ color: "#4a3728" }}>
              {stat.value}
            </p>
            <div className="flex items-center gap-2">
              {stat.trend === "up" ? (
                <ArrowUp className="w-4 h-4 text-green-600" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-600" />
              )}
              <span
                className={`text-sm font-semibold ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two-column detailed sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Services */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#e0d8cf]">
          <h3 className="text-xl font-bold mb-6" style={{ color: "#4a3728" }}>
            Popular Services
          </h3>
          <div className="space-y-4">
            {[
              { name: "1-on-1 Mentoring", bookings: 45, percentage: 90 },
              { name: "Code Review", bookings: 28, percentage: 56 },
              { name: "Group Sessions", bookings: 32, percentage: 64 },
              { name: "Career Guidance", bookings: 43, percentage: 86 },
            ].map((service, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold" style={{ color: "#4a3728" }}>
                    {service.name}
                  </span>
                  <span className="text-sm font-bold" style={{ color: "#7a5c3e" }}>
                    {service.bookings} bookings
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#d8cec4]">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${service.percentage}%`,
                      backgroundColor: "#4a3728",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Earnings */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#e0d8cf]">
          <h3 className="text-xl font-bold mb-6" style={{ color: "#4a3728" }}>
            Monthly Earnings
          </h3>
          <div className="space-y-3">
            {[
              { month: "January", amount: "₹12,500", change: "+8%" },
              { month: "December", amount: "₹11,200", change: "+12%" },
              { month: "November", amount: "₹10,000", change: "+5%" },
              { month: "October", amount: "₹9,500", change: "+15%" },
            ].map((earning, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 rounded-xl bg-[#fbf7f3] border border-[#e0d8cf]"
              >
                <span className="font-semibold" style={{ color: "#4a3728" }}>
                  {earning.month}
                </span>
                <div className="text-right">
                  <p className="font-bold" style={{ color: "#7a5c3e" }}>
                    {earning.amount}
                  </p>
                  <p className="text-sm text-green-600">{earning.change}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}