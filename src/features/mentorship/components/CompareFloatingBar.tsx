"use client";

import React from "react";
import { X } from "lucide-react";

interface CompareFloatingBarProps {
  compareList: number[];
  toggleCompare: (id: number) => void;
  mentors: any[]; // MENTORS array for image lookup
}

export default function CompareFloatingBar({
  compareList,
  toggleCompare,
  mentors,
}: CompareFloatingBarProps) {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#4a3728] text-white px-10 py-5 rounded-full shadow-2xl z-[150] flex items-center gap-12 animate-slide-up">
      <div className="flex items-center gap-6 border-r border-white/10 pr-10">
        <p className="text-[10px] font-black uppercase tracking-[3px] text-[#8b7355]">
          Compare Area
        </p>
        <div className="flex -space-x-4">
          {compareList.map((id) => (
            <div
              key={id}
              className="w-11 h-11 rounded-full border-2 border-[#4a3728] overflow-hidden group relative"
            >
              <img
                src={mentors.find((m) => m.id === id)?.image}
                className="w-full h-full object-cover"
                alt="Mentor"
              />
              <button
                onClick={() => toggleCompare(id)}
                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className="bg-[#8b7355] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#4a3728] transition-all">
        Generate Comparison
      </button>
    </div>
  );
}