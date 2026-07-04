import React from "react";
import { Rocket, Users, ArrowRight } from "lucide-react";

export default function LevelUpCTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="relative bg-gradient-to-br from-[#4a3728] to-[#7a5c3e] rounded-3xl p-16 text-center text-white shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-bold">Start Your Journey</span>
          </div>

          <h2 className="text-5xl font-black mb-4">Ready to Level Up?</h2>

          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto font-semibold">
            Join thousands transforming their careers with world-class
            mentorship
          </p>

          <button className="group relative bg-white text-[#4a3728] px-12 py-6 rounded-full font-black text-lg hover:scale-105 hover:shadow-2xl transition-all inline-flex items-center gap-3 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4a3728]/10 to-[#7a5c3e]/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            <span className="relative flex items-center gap-3">
              <Users className="w-6 h-6" />
              Get Started Now
              <ArrowRight className="w-6 h-6" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}