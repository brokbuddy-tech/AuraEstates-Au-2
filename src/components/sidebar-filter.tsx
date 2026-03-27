"use client";

import React from "react";
import Image from "next/image";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Target,
  Waves,
  Sun,
  Warehouse,
  Home,
  Building,
  TreePine,
  Briefcase,
  Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function SidebarFilter({ className }: { className?: string }) {
  return (
    <aside className={cn("w-full h-fit flex flex-col bg-[#FAFAFA] border-r border-[#E5E7EB]", className)}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">Filters</h2>
        <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Reset All</button>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
        {/* Map View Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Map View</Label>
            <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
              <Maximize2 className="w-3 h-3" /> Full Screen
            </button>
          </div>
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#E5E7EB] group cursor-pointer shadow-sm">
            <Image 
              src="https://picsum.photos/seed/aether-map-v1/600/400" 
              alt="Map Preview" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              data-ai-hint="satellite map"
            />
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#E5E7EB] shadow-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-[#111111]">Live Search Area</span>
            </div>
          </div>
        </div>

        {/* Location & Radius */}
        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Location & Radius</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/40" />
            <Input placeholder="Suburb or Postcode" className="pl-10 h-11 bg-white border-[#E5E7EB] text-sm focus-visible:ring-primary/20" />
            <Target className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary cursor-pointer hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-medium text-[#111111]/60">
              <span>Radius</span>
              <span>+10km</span>
            </div>
            <Slider defaultValue={[10]} max={100} step={1} className="py-2" />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Price Range (AUD)</Label>
          <Slider defaultValue={[20, 80]} max={100} step={1} className="py-2" />
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#111111]/40">$</span>
              <Input placeholder="Min" className="pl-7 h-11 bg-white border-[#E5E7EB] text-sm" />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#111111]/40">$</span>
              <Input placeholder="Max" className="pl-7 h-11 bg-white border-[#E5E7EB] text-sm" />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Property Type</Label>
          <div className="space-y-3">
            {[
              { id: "house", label: "House", icon: Home },
              { id: "apartment", label: "Apartment", icon: Building },
              { id: "townhouse", label: "Townhouse", icon: Warehouse },
              { id: "land", label: "Land", icon: TreePine },
              { id: "rural", label: "Rural", icon: TreePine },
              { id: "commercial", label: "Commercial", icon: Briefcase },
            ].map((type) => (
              <div key={type.id} className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox id={type.id} className="border-[#E5E7EB] data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <label htmlFor={type.id} className="flex items-center gap-2 text-sm font-medium text-[#111111]/70 cursor-pointer group-hover:text-primary transition-colors">
                  <type.icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50 flex items-center gap-2">
              <Bed className="w-3 h-3" /> Bedrooms
            </Label>
            <div className="flex flex-wrap gap-2">
              {["Any", "1", "2", "3", "4", "5+"].map((num) => (
                <button
                  key={num}
                  className={cn(
                    "flex-1 min-w-[45px] h-10 rounded-lg text-xs font-bold transition-all border",
                    num === "Any" ? "bg-[#111111] text-white border-[#111111]" : "bg-white text-[#111111]/60 border-[#E5E7EB] hover:border-[#111111]"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50 flex items-center gap-2">
              <Bath className="w-3 h-3" /> Bathrooms
            </Label>
            <div className="flex flex-wrap gap-2">
              {["Any", "1", "2", "3", "4+"].map((num) => (
                <button
                  key={num}
                  className={cn(
                    "flex-1 min-w-[45px] h-10 rounded-lg text-xs font-bold transition-all border",
                    num === "Any" ? "bg-[#111111] text-white border-[#111111]" : "bg-white text-[#111111]/60 border-[#E5E7EB] hover:border-[#111111]"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Features</Label>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: "pool", label: "Swimming Pool", icon: Waves },
              { id: "garage", label: "Garage", icon: Car },
              { id: "solar", label: "Solar Panels", icon: Sun },
              { id: "waterfront", label: "Waterfront", icon: Waves },
              { id: "study", label: "Study", icon: Briefcase },
              { id: "ac", label: "Air Conditioning", icon: Sun },
            ].map((feat) => (
              <div key={feat.id} className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox id={feat.id} className="border-[#E5E7EB] data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <label htmlFor={feat.id} className="text-xs font-medium text-[#111111]/70 cursor-pointer group-hover:text-primary transition-colors">
                  {feat.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Land Size */}
        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Land Size (m²)</Label>
          <div className="flex gap-3">
            <Input placeholder="Min" className="h-11 bg-white border-[#E5E7EB] text-sm" />
            <Input placeholder="Max" className="h-11 bg-white border-[#E5E7EB] text-sm" />
          </div>
        </div>
      </div>

      {/* Sticky Footer Action */}
      <div className="p-6 border-t border-[#E5E7EB] bg-white sticky bottom-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <Button className="w-full h-12 bg-[#005F73] hover:bg-[#005F73]/90 text-white font-bold rounded-xl shadow-lg shadow-[#005F73]/10 transition-transform active:scale-95">
          SHOW 142 PROPERTIES
        </Button>
      </div>
    </aside>
  );
}
