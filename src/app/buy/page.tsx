"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Sparkles, Home, ShieldCheck, Key } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function BuyPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "hero-home")?.imageUrl;

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 parallax-bg"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: 'translateZ(0)',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
            Find Your <span className="text-primary">Forever.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mb-12">
            Explore Australia's most exclusive collection of premium properties and architectural masterpieces.
          </p>

          <div className="w-full max-w-2xl glass-morphism p-2 rounded-2xl flex items-center gap-2 border border-white/20">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input 
                placeholder="Search by suburb, postcode, or keyword..." 
                className="bg-transparent border-none text-white placeholder:text-white/30 h-14 pl-12 focus-visible:ring-0 text-lg"
              />
            </div>
            <Button size="lg" className="h-14 px-8 bg-[#0047AB] hover:bg-[#0047AB]/90 text-white font-bold rounded-xl shadow-xl shadow-blue-900/20">
              SEARCH
            </Button>
          </div>
        </div>
      </section>

      {/* Dual-Action Conversion Grid */}
      <section className="py-24 px-6 md:px-12 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Off-Market Card */}
          <div className="group bg-white p-12 rounded-3xl border border-black/5 hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-[#111111] mb-4">Off-Market Registry</h2>
            <p className="text-[#111111]/60 text-lg mb-8 leading-relaxed">
              Gain exclusive access to high-end properties before they reach the public portals. Join our elite buyer network.
            </p>
            <button className="text-primary font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Apply for Access <span className="text-xl">→</span>
            </button>
          </div>

          {/* Concierge Card */}
          <div className="group bg-white p-12 rounded-3xl border border-black/5 hover:shadow-2xl transition-all duration-500 cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-[#111111] mb-4">VIP Buyer Concierge</h2>
            <p className="text-[#111111]/60 text-lg mb-8 leading-relaxed">
              Let our expert acquisition specialists handle the search, evaluation, and negotiation for your next landmark acquisition.
            </p>
            <button className="text-primary font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Book Consultation <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Buying Process Section */}
      <section className="py-24 px-6 md:px-12 bg-[#111111]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-20 uppercase tracking-tighter">
            Our Approach to <span className="text-primary">Masterful</span> Acquisition.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {/* Step 1 */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full glass-morphism border border-white/20 flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <MapPin className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Tailored Discovery</h3>
              <p className="text-white/40 leading-relaxed">
                Utilizing 2026 AI-driven intelligence to match properties precisely to your unique lifestyle and investment requirements.
              </p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href="#" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Explore Method</Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full glass-morphism border border-white/20 flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Home className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Exclusive Previews</h3>
              <p className="text-white/40 leading-relaxed">
                Experience the finest residences through curated private viewings and high-key digital storytelling walkthroughs.
              </p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href="#" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View Showcase</Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full glass-morphism border border-white/20 flex items-center justify-center text-primary mx-auto mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Key className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Secure Ownership</h3>
              <p className="text-white/40 leading-relaxed">
                Masterful negotiation strategies that ensure you secure the premium property you desire on the best possible terms.
              </p>
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href="#" className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">Our Strategy</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Insights Footer snippet */}
      <section className="py-24 px-6 md:px-12 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">Market Insight</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-8 italic">
            "Sydney's premium market continues to lead global growth with a 15.2% appreciation in the last 12 months."
          </h2>
          <div className="flex items-center justify-center gap-4 text-sm font-medium text-black/40">
             <span>Source: Aether Market Research</span>
             <span className="w-1 h-1 rounded-full bg-black/20" />
             <span>Q4 2026 Forecast</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
