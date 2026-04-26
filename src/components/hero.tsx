"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Building, School, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const CATEGORIES = ["Buy", "Rent", "Sold", "Rural", "Commercial"];

export function Hero() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Buy");
  const [isAiMode, setIsAiMode] = useState(false);
  const [query, setQuery] = useState("");
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-home")?.imageUrl;

  const pushToRoute = (tab: string, overrideQuery?: string) => {
    const params = new URLSearchParams();
    const searchValue = (overrideQuery ?? query).trim();
    if (searchValue) params.set("q", searchValue);

    let destination = "/buy";
    if (tab === "Rent") destination = "/rent";
    if (tab === "Sold") destination = "/sold";
    if (tab === "Commercial") destination = "/commercial";
    if (tab === "Rural") {
      destination = "/buy";
      params.set("category", "Rural");
    }

    router.push(`${destination}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 parallax-bg"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-12 drop-shadow-sm">
          Find your next home.
        </h1>

        <div className="w-full glass-morphism rounded-3xl p-4 md:p-8">
          {/* Tabs Container */}
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-8 mb-8 border-b border-white/20 pb-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-8 min-h-[40px]">
              {!isAiMode && CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setIsAiMode(false);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm font-bold transition-all relative",
                    activeTab === cat ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {cat}
                  {activeTab === cat && (
                    <div className="absolute bottom-[-17px] left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),0.5)]" />
                  )}
                </button>
              ))}
              
              {isAiMode && (
                <span className="text-white font-black text-sm tracking-[0.2em] flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-primary animate-pulse" /> AI SEARCH ACTIVE
                </span>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAiMode(!isAiMode)}
              className={cn(
                "flex items-center gap-2 text-xs font-black tracking-widest uppercase transition-all rounded-full px-6",
                isAiMode ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-white border border-white/20 hover:bg-white/10"
              )}
            >
              <Sparkles className="w-4 h-4" />
              {isAiMode ? "EXIT AI" : "AI SEARCH"}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              {isAiMode ? (
                <Sparkles className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              ) : (
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              )}
              <Input
                placeholder={isAiMode 
                  ? "Describe your ideal home (e.g., 'Modern 3-bed with ocean views and a pool in Sydney')" 
                  : "Search by suburb, postcode, or school"}
                className={cn(
                  "w-full h-16 pl-14 text-lg border-none focus-visible:ring-primary/50 rounded-2xl transition-all shadow-inner",
                  isAiMode ? "bg-white/95 text-primary placeholder:text-primary/40" : "bg-white/90 text-[#111111] placeholder:text-muted-foreground"
                )}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Button
              size="lg"
              onClick={() => pushToRoute(activeTab)}
              className="h-16 px-10 w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-black rounded-2xl transition-all active:scale-95 shadow-2xl shadow-primary/20 tracking-widest"
            >
              {isAiMode ? "AI SEARCH" : "SEARCH"}
            </Button>
          </div>

          {!isAiMode && (
            <div className="flex items-center justify-center gap-8 mt-8 text-[11px] text-white/70 font-bold uppercase tracking-[0.1em]">
               <span onClick={() => pushToRoute(activeTab)} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors group">
                 <MapPin className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" /> Near Me
               </span>
               <span onClick={() => router.push("/buy?readiness=OFFPLAN")} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors group">
                 <Building className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" /> New Developments
               </span>
               <span onClick={() => pushToRoute("Buy", "school zone")} className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors group">
                 <School className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" /> School Zones
               </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
