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

const RENT_LISTINGS = [
  {
    id: "r1",
    image: "https://picsum.photos/seed/rent1/800/600",
    price: "$1,250 pw",
    address: "101/15 Miller Street, Pyrmont NSW 2009",
    beds: 2,
    baths: 2,
    cars: 1,
    status: "For Rent",
    description: "Modern executive apartment with stunning city views. Features open-plan living, gourmet kitchen, and access to resort-style pool and gym."
  },
  {
    id: "r2",
    image: "https://picsum.photos/seed/rent2/800/600",
    price: "$2,400 pw",
    address: "42 Oceanview Drive, Vaucluse NSW 2030",
    beds: 4,
    baths: 3,
    cars: 2,
    status: "For Rent",
    description: "Breathtaking coastal residence with panoramic Pacific views. Multiple living zones, expansive decks, and direct access to coastal walks."
  },
  {
    id: "r3",
    image: "https://picsum.photos/seed/rent3/800/600",
    price: "$950 pw",
    address: "15/88 Skyline Terrace, Southbank VIC 3006",
    beds: 2,
    baths: 2,
    cars: 1,
    status: "For Rent",
    description: "Sleek urban living in the heart of Southbank. Floor-to-ceiling glass, premium finishes, and walking distance to the arts precinct."
  },
  {
    id: "r4",
    image: "https://picsum.photos/seed/rent4/800/600",
    price: "$1,800 pw",
    address: "8 Wattle Grove, Mosman NSW 2088",
    beds: 4,
    baths: 2,
    cars: 2,
    status: "For Rent",
    description: "Spacious family home in a quiet, leafy cul-de-sac. Large garden, modern kitchen, and close proximity to leading schools."
  },
  {
    id: "r5",
    image: "https://picsum.photos/seed/rent5/800/600",
    price: "$3,200 pw",
    address: "1 Beachside Court, Byron Bay NSW 2481",
    beds: 4,
    baths: 4,
    cars: 3,
    status: "For Rent",
    description: "Ultimate luxury beachfront living. Architectural masterpiece with private pool and direct beach access. Fully furnished option available."
  },
  {
    id: "r6",
    image: "https://picsum.photos/seed/rent6/800/600",
    price: "$750 pw",
    address: "304/55 Park Road, Milton QLD 4064",
    beds: 2,
    baths: 1,
    cars: 1,
    status: "For Rent",
    description: "Contemporary apartment in the vibrant Milton precinct. Open-plan design, private balcony, and close to cafes and public transport."
  }
];

export default function RentPage() {
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
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Leasing Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
            Life, <span className="text-primary">Leased.</span>
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
                  <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Rental Listings</h2>
                  <p className="text-[#111111]/40 text-sm font-medium mt-1">Discover premium rental properties across Australia</p>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[#111111]/60">
                  <span>Sort by:</span>
                  <button className="flex items-center gap-1 text-[#111111] hover:text-primary transition-colors">
                    Newest First <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {RENT_LISTINGS.map((listing) => (
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
                <p className="text-black/40 text-sm mb-6">You've viewed 6 of 840+ properties</p>
                <Button variant="outline" size="lg" className="border-black/10 text-black font-bold px-12 py-6 rounded-xl hover:bg-white hover:border-primary transition-all">
                  LOAD MORE RENTALS
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

      <Footer />
    </main>
  );
}
