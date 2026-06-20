"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  Maximize2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cleanQueryForCategory, normalizeCategory } from "@/lib/search-utils";

const DUMMY_MAP_PROPERTIES = [
  { id: 1, x: "30%", y: "40%", price: "$4.25M", address: "Vaucluse" },
  { id: 2, x: "50%", y: "60%", price: "Auction", address: "Paddington" },
  { id: 3, x: "70%", y: "30%", price: "$2.89M", address: "Southbank" },
  { id: 4, x: "20%", y: "70%", price: "$1.55M", address: "Mosman" },
];

const RESIDENTIAL_TYPES = [
  { id: "House", label: "House", icon: Home },
  { id: "Apartment/flat", label: "Apartment / Flat", icon: Building },
  { id: "Townhouse", label: "Townhouse", icon: Warehouse },
  { id: "Unit", label: "Unit", icon: Building },
  { id: "Duplex / Semi-detached", label: "Duplex / Semi-detached", icon: Home },
  { id: "Studio", label: "Studio", icon: Building },
  { id: "Penthouse", label: "Penthouse", icon: Building },
  { id: "Villa", label: "Villa", icon: Home },
  { id: "Terrace", label: "Terrace", icon: Home },
  { id: "Acreage", label: "Acreage", icon: TreePine },
  { id: "Rural", label: "Rural", icon: TreePine },
  { id: "Block of Units", label: "Block of Units", icon: Building },
  { id: "Alpine", label: "Alpine", icon: TreePine },
  { id: "Retirement Living", label: "Retirement Living", icon: Home },
  { id: "Land", label: "Land", icon: TreePine },
];

const COMMERCIAL_TYPES = [
  { id: "Office", label: "Office", icon: Building },
  { id: "Shop / Retail", label: "Shop / Retail", icon: Briefcase },
  { id: "Showroom", label: "Showroom", icon: Building },
  { id: "Medical / Consulting Suite", label: "Medical / Consulting Suite", icon: Briefcase },
  { id: "Business Centre", label: "Business Centre", icon: Building },
  { id: "Co-working Space", label: "Co-working Space", icon: Building },
  { id: "Warehouse", label: "Warehouse", icon: Warehouse },
  { id: "Factory", label: "Factory", icon: Warehouse },
  { id: "Industrial Land", label: "Industrial Land", icon: TreePine },
  { id: "Labour Accommodation", label: "Labour Accommodation", icon: Home },
  { id: "Whole Building", label: "Whole Building", icon: Building },
  { id: "Commercial Villa", label: "Commercial Villa", icon: Home },
  { id: "Hotel / Motel", label: "Hotel / Motel", icon: Building },
  { id: "Service Station", label: "Service Station", icon: Briefcase },
  { id: "Full Floor", label: "Full Floor", icon: Building },
  { id: "Half Floor", label: "Half Floor", icon: Building },
  { id: "Commercial Floor", label: "Commercial Floor", icon: Building },
  { id: "Bulk Unit", label: "Bulk Unit", icon: Building },
  { id: "Vacant Commercial Land", label: "Vacant Commercial Land", icon: TreePine },
  { id: "Mixed Use Land", label: "Mixed Use Land", icon: TreePine },
  { id: "Farm", label: "Farm", icon: TreePine },
  { id: "Carpark", label: "Carpark", icon: Briefcase },
];

const FEATURE_OPTIONS = [
  { id: "pool", label: "Swimming Pool" },
  { id: "garage", label: "Garage" },
  { id: "solar", label: "Solar Panels" },
  { id: "waterfront", label: "Waterfront" },
  { id: "study", label: "Study" },
  { id: "ac", label: "Air Conditioning" },
];

