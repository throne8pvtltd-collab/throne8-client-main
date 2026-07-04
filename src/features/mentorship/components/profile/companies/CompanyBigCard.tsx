import React from "react";

interface CompanyBigCardProps {
  company: {
    name: string;
    color: string;
    svg: string;
  };
}

export default function CompanyBigCard({ company }: CompanyBigCardProps) {
  return (
    <div className="flex-shrink-0 w-[190px] h-[115px] group/card relative">
      {/* Soft Glow */}
      <div
        className="absolute inset-0 rounded-[32px] blur-2xl opacity-0 group-hover/card:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: company.color }}
      />
      <div className="relative h-full w-full flex flex-col items-center justify-center bg-white border border-[#ece7e2] rounded-[32px] transition-all duration-700 hover:scale-105 group-hover/card:-translate-y-3 group-hover/card:shadow-xl group-hover/card:border-[#4a3728]/20">
        {/* Real Logo Symbol */}
        <div
          className="w-9 h-9 mb-3 transition-transform duration-500 group-hover/card:scale-110"
          style={{ color: company.color }}
          dangerouslySetInnerHTML={{ __html: company.svg }}
        />
        {/* Company Name */}
        <p className="text-[12px] font-black text-[#4a3728] tracking-widest uppercase">
          {company.name}
        </p>
        {/* Brand Underline */}
        <div
          className="w-0 group-hover/card:w-8 h-[2px] transition-all duration-500 mt-1.5"
          style={{ backgroundColor: company.color }}
        />
      </div>
    </div>
  );
}