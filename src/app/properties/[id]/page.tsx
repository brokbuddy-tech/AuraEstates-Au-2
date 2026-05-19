"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FooterClient } from "@/components/footer-client";
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
import { PropertyHeroGallery } from "@/components/property-hero-gallery";
import { getPropertyById, type AuraProperty } from "@/lib/api";
import { resolveAgencySlugFromPathname } from "@/lib/agency-routing";

const DynamicLocationMap = dynamic(
  () => import("@/components/location-map").then((mod) => ({ default: mod.LocationMap })),
  {
    ssr: false,
    loading: () => (
      <div className="leaflet-property-map relative h-96 w-full overflow-hidden rounded-3xl border border-border bg-muted/35 animate-pulse" />
    ),
  }
);

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

function waitForImageAsset(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });

    if (typeof image.decode === "function") {
      image.decode().then(finish).catch(() => undefined);
    }
  });
}

async function waitForElementAssets(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(images.map((image) => waitForImageAsset(image)));

  if ("fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // Ignore font readiness failures and continue the export.
    }
  }

  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

export default function PropertyShowcase({
  propertyId: initialPropertyId,
  agencySlug: initialAgencySlug,
  initialProperty = null,
}: {
  propertyId?: string;
  agencySlug?: string | null;
  initialProperty?: AuraProperty | null;
}) {
  const params = useParams();
  const pathname = usePathname();
  const propertyId = initialPropertyId || (params.id as string);
  const agencySlug = initialAgencySlug || resolveAgencySlugFromPathname(pathname);
  const { toast } = useToast();
  const [property, setProperty] = useState<AuraProperty | null>(initialProperty);
  const [loading, setLoading] = useState(!initialProperty);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setProperty(initialProperty);
    setLoading(!initialProperty);
  }, [initialProperty]);

  useEffect(() => {
    let active = true;

    async function loadProperty() {
      if (!propertyId) {
        if (!initialProperty) {
          setProperty(null);
          setLoading(false);
        }
        return;
      }

      if (!initialProperty) {
        setLoading(true);
      }

      const result = await getPropertyById(propertyId, agencySlug);
      if (!active) return;
      if (result) {
        setProperty(result);
      } else if (!initialProperty) {
        setProperty(null);
      }
      setLoading(false);
    }

    void loadProperty();

    return () => {
      active = false;
    };
  }, [agencySlug, initialProperty, propertyId]);

  const handleDownloadBrochure = async () => {
    const element = document.getElementById("digital-brochure-container");
    if (!element || !property) return;

    setIsDownloading(true);
    toast({
      title: "Generating Brochure",
      description: "We are preparing your premium digital dossier...",
    });

    try {
      await waitForElementAssets(element);

      const canvas = await html2canvas(element, {
        scale: Math.min(window.devicePixelRatio || 1, 2),
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imageWidth, imageHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imageWidth, imageHeight);
        heightLeft -= pageHeight;
      }

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
    image: property.agentAvatar || "",
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
          <PropertyHeroGallery images={gallery} title={property.title} virtualTourUrl={property.virtualTourUrl} />
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
                <p className="text-lg text-[#111111]/60 leading-relaxed font-light whitespace-pre-line">{property.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-12 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase tracking-tight">Location</h3>
                  <p className="text-[10px] text-[#111111]/40 font-bold uppercase tracking-widest">
                    OpenStreetMap view for {property.address}
                  </p>
                </div>
                <DynamicLocationMap
                  latitude={property.latitude}
                  longitude={property.longitude}
                  locationLabel={property.location}
                  addressLabel={property.address}
                />
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
                  <Image src={heroImages[1] || heroImages[0]} alt={property.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/90" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 px-6 text-center">
                    <div className="relative w-24 h-24 rounded-full border-2 border-white overflow-hidden mb-4 shadow-xl translate-y-2">
                      {agent.image ? (
                        <Image src={agent.image} alt={agent.name} fill className="object-cover" sizes="96px" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[#111111] text-2xl font-black text-white">
                          {agent.name
                            .split(/\s+/)
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part.charAt(0).toUpperCase())
                            .join("")}
                        </div>
                      )}
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
                            <p className="text-lg text-[#111111]/60 leading-relaxed font-light whitespace-pre-line">{property.description}</p>
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

      <FooterClient />
    </main>
  );
}
