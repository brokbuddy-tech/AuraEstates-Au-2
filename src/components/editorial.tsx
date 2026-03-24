
"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const NEWS = [
  {
    title: "The 5 Suburbs Ready to Explode in Value This Year",
    date: "2 hours ago",
    img: "https://picsum.photos/seed/n1/100/100"
  },
  {
    title: "How to Design a Kitchen That Adds $50k to Your Home",
    date: "1 day ago",
    img: "https://picsum.photos/seed/n2/100/100"
  },
  {
    title: "Mortgage Rate Update: What It Means for First Home Buyers",
    date: "3 days ago",
    img: "https://picsum.photos/seed/n3/100/100"
  }
];

export function Editorial() {
  const editorialImage = PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl;

  return (
    <section className="relative h-[600px] w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {editorialImage && (
          <Image
            src={editorialImage}
            alt="Editorial Background"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 flex justify-end">
        <div className="w-full max-w-lg glass-morphism rounded-3xl p-10 animate-fade-up">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Insights</span>
          <h2 className="text-4xl font-bold text-white mb-8 leading-tight">Latest Real Estate News & Trends</h2>
          
          <div className="space-y-6">
            {NEWS.map((item, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer border-b border-white/5 pb-6 last:border-0 last:pb-0">
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <span className="text-white/30 text-xs">{item.date}</span>
                </div>
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                   <Image src={item.img} alt="" fill className="object-cover" />
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 flex items-center gap-2 text-primary font-bold group">
            View all stories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
