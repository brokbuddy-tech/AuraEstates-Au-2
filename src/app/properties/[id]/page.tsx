"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  Loader2,
  Phone,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getPropertyById, type AuraProperty } from "@/lib/api";

const EERGauge = ({ value }: { value: number }) => {
  const rotation = (value / 10) * 180 - 90;
  return (
    <div className="relative w-48 h-24 overflow-hidden flex flex-col items-center">
      <svg className="w-48 h-24" viewBox="0 0 100 50">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F1F5F9" strokeWidth="10" strokeLinecap="round" />
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset={125.6 - (value / 10) * 125.6} />
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
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#F1F5F9" strokeWidth="10" strokeLinecap="round" />
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#internet-gradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset={0} />
        <defs>
          <linearGradient id="internet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>
        <g transform="rotate(70, 50, 50)">
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
  const { toast } = useToast();
  const [property, setProperty] = useState<AuraProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadProperty() {
      setLoading(true);
      const result = await getPropertyById(propertyId);
      if (!active) return;
      setProperty(result);
      setLoading(false);
    }

    loadProperty();

    return () => {
      active = false;
    };
  }, [propertyId]);

  const handleDownloadBrochure = async () => {
    const element = document.getElementById("digital-brochure-container");
    if (!element || !property) return;

    setIsDownloading(true);
    toast({
      title: "Generating Brochure",
      description: "We are preparing your premium digital dossier...",
    });

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width / 2, canvas.height / 2],
      });

      pdf.addImage(imgData, "JPEG", 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`Aura-Brochure-${property.title.replace(/\s+/g, "-")}.pdf`);

      toast({
        title: "Download Complete",
        description: "Your digital brochure has been saved successfully.",
      });
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast({
        variant: "destructive",
        title: "Download Failed",
        description: "An error occurred while generating your PDF. Please try again.",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-sm uppercase tracking-[0.3em] text-[#111111]/40">Loading property</p>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-black uppercase tracking-tight text-[#111111] mb-4">Property not found</h1>
          <p className="text-[#111111]/50 mb-8">This listing is no longer available through the public portfolio.</p>
          <Link href="/buy" className="inline-flex px-8 py-4 rounded-xl bg-[#111111] text-white font-bold uppercase tracking-[0.2em]">
            Back to listings
          </Link>
        </div>
      </main>
    );
  }

  const gallery = property.images.length > 0 ? property.images : [property.image];
  const heroImages = [gallery[0] || property.image, gallery[1] || property.image, gallery[2] || property.image];
  const features = property.features.length > 0 ? property.features : ["Designer kitchen", "Secure parking", "Flexible entertaining spaces", "Lifestyle location"];
  const numericPrice = property.priceValue || 0;
  const agent = {
    name: property.agentName,
    role: property.transactionType === "RENT" ? "LEASING EXECUTIVE" : "SENIOR SALES EXECUTIVE",
    image: "https://picsum.photos/seed/agent-vance/200/200",
    sold: "142+",
    experience: "15",
    rating: "4.9",
    phone: property.agentPhone || "+61 400 000 000",
    email: property.agentEmail || "advisor@auraestates.com.au",
  };
  const whatsappHref = property.agentWhatsapp
    ? `https://wa.me/${property.agentWhatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${property.agentName}, I am interested in ${property.address}.`)}`
    : `https://wa.me/61400000000?text=${encodeURIComponent(`Hi ${property.agentName}, I am interested in ${property.address}.`)}`;

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-primary/20">
      <section className="pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[60vh] md:h-[70vh]">
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden group">
              <Image src={heroImages[0]} alt={property.title} fill className="object-cover" priority />
              <Button variant="outline" className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border-none text-[#111111] font-bold rounded-xl shadow-xl">
                <Maximize2 className="w-4 h-4 mr-2" /> View All Photos
              </Button>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="relative flex-1 rounded-3xl overflow-hidden">
                <Image src={heroImages[1]} alt="Detail 1" fill className="object-cover" />
              </div>
              <div className="relative flex-1 rounded-3xl overflow-hidden">
                <Image src={heroImages[2]} alt="Detail 2" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                  <p className="text-2xl md:text-4xl font-black text-primary tracking-tighter mb-1">
                    ${numericPrice.toLocaleString("en-AU")}
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
                    <p className="font-black text-xl">{property.area} m2</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight">The Vision</h3>
                <p className="text-lg text-[#111111]/60 leading-relaxed font-light">{property.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> {feature}
                    </div>
                  ))}
                </div>
              </div>

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
                      This property's energy efficiency has a <span className="text-[#111111] font-bold">medium quality</span> rating of <span className="text-[#111111] font-bold">6/10</span>.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center">
                    <EERGauge value={6.0} />
                  </div>
                </div>
              </div>

              <div className="pt-12 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight">Internet Availability</h3>
                  <p className="text-[10px] text-[#111111]/40 font-bold uppercase tracking-widest">{property.address} has a premium fibre connection, updated Mar 2026</p>
                </div>
                <div className="bg-[#F8F9FA] border border-[#F1F1F1] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <h4 className="text-lg font-black text-[#111111]">Current broadband profile</h4>
                      <span className="px-2 py-0.5 bg-[#E0F2FE] text-[#0369A1] text-[10px] font-bold rounded uppercase">FTTP</span>
                    </div>
                    <p className="text-[#111111]/60 text-lg font-light leading-relaxed">
                      This property is suited for high-speed fibre internet plans with strong support for remote work, streaming, and smart-home systems.
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center justify-center">
                    <InternetGauge quality="Amazing" />
                  </div>
                </div>
              </div>

              <div className="pt-12 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight">Auction & Inspection Notes</h3>
                  <p className="text-[10px] text-[#111111]/40 font-bold uppercase tracking-widest">Contact the listing advisor for the current inspection timetable</p>
                </div>
                <div className="bg-white border border-[#F1F1F1] rounded-3xl p-8 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="flex items-center gap-4 p-6 bg-[#F8F9FA] rounded-2xl border border-[#F1F1F1]">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Inspection Window</p>
                        <p className="font-black text-lg">By Appointment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-[#F8F9FA] rounded-2xl border border-[#F1F1F1]">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-[#111111]/30 tracking-widest">Status</p>
                        <p className="font-black text-lg">{property.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-black/5 flex flex-col">
                <div className="relative h-48 w-full">
                  <Image src="https://picsum.photos/seed/arch-header/600/400" alt="Background" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/90" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-6 text-center">
                    <div className="relative w-24 h-24 rounded-full border-2 border-white overflow-hidden mb-4 shadow-xl translate-y-2">
                      <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                    </div>
                    <h4 className="text-white font-black text-xl tracking-tight uppercase">{agent.name}</h4>
                    <p className="text-[#005F73] text-[10px] font-bold uppercase tracking-widest mt-1">{agent.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 py-6 border-b border-black/5 mx-8">
                  <div className="text-center space-y-1">
                    <p className="text-lg font-black text-[#111111]">{agent.sold}</p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Sold</p>
                  </div>
                  <div className="text-center space-y-1 border-x border-black/5">
                    <p className="text-lg font-black text-[#111111]">{agent.experience}y</p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Exp</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-lg font-black text-[#111111] flex items-center justify-center gap-1">
                      {agent.rating} <Star className="w-3 h-3 fill-current text-primary" />
                    </p>
                    <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-widest">Rating</p>
                  </div>
                </div>

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
                      <div id="digital-brochure-container" className="relative bg-white">
                        <div className="relative h-[300px] w-full">
                          <Image src={heroImages[0]} alt="Brochure Cover" fill className="object-cover" />
                          <div className="absolute inset-0 bg-black/40" />
                        </div>

                        <div className="grid grid-cols-3 gap-1 px-1 mt-1">
                          {gallery.map((image, idx) => (
                            <div key={idx} className="relative aspect-video">
                              <Image src={image} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                            </div>
                          ))}
                        </div>

                        <div className="p-12 space-y-12">
                          <div className="space-y-2">
                            <div className="flex items-center gap-4">
                              <p className="text-primary font-black text-3xl tracking-tighter">${numericPrice.toLocaleString("en-AU")}</p>
                              <div className="flex-1 h-px bg-primary/10" />
                            </div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-[#111111]">{property.title}</h2>
                            <div className="w-12 h-1 bg-primary mt-4" />
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-[#F1F1F1]">
                            <div className="text-center"><p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Beds</p><p className="text-2xl font-black">{property.beds}</p></div>
                            <div className="text-center border-l border-[#F1F1F1]"><p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Baths</p><p className="text-2xl font-black">{property.baths}</p></div>
                            <div className="text-center border-l border-[#F1F1F1]"><p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Cars</p><p className="text-2xl font-black">{property.cars}</p></div>
                            <div className="text-center border-l border-[#F1F1F1]"><p className="text-[10px] font-bold uppercase text-[#111111]/40 tracking-widest mb-2">Size</p><p className="text-2xl font-black">{property.area} m2</p></div>
                          </div>

                          <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase tracking-tight">Executive Summary</h3>
                            <p className="text-lg text-[#111111]/60 leading-relaxed font-light">{property.description}</p>
                          </div>
                        </div>

                        <div className="sticky bottom-0 bg-white border-t border-[#F1F1F1] p-6 flex justify-center">
                          <Button onClick={handleDownloadBrochure} disabled={isDownloading} className="bg-[#111111] text-white font-bold h-14 px-12 rounded-xl flex items-center gap-3 shadow-2xl disabled:opacity-50">
                            {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                            {isDownloading ? "GENERATING PDF..." : "DOWNLOAD PDF BROCHURE"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline" className="h-12 bg-black/5 border-none text-[#111111] font-bold rounded-xl hover:bg-black/10 transition-all flex items-center justify-center gap-2">
                      <a href={`sms:${agent.phone}`}><MessageSquare className="w-4 h-4" /> SMS</a>
                    </Button>
                    <Button asChild variant="outline" className="h-12 bg-black/5 border-none text-[#111111] font-bold rounded-xl hover:bg-black/10 transition-all flex items-center justify-center gap-2">
                      <a href={`mailto:${agent.email}`}><Mail className="w-4 h-4" /> EMAIL</a>
                    </Button>
                  </div>

                  <div className="text-center pt-4">
                    <Link href={whatsappHref} target="_blank" className="text-[#005F73] text-xs font-bold uppercase tracking-widest hover:underline flex items-center justify-center gap-2">
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
