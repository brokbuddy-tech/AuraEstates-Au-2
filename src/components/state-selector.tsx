
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const STATES = [
  {
    name: "New South Wales",
    city: "Sydney",
    image: "https://picsum.photos/seed/sydney-cbd/800/600",
    href: "/buy?region=nsw",
    count: "1,240+ Properties"
  },
  {
    name: "Victoria",
    city: "Melbourne",
    image: "https://picsum.photos/seed/melbourne-lane/800/600",
    href: "/buy?region=vic",
    count: "980+ Properties"
  },
  {
    name: "Queensland",
    city: "Brisbane",
    image: "https://picsum.photos/seed/brisbane-river/800/600",
    href: "/buy?region=qld",
    count: "750+ Properties"
  },
  {
    name: "Western Australia",
    city: "Perth",
    image: "https://picsum.photos/seed/perth-coast/800/600",
    href: "/buy?region=wa",
    count: "420+ Properties"
  },
  {
    name: "South Australia",
    city: "Adelaide",
    image: "https://picsum.photos/seed/adelaide-hills/800/600",
    href: "/buy?region=sa",
    count: "310+ Properties"
  },
  {
    name: "Tasmania",
    city: "Hobart",
    image: "https://picsum.photos/seed/hobart-port/800/600",
    href: "/buy?region=tas",
    count: "120+ Properties"
  }
];

export function StateSelector() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">National Reach</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#111111] uppercase tracking-tighter leading-none">
              Explore by <span className="text-primary italic">State.</span>
            </h2>
            <p className="text-[#111111]/40 text-lg mt-6 font-light leading-relaxed">
              From the coastal luxury of New South Wales to the cultural heart of Victoria, discover exceptional properties in every corner of the Australian continent.
            </p>
          </div>
          <Link href="/buy">
            <button className="flex items-center gap-4 text-xs font-black text-[#111111] uppercase tracking-[0.2em] group border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
              VIEW ALL REGIONS <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-2 transition-transform" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STATES.map((state, idx) => (
            <Link 
              key={idx} 
              href={state.href}
              className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <Image 
                src={state.image} 
                alt={state.name} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                data-ai-hint="australian city"
              />
              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">{state.city}</span>
                  </div>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                    {state.name}
                  </h3>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <p className="text-white/60 text-xs font-medium uppercase tracking-widest">{state.count}</p>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
