
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getAgencyDisplayName, getSiteConfig, hasMeaningfulSiteConfig, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

export function Navbar({ initialSiteConfig }: { initialSiteConfig?: SiteConfig | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [brandName, setBrandName] = useState(getAgencyDisplayName(initialSiteConfig));
  const [brandLogo, setBrandLogo] = useState<string | null>(initialSiteConfig?.profile?.logo || null);
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const navLinks = [
    { label: "Buy", href: "/buy" },
    { label: "Rent", href: "/rent" },
    { label: "Sold", href: "/sold" },
    { label: "Find Agent", href: "/agents" },
    { label: "Commercial", href: "/commercial" },
    { label: "About Us", href: "/about" },
  ];
  const isNavLinkActive = (href: string) => {
    const prefixedHref = prefixAgencyPath(href, agencySlug);
    return pathname === prefixedHref || pathname === href || pathname.startsWith(`${prefixedHref}/`) || pathname.startsWith(`${href}/`);
  };
  const activeNavLabel = navLinks.find((link) => isNavLinkActive(link.href))?.label;
  const [activeUnderline, setActiveUnderline] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setBrandName(getAgencyDisplayName(initialSiteConfig));
    setBrandLogo(initialSiteConfig?.profile?.logo || null);
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function loadSiteConfig() {
      try {
        const siteConfig = await getSiteConfig(agencySlug);
        if (!active) return;
        if (!hasMeaningfulSiteConfig(siteConfig)) return;
        setBrandName(getAgencyDisplayName(siteConfig));
        setBrandLogo(siteConfig.profile?.logo || null);
      } catch {
        if (!active) return;
        setBrandName((current) => current || getAgencyDisplayName(initialSiteConfig));
        setBrandLogo((current) => current || initialSiteConfig?.profile?.logo || null);
      }
    }

    void loadSiteConfig();
    return () => {
      active = false;
    };
  }, [agencySlug, initialSiteConfig]);

  useEffect(() => {
    const updateUnderline = () => {
      if (!activeNavLabel || !desktopNavRef.current) {
        setActiveUnderline(null);
        return;
      }

      const activeLink = desktopLinkRefs.current[activeNavLabel];
      if (!activeLink) {
        setActiveUnderline(null);
        return;
      }

      const navRect = desktopNavRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setActiveUnderline({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeNavLabel]);

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

        <div ref={desktopNavRef} className="relative hidden lg:flex items-center gap-8 pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#111111]/60">
          {activeUnderline && (
            <span
              className="pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-primary transition-all duration-300 ease-out"
              style={{
                left: activeUnderline.left,
                width: activeUnderline.width,
              }}
            />
          )}
          {navLinks.map((link) => {
            const isActive = link.label === activeNavLabel;

            return (
              <Link
                key={link.label}
                href={prefixAgencyPath(link.href, agencySlug)}
                ref={(node) => {
                  desktopLinkRefs.current[link.label] = node;
                }}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-1 hover:text-primary transition-colors",
                  isActive && "text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
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
           {navLinks.map((link) => (
             <Link
               key={link.label}
               href={prefixAgencyPath(link.href, agencySlug)}
               onClick={() => setIsMobileMenuOpen(false)}
               className={cn(
                 "text-2xl font-black uppercase tracking-tighter",
                 isNavLinkActive(link.href) ? "text-primary" : "text-[#111111]"
               )}
             >
               {link.label}
             </Link>
           ))}
           
           <Link href={prefixAgencyPath("/contact", agencySlug)} onClick={() => setIsMobileMenuOpen(false)} className="mt-4">
             <Button className="w-full h-14 bg-primary text-white font-bold rounded-xl">Contact Us</Button>
           </Link>
        </div>
      )}
    </nav>
  );
}
