
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  CheckCircle2, 
  ArrowRight,
  Heart,
  MessageSquare,
  Mail,
  FileText,
  Star,
  Share2,
  Info
} from "lucide-react";

// Mock Data for the Showcase (In a real app, this would come from Firestore)
const PROPERTY_DATA = {
  "b1": {
    id: "b1",
    title: "The Pavilion House",
    address: "15 Oceanview Drive, Vaucluse NSW 2030",
    price: 4250000,
    beds: 5,
    baths: 4,
    cars: 3,
    landSize: 850,
    description: "A breathtaking architectural masterpiece with uninterrupted Pacific views. This residence defines coastal luxury with expansive living zones, a private infinity pool, and state-of-the-art sustainable technology. Designed by Vance & Associates, the home features a seamless blend of off-form concrete, natural timber, and floor-to-ceiling high-performance glazing.",
    features: ["Solar Power", "Infinity Pool", "Smart Home v4", "Wine Cellar", "Private Lift", "Gym", "Home Cinema"],
    images: [
      "https://picsum.photos/seed/aura10/1200/800",
      "https://picsum.photos/seed/aura11/600/600",
      "https://picsum.photos/seed/aura12/600/600"
    ],
    agent: {
      name: "Alexander Vance",
      role: "SENIOR SALES EXECUTIVE",
      image: "https://picsum.photos/seed/agent-vance/200/200",
      sold: "142+",
      experience: "15y",
      rating: "4.9"
    }
  }
};

const EERGauge = ({ value }: { value: number }) => {
  const rotation = (value / 10) * 180 - 90; // Map 0-10 to -90 to 90 degrees
  return (
    <div className="relative w-48 h-24 overflow-hidden flex flex-col items-center">
      <svg className="w-48 h-24" viewBox="0 0 100 50">
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset={125.6 - (value / 10) * 125.6}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D9F99D" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        {/* Needle */}
        <g transform={`rotate(${rotation}, 50, 50)`}>
          <line x1="50" y1="50" x2="50" y2="15" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="3" fill="#334155" />
        </g>
      </svg>
      <p className="mt-2 text-xs font-black text-[#64748B] tracking-widest">{value.toFixed(1)} EER</p>
    </div>
  );
};

