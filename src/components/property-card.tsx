
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Car, Heart, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { summarizePropertyDescription } from "@/ai/flows/summarize-property-description";

interface PropertyProps {
  id: string;
  image: string;
  price: string;
  address: string;
  beds: number;
  baths: number;
  cars: number;
  description: string;
  status?: string;
  agentAvatar?: string;
}

export function PropertyCard({ id, image, price, address, beds, baths, cars, description, status, agentAvatar }: PropertyProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const fetchSummary = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (summary.length > 0) return;
    setIsLoadingSummary(true);
    try {
      const result = await summarizePropertyDescription({ description });
      setSummary(result.summary);
    } catch (error) {
      console.error("Failed to fetch summary", error);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <Link href={`/properties/${id}`} className="block group">
      <div className="relative flex flex-col w-full rounded-2xl overflow-hidden bg-white border border-black/5 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
        {/* Property Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={address}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
              <span className="text-black/10">No Image Available</span>
            </div>
          )}

          {/* Status Badge */}
          {status && (
            <div className="absolute top-4 left-4 z-10">
              <span className={cn(
                "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm text-white",
                status === "New Listing" ? "bg-primary" : "bg-slate-800"
              )}>
                {status}
              </span>
            </div>
          )}

          {/* Quick View Overlay on Hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <div className="glass-morphism px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              View Details <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Details Area */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-black text-[#111111] tracking-tight">{price}</h3>

            <Dialog>
              <DialogTrigger asChild>
                <button
                  onClick={fetchSummary}
                  className="text-primary hover:text-primary/80 flex items-center gap-1 text-[10px] uppercase font-black tracking-widest transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  AI Insights
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl bg-[#111111] text-white border-white/10 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white uppercase tracking-tighter">
                    <Sparkles className="text-primary" />
                    Property Analysis
                  </DialogTitle>
                </DialogHeader>
                <div className="py-6 space-y-8">
                  {/* Core Details Section */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                    <Image
                      src={image}
                      alt={address}
                      fill
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-primary font-black text-3xl tracking-tighter mb-1">{price}</p>
                      <p className="text-white/60 text-sm font-medium uppercase tracking-widest line-clamp-1">{address}</p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4 py-6 border-y border-white/5">
                    <div className="flex flex-col items-center gap-1">
                      <Bed className="w-5 h-5 text-primary" />
                      <span className="text-lg font-black">{beds}</span>
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Beds</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-x border-white/5">
                      <Bath className="w-5 h-5 text-primary" />
                      <span className="text-lg font-black">{baths}</span>
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Baths</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Car className="w-5 h-5 text-primary" />
                      <span className="text-lg font-black">{cars}</span>
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Cars</span>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Executive Summary</h4>
                    <p className="text-white/70 text-sm leading-relaxed font-light italic border-l-2 border-primary/40 pl-4">
                      {description}
                    </p>
                  </div>

                  {/* AI Insights Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">AI Key Features</h4>
                    </div>

                    {isLoadingSummary ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-5/6" />
                        <div className="h-4 bg-white/5 rounded w-4/6" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {summary.map((point, idx) => (
                          <div key={idx} className="flex gap-3 items-center bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <p className="text-sm text-white/90 font-medium">{point}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <Button className="flex-1 h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-xl shadow-primary/10" variant="default">
                    CONTACT AGENT
                  </Button>
                  <Button className="flex-1 h-14 bg-white/5 text-white border-white/10 hover:bg-white/10 rounded-xl" variant="outline">
                    SAVE SEARCH
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <p className="text-[#111111]/60 text-sm font-medium mb-6 line-clamp-1">{address}</p>

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5">
            <div className="flex items-center gap-6 text-[#111111]/80">
              <span className="flex items-center gap-2 text-xs font-bold"><Bed className="w-4 h-4 text-primary" /> {beds}</span>
              <span className="flex items-center gap-2 text-xs font-bold"><Bath className="w-4 h-4 text-primary" /> {baths}</span>
              <span className="flex items-center gap-2 text-xs font-bold"><Car className="w-4 h-4 text-primary" /> {cars}</span>
            </div>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                {agentAvatar ? (
                  <Image src={agentAvatar} alt="Agent" fill className="object-cover" sizes="24px" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
