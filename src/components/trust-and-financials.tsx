
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Info, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATE_STAMP_DUTY_RATES: Record<string, number> = {
  NSW: 0.042, // Simplified estimate for NSW
  VIC: 0.055, // Simplified estimate for VIC
  QLD: 0.033, // Simplified estimate for QLD
  WA: 0.048,
  SA: 0.052,
};

export function TrustAndFinancials() {
  const [selectedState, setSelectedState] = useState("NSW");
  const purchasePrice = 1250000;
  
  const financialData = useMemo(() => {
    const stampDuty = purchasePrice * (STATE_STAMP_DUTY_RATES[selectedState] || 0.04);
    const legalFees = 2800;
    const registration = 1500;
    const deposit = purchasePrice * 0.05;
    const total = deposit + stampDuty + legalFees + registration;

    return {
      stampDuty,
      legalFees,
      registration,
      deposit,
      total
    };
  }, [selectedState, purchasePrice]);

  return (
    <div className="py-24 px-6 md:px-12 bg-white space-y-24">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Module B: Estimated Payment Transparency (The Financial Guide) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">Financial Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-none">
                Estimated Payment <br /><span className="text-primary italic">Transparency.</span>
              </h2>
              <p className="text-[#111111]/40 text-sm font-medium">Interactive upfront cost guide for the 2026 Australian market.</p>
            </div>

            <div className="space-y-1 bg-[#F8F9FA] rounded-3xl p-8 border border-black/5">
              <div className="flex items-center justify-between py-4 border-b border-black/5">
                <span className="text-sm font-medium text-[#111111]/60">Select State</span>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="w-[140px] h-9 border-none bg-white font-bold text-xs uppercase tracking-widest rounded-xl">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-none shadow-2xl">
                    <SelectItem value="NSW">New South Wales</SelectItem>
                    <SelectItem value="VIC">Victoria</SelectItem>
                    <SelectItem value="QLD">Queensland</SelectItem>
                    <SelectItem value="WA">Western Australia</SelectItem>
                    <SelectItem value="SA">South Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between items-center py-4 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#111111]/70">Purchase Price</span>
                  <Info className="w-3.5 h-3.5 text-black/20" />
                </div>
                <span className="font-bold text-[#111111]">${purchasePrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-black/5">
                <span className="text-sm font-medium text-[#111111]/70">Stamp Duty (Est. {selectedState})</span>
                <span className="font-bold text-[#111111]">${financialData.stampDuty.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-4 border-b border-black/5">
                <span className="text-sm font-medium text-[#111111]/70">Legal & Conveyancing (GST Inc.)</span>
                <span className="font-bold text-[#111111]">${financialData.legalFees.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-4">
                <span className="text-sm font-medium text-[#111111]/70">Security Deposit (Bond)</span>
                <span className="font-bold text-[#111111]">${financialData.deposit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="relative group lg:pt-12">
            <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] rotate-1 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative glass-morphism rounded-[2.5rem] p-12 md:p-16 border border-primary/20 shadow-2xl shadow-primary/10 flex flex-col items-center text-center backdrop-blur-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">Total Upfront Commitment</span>
              <p className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter mb-4">
                ${financialData.total.toLocaleString()}
              </p>
              <div className="w-24 h-1 bg-primary mb-8" />
              <p className="text-[#111111]/50 text-xs leading-relaxed font-light max-w-xs mb-10">
                Calculated sum of initial capital, estimated {selectedState} stamp duty, and professional advisory fees for the current fiscal cycle.
              </p>
              
              <button className="w-full py-5 bg-[#111111] text-white font-bold rounded-2xl hover:bg-primary transition-all active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center gap-3">
                Full Financial Breakdown <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Module C: Competitive Intelligence (The Expert Edge) */}
        <section className="pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden bg-[#111111] text-white shadow-2xl">
            <div className="lg:col-span-7 relative h-[400px] lg:h-auto overflow-hidden group">
              <Image 
                src="https://picsum.photos/seed/expert-team/1200/900" 
                alt="Advisory Team" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                data-ai-hint="professional advisory"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent hidden lg:block" />
            </div>

            <div className="lg:col-span-5 p-12 md:p-20 flex flex-col justify-center space-y-8 relative">
              <div className="space-y-4">
                <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em]">Data-Driven Insights</span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-white leading-tight">
                  Smart Outcomes for <span className="text-primary">Serious Investors.</span>
                </h2>
                <p className="text-white/40 text-lg font-light leading-relaxed">
                  We leverage proprietary competitive intelligence models to ensure your property portfolio outperforms the 2026 market averages across all Australian capitals.
                </p>
              </div>

              <div className="pt-8 flex flex-col gap-6">
                <Button variant="link" className="p-0 h-auto text-primary font-bold uppercase tracking-[0.2em] text-xs justify-start group">
                  EXPLORE THE EDGE <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <div className="flex gap-2 pt-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300",
                      i === 0 ? "bg-primary w-6" : "bg-white/10"
                    )} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