export default function PropertyShowcase() {
  const params = useParams();
  const propertyId = params.id as string;
  const property = PROPERTY_DATA[propertyId as keyof typeof PROPERTY_DATA] || PROPERTY_DATA["b1"];
  
  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-primary/20">
      <Navbar />

      {/* 1. Hero Experience (Gallery) */}
      <section className="pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[60vh] md:h-[70vh]">
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group">
              <Image 
                src={property.images[0]} 
                alt={property.title} 
                fill 
                className="object-cover"
                priority
              />
              <Button variant="outline" className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border-none text-[#111111] font-bold rounded-xl shadow-xl">
                <Maximize2 className="w-4 h-4 mr-2" /> View All Photos
              </Button>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="relative flex-1 rounded-3xl overflow-hidden">
                <Image src={property.images[1]} alt="Detail 1" fill className="object-cover" />
              </div>
              <div className="relative flex-1 rounded-3xl overflow-hidden">
                <Image src={property.images[2]} alt="Detail 2" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Dossier */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 2. Property Dossier & Specs */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                  <h1 className="text-sm md:text-base font-black tracking-tighter uppercase">{property.title}</h1>
                  <p className="text-[#111111]/40 text-xs md:text-sm font-medium tracking-widest uppercase">{property.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-sm font-black text-primary tracking-tighter">
                    ${property.price.toLocaleString()}
                  </p>
                  <div className="flex gap-2 justify-end mt-2">
                    <Button size="icon" variant="outline" className="rounded-full border-[#F1F1F1]"><Heart className="w-4 h-4" /></Button>
                    <Button size="icon" variant="outline" className="rounded-full border-[#F1F1F1]"><Share2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-y border-[#F1F1F1] pb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><Bed /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Bedrooms</p>
                    <p className="font-black text-xl">{property.beds}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-l border-[#F1F1F1] pl-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><Bath /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Bathrooms</p>
                    <p className="font-black text-xl">{property.baths}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-l border-[#F1F1F1] pl-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><Car /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Car Space</p>
                    <p className="font-black text-xl">{property.cars}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-l border-[#F1F1F1] pl-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><Maximize2 /></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Land Size</p>
                    <p className="font-black text-xl">{property.landSize}m²</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight">The Vision</h3>
                <p className="text-lg text-[#111111]/60 leading-relaxed font-light">{property.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {property.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Energy Efficiency Rating (EER) Section */}
              <div className="pt-12 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Energy Efficiency Rating (EER)</h3>
                    <p className="text-[10px] text-[#111111]/40 font-bold uppercase tracking-widest">Last updated in March 2026 from agent supplied data</p>
                  </div>
                  <Info className="w-4 h-4 text-[#111111]/20 cursor-help" />
                </div>

                <div className="bg-white border border-[#F1F1F1] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <p className="text-[#111111]/60 text-lg font-light leading-relaxed">
                      This property's energy efficiency has a <span className="text-[#111111] font-bold">medium quality</span> rating of <span className="text-[#111111] font-bold">6/10</span>. To learn more about EER Scores, visit the <Link href="#" className="text-[#005F73] font-bold hover:underline">Nationwide House Energy Rating Scheme.</Link>
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center">
                    <EERGauge value={6.0} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Expert Advisor Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 flex flex-col">
                
                {/* Hero Header */}
                <div className="relative h-48 w-full">
                  <Image 
                    src="https://picsum.photos/seed/arch-header/600/400" 
                    alt="Background" 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/90" />
                  
                  {/* Identity Block */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-6 text-center">
                    <div className="relative w-24 h-24 rounded-full border-2 border-white overflow-hidden mb-4 shadow-xl translate-y-2">
                      <Image src={property.agent.image} alt={property.agent.name} fill className="object-cover" />
                    </div>
                    <h4 className="text-white font-black text-xl tracking-tight uppercase">{property.agent.name}</h4>
                    <p className="text-[#005F73] text-[10px] font-bold uppercase tracking-widest mt-1">{property.agent.role}</p>
                  </div>
                </div>

                {/* Trust Grid (Performance Metrics) */}
                <div className="grid grid-cols-3 py-6 border-b border-black/5 mx-8">
                  <div className="text-center space-y-1">
                    <p className="text-lg font-black text-[#111111]">{property.agent.sold} SOLD</p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Sold</p>
                  </div>
                  <div className="text-center space-y-1 border-x border-black/5">
                    <p className="text-lg font-black text-[#111111]">{property.agent.experience}y EXP</p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Exp</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-black text-[#111111] flex items-center justify-center gap-1">
                      {property.agent.rating} <Star className="w-3 h-3 fill-current text-primary" /> RATING
                    </p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Rating</p>
                  </div>
                </div>

                {/* Communication Hub (Tiered CTA) */}
                <div className="p-8 space-y-4">
                  <Button className="w-full h-14 bg-[#005F73] hover:bg-[#004a5a] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#005F73]/20">
                    BOOK PRIVATE INSPECTION
                  </Button>
                  
                  <Button variant="outline" className="w-full h-12 bg-black/5 border-none text-[#111111] font-bold rounded-xl hover:bg-black/10 transition-all flex items-center justify-center gap-2">
                    <FileText className="w-4 h-4" /> VIEW DIGITAL BROCHURE
                  </Button>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 bg-black/5 border-none text-[#111111] font-bold rounded-xl hover:bg-black/10 transition-all flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" /> SMS
                    </Button>
                    <Button variant="outline" className="h-12 bg-black/5 border-none text-[#111111] font-bold rounded-xl hover:bg-black/10 transition-all flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" /> EMAIL
                    </Button>
                  </div>

                  <div className="text-center pt-4">
                    <Link 
                      href={`https://wa.me/61400000000?text=${encodeURIComponent(`Hi ${property.agent.name.split(' ')[0]}, I am interested in ${property.address}.`)}`}
                      className="text-[#005F73] text-xs font-bold uppercase tracking-widest hover:underline flex items-center justify-center gap-2"
                    >
                      WHATSAPP AGENT <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
