"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  Filter
} from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SidebarFilter } from "@/components/sidebar-filter";

const SOLD_LISTINGS = [
  {
    id: "s1",
    image: "https://picsum.photos/seed/sold1/800/600",
    price: "Sold for $4,550,000",
    address: "24 Ocean Parade, Vaucluse NSW 2030",
    beds: 5,
    baths: 4,
    cars: 3,
    status: "Record Price",
    description: "An exceptional coastal estate that achieved a record-breaking result in just 14 days. This architectural marvel features panoramic views and bespoke finishes."
  },
  {
    id: "s2",
    image: "https://picsum.photos/seed/sold2/800/600",
    price: "Sold at Auction",
    address: "15 Glenview Street, Paddington NSW 2021",
    beds: 3,
    baths: 2,
    cars: 1,
    status: "Sold",
    description: "Competitive bidding saw this heritage terrace exceed reserve expectations. A testament to the enduring appeal of quality Paddington architecture."
  },
  {
    id: "s3",
    image: "https://picsum.photos/seed/sold3/800/600",
    price: "Sold for $3,120,000",
    address: "Penthouse 501, Southbank VIC 3006",
    beds: 3,
    baths: 2,
    cars: 2,
    status: "Off Market",
    description: "Discreetly transacted to an exclusive buyer from our private database. This sky-high residence represents the pinnacle of Melbourne luxury."
  },
  {
    id: "s4",
    image: "https://picsum.photos/seed/sold4/800/600",
    price: "Sold for $1,680,000",
    address: "8 Wattle Grove, Mosman NSW 2088",
    beds: 4,
    baths: 2,
    cars: 2,
    status: "Sold",
    description: "A cherished family home sold to a local family within 3 weeks of listing. Seamless indoor-outdoor flow and prime location were key selling points."
  },
  {
    id: "s5",
    image: "https://picsum.photos/seed/sold5/800/600",
    price: "Sold for $5,400,000",
    address: "1 Beachside Court, Byron Bay NSW 2481",
    beds: 4,
    baths: 4,
    cars: 4,
    status: "Record Price",
    description: "Setting a new benchmark for beachfront living. This ultra-modern sanctuary attracted significant national and international interest."
  },
  {
    id: "s6",
    image: "https://picsum.photos/seed/sold6/800/600",
    price: "Sold for $1,250,000",
    address: "102/18 River Terrace, Milton QLD 4064",
    beds: 2,
    baths: 2,
    cars: 1,
    status: "Sold",
    description: "Successfully transacted to a professional couple. High-end finishes and resort-style amenities drove strong demand for this inner-city gem."
  }
];

export default function SoldPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl;

  return (
    <main className="min-h-screen bg-[#F8F9FA] relative flex flex-col">
      <Navbar />

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
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Proven Success</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
            Find Your <span className="text-primary">Success.</span>
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
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Recent Sales</h2>
                  <p className="text-[#111111]/40 text-sm font-medium mt-1">Showcasing 4,200+ properties sold by Aether Australia</p>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#111111]/60">
                  <span>Sort by:</span>
                  <button className="flex items-center gap-1 text-[#111111] hover:text-primary transition-colors">
                    Recently Sold <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {SOLD_LISTINGS.map((listing) => (
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
                <p className="text-black/40 text-sm mb-6">You've viewed 6 of 4,200+ results</p>
                <Button variant="outline" size="lg" className="border-black/10 text-black font-bold px-12 py-6 rounded-xl hover:bg-white hover:border-primary transition-all">
                  LOAD MORE SALES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <Button className="h-12 px-8 bg-[#111111] text-white font-bold rounded-full shadow-2xl flex items-center gap-3 active:scale-95 transition-transform">
          <Filter className="w-4 h-4 text-primary" /> FILTERS
        </Button>
      </div>

      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">Aether Market Intelligence</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">The 2026 Sales <span className="text-primary">Record.</span></h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Our data-driven approach consistently achieves 8.4% above market median. By leveraging predictive AI, we connect properties with high-intent buyers before they even hit the open market.
            </p>
            <div className="pt-8 flex items-center gap-8">
               <div>
                 <p className="text-3xl font-black text-white">98.2%</p>
                 <p className="text-primary text-[10px] uppercase font-bold tracking-widest mt-1">Clearance Rate</p>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div>
                 <p className="text-3xl font-black text-white">14 Days</p>
                 <p className="text-primary text-[10px] uppercase font-bold tracking-widest mt-1">Avg. Days on Market</p>
               </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden glass-morphism border border-white/10">
             <Image 
              src="https://picsum.photos/seed/sold-insight/800/600" 
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
