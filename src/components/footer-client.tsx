"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";
import { getAgencyDisplayName, getSiteConfig, hasMeaningfulSiteConfig, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

export function FooterClient({ initialSiteConfig }: { initialSiteConfig?: SiteConfig | null }) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig ?? null);

  useEffect(() => {
    setSiteConfig((current) => initialSiteConfig ?? current ?? null);
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const nextSiteConfig = await getSiteConfig(agencySlug);
        if (active && hasMeaningfulSiteConfig(nextSiteConfig)) {
          setSiteConfig(nextSiteConfig);
        }
      } catch {
        if (active) {
          setSiteConfig((current) => current ?? initialSiteConfig ?? null);
        }
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug, initialSiteConfig]);

  const displayName = getAgencyDisplayName(siteConfig);
  const officeAddress = siteConfig?.profile?.officeAddress?.trim();
  const officeEmail = siteConfig?.profile?.contact?.officialEmail || siteConfig?.branding?.publicEmail;
  const socialLinks = [
    siteConfig?.profile?.social?.facebookUrl,
    siteConfig?.profile?.social?.twitterUrl || siteConfig?.profile?.social?.tiktokUrl,
    siteConfig?.profile?.social?.instagramUrl,
    siteConfig?.branding?.linkedin || siteConfig?.profile?.social?.youtubeUrl,
  ];

  return (
    <footer className="bg-[#0F172A] pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute bottom-[-50px] right-[-50px] opacity-[0.02] select-none pointer-events-none">
        <span className="text-[200px] font-black italic">{displayName}</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 relative z-10">
        <div>
          <h4 className="text-white font-bold mb-6">Organization</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>{officeAddress || "Address shared on request"}</li>
            {officeEmail ? <li>{officeEmail}</li> : null}
            <li><Link href={prefixAgencyPath("/about", agencySlug)} className="hover:text-primary">About the agency</Link></li>
            <li><Link href={prefixAgencyPath("/agents", agencySlug)} className="hover:text-primary">Public agents</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Public Pages</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href={prefixAgencyPath("/buy", agencySlug)} className="hover:text-primary">Buy</Link></li>
            <li><Link href={prefixAgencyPath("/rent", agencySlug)} className="hover:text-primary">Rent</Link></li>
            <li><Link href={prefixAgencyPath("/sold", agencySlug)} className="hover:text-primary">Sold</Link></li>
            <li><Link href={prefixAgencyPath("/commercial", agencySlug)} className="hover:text-primary">Commercial</Link></li>
            <li><Link href={prefixAgencyPath("/contact", agencySlug)} className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Live Data</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>Organization branding</li>
            <li>Active agent profiles</li>
            <li>Organization-aware listings</li>
            <li>Slug-based public routing</li>
            <li>Hex-code secured APIs</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Connect</h4>
          <div className="flex gap-4 mb-8">
            <Link href={socialLinks[0] || "#"} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></Link>
            <Link href={socialLinks[1] || "#"} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></Link>
            <Link href={socialLinks[2] || "#"} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></Link>
            <Link href={socialLinks[3] || "#"} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Linkedin className="w-5 h-5" /></Link>
          </div>
          <div className="flex gap-4">
            <img src="https://placehold.co/120x40/1e293b/white?text=App+Store" alt="App Store" className="h-10 rounded border border-slate-700" />
            <img src="https://placehold.co/120x40/1e293b/white?text=Play+Store" alt="Play Store" className="h-10 rounded border border-slate-700" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-white">{displayName}</span>
          <span className="text-slate-500 text-xs ml-4">&copy; {new Date().getFullYear()} {displayName}. All Rights Reserved.</span>
        </div>
        <div className="flex gap-6 text-xs text-slate-500 font-medium">
          <Link href={prefixAgencyPath("/about", agencySlug)} className="hover:text-primary">About</Link>
          <Link href={prefixAgencyPath("/contact", agencySlug)} className="hover:text-primary">Contact</Link>
          <Link href={prefixAgencyPath("/agents", agencySlug)} className="hover:text-primary">Agents</Link>
        </div>
      </div>
    </footer>
  );
}
