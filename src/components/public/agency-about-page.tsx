"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getAgents,
  getSiteConfig,
  hasMeaningfulSiteConfig,
  type SiteAgent,
  type SiteConfig,
} from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

function getAgentImage(seed: string, avatar?: string | null) {
  if (avatar) return avatar;
  const initials = seed
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "AG";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7faf9"/><stop offset="1" stop-color="#d4e2dd"/></linearGradient></defs><rect width="900" height="1200" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#4f6d68" font-family="Arial, sans-serif" font-size="280" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function AuraAboutPageContent({
  initialSiteConfig = null,
  initialAgents = [],
}: {
  initialSiteConfig?: SiteConfig | null;
  initialAgents?: SiteAgent[];
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig);
  const [agents, setAgents] = useState<SiteAgent[]>(initialAgents);

  useEffect(() => {
    setSiteConfig(initialSiteConfig);
    setAgents(initialAgents);
  }, [initialAgents, initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function load() {
      const [nextSiteConfig, nextAgents] = await Promise.all([
        getSiteConfig(agencySlug),
        getAgents(agencySlug),
      ]);

      if (!active) return;
      setSiteConfig((current) =>
        hasMeaningfulSiteConfig(nextSiteConfig) ? nextSiteConfig : current,
      );
      setAgents((current) =>
        nextAgents.agents.length > 0 || current.length === 0 ? nextAgents.agents : current,
      );
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const displayName = getDisplayName(siteConfig);
  const aboutCompany =
    siteConfig?.profile?.aboutCompany?.trim() ||
    siteConfig?.branding?.bio?.trim() ||
    `${displayName} blends high-touch agency presentation with live organization and agent data pulled directly from Broker OS.`;

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-primary/20">
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/aura-about-dynamic/1600/1200"
          alt={displayName}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-extralight text-white mb-6 tracking-tight uppercase">
            The Public Face of <br />
            <span className="font-black italic">{displayName}.</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base font-medium tracking-[0.3em] uppercase max-w-2xl mx-auto">
            Organization-aware branding, listings, and agents on one dynamic website.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Organization Story</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#111111] uppercase tracking-tighter leading-none">
              Live data, <br /><span className="text-primary italic">real identity.</span>
            </h2>
            <p className="text-lg text-[#111111]/60 leading-relaxed font-light">
              {aboutCompany}
            </p>
            <p className="text-lg text-[#111111]/60 leading-relaxed font-light">
              The public URL is powered by the agency slug for branding and SEO, while organization
              data is still resolved internally through the stable hex code for every API call.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={prefixAgencyPath("/agents", agencySlug)}>
                <Button className="bg-[#111111] text-white hover:bg-primary rounded-xl uppercase tracking-[0.3em] text-[10px] font-bold">
                  View agents
                </Button>
              </Link>
              <Link href={prefixAgencyPath("/contact", agencySlug)}>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-xl uppercase tracking-[0.3em] text-[10px] font-bold">
                  Contact office
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Live listings", value: siteConfig?.stats?.totalListings ?? 0 },
              { label: "Active agents", value: siteConfig?.stats?.activeAgents ?? agents.length },
              { label: "Ready properties", value: siteConfig?.stats?.readyListings ?? 0 },
              { label: "Off-plan", value: siteConfig?.stats?.offPlanListings ?? 0 },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] p-8 shadow-sm">
                <p className="text-4xl font-black text-primary">{stat.value}</p>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Team</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mt-4">
                People behind <br /> <span className="text-primary italic">{displayName}.</span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.slice(0, 4).map((agent) => (
              <Link key={agent.slug || agent.id || agent.name} href={prefixAgencyPath(`/agents/${agent.slug || ""}`, agencySlug)} className="group">
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden mb-6">
                  <Image src={getAgentImage(agent.slug || agent.name, agent.avatar)} alt={agent.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tighter">{agent.name}</h3>
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mt-1">
                  {agent.jobTitle || agent.title || agent.tagline || "Property Consultant"}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
