
"use client";

import React from "react";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { 
  Filter
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { PropertyCard } from "@/components/property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SidebarFilter } from "@/components/sidebar-filter";

const COMMERCIAL_LISTINGS = [
  {
    id: "c1",
    image: "https://picsum.photos/seed/comm1/800/600",
    price: "$12,500,000",
    address: "Level 45, 100 Barangaroo Ave, Sydney NSW 2000",
    beds: 0,
    baths: 4,
    cars: 10,
    status: "Premium Office",
    description: "A prestigious whole-floor office opportunity in the heart of Barangaroo. Features world-class fit-out, floor-to-ceiling glass with harbour views, and high-density technical infrastructure."
  },
  {
    id: "c2",
    image: "https://picsum.photos/seed/comm2/800/600",
    price: "$3,450,000",
    address: "88 Collins Street, Melbourne VIC 3000",
    beds: 0,
    baths: 2,
    cars: 2,
    status: "Retail",
    description: "Rare high-exposure retail asset on Melbourne's most iconic street. Currently tenanted by a luxury international brand with a long-term lease in place. Exceptional foot traffic."
  },
  {
    id: "c3",
    image: "https://picsum.photos/seed/comm3/800/600",
    price: "$5,800,000",
    address: "15 Logistics Way, Wacol QLD 4076",
    beds: 0,
    baths: 2,
    cars: 20,
    status: "Industrial",
    description: "State-of-the-art logistics hub with high-clearance warehousing and dual-street access. Strategically located with immediate access to major arterial road networks."
  },
  {
    id: "c4",
    image: "https://picsum.photos/seed/comm4/800/600",
    price: "$2,100,000",
    address: "12 Medical Square, Adelaide SA 5000",
    beds: 0,
    baths: 3,
    cars: 5,
    status: "Medical/Consulting",
    description: "Purpose-built medical consulting suite within a highly regarded health precinct. Modern reception, multiple private rooms, and specialist lab facilities."
  },
  {
    id: "c5",
    image: "https://picsum.photos/seed/comm5/800/600",
    price: "$7,250,000",
    address: "24 Terrace Road, Perth WA 6000",
    beds: 0,
    baths: 2,
    cars: 8,
    status: "Development Site",
    description: "Prime CBD development opportunity with approved plans for a mixed-use high-rise. Uninterrupted Swan River views and high-density zoning."
  },
  {
    id: "c6",
    image: "https://picsum.photos/seed/comm6/800/600",
    price: "$4,900,000",
    address: "30-34 Showroom Drive, Mascot NSW 2020",
    beds: 0,
    baths: 2,
    cars: 15,
    status: "Showroom/Warehouse",
    description: "Highly versatile showroom and warehouse combination. Excellent signage opportunities and high-clearance roller door access. Moments from Sydney Airport."
  }
];

export default function CommercialPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl;

  return (
    <main className="min-h-screen bg-[#F8F9FA] relative flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Commercial Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
            Business, <span className="text-primary">Evolved.</span>
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            
            <aside className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-24">
                <SidebarFilter className="rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB]" />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Commercial Listings</h2>
                  <p className="text-[#111111]/40 text-sm font-medium mt-1">Industrial, Retail, and Office opportunities across Australia</p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile Filter Trigger */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden h-10 px-4 border-[#E5E7EB] text-[#111111] font-bold flex items-center gap-2 rounded-xl active:scale-95 transition-all">
                        <Filter className="w-4 h-4 text-primary" />
                        Filter
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[300px] border-none">
                       <SidebarFilter className="border-none h-full" />
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-3 text-sm font-bold text-[#111111]/60">
                    <span className="hidden sm:inline">Sort by:</span>
                    <Select defaultValue="price-high">
                      <SelectTrigger className="h-10 px-4 border-[#E5E7EB] bg-transparent hover:text-primary transition-colors shadow-none focus:ring-0 w-fit gap-2 text-[#111111] font-bold rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="size">Largest Floor Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {COMMERCIAL_LISTINGS.map((listing) => (
                  <PropertyCard 
                    key={listing.id}
                    id={listing.id}
                    image={listing.image}
                    price={listing.price}
                    address={listing.address}
                    beds={listing.beds}
                    baths={listing.baths}
                    cars={listing.cars}
                    description={listing.description}
                    status={listing.status}
                  />
                ))}
              </div>

              <div className="mt-20 flex flex-col items-center">
                <p className="text-black/40 text-sm mb-6">You've viewed 6 of 420+ listings</p>
                <Button size="lg" className="bg-primary text-white font-bold px-12 py-6 rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
                  LOAD MORE ASSETS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">Aether Global Research</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">The Commercial <span className="text-primary">Capital</span> Outlook.</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Industrial assets continue to outperform with a 7.2% yield increase across major logistics hubs. Aether Market Intelligence predicts a strong rebound in premium office demand throughout 2026.
            </p>
            <div className="pt-8 flex items-center gap-8">
               <div>
                 <p className="text-3xl font-black text-white">6.8%</p>
                 <p className="text-primary text-[10px] uppercase font-bold tracking-widest mt-1">Avg. Yield</p>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div>
                 <p className="text-3xl font-black text-white">$420M</p>
                 <p className="text-primary text-[10px] uppercase font-bold tracking-widest mt-1">Managed Assets</p>
               </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden glass-morphism border border-white/10">
             <Image 
              src="https://picsum.photos/seed/comm-insight/800/600" 
              alt="Market Insight" 
              fill 
              className="object-cover opacity-60"
             />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
