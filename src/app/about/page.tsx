
"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Sparkles, ShieldCheck, Heart, Award } from "lucide-react";

export default function AboutPage() {
  const backgroundImage = PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl;

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <Navbar />

      <section className="relative pt-32 pb-24 px-6 md:px-12 overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt="About Background"
              fill
              className="object-cover opacity-20"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-10" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto text-center">
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block animate-fade-up">Our Legacy</span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight animate-fade-up">
            Redefining <span className="text-primary italic">Luxury</span> Real Estate
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-16 animate-fade-up [animation-delay:100ms]">
            At AuraEstates, we believe that finding a home is more than a transaction—it's an emotional journey. We blend cutting-edge AI technology with deep human expertise to deliver an unparalleled property experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Sparkles, title: "Innovation", desc: "AI-driven insights for smarter decisions." },
              { icon: ShieldCheck, title: "Trust", desc: "Built on a foundation of absolute transparency." },
              { icon: Heart, title: "Passion", desc: "Dedicated to finding your perfect sanctuary." },
              { icon: Award, title: "Excellence", desc: "The gold standard in premium real estate." }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="glass-morphism p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-all group animate-fade-up"
                style={{ animationDelay: `${200 + idx * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#151d1a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden glass-morphism border border-white/10 animate-fade-up">
             <Image 
              src="https://picsum.photos/seed/aura8/1000/1000" 
              alt="Our Story" 
              fill 
              className="object-cover"
              data-ai-hint="luxury office"
             />
             <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
          <div className="space-y-8 animate-fade-up [animation-delay:200ms]">
            <h2 className="text-4xl font-bold text-white tracking-tight">The <span className="text-primary">Aura</span> Story</h2>
            <p className="text-white/60 leading-relaxed text-lg">
              Founded in Sydney, AuraEstates emerged from a simple observation: the real estate market was ready for a digital evolution that didn't sacrifice the prestige and personal touch of high-end consultancy.
            </p>
            <p className="text-white/60 leading-relaxed text-lg">
              Today, we are Australia's fastest-growing premium property platform, serving thousands of buyers and sellers who demand more from their real estate partners. We don't just list properties; we curate lifestyle opportunities.
            </p>
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-black text-white">$4.2B+</p>
                <p className="text-primary text-xs uppercase font-bold tracking-widest mt-1">Property Value Managed</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">12k+</p>
                <p className="text-primary text-xs uppercase font-bold tracking-widest mt-1">Happy Homeowners</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
