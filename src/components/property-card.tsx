"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bed, Bath, Car, Heart, Sparkles } from "lucide-react";
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
}

export function PropertyCard({ image, price, address, beds, baths, cars, description }: PropertyProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const fetchSummary = async () => {
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
    <div className="group relative flex-shrink-0 w-full sm:w-[400px] rounded-2xl overflow-hidden bg-card border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
      {/* Property Image */}
      <div className="relative h-64 w-full overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={address}
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
             <span className="text-white/20">No Image Available</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
          className={cn(
            "absolute top-4 right-4 z-10 glass-morphism border-none text-white transition-colors",
            isSaved && "bg-primary/80 text-white"
          )}
        >
          <Heart className={cn("w-5 h-5", isSaved && "fill-current")} />
        </Button>
      </div>

      {/* Glass Details Overlay */}
      <div className="relative p-6 -mt-12 mx-4 mb-4 rounded-xl glass-morphism-dark z-20 backdrop-blur-xl border border-white/10 group-hover:border-primary/30 transition-colors">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">{price}</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={fetchSummary}
                className="text-accent hover:text-accent hover:bg-accent/10 flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest"
              >
                <Sparkles className="w-3 h-3" />
                AI Insights
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl glass-morphism-dark text-white border-white/10">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white">
                  <Sparkles className="text-accent" />
                  Property Highlights
                </DialogTitle>
              </DialogHeader>
              <div className="py-6">
                <p className="text-white/60 mb-4 text-sm leading-relaxed">{description.substring(0, 200)}...</p>
                <div className="space-y-3">
                  {isLoadingSummary ? (
                    <div className="space-y-2 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-full" />
                      <div className="h-4 bg-white/10 rounded w-5/6" />
                      <div className="h-4 bg-white/10 rounded w-4/6" />
                    </div>
                  ) : (
                    summary.map((point, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-sm text-white/90">{point}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-primary text-white" variant="default">Contact Agent</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-white/60 text-sm mb-4 line-clamp-1">{address}</p>
        
        <div className="flex items-center gap-6 text-white/80 border-t border-white/5 pt-4">
          <span className="flex items-center gap-2 text-sm"><Bed className="w-4 h-4 text-primary" /> {beds}</span>
          <span className="flex items-center gap-2 text-sm"><Bath className="w-4 h-4 text-primary" /> {baths}</span>
          <span className="flex items-center gap-2 text-sm"><Car className="w-4 h-4 text-primary" /> {cars}</span>
        </div>
      </div>
    </div>
  );
}