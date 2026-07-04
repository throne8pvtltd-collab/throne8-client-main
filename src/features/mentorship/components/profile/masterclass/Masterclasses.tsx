import React from "react";
import { Sparkles, Clock, Users, Star, ArrowRight } from "lucide-react";

interface Masterclass {
  image: string;
  title: string;
  badge: string;
  duration: string;
  mentorImage: string;
  mentorName: string;
  mentorRole: string;
  description: string;
  enrolled: number;
  rating: number;
  price: number;
}

type MASTERCLASSES = Masterclass[];

interface MasterclassesProps {
  masterclasses: MASTERCLASSES;
  gradientColors: { start: string; end: string }[];
}

export default function Masterclasses({
  masterclasses,
  gradientColors,
}: MasterclassesProps) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#4a3728] mb-1">
            Master<span className="text-[#8b7355]">classes</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Learn from industry experts
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-18 mb-12">
          {masterclasses.map((mc, i) => (
            <div
              key={i}
              className="group relative w-72 rounded-[28px] overflow-hidden border border-[#ece7e2] shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer hover:-translate-y-2 mx-auto"
              style={{
                animationDelay: `${i * 100}ms`,
                background: `linear-gradient(135deg, ${gradientColors[i % gradientColors.length].start} 0%, ${gradientColors[i % gradientColors.length].end} 100%)`,
              }}
            >
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />

              {/* Floating Orb */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-700 animate-pulse-slow" />

              {/* Image */}
              <div className="h-[250px] overflow-hidden relative">
                <img
                  src={mc.image}
                  alt={mc.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <Sparkles className="w-3 h-3 text-[#8b7355]" />
                  <span className="text-[8px] font-black text-[#4a3728] uppercase tracking-wider">
                    {mc.badge}
                  </span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white" />
                  <span className="text-[9px] font-bold text-white">
                    {mc.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 relative z-10 bg-white/95 backdrop-blur-sm">
                <h4 className="text-base font-black mb-2 text-[#4a3728] group-hover:text-[#8b7355] transition-colors leading-tight">
                  {mc.title}
                </h4>

                {/* Mentor Info */}
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={mc.mentorImage}
                    alt={mc.mentorName}
                    className="w-7 h-7 rounded-full border-2 border-[#ece7e2] group-hover:border-[#8b7355] transition-colors"
                  />
                  <div>
                    <p className="text-[10px] font-bold text-[#4a3728]">
                      {mc.mentorName}
                    </p>
                    <p className="text-[8px] text-slate-500 font-medium">
                      {mc.mentorRole}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 mb-4 leading-relaxed font-medium line-clamp-2">
                  {mc.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f0edea]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#8b7355]" />
                      <span className="text-[10px] font-bold text-[#4a3728]">
                        {mc.enrolled}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#8b7355] fill-[#8b7355]" />
                      <span className="text-[10px] font-bold text-[#4a3728]">
                        {mc.rating}
                      </span>
                    </div>
                  </div>
                  <span className="text-base font-black text-[#4a3728]">
                    ₹{mc.price}
                  </span>
                </div>

                {/* CTA Button */}
                <button className="w-full py-2.5 bg-[#4a3728] text-white rounded-2xl text-[9px] font-black uppercase tracking-[3px] hover:bg-[#8b7355] transition-all duration-500 shadow-lg hover:shadow-xl group-hover:scale-105 flex items-center justify-center gap-2">
                  Enroll Now
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="w-full">
          <button className="group relative w-full py-4 bg-white text-[#4a3728] text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:gap-3 overflow-hidden">
            <span className="absolute inset-0 bg-[#f8f6f4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10 transition-colors duration-300">
              View All
            </span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}