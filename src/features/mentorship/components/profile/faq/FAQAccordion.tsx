"use client";

import React from "react";
import { ChevronDown, MessageSquare, ArrowRight } from "lucide-react";
import { faqs as defaultFaqs } from "@/features/mentorship/constants/mentorData";
interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs?: FAQItem[]; // make optional and fallback to defaultFaqs
  openFaq: number | null;
  setOpenFaq: (index: number | null) => void;
}

export default function FAQAccordion({
  faqs = defaultFaqs,
  openFaq,
  setOpenFaq,
}: FAQAccordionProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-[#e0d8cf]">
          <MessageSquare className="w-4 h-4 text-[#7a5c3e]" />
          <span className="text-sm font-semibold text-[#4a3728]">
            Help Center
          </span>
        </div>
        <h2 className="text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#4a3728] to-[#7a5c3e]">
          FAQs
        </h2>
        <p className="text-[#8a7a6a]">Quick answers to common questions</p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <div key={i} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7a5c3e]/10 to-[#4a3728]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
            <div
              className="relative bg-white/80 backdrop-blur-xl border-2 border-[#e0d8cf] rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <p className="font-black text-[#4a3728] flex-1 pr-4">{f.q}</p>
                <div
                  className={`w-10 h-10 rounded-full bg-[#f6ede8] flex items-center justify-center border-2 border-[#e0d8cf] transition-transform duration-300 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-5 h-5 text-[#4a3728]" />
                </div>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? "max-h-40 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-[#8a7a6a] font-semibold">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="text-[#4a3728] font-bold hover:underline inline-flex items-center gap-2 hover:gap-3 transition-all">
          View All Questions <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}   