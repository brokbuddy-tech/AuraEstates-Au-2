
"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function TrustAndFinancials() {
  return (
    <div className="py-24 px-6 md:px-12 bg-white space-y-24">
      <div className="max-w-7xl mx-auto">
        
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
