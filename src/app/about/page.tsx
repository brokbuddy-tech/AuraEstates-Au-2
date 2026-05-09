"use client";

import React from "react";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { 
  Users, 
  ShieldCheck, 
  BarChart3, 
  RefreshCcw, 
  Play,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuraAboutPageContent } from "@/components/public/agency-about-page";

const LEADERSHIP = [
  { name: "Alexander Vance", role: "Chief Executive Officer", image: "https://picsum.photos/seed/leader1/400/500" },
  { name: "Elena Rodriguez", role: "Head of Residential", image: "https://picsum.photos/seed/leader2/400/500" },
  { name: "Marcus Thorne", role: "Director of Acquisitions", image: "https://picsum.photos/seed/leader3/400/500" },
  { name: "Sophia Chen", role: "Chief Strategy Officer", image: "https://picsum.photos/seed/leader4/400/500" }
];

const VALUES = [
  { icon: Users, title: "People First", desc: "Our relationships are the bedrock of our success, prioritizing human connection above all else." },
  { icon: ShieldCheck, title: "Honesty Always", desc: "Absolute transparency in every transaction, ensuring trust is never a question." },
  { icon: BarChart3, title: "Results Matter", desc: "Driven by data and performance to secure the extraordinary outcomes our clients deserve." },
  { icon: RefreshCcw, title: "Always Improving", desc: "Relentless innovation in technology and strategy to define the future of the market." }
];

export default function AboutPage() {
  return <AuraAboutPageContent />;

  const heroImage = PlaceHolderImages.find(img => img.id === "hero-home")?.imageUrl;
  const metricsBg = PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl;

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-primary/20">
      {/* 1. Hero Section: The Vision */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 parallax-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-extralight text-white mb-6 tracking-tight uppercase">
            The Future of <br />
            <span className="font-black italic">Extraordinary Living.</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base font-medium tracking-[0.3em] uppercase max-w-xl mx-auto">
            Redefining the Australian property landscape through data and design.
          </p>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-white/30 mx-auto" />
        </div>
      </section>

      {/* 2. Who We Are (Z-Pattern Block 1) */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden group cursor-pointer">
            <Image 
              src="https://picsum.photos/seed/about-arch/1200/900" 
              alt="Architecture" 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              data-ai-hint="modern architecture"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full glass-morphism flex items-center justify-center text-white hover:bg-white hover:text-[#111111] transition-all border border-white/20">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Est. 2012</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#111111] uppercase tracking-tighter leading-none">
              A Legacy of <br /><span className="text-primary italic">Innovation.</span>
            </h2>
            <p className="text-lg text-[#111111]/60 leading-relaxed font-light">
              Born in the heart of Sydney, Aether Australia emerged as a response to a changing world. We recognized that the high-end market required more than just property listings—it required a strategic advisory partner that blends market intelligence with deep architectural appreciation.
            </p>
            <Button variant="link" className="p-0 h-auto text-primary font-bold uppercase tracking-widest text-xs group">
              Our full history <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* 2. How We Work (Z-Pattern Block 2) */}
      <section className="py-24 px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Methodology</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#111111] uppercase tracking-tighter leading-none">
              Data Driven, <br /><span className="text-primary italic">Human Centered.</span>
            </h2>
            <p className="text-lg text-[#111111]/60 leading-relaxed font-light">
              By 2026, we have integrated predictive AI models that analyze multi-decade market cycles, yet we never lose sight of the emotional journey. Every decision is backed by cold data but executed with warm, human expertise. We don't just find houses; we secure legacies.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-black text-[#111111]">$4.2B+</p>
                <p className="text-[10px] uppercase font-bold text-[#111111]/40 tracking-widest mt-1">Transacted Annually</p>
              </div>
              <div>
                <p className="text-3xl font-black text-[#111111]">15+</p>
                <p className="text-[10px] uppercase font-bold text-[#111111]/40 tracking-widest mt-1">Metropolitan Hubs</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-sm overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/aether-team/1200/900" 
              alt="The Team" 
              fill 
              className="object-cover"
              data-ai-hint="luxury office"
            />
          </div>
        </div>
      </section>

      {/* 3. Our Values & Mission (Icon Grid) */}
      <section className="py-32 px-6 md:px-12 bg-[#111111] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 opacity-[0.03] select-none pointer-events-none translate-x-1/4 -translate-y-1/4">
          <span className="text-[400px] font-black italic uppercase">Values</span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">The Pillars of <span className="text-primary">Aether.</span></h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {VALUES.map((val, idx) => (
              <div key={idx} className="group text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#005F73] mx-auto mb-8 group-hover:bg-[#005F73] group-hover:text-white transition-all duration-500">
                  <val.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{val.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Leadership & Expertise */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Visionaries</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#111111] uppercase tracking-tighter leading-none mt-4">
                Global Minds, <br />Local <span className="text-primary italic">Precision.</span>
              </h2>
            </div>
            <p className="text-[#111111]/40 max-w-sm font-light text-right">
              Our leadership team combines decades of international finance and real estate experience with a passion for Australian design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {LEADERSHIP.map((leader, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden mb-6">
                  <Image 
                    src={leader.image} 
                    alt={leader.name} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <h3 className="text-xl font-black text-[#111111] uppercase tracking-tighter">{leader.name}</h3>
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">{leader.role}</p>
              </div>
            ))}
          </div>

          {/* CEO Message Block */}
          <div className="mt-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/ceo/600/800" 
                alt="Alexander Vance CEO" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-12">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">A Message From Our CEO</span>
              <blockquote className="text-3xl md:text-5xl font-serif italic text-[#111111] leading-tight">
                "We don't just facilitate transactions; we cultivate environments where ambition meets its match. Aether is more than a agency—it is a promise of uncompromising quality and strategic clarity in a complex global market."
              </blockquote>
              <div className="pt-8 border-t border-[#111111]/10">
                <h4 className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Alexander Vance</h4>
                <p className="text-[#111111]/40 text-sm font-medium mt-1">Founder & Chief Executive Officer</p>
                <div className="mt-8">
                  <Image 
                    src="https://picsum.photos/seed/signature/200/80" 
                    alt="Signature" 
                    width={200} 
                    height={80} 
                    className="opacity-60 grayscale brightness-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Social Proof & Network */}
      <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 parallax-bg"
          style={{ backgroundImage: `url(${metricsBg})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="glass-morphism rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-6xl mx-auto backdrop-blur-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center items-center">
              <div className="space-y-2">
                <p className="text-4xl md:text-5xl font-black text-white">$4.2B+</p>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Transacted</p>
              </div>
              <div className="space-y-2 border-l border-white/5 lg:border-l lg:border-white/5">
                <p className="text-4xl md:text-5xl font-black text-white">300+</p>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Advisors</p>
              </div>
              <div className="space-y-2 border-l border-white/5 lg:border-l lg:border-white/5">
                <p className="text-4xl md:text-5xl font-black text-white">15+</p>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Global Hubs</p>
              </div>
              <div className="space-y-2 border-l border-white/5 lg:border-l lg:border-white/5">
                <p className="text-4xl md:text-5xl font-black text-white">24/7</p>
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-[0.3em]">Client Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
