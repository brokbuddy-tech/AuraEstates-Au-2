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
  Info,
  Calendar,
  Clock,
  Download,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock Data for the Showcase
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
  const rotation = (value / 10) * 180 - 90;
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
        <g transform={`rotate(${rotation}, 50, 50)`}>
          <line x1="50" y1="50" x2="50" y2="15" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="3" fill="#334155" />
        </g>
      </svg>
      <p className="mt-2 text-xs font-black text-[#64748B] tracking-widest">{value.toFixed(1)} EER</p>
    </div>
  );
};

const InternetGauge = ({ quality }: { quality: string }) => {
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
          stroke="url(#internet-gradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset={0}
        />
        <defs>
          <linearGradient id="internet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        <g transform={`rotate(70, 50, 50)`}>
          <line x1="50" y1="50" x2="50" y2="15" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="3" fill="#334155" />
        </g>
      </svg>
      <p className="mt-2 text-[10px] font-black text-[#64748B] tracking-[0.3em] uppercase">{quality}</p>
    </div>
  );
};

export default function PropertyShowcase() {
  const params = useParams();
  const propertyId = params.id as string;
  const property = PROPERTY_DATA[propertyId as keyof typeof PROPERTY_DATA] || PROPERTY_DATA["b1"];
  
  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-primary/20">
      <Navbar theme="light" />

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
                  <p className="text-2xl md:text-4xl font-black text-primary tracking-tighter mb-1">
                    ${property.price.toLocaleString()}
                  </p>
                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">{property.title}</h1>
                  <p className="text-[#111111]/40 text-sm font-medium tracking-widest uppercase mt-4">{property.address}</p>
                </div>
                <div className="text-right">
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

              {/* Internet Availability Section */}
              <div className="pt-12 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight">Internet Availability</h3>
                  <p className="text-[10px] text-[#111111]/40 font-bold uppercase tracking-widest">{property.address} has an FTTP NBN connection, updated Mar 2026</p>
                </div>

                <div className="bg-[#F8F9FA] border border-[#F1F1F1] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-black text-[#111111]">Current NBN connection</h4>
                      <span className="px-2 py-0.5 bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold rounded uppercase">FTTP</span>
                    </div>
                    <p className="text-[#111111]/60 text-lg font-light leading-relaxed">
                      This property is connected to <span className="text-[#005F73] font-bold">NBN Fibre to the Premises</span> which can support download speeds up to 1000Mbps and 400Mbps upload with a corresponding internet plan.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center">
                    <InternetGauge quality="Amazing" />
                  </div>
                </div>
                <p className="text-[10px] text-[#111111]/30 font-medium">
                  Always check with your preferred provider to see what options are available at this property
                </p>
              </div>

              {/* Auction Details Section */}
              <div className="pt-12 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight">Auction Details</h3>
                  <p className="text-[10px] text-[#111111]/40 font-bold uppercase tracking-widest">Public Auction - Registered bidders only</p>
                </div>

                <div className="bg-white border border-[#F1F1F1] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12">
                   <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <div className="flex items-center gap-4 p-6 bg-[#F8F9FA] rounded-2xl border border-[#F1F1F1]">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Auction Date</p>
                          <p className="font-black text-lg">Saturday, 28 March 2026</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-6 bg-[#F8F9FA] rounded-2xl border border-[#F1F1F1]">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Commencing</p>
                          <p className="font-black text-lg">11:00 AM AEST</p>
                        </div>
                      </div>
                   </div>
                </div>
                <p className="text-[10px] text-[#111111]/30 font-medium">
                  Registration closes 24 hours prior to commencement. Contact agent for registration details.
                </p>
              </div>

              {/* Property Location Map Section */}
              <div className="pt-12 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight">Property Location</h3>
                  <p className="text-[10px] text-[#111111]/40 font-bold uppercase tracking-widest">{property.address}</p>
                </div>

                <div className="relative aspect-video rounded-3xl overflow-hidden border border-[#F1F1F1] group cursor-pointer shadow-sm">
                  <Image 
                    src="https://picsum.photos/seed/property-map/1200/600" 
                    alt="Property Map" 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    data-ai-hint="city map"
                  />
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
                  
                  {/* Map Pin Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                      <div className="w-4 h-4 rounded-full bg-primary shadow-2xl shadow-primary/50" />
                    </div>
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="glass-morphism px-4 py-2 rounded-xl text-[#111111] border-white/40 shadow-xl backdrop-blur-xl">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#111111]/60">GPS Coordinates</p>
                      <p className="text-xs font-bold">-33.8568, 151.2153</p>
                    </div>
                    <Button className="bg-white text-[#111111] hover:bg-white/90 font-bold rounded-xl shadow-xl">
                      GET DIRECTIONS
                    </Button>
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
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full h-12 bg-black/5 border-none text-[#111111] font-bold rounded-xl hover:bg-black/10 transition-all flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" /> VIEW DIGITAL BROCHURE
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white rounded-3xl">
                      <div className="relative">
                        {/* Brochure Header Image */}
                        <div className="relative h-[300px] w-full">
                          <Image 
                            src={property.images[0]} 
                            alt="Brochure Cover" 
                            fill 
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 text-white">
                            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4">{property.title}</h2>
                            <p className="text-lg font-medium uppercase tracking-[0.2em]">{property.address}</p>
                          </div>
                        </div>

                        {/* Gallery Row */}
                        <div className="grid grid-cols-3 gap-1 px-1 mt-1">
                          {property.images.map((img, idx) => (
                            <div key={idx} className="relative aspect-video">
                              <Image 
                                src={img} 
                                alt={`Gallery ${idx + 1}`} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Brochure Content */}
                        <div className="p-12 space-y-12">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[#F1F1F1]">
                            <div className="text-center">
                              <p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Beds</p>
                              <p className="text-2xl font-black">{property.beds}</p>
                            </div>
                            <div className="text-center border-l border-[#F1F1F1]">
                              <p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Baths</p>
                              <p className="text-2xl font-black">{property.baths}</p>
                            </div>
                            <div className="text-center border-l border-[#F1F1F1]">
                              <p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Cars</p>
                              <p className="text-2xl font-black">{property.cars}</p>
                            </div>
                            <div className="text-center border-l border-[#F1F1F1]">
                              <p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Size</p>
                              <p className="text-2xl font-black">{property.landSize}m²</p>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase tracking-tight">Executive Summary</h3>
                            <p className="text-lg text-[#111111]/60 leading-relaxed font-light">
                              {property.description}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                              <h3 className="text-xl font-black uppercase tracking-tight">Key Features</h3>
                              <ul className="space-y-3">
                                {property.features.map((f, i) => (
                                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="relative aspect-square rounded-2xl overflow-hidden">
                              <Image src={property.images[1]} alt="Interior" fill className="object-cover" />
                            </div>
                          </div>

                          {/* Agent Card in Brochure */}
                          <div className="bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                                <Image src={property.agent.image} alt={property.agent.name} fill className="object-cover" />
                              </div>
                              <div>
                                <h4 className="text-xl font-black uppercase">{property.agent.name}</h4>
                                <p className="text-primary text-[10px] font-bold uppercase tracking-widest">{property.agent.role}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="icon" className="rounded-full bg-white"><Mail className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="rounded-full bg-white"><MessageSquare className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        </div>

                        {/* Download Sticky Action */}
                        <div className="sticky bottom-0 bg-white border-t border-[#F1F1F1] p-6 flex justify-center">
                          <Button className="bg-[#111111] text-white font-bold h-14 px-12 rounded-xl flex items-center gap-3 shadow-2xl">
                            <Download className="w-5 h-5" /> DOWNLOAD PDF BROCHURE
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

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
