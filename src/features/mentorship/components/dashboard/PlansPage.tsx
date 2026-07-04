// mentorDashboard/components/PlansPage.tsx
import React from "react"
import { Award, CheckCircle } from "lucide-react"

export default function PlansPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: "#4a3728" }}>
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold" style={{ color: "#4a3728" }}>
            Subscription Plans
          </h2>
          <p style={{ color: "#8a7a6a" }} className="text-sm">
            Choose the best plan for you
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Basic",
            price: "₹999",
            features: [
              "Up to 10 sessions/month",
              "Basic analytics",
              "Email support",
              "Profile listing",
            ],
            popular: false,
          },
          {
            name: "Pro",
            price: "₹2,499",
            features: [
              "Unlimited sessions",
              "Advanced analytics",
              "Priority support",
              "Marketing tools",
              "Featured listing",
            ],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "₹4,999",
            features: [
              "Everything in Pro",
              "Custom branding",
              "API access",
              "Dedicated manager",
              "Premium badge",
            ],
            popular: false,
          },
        ].map((plan, idx) => (
          <div
            key={idx}
            className={`
              bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 border-2 relative
              ${plan.popular ? "border-[#4a3728] scale-105" : "border-[#e0d8cf]"}
            `}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span
                  className="px-4 py-1.5 rounded-full text-white text-sm font-bold shadow-lg"
                  style={{ backgroundColor: "#4a3728" }}
                >
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#4a3728" }}>
                {plan.name}
              </h3>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold" style={{ color: "#7a5c3e" }}>
                  {plan.price}
                </span>
                <span className="text-lg ml-1" style={{ color: "#8a7a6a" }}>
                  /mo
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span style={{ color: "#8a7a6a" }}>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`
                w-full py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300
                ${plan.popular ? "text-white bg-[#4a3728]" : "text-[#7a5c3e] bg-[#fbf7f3] border-2 border-[#e0d8cf]"}
              `}
            >
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}