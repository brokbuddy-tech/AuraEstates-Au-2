
"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar as CalendarIcon,
  ArrowRight,
  Info,
  QrCode,
  Share2,
  Heart,
  MessageSquare,
  Mail,
  FileText,
  Award,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export default function PropertyShowcase() {
  const params = useParams();
  const propertyId = params.id as string;
  const property = PROPERTY_DATA[propertyId as keyof typeof PROPERTY_DATA] || PROPERTY_DATA["b1"];
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedState, setSelectedState] = useState("nsw");
  const [depositPercent, setDepositPercent] = useState(10);

  // Financial Calculations
  const financials = useMemo(() => {
    const price = property.price;
    // Simple rough estimates for 2026 AU market
    const rates = { nsw: 0.045, vic: 0.055, qld: 0.035, wa: 0.04, sa: 0.05 };
    const stampDuty = price * (rates[selectedState as keyof typeof rates] || 0.045);
    const legalFees = 2800;
    const deposit = price * (depositPercent / 100);
    const totalUpfront = stampDuty + legalFees + deposit;

    return {
      stampDuty,
      legalFees,
      deposit,
      totalUpfront
    };
  }, [property.price, selectedState, depositPercent]);

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-primary/20">
      <Navbar />

      {/* 1. Hero Experience (Gallery) */}
      <section className="pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[60vh] md:h-[70vh]">
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${property.images[0]})` }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
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
          
          {/* Left Column: Dossier & Transparency */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 2. Property Dossier & Specs */}
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                  <h1 className="text-xl md:text-3xl font-black tracking-tighter uppercase">{property.title}</h1>
                  <p className="text-[#111111]/40 text-sm md:text-base font-medium tracking-widest uppercase">{property.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg md:text-2xl font-black text-primary tracking-tighter">
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
            </div>

            {/* 3. Compliance & Trust */}
            <div className="bg-[#F8F9FA] rounded-[2.5rem] p-8 md:p-12 border border-[#F1F1F1] flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-32 h-32 bg-white rounded-2xl p-2 shadow-inner flex items-center justify-center border border-[#F1F1F1]">
                <QrCode className="w-full h-full text-[#111111]/20 group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-primary w-6 h-6" />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">REIA Compliance No: <span className="text-primary">AE-2026-X942</span></h3>
                </div>
                <p className="text-[#111111]/50 text-sm leading-relaxed">
                  This property listing has been independently reviewed and verified for Australian compliance and legal standards. Verified by the Real Estate Institute of Australia (REIA) for transparency and consumer protection.
                </p>
                <button className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] hover:underline">Download Compliance Certificate</button>
              </div>
            </div>

            {/* 4. Financial Transparency */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Financial Transparency</h3>
                <div className="flex items-center gap-2 text-primary">
                  <Info className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Estimated Purchase Breakdown</span>
                </div>
              </div>

              <div className="glass-morphism rounded-3xl p-8 md:p-12 border border-[#F1F1F1] shadow-sm space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest">Select State</Label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="h-12 rounded-xl bg-white border-[#F1F1F1]">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nsw">New South Wales</SelectItem>
                        <SelectItem value="vic">Victoria</SelectItem>
                        <SelectItem value="qld">Queensland</SelectItem>
                        <SelectItem value="wa">Western Australia</SelectItem>
                        <SelectItem value="sa">South Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest">Deposit Percentage</Label>
                    <div className="relative">
                      <Input 
                        type="number" 
                        value={depositPercent} 
                        onChange={(e) => setDepositPercent(Number(e.target.value))}
                        className="h-12 rounded-xl bg-white border-[#F1F1F1] pr-10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#111111]/40">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest">Est. Settlement Period</Label>
                    <div className="h-12 rounded-xl bg-white border border-[#F1F1F1] flex items-center px-4 text-sm font-medium">
                      42 Days (Standard)
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-[#F1F1F1]">
                    <span className="text-sm font-medium text-[#111111]/60">Purchase Price</span>
                    <span className="text-lg font-black">${property.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#F1F1F1]">
                    <span className="text-sm font-medium text-[#111111]/60">Stamp Duty (Estimated {selectedState.toUpperCase()})</span>
                    <span className="text-lg font-black">${financials.stampDuty.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#F1F1F1]">
                    <span className="text-sm font-medium text-[#111111]/60">Conveyancing & Legal Fees (GST Inc.)</span>
                    <span className="text-lg font-black">${financials.legalFees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-[#F1F1F1]">
                    <span className="text-sm font-medium text-[#111111]/60">Deposit Amount ({depositPercent}%)</span>
                    <span className="text-lg font-black">${financials.deposit.toLocaleString()}</span>
                  </div>
                  
                  <div className="pt-6 flex justify-between items-center">
                    <div>
                      <h4 className="text-3xl font-black uppercase tracking-tighter">Total Upfront</h4>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#111111]/30">Initial Capital Commitment</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl md:text-5xl font-black text-primary tracking-tighter">
                        ${financials.totalUpfront.toLocaleString()}
                      </p>
                    </div>
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
                    <p className="text-lg font-black text-[#111111]">{property.agent.sold}</p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Sold</p>
                  </div>
                  <div className="text-center space-y-1 border-x border-black/5">
                    <p className="text-lg font-black text-[#111111]">{property.agent.experience}</p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Exp</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-black text-[#111111] flex items-center justify-center gap-1">
                      {property.agent.rating} <Star className="w-3 h-3 fill-current text-primary" />
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

              {/* Quick Actions (External) */}
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-12 rounded-2xl border-[#F1F1F1] font-bold text-xs uppercase tracking-widest bg-white">
                  SAVE TO FAVORITES
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-2xl border-[#F1F1F1] font-bold text-xs uppercase tracking-widest bg-white">
                  DOWNLOAD PDF
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
