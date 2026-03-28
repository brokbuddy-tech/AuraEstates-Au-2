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

const BUY_LISTINGS = [
  {
    id: "b1",
    image: "https://picsum.photos/seed/aura10/800/600",
    price: "$4,250,000",
    address: "15 Oceanview Drive, Vaucluse NSW 2030",
    beds: 5,
    baths: 4,
    cars: 3,
    status: "New Listing",
    description: "A breathtaking architectural masterpiece with uninterrupted Pacific views. This residence defines coastal luxury with expansive living zones and a private infinity pool."
  },
  {
    id: "b2",
    image: "https://picsum.photos/seed/aura11/800/600",
    price: "Auction",
    address: "42 Heritage Lane, Paddington NSW 2021",
    beds: 3,
    baths: 2,
    cars: 1,
    status: "Auction",
    description: "Timeless elegance meets modern convenience in this beautifully restored Victorian terrace. Prime location in the heart of Paddington's boutique district."
  },
  {
    id: "b3",
    image: "https://picsum.photos/seed/aura12/800/600",
    price: "$2,890,000",
    address: "88 Skyline Terrace, Southbank VIC 3006",
    beds: 3,
    baths: 2,
    cars: 2,
    status: "Exclusive",
    description: "Experience the pinnacle of urban living in this expansive skyline penthouse. Floor-to-ceiling glass offers unmatched views of the Yarra River and CBD."
  },
  {
    id: "b4",
    image: "https://picsum.photos/seed/aura13/800/600",
    price: "$1,550,000",
    address: "12 Garden Street, Mosman NSW 2088",
    beds: 4,
    baths: 2,
    cars: 2,
    status: "Under Offer",
    description: "A sun-drenched family haven nestled in a quiet, leafy street. Perfect for entertaining with a gourmet kitchen and seamless indoor-outdoor flow."
  },
  {
    id: "b5",
    image: "https://picsum.photos/seed/aura14/800/600",
    price: "$5,100,000",
    address: "22 Beachfront Parade, Byron Bay NSW 2481",
    beds: 4,
    baths: 4,
    cars: 4,
    status: "New Listing",
    description: "Ultra-modern beachfront sanctuary. An architectural statement piece with sustainable design principles and direct access to the sand."
  },
  {
    id: "b6",
    image: "https://picsum.photos/seed/aura15/800/600",
    price: "$1,120,000",
    address: "304/55 Park Road, Milton QLD 4064",
    beds: 2,
    baths: 2,
    cars: 1,
    status: "For Sale",
    description: "Sophisticated inner-city apartment with high-end finishes and resort-style amenities. Walking distance to the riverwalk and dining precinct."
  }
];

export default function BuyPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-home")?.imageUrl;

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
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Residential Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
            Find Your <span className="text-primary">Forever.</span>
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
                  <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Available Listings</h2>
                  <p className="text-[#111111]/40 text-sm font-medium mt-1">Showing 156 properties in Sydney & Greater NSW</p>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#111111]/60">
                  <span>Sort by:</span>
                  <button className="flex items-center gap-1 text-[#111111] hover:text-primary transition-colors">
                    Newest First <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {BUY_LISTINGS.map((listing) => (
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
                <p className="text-black/40 text-sm mb-6">You've viewed 6 of 156 properties</p>
                <Button variant="outline" size="lg" className="border-black/10 text-black font-bold px-12 py-6 rounded-xl hover:bg-white hover:border-primary transition-all">
                  LOAD MORE PROPERTIES
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
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">The 2026 Residential <span className="text-primary">Outlook.</span></h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Sydney's premium market continues to lead global growth with a 15.2% appreciation in the last 12 months. Our AI models predict a continued stabilization of interest rates throughout Q3.
            </p>
            <div className="pt-8 flex items-center gap-8">
               <div>
                 <p className="text-3xl font-black text-white">+12.4%</p>
                 <p className="text-primary text-[10px] uppercase font-bold tracking-widest mt-1">Annual Yield</p>
               </div>
               <div className="w-px h-12 bg-white/10" />
               <div>
                 <p className="text-3xl font-black text-white">$1.8M</p>
                 <p className="text-primary text-[10px] uppercase font-bold tracking-widest mt-1">Median Price</p>
               </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative aspect-video rounded-3xl overflow-hidden glass-morphism border border-white/10">
             <Image 
              src="https://picsum.photos/seed/insight/800/600" 
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
