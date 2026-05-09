
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [brandName, setBrandName] = useState("AuraEstates");
  const [brandLogo, setBrandLogo] = useState<string | null>(null);
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadSiteConfig() {
      const siteConfig = await getSiteConfig(agencySlug);
      if (!active) return;
      setBrandName(siteConfig.branding?.displayName || siteConfig.organization.name || "AuraEstates");
      setBrandLogo(siteConfig.profile?.logo || null);
    }

    void loadSiteConfig();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  if (!isMounted) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 flex items-center justify-between",
        "bg-white border-b border-black/5",
        scrolled ? "py-3 shadow-md" : "py-4"
      )}
    >
      <div className="flex items-center gap-12">
        <Link href={prefixAgencyPath("/", agencySlug)} className="flex items-center gap-2">
          {brandLogo ? (
            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-black/10 bg-white shadow-sm">
              <Image
                src={brandLogo}
                alt={`${brandName} logo`}
                fill
                className="object-contain p-1.5"
                sizes="40px"
              />
            </span>
          ) : null}
          <span className="text-2xl font-bold tracking-tighter text-[#111111]">
            {brandName}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-[#111111]/60">
          <Link href={prefixAgencyPath("/buy", agencySlug)} className="hover:text-primary transition-colors">Buy</Link>
          <Link href={prefixAgencyPath("/rent", agencySlug)} className="hover:text-primary transition-colors">Rent</Link>
          <Link href={prefixAgencyPath("/sold", agencySlug)} className="hover:text-primary transition-colors">Sold</Link>
          <Link href={prefixAgencyPath("/agents", agencySlug)} className="hover:text-primary transition-colors">Find Agent</Link>
          <Link href={prefixAgencyPath("/commercial", agencySlug)} className="hover:text-primary transition-colors">Commercial</Link>
          <Link href={prefixAgencyPath("/about", agencySlug)} className="hover:text-primary transition-colors">About Us</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href={prefixAgencyPath("/contact", agencySlug)} className="hidden md:block">
          <Button
            variant="outline"
            className="border-primary/20 text-primary font-bold uppercase tracking-widest text-[10px] h-10 px-6 rounded-xl hover:bg-primary hover:text-white transition-all"
          >
            Contact Us
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#111111]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-white z-40 p-8 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
           <Link href={prefixAgencyPath("/buy", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Buy</Link>
           <Link href={prefixAgencyPath("/rent", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Rent</Link>
           <Link href={prefixAgencyPath("/sold", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Sold</Link>
           <Link href={prefixAgencyPath("/agents", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Find Agent</Link>
           <Link href={prefixAgencyPath("/commercial", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Commercial</Link>
           <Link href={prefixAgencyPath("/about", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">About Us</Link>
           
           <Link href={prefixAgencyPath("/contact", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
             <Button className="w-full h-14 bg-primary text-white font-bold rounded-xl">Contact Us</Button>
           </Link>
        </div>
      )}
    </nav>
  );
}
