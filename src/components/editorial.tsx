
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export function Editorial() {
  const editorialImage = PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl;

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Hero Block (Left) */}
          <div className="lg:col-span-7 relative aspect-[4/3] md:aspect-video rounded-[2.5rem] overflow-hidden group shadow-2xl">
            {editorialImage && (
              <Image
                src={editorialImage}
                alt="Editorial Hero"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <span className="px-4 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest">Market Watch</span>
            </div>
          </div>

          {/* Editorial Content (Right) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Aether Intelligence</span>
              <h2 className="text-5xl md:text-6xl font-serif text-[#111111] leading-[1.1] tracking-tight italic">
                When is the Best <br />Time to <span className="text-primary italic">Invest</span> in 2026?
              </h2>
              <p className="text-lg text-[#111111]/60 font-light leading-relaxed">
                As the Australian property market enters a new phase of strategic stability, our lead economists analyze the multi-decade cycles defining the current landscape. 
              </p>
            </div>

            <div className="pt-4 flex flex-col gap-6">
              <button className="flex items-center gap-4 text-xs font-black text-[#111111] uppercase tracking-[0.2em] group">
                READ FULL ARTICLE <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex gap-2 pt-8">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === 0 ? "bg-primary w-8" : "bg-black/10"
                  )} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
