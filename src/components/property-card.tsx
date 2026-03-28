
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
}

export function PropertyCard({ id, image, price, address, beds, baths, cars, description, status }: PropertyProps) {
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

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsSaved(!isSaved); }}
            className={cn(
              "absolute top-4 right-4 z-10 glass-morphism-dark border-none text-white transition-colors h-10 w-10 rounded-full",
              isSaved && "bg-primary text-white"
            )}
          >
            <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
          </Button>

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
              <DialogContent className="sm:max-w-xl bg-[#111111] text-white border-white/10" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white uppercase tracking-tighter">
                    <Sparkles className="text-primary" />
                    Property Analysis
                  </DialogTitle>
                </DialogHeader>
                <div className="py-6">
                  <p className="text-white/60 mb-6 text-sm leading-relaxed italic border-l-2 border-primary pl-4">
                    {description}
                  </p>
                  <div className="space-y-4">
                    {isLoadingSummary ? (
                      <div className="space-y-3 animate-pulse">
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-5/6" />
                        <div className="h-4 bg-white/5 rounded w-4/6" />
                      </div>
                    ) : (
                      summary.map((point, idx) => (
                        <div key={idx} className="flex gap-3 items-center bg-white/5 p-3 rounded-lg border border-white/5">
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          <p className="text-sm text-white/90">{point}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <Button className="flex-1 bg-primary text-white font-bold" variant="default">Contact Agent</Button>
                  <Button className="bg-white/5 text-white border-white/10" variant="outline">Save Property</Button>
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
                <Image src="https://picsum.photos/seed/agent1/50/50" alt="Agent" fill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
