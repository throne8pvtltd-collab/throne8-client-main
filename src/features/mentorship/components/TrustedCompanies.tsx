'use client';

import React from "react";
import CompanyBigCard from "./CompanyBigCard";

interface TrustedCompaniesProps {
  companiesRow1: any[];
  companiesRow2: any[];
}

export default function TrustedCompanies({
  companiesRow1,
  companiesRow2,
}: TrustedCompaniesProps) {
  return (
    <section className="py-24 bg-[#FAF9F6] overflow-hidden border-y border-[#ece7e2]">
      {/* Header */}
      <div className="text-center mb-16 px-6">
        <span className="text-[10px] font-black uppercase tracking-[5px] text-[#8b7355] block mb-4">
          Trusted Partners
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#4a3728]">
          World-Class Companies
        </h2>
      </div>

      {/* ROW 1 */}
      <div className="relative mb-10 group">
        <div className="flex animate-marquee gap-8">
          {[...companiesRow1, ...companiesRow1, ...companiesRow1].map(
            (company, i) => (
              <CompanyBigCard key={i} company={company} />
            )
          )}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="relative group">
        <div className="flex animate-marquee-reverse gap-8">
          {[...companiesRow2, ...companiesRow2, ...companiesRow2].map(
            (company, i) => (
              <CompanyBigCard key={i} company={company} />
            )
          )}
        </div>
      </div>
    </section>
  );
}