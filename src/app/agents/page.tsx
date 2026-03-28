"use client";

import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Award, Search, ArrowRight, TrendingUp, Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const AGENTS = [
  {
    id: "a1",
    name: "Alexander Vance",
    role: "Director | Principal Consultant",
    region: "Sydney Eastern Suburbs",
    image: "https://picsum.photos/seed/agent-vance/400/500",
    phone: "+61 400 000 001",
    email: "alexander@auraestates.com.au",
    bio: "With over 15 years in the premium market, Alexander specializes in off-market transactions and coastal estates."
  },
  {
    id: "a2",
    name: "Elena Rodriguez",
    role: "Senior Associate",
    region: "Melbourne CBD & Southbank",
    image: "https://picsum.photos/seed/agent-elena/400/500",
    phone: "+61 400 000 002",
    email: "elena@auraestates.com.au",
    bio: "Elena is renowned for her expert negotiation skills and deep understanding of high-density luxury developments."
  },
  {
    id: "a3",
    name: "Marcus Thorne",
    role: "Strategic Acquisition Specialist",
    region: "Gold Coast & Byron Bay",
    image: "https://picsum.photos/seed/agent-marcus/400/500",
    phone: "+61 400 000 003",
    email: "marcus@auraestates.com.au",
    bio: "Specializing in beachfront lifestyle properties, Marcus connects international investors with Queensland's finest assets."
  },
  {
    id: "a4",
    name: "Sophia Chen",
    role: "Residential Consultant",
    region: "North Shore, Sydney",
    image: "https://picsum.photos/seed/agent-sophia/400/500",
    phone: "+61 400 000 004",
    email: "sophia@auraestates.com.au",
    bio: "Sophia combines a background in interior design with real estate expertise to help clients see the true potential of every home."
  },
  {
    id: "a5",
    name: "Julian Blackwood",
    role: "Auctioneer & Sales Partner",
    region: "Adelaide Hills",
    image: "https://picsum.photos/seed/agent-julian/400/500",
    phone: "+61 400 000 005",
    email: "julian@auraestates.com.au",
    bio: "A master of the gavel, Julian has achieved record clearance rates across South Australia's premium heritage market."
  },
  {
    id: "a6",
    name: "Isabella Sterling",
    role: "Relationship Manager",
    region: "Perth Coastal",
    image: "https://picsum.photos/seed/agent-isabella/400/500",
    phone: "+61 400 000 006",
    email: "isabella@auraestates.com.au",
    bio: "Dedicated to providing a seamless, stress-free experience for luxury buyers relocating to Western Australia."
  }
];

export default function AgentsPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl;

  return (
    <main className="min-h-screen bg-[#F8F9FA] relative flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div className="absolute inset-0 bg-[#111111]/60" />
        </div>

        <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-4 block">Expert Consultancy</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter leading-none">
            Find Your <span className="text-primary">Agent.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mb-8">
            Connect with Australia's most influential real estate consultants and strategic advisors.
          </p>
          
          <div className="w-full max-w-xl glass-morphism p-2 rounded-2xl flex items-center gap-2 border border-white/20">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input 
                placeholder="Search by name, region or expertise..." 
                className="bg-transparent border-none text-white placeholder:text-white/30 h-12 pl-12 focus-visible:ring-0"
              />
            </div>
            <Button className="h-12 px-6 bg-primary text-white font-bold rounded-xl">
              FIND
            </Button>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">The Aether Network</h2>
              <p className="text-[#111111]/40 text-sm font-medium mt-1">Specialists across every Australian capital city</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span className="text-xs font-bold text-[#111111]/60 uppercase tracking-widest">Sort by:</span>
              <button className="text-xs font-black uppercase text-primary tracking-widest hover:underline">Availability</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {AGENTS.map((agent) => (
              <Card key={agent.id} className="group relative flex flex-col border-none shadow-none bg-transparent overflow-hidden">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                  <Image 
                    src={agent.image} 
                    alt={agent.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint="professional headshot"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                     <div className="flex items-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white backdrop-blur-md rounded-xl hover:bg-primary transition-colors">
                          <Phone className="w-4 h-4 mr-2" /> Call
                        </Button>
                        <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white backdrop-blur-md rounded-xl hover:bg-primary transition-colors">
                          <Mail className="w-4 h-4 mr-2" /> Email
                        </Button>
                     </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black text-[#111111] tracking-tight">{agent.name}</h3>
                      <p className="text-primary text-xs font-bold uppercase tracking-widest">{agent.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#F7F6F2] flex items-center justify-center text-[#111111]/20">
                       <Award className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <p className="flex items-center gap-2 text-[#111111]/40 text-sm font-medium">
                    <MapPin className="w-3 h-3" /> {agent.region}
                  </p>
                  
                  <p className="text-[#111111]/60 text-sm leading-relaxed pt-4 border-t border-[#F7F6F2]">
                    {agent.bio}
                  </p>
                </div>
                
                <div className="mt-6">
                  <button className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest group-hover:gap-4 transition-all">
                    View Portfolio <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-24 py-12 border-y border-[#F7F6F2] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#111111]">Join the Aether Network</h3>
              <p className="text-[#111111]/60 mt-2">Are you a high-performing agent looking to leverage the world's most advanced property AI?</p>
            </div>
            <Button size="lg" className="h-14 px-8 bg-[#111111] text-white font-bold rounded-xl hover:bg-primary transition-all">
              CAREERS AT AETHER
            </Button>
          </div>
        </div>
      </section>

      {/* Valuation Calculator Section */}
      <section className="py-24 px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Market Intelligence</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter leading-none">
                Instant <span className="text-primary italic">Valuation.</span>
              </h2>
              <p className="text-lg text-[#111111]/60 leading-relaxed font-light">
                Leveraging Aether's proprietary AI models, we analyze millions of data points across Australia to provide you with a real-time estimate of your property's market value.
              </p>
              
              <div className="space-y-6 bg-white p-8 rounded-3xl border border-[#E5E7EB] shadow-sm">
                <div className="space-y-2">
                  <Label htmlFor="suburb" className="text-xs uppercase font-bold tracking-widest text-[#111111]/40">Suburb</Label>
                  <Input id="suburb" placeholder="e.g. Vaucluse, NSW" className="h-12 rounded-xl" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-[#111111]/40">Property Type</Label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase font-bold tracking-widest text-[#111111]/40">Bedrooms</Label>
                    <Select>
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Beds" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bed</SelectItem>
                        <SelectItem value="2">2 Beds</SelectItem>
                        <SelectItem value="3">3 Beds</SelectItem>
                        <SelectItem value="4">4+ Beds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button className="w-full h-14 bg-[#111111] text-white font-bold rounded-xl hover:bg-primary transition-all">
                  CALCULATE ESTIMATE
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="glass-morphism rounded-[2.5rem] p-12 border border-white/20 bg-white/40 shadow-2xl overflow-hidden text-center space-y-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto">
                  <TrendingUp className="w-10 h-10" />
                </div>
                
                <div>
                  <p className="text-xs font-bold text-[#111111]/40 uppercase tracking-[0.3em] mb-2">Estimated Market Range</p>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] tracking-tighter">$2,450,000 - $2,780,000</h3>
                </div>

                <div className="pt-8 border-t border-[#111111]/5">
                  <p className="text-sm text-[#111111]/60 font-medium italic">
                    "This estimate is powered by Aether AI v4.2 and includes recent off-market transactions in your area."
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 pt-4">
                  <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    High Confidence
                  </div>
                  <div className="px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                    Q3 2026 Updated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">Bespoke Strategy</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Strategic Advice, <span className="text-primary">Human</span> Touch.</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Our agents are more than just sales representatives; they are strategic acquisition partners and valuation experts who use the Aether Market Intelligence engine to find value where others can't.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Record Results</h4>
                <p className="text-xs text-white/30">Aether agents consistently achieve 8.4% above market median.</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg">Local Mastery</h4>
                <p className="text-xs text-white/30">Deep presence in every premium postcode across the country.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass-morphism border border-white/10">
             <Image 
              src="https://picsum.photos/seed/consultation/800/800" 
              alt="Consultation" 
              fill 
              className="object-cover opacity-60"
             />
             <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-tighter">Book a Strategic Appraisal</h3>
                <Button className="h-14 px-12 bg-primary text-white font-bold rounded-xl shadow-2xl shadow-primary/20">
                   REQUEST CONSULTATION
                </Button>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
