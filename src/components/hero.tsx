"use client";

import React, { useState } from "react";
import { Search, MapPin, Building, School, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const CATEGORIES = ["Buy", "Rent", "Sold", "Rural", "Commercial"];

export function Hero() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [isAiMode, setIsAiMode] = useState(false);
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-home")?.imageUrl;

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
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-12">
          Find your next home.
        </h1>

        <div className="w-full glass-morphism rounded-2xl p-2 md:p-6">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-8 mb-6 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2 md:gap-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setIsAiMode(false);
                  }}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-all relative",
                    activeTab === cat && !isAiMode ? "text-white" : "text-white/60 hover:text-white"
                  )}
                >
                  {cat}
                  {activeTab === cat && !isAiMode && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAiMode(!isAiMode)}
              className={cn(
                "flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all",
                isAiMode ? "bg-primary text-white" : "text-primary hover:bg-primary/10"
              )}
            >
              <Sparkles className="w-4 h-4" />
              AI
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              {isAiMode ? (
                <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              ) : (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              )}
              <Input
                placeholder={isAiMode 
                  ? "Describe your ideal home (e.g., 'Modern 3-bed with ocean views and a pool in Sydney')" 
                  : "Search by suburb, postcode, or school"}
                className={cn(
                  "w-full h-14 pl-12 text-lg border-none focus-visible:ring-primary rounded-xl transition-all",
                  isAiMode ? "bg-white/95 text-primary placeholder:text-primary/40 ring-2 ring-primary/20 shadow-lg shadow-primary/5" : "bg-white/90 text-background placeholder:text-muted-foreground"
                )}
              />
            </div>
            <Button size="lg" className="h-14 px-8 w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-transform active:scale-95 shadow-xl shadow-primary/20">
              {isAiMode ? "AI SEARCH" : "SEARCH"}
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-white/50">
             <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"><MapPin className="w-3 h-3" /> Near Me</span>
             <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"><Building className="w-3 h-3" /> New Developments</span>
             <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"><School className="w-3 h-3" /> School Zones</span>
          </div>
        </div>
      </div>
    </section>
  );
}
