
"use client";

import React from "react";
import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustAndFinancials() {
  const costs = [
    { label: "Purchase Price (Est.)", value: "$1,250,000" },
    { label: "Stamp Duty (NSW Est.)", value: "$52,490" },
    { label: "Conveyancing & Legal Fees", value: "$2,800" },
    { label: "Registration Fees", value: "$1,500" },
    { label: "Security Deposit (5%)", value: "$62,500" },
  ];

  const totalUpfront = "$119,290"; // Sum of Deposit + Duty + Fees

  return (
    <div className="space-y-12 py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section: Upfront Cost Transparency */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tighter mb-4">
                Upfront Cost <span className="text-primary italic">Transparency.</span>
              </h2>
              <p className="text-[#111111]/40 text-sm font-medium">Clear financial breakdown for the 2026 Australian market.</p>
            </div>

            <div className="space-y-4">
              {costs.map((cost, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-black/5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#111111]/70">{cost.label}</span>
                    <HelpCircle className="w-3.5 h-3.5 text-black/20 cursor-help" />
                  </div>
                  <span className="font-bold text-[#111111]">{cost.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative glass-morphism rounded-[2.5rem] p-12 md:p-16 border border-primary/20 shadow-2xl shadow-primary/10 flex flex-col items-center text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Estimated Initial Capital</span>
              <p className="text-6xl md:text-7xl font-black text-[#111111] tracking-tighter mb-4">
                {totalUpfront}
              </p>
              <div className="w-24 h-1 bg-primary mb-8" />
              <p className="text-[#111111]/50 text-sm leading-relaxed font-light max-w-xs">
                Includes deposit, estimated stamp duty for NSW, and professional fees. Based on current 2026 fiscal regulations.
              </p>
              
              <button className="mt-12 w-full py-5 bg-[#111111] text-white font-bold rounded-2xl hover:bg-primary transition-all active:scale-95 shadow-xl shadow-black/10">
                Detailed Financial Report
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
