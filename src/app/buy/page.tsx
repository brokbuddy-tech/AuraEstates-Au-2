"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PropertyCard } from "@/components/property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SidebarFilter } from "@/components/sidebar-filter";
import { useAuraListings } from "@/hooks/use-aura-listings";

export default function BuyPage() {
  return (
    <Suspense fallback={<ListingsPageFallback />}>
      <BuyPageContent />
    </Suspense>
  );
}

function BuyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { properties, total, page, totalPages, loading } = useAuraListings("buy");
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-home")?.imageUrl;
  const activeQuery = searchParams.get("q");

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") params.delete("sort"); else params.set("sort", value);
    params.delete("page");
    router.push(`/buy${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleLoadMore = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page + 1));
    router.push(`/buy?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] relative flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover"
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
                <SidebarFilter total={total} className="rounded-2xl overflow-hidden shadow-sm border border-[#E5E7EB]" />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">Available Listings</h2>
                  <p className="text-[#111111]/40 text-sm font-medium mt-1">
                    Showing {total.toLocaleString()} properties{activeQuery ? ` for "${activeQuery}"` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden h-10 px-4 border-[#E5E7EB] text-[#111111] font-bold flex items-center gap-2 rounded-xl active:scale-95 transition-all">
                        <Filter className="w-4 h-4 text-primary" />
                        Filter
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-[300px] border-none">
                      <SidebarFilter total={total} className="border-none h-full" />
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-3 text-sm font-bold text-[#111111]/60">
                    <span className="hidden sm:inline">Sort by:</span>
                    <Select value={searchParams.get("sort") || "newest"} onValueChange={handleSortChange}>
                      <SelectTrigger className="h-10 px-4 border-[#E5E7EB] bg-transparent hover:text-primary transition-colors shadow-none focus:ring-0 w-fit gap-2 text-[#111111] font-bold rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="beds">Most Bedrooms</SelectItem>
                        <SelectItem value="size">Largest Land Size</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {loading && properties.length === 0 ? (
                <p className="text-sm uppercase tracking-[0.3em] text-[#111111]/40">Loading listings...</p>
              ) : properties.length === 0 ? (
                <p className="text-sm uppercase tracking-[0.3em] text-[#111111]/40">No listings matched the current filters.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {properties.map((listing) => (
                    <PropertyCard key={listing.id} {...listing} />
                  ))}
                </div>
              )}

              {page < totalPages && (
                <div className="mt-20 flex flex-col items-center">
                  <p className="text-black/40 text-sm mb-6">You've viewed {Math.min(page * 12, total)} of {total.toLocaleString()} properties</p>
                  <Button onClick={handleLoadMore} variant="outline" size="lg" className="border-black/10 text-black font-bold px-12 py-6 rounded-xl hover:bg-white hover:border-primary transition-all">
                    LOAD MORE PROPERTIES
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-6">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">Aether Market Intelligence</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">The 2026 Residential <span className="text-primary">Outlook.</span></h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Sydney's premium market continues to lead global growth with a 15.2% appreciation in the last 12 months. Our AI models predict a continued stabilization of interest rates throughout Q3.
            </p>
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

function ListingsPageFallback() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] relative flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full bg-black/80" />
      <section className="py-16 px-6 md:px-12 bg-white flex-1">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-[#111111]/40">
            Loading listings...
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
