"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export function AuraAgentsPageContent({
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
  const [search, setSearch] = useState("");

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
  const filteredAgents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return agents;

    return agents.filter((agent) => {
      const haystack = [
        agent.name,
        agent.jobTitle,
        agent.title,
        agent.tagline,
        agent.bio,
        ...(agent.languages || []),
        ...(agent.specializations || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [agents, search]);

  return (
    <main className="min-h-screen bg-[#F8F9FA] relative flex flex-col">
      <section className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://picsum.photos/seed/aura-agents-dynamic/1600/1200)",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundSize: "cover",
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
            Meet the public-facing advisors connected to {displayName}.
          </p>

          <div className="w-full max-w-xl glass-morphism p-2 rounded-2xl flex items-center gap-2 border border-white/20">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, language, or expertise..."
                className="bg-transparent border-none text-white placeholder:text-white/30 h-12 pl-12 focus-visible:ring-0"
              />
            </div>
            <Button className="h-12 px-6 bg-primary text-white font-bold rounded-xl">
              FIND
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-black text-[#111111] uppercase tracking-tight">The {displayName} Network</h2>
              <p className="text-[#111111]/40 text-sm font-medium mt-1">{filteredAgents.length} active public agents</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {filteredAgents.map((agent) => (
              <article key={agent.slug || agent.id || agent.name} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#111111]/10 bg-white shadow-sm transition-all hover:shadow-xl">
                <div className="relative aspect-[4/3] bg-[#F7F6F2]">
                  <Image
                    src={getAgentImage(agent.slug || agent.name, agent.avatar)}
                    alt={agent.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-h-[276px] flex-1 flex-col gap-4 p-6">
                  <div>
                    <p className="text-primary text-xs font-bold uppercase tracking-widest">
                      {agent.jobTitle || agent.title || agent.tagline || "Property Consultant"}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-[#111111] tracking-tight">{agent.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#111111]/60">
                      {agent.bio || `${agent.name} is part of the public roster for ${displayName}.`}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-[#111111]/60">
                    {agent.email ? (
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-2 break-all hover:text-primary">
                        <Mail className="h-4 w-4" />
                        {agent.email}
                      </a>
                    ) : null}
                    {agent.phone ? (
                      <a href={`tel:${agent.phone}`} className="flex items-center gap-2 hover:text-primary">
                        <Phone className="h-4 w-4" />
                        {agent.phone}
                      </a>
                    ) : null}
                  </div>

                  <Link
                    href={prefixAgencyPath(`/agents/${agent.slug || ""}`, agencySlug)}
                    className="mt-auto inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest"
                  >
                    View Profile <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredAgents.length === 0 ? (
            <p className="mt-12 text-center text-sm uppercase tracking-[0.3em] text-[#111111]/40">
              No public agents matched the current search.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
