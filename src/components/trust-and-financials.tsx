
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const SLIDES = [
  {
    tag: "Data-Driven Insights",
    title: "Smart Outcomes for ",
    titleHighlight: "Serious Investors.",
    description: "We leverage proprietary competitive intelligence models to ensure your property portfolio outperforms the 2026 market averages across all Australian capitals.",
    image: "https://picsum.photos/seed/expert-team/1200/900"
  },
  {
    tag: "Market Forecasting",
    title: "Predictive Analytics for ",
    titleHighlight: "High-Growth Zones.",
    description: "Our AI-driven engine identifies emerging opportunities before they hit the open market, giving our clients an unfair advantage in competitive sectors.",
    image: "https://picsum.photos/seed/market-analysis/1200/900"
  },
  {
    tag: "Portfolio Strategy",
    title: "Bespoke Wealth ",
    titleHighlight: "Preservation.",
    description: "From coastal estates to commercial hubs, our strategic advisory team designs multi-generational property legacies for the world's most discerning families.",
    image: "https://picsum.photos/seed/strategy-room/1200/900"
  }
];

export function TrustAndFinancials() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-24 px-6 md:px-12 bg-white space-y-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Module C: Competitive Intelligence (The Expert Edge) */}
        <section className="pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[3rem] overflow-hidden bg-[#111111] text-white shadow-2xl min-h-[600px]">
            {/* Image Section */}
            <div className="lg:col-span-7 relative h-[400px] lg:h-auto overflow-hidden group">
              {SLIDES.map((slide, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-1000",
                    activeSlide === idx ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Image 
                    src={slide.image} 
                    alt={slide.tag} 
                    fill 
                    className="object-cover opacity-80"
                    data-ai-hint="professional advisory"
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-transparent to-transparent hidden lg:block" />
            </div>

            {/* Content Section */}
            <div className="lg:col-span-5 p-12 md:p-20 flex flex-col justify-center space-y-8 relative">
              <div className="space-y-4 min-h-[280px]">
                <div className="overflow-hidden">
                  <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em] inline-block animate-fade-up">
                    {SLIDES[activeSlide].tag}
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif italic text-white leading-tight animate-fade-up">
                  {SLIDES[activeSlide].title}<span className="text-primary">{SLIDES[activeSlide].titleHighlight}</span>
                </h2>
                <p className="text-white/40 text-lg font-light leading-relaxed animate-fade-up">
                  {SLIDES[activeSlide].description}
                </p>
              </div>

              <div className="pt-8 flex flex-col gap-6">
                <Button variant="link" className="p-0 h-auto text-primary font-bold uppercase tracking-[0.2em] text-xs justify-start group">
                  EXPLORE THE EDGE <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </Button>
                
                <div className="flex gap-2 pt-4">
                  {SLIDES.map((_, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveSlide(i)}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        activeSlide === i ? "bg-primary w-6" : "bg-white/10 w-1.5 hover:bg-white/20"
                      )} 
                    />
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
