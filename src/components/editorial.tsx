
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const EDITORIAL_SLIDES = [
  {
    tag: "Market Watch",
    title: "When is the Best Time to Invest in 2026?",
    description: "As the Australian property market enters a new phase of strategic stability, our lead economists analyze the multi-decade cycles defining the current landscape.",
    image: PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl || "https://picsum.photos/seed/editorial1/1200/900",
  },
  {
    tag: "Design Trends",
    title: "Biophilic Architecture: The New Luxury Standard.",
    description: "Discover how living walls and natural light optimization are redefining high-end residential value in Australia's metropolitan hubs.",
    image: "https://picsum.photos/seed/editorial2/1200/900",
  },
  {
    tag: "Global Report",
    title: "Capital Flight: Why Sydney is the Safe Haven.",
    description: "An in-depth look at international investment patterns and why the Australian premium market remains the top choice for global portfolios.",
    image: "https://picsum.photos/seed/editorial3/1200/900",
  }
];

export function Editorial() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % EDITORIAL_SLIDES.length);
    }, 5000); // 5 second interval for editorial readability

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Editorial Content (Left) */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            <div key={activeSlide} className="space-y-4 animate-fade-up">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Aether Intelligence</span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#111111] leading-[1.1] tracking-tight italic min-h-[120px] md:min-h-[180px]">
                {EDITORIAL_SLIDES[activeSlide].title.split(':').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}{i === 0 && EDITORIAL_SLIDES[activeSlide].title.includes(':') && <br />}
                  </React.Fragment>
                ))}
              </h2>
              <p className="text-lg text-[#111111]/60 font-light leading-relaxed min-h-[80px]">
                {EDITORIAL_SLIDES[activeSlide].description}
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-6">
              <button className="flex items-center gap-4 text-xs font-black text-[#111111] uppercase tracking-[0.2em] group w-fit">
                READ FULL ARTICLE <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex gap-2 pt-8">
                {EDITORIAL_SLIDES.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveSlide(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      activeSlide === i ? "bg-primary w-8" : "bg-black/10 w-2 hover:bg-black/20"
                    )} 
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Hero Block (Right) */}
          <div className="lg:col-span-7 relative aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden group shadow-2xl order-1 lg:order-2">
            {EDITORIAL_SLIDES.map((slide, idx) => (
              <div 
                key={idx}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  activeSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105"
                )}
              >
                <Image
                  src={slide.image}
                  alt={slide.tag}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-10 left-10">
                  <span className="px-4 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                    {slide.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