export function SidebarFilter({ className, total = 0 }: { className?: string; total?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [bedrooms, setBedrooms] = useState("Any");
  const [bathrooms, setBathrooms] = useState("Any");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const isCommercial = pathname === "/commercial";
  const typeOptions = isCommercial ? COMMERCIAL_TYPES : RESIDENTIAL_TYPES;

  useEffect(() => {
    const categories = (searchParams.get("category") || "")
      .split(",")
      .map(normalizeCategory)
      .filter(Boolean) as string[];

    setLocation(cleanQueryForCategory(searchParams.get("q"), categories.join(",")) || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setMinArea(searchParams.get("minArea") || "");
    setMaxArea(searchParams.get("maxArea") || "");
    setBedrooms(searchParams.get("bedrooms") || "Any");
    setBathrooms(searchParams.get("bathrooms") || "Any");
    setSelectedTypes(categories);
  }, [searchParams]);

  const toggleArrayValue = (value: string, current: string[], setter: (next: string[]) => void) => {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    const categories = selectedTypes.map(normalizeCategory).filter(Boolean) as string[];
    const searchTerms = [
      cleanQueryForCategory(location.trim(), categories.join(",")),
      ...selectedFeatures,
    ].filter(Boolean).join(" ");

    if (searchTerms) params.set("q", searchTerms); else params.delete("q");
    if (minPrice) params.set("minPrice", minPrice); else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice); else params.delete("maxPrice");
    if (minArea) params.set("minArea", minArea); else params.delete("minArea");
    if (maxArea) params.set("maxArea", maxArea); else params.delete("maxArea");
    if (bedrooms !== "Any") params.set("bedrooms", bedrooms.replace("+", "")); else params.delete("bedrooms");
    if (bathrooms !== "Any") params.set("bathrooms", bathrooms.replace("+", "")); else params.delete("bathrooms");
    if (categories.length > 0) params.set("category", categories.join(",")); else params.delete("category");
    params.delete("page");

    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const resetFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setBedrooms("Any");
    setBathrooms("Any");
    setSelectedTypes([]);
    setSelectedFeatures([]);
    router.push(pathname);
  };

  return (
    <aside className={cn("w-full h-fit flex flex-col bg-[#FAFAFA] border-r border-[#E5E7EB]", className)}>
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">Filters</h2>
        <button onClick={resetFilters} className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Reset All</button>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Map View</Label>

            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
                  <Maximize2 className="w-3 h-3" /> Full Screen
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden bg-[#111111] border-white/10">
                <DialogHeader className="absolute top-6 left-6 z-20 pointer-events-none">
                  <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white uppercase tracking-tighter">
                    <MapPin className="text-primary" />
                    Interactive Portfolio Map
                  </DialogTitle>
                </DialogHeader>

                <div className="relative w-full h-full">
                  <Image
                    src="https://picsum.photos/seed/full-map/1920/1080"
                    alt="Interactive Map"
                    fill
                    className="object-cover grayscale opacity-40"
                    data-ai-hint="city map"
                  />

                  {DUMMY_MAP_PROPERTIES.map((property) => (
                    <div
                      key={property.id}
                      className="absolute group transition-all duration-300"
                      style={{ left: property.x, top: property.y }}
                      onMouseEnter={() => setHoveredPin(property.id)}
                      onMouseLeave={() => setHoveredPin(null)}
                    >
                      <div className={cn(
                        "relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all duration-300",
                        hoveredPin === property.id ? "bg-primary scale-125 shadow-2xl" : "bg-white text-black shadow-lg"
                      )}>
                        <MapPin className="w-5 h-5" />
                        <div className={cn(
                          "absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 glass-morphism p-4 rounded-xl border border-white/10 transition-all duration-300 pointer-events-none",
                          hoveredPin === property.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        )}>
                          <p className="text-xs font-black text-white uppercase tracking-widest mb-1">{property.price}</p>
                          <p className="text-[10px] text-white/60 mb-3">{property.address}</p>
                          <div className="flex items-center gap-2 text-[8px] font-bold text-primary">
                            VIEW DETAILS <Sparkles className="w-2 h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden bg-[#111111]">
              <div className="relative w-full h-full">
                <Image
                  src="https://picsum.photos/seed/full-map/1920/1080"
                  alt="Interactive Map"
                  fill
                  className="object-cover grayscale opacity-40"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-black uppercase tracking-[0.5em] select-none">
                  Map Exploration Active
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#111111]/40" />
            <Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Suburb or Postcode" className="pl-10 h-11 bg-white border-[#E5E7EB] text-sm focus-visible:ring-primary/20" />
            <Target className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Price Range (AUD)</Label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#111111]/40">$</span>
              <Input value={minPrice} onChange={(event) => setMinPrice(event.target.value)} placeholder="Min" className="pl-7 h-11 bg-white border-[#E5E7EB] text-sm" />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#111111]/40">$</span>
              <Input value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Max" className="pl-7 h-11 bg-white border-[#E5E7EB] text-sm" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Land Size (m2)</Label>
          <div className="flex gap-3">
            <Input value={minArea} onChange={(event) => setMinArea(event.target.value)} placeholder="Min" className="h-11 bg-white border-[#E5E7EB] text-sm" />
            <Input value={maxArea} onChange={(event) => setMaxArea(event.target.value)} placeholder="Max" className="h-11 bg-white border-[#E5E7EB] text-sm" />
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Property Type</Label>
          <div className="space-y-3">
            {typeOptions.map((type) => (
              <div key={type.id} className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => toggleArrayValue(type.id, selectedTypes, setSelectedTypes)}
                  className="border-[#E5E7EB] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor={type.id} className="flex items-center gap-2 text-sm font-medium text-[#111111]/70 cursor-pointer group-hover:text-primary transition-colors">
                  <type.icon className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50 flex items-center gap-2">
              <Bed className="w-3 h-3" /> Bedrooms
            </Label>
            <div className="flex flex-wrap gap-2">
              {["Any", "1", "2", "3", "4", "5+"].map((value) => (
                <button
                  key={value}
                  onClick={() => setBedrooms(value)}
                  className={cn(
                    "flex-1 min-w-[45px] h-10 rounded-lg text-xs font-bold transition-all border",
                    bedrooms === value ? "bg-[#111111] text-white border-[#111111]" : "bg-white text-[#111111]/60 border-[#E5E7EB] hover:border-[#111111]"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50 flex items-center gap-2">
              <Bath className="w-3 h-3" /> Bathrooms
            </Label>
            <div className="flex flex-wrap gap-2">
              {["Any", "1", "2", "3", "4+"].map((value) => (
                <button
                  key={value}
                  onClick={() => setBathrooms(value)}
                  className={cn(
                    "flex-1 min-w-[45px] h-10 rounded-lg text-xs font-bold transition-all border",
                    bathrooms === value ? "bg-[#111111] text-white border-[#111111]" : "bg-white text-[#111111]/60 border-[#E5E7EB] hover:border-[#111111]"
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]/50">Features</Label>
          <div className="grid grid-cols-1 gap-3">
            {FEATURE_OPTIONS.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox
                  id={feature.id}
                  checked={selectedFeatures.includes(feature.label)}
                  onCheckedChange={() => toggleArrayValue(feature.label, selectedFeatures, setSelectedFeatures)}
                  className="border-[#E5E7EB] data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label htmlFor={feature.id} className="text-xs font-medium text-[#111111]/70 cursor-pointer group-hover:text-primary transition-colors">
                  {feature.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-[#E5E7EB] bg-white sticky bottom-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <Button onClick={applyFilters} className="w-full h-12 bg-[#005F73] hover:bg-[#005F73]/90 text-white font-bold rounded-xl shadow-lg shadow-[#005F73]/10 transition-transform active:scale-95">
          SHOW {total.toLocaleString()} PROPERTIES
        </Button>
      </div>
    </aside>
  );
}
