import React from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface UpcomingMasterclassesProps {
  upcoming: any[];
}

export default function UpcomingMasterclasses({ upcoming }: UpcomingMasterclassesProps) {
  return (
    <section className="py-16 px-6 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#4a3728] mb-1">
            Upcoming <span className="text-[#8b7355]">Masterclasses</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Reserve your spot for live sessions
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-18">
          {upcoming.map((umc, i) => (
            <div
              key={i}
              className="group relative w-72 rounded-[28px] overflow-hidden border border-[#ece7e2] shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer hover:-translate-y-2 mx-auto bg-white"
              style={{
                animationDelay: `${i * 100}ms`,
              }}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />

              {/* Floating Orb */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow" />

              {/* Image */}
              <div className="h-[250px] overflow-hidden relative">
                <img
                  src={umc.image}
                  alt={umc.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Date & Time Badges */}
                <div className="absolute bottom-4 left-4 space-y-2">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                    <Calendar className="w-3.5 h-3.5 text-[#8b7355]" />
                    <span className="text-[10px] font-black text-[#4a3728]">
                      {umc.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                    <Clock className="w-3.5 h-3.5 text-[#8b7355]" />
                    <span className="text-[10px] font-black text-[#4a3728]">
                      {umc.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 relative z-10 bg-white">
                <h4 className="text-base font-black mb-3 text-[#4a3728] group-hover:text-[#8b7355] transition-colors leading-tight">
                  {umc.title}
                </h4>

                <p className="text-[10px] text-slate-500 font-bold mb-5 uppercase tracking-wider">
                  By {umc.mentorName} • {umc.mentorRole}
                </p>

                {/* Register Button */}
                <button className="w-full py-2.5 bg-[#4a3728] text-white rounded-2xl text-[9px] font-black uppercase tracking-[3px] hover:bg-[#8b7355] transition-all duration-500 shadow-lg hover:shadow-xl group-hover:scale-105 flex items-center justify-center gap-2">
                  Register Now
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Show All Button */}
        <div className="w-full mt-12">
          <button className="group relative w-full py-4 bg-white text-[#4a3728] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 overflow-hidden">
            <span className="absolute inset-0 bg-[#f8f6f4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 transition-colors duration-300">
              Show all
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}