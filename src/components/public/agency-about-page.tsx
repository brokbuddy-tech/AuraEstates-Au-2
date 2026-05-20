"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getAgents,
  getSiteConfig,
  getTestimonials,
  hasMeaningfulSiteConfig,
  replaceTemplateBranding,
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

type AboutTestimonial = {
  id: string;
  quote: string;
  author: string;
  meta: string;
  rating: number;
};

const FALLBACK_TESTIMONIALS: AboutTestimonial[] = [
  {
    id: "harper-lane",
    quote: "{{agencyName}} brought structure, honesty, and a polished presentation to every stage of our sale.",
    author: "Harper Lane",
    meta: "Melbourne seller",
    rating: 5,
  },
  {
    id: "lucas-nguyen",
    quote: "The team balanced strategic advice with genuinely responsive communication. We always knew what came next.",
    author: "Lucas Nguyen",
    meta: "Sydney buyer",
    rating: 5,
  },
  {
    id: "amelia-ford",
    quote: "Our agent made the process feel calm and well-managed from first viewing through settlement day.",
    author: "Amelia Ford",
    meta: "Brisbane relocation",
    rating: 5,
  },
];

function normalizeTestimonials(input: unknown[]): AboutTestimonial[] {
  const normalized: AboutTestimonial[] = [];

  input.forEach((item, index) => {
    const testimonial = item as {
      id?: string;
      quote?: string | null;
      content?: string | null;
      author?: string | null;
      name?: string | null;
      clientName?: string | null;
      location?: string | null;
      property?: string | null;
      rating?: number | null;
    };

    const quote = testimonial.quote?.trim() || testimonial.content?.trim() || "";
    if (!quote) return;

    const author =
      testimonial.author?.trim() ||
      testimonial.name?.trim() ||
      testimonial.clientName?.trim() ||
      "Anonymous";

    normalized.push({
      id: testimonial.id || `${author}-${index}`,
      quote,
      author,
      meta: testimonial.location?.trim() || testimonial.property?.trim() || "Verified client",
      rating: typeof testimonial.rating === "number" ? testimonial.rating : 5,
    });
  });

  return normalized;
}

export function AuraAboutPageContent({
  initialSiteConfig = null,
  initialAgents = [],
  initialTestimonials = [],
}: {
  initialSiteConfig?: SiteConfig | null;
  initialAgents?: SiteAgent[];
  initialTestimonials?: unknown[];
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig);
  const [agents, setAgents] = useState<SiteAgent[]>(initialAgents);
  const [testimonials, setTestimonials] = useState<AboutTestimonial[]>(() =>
    normalizeTestimonials(initialTestimonials),
  );

  useEffect(() => {
    setSiteConfig(initialSiteConfig);
    setAgents(initialAgents);
    setTestimonials(normalizeTestimonials(initialTestimonials));
  }, [initialAgents, initialSiteConfig, initialTestimonials]);

  useEffect(() => {
    let active = true;

    async function load() {
      const [nextSiteConfig, nextAgents, nextTestimonials] = await Promise.all([
        getSiteConfig(agencySlug),
        getAgents(agencySlug),
        getTestimonials(agencySlug),
      ]);

      if (!active) return;
      setSiteConfig((current) =>
        hasMeaningfulSiteConfig(nextSiteConfig) ? nextSiteConfig : current,
      );
      setAgents((current) =>
        nextAgents.agents.length > 0 || current.length === 0 ? nextAgents.agents : current,
      );
      setTestimonials(normalizeTestimonials(nextTestimonials));
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
  const mission =
    siteConfig?.profile?.mission?.trim() ||
    `${displayName} exists to make each buying, selling, and leasing decision feel informed, supported, and straightforward.`;
  const vision =
    siteConfig?.profile?.vision?.trim() ||
    `Our vision is a public brand for ${displayName} that feels modern, credible, and unmistakably client-first.`;
  const testimonialsToRender =
    testimonials.length > 0
      ? testimonials
      : FALLBACK_TESTIMONIALS.map((testimonial) => ({
          ...testimonial,
          quote: replaceTemplateBranding(testimonial.quote, displayName),
        }));

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
              {aboutCompany}
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
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Our mission</p>
                <p className="mt-4 text-base leading-relaxed text-[#111111]/70">{mission}</p>
              </div>
              <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Our vision</p>
                <p className="mt-4 text-base leading-relaxed text-[#111111]/70">{vision}</p>
              </div>
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

      <section className="bg-[#F8F9FA] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Client Testimonials</span>
            <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-[#111111] md:text-6xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#111111]/60 md:text-lg">
              Real feedback from the clients who trusted {displayName} with their next move.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonialsToRender.map((testimonial) => (
              <article key={testimonial.id} className="flex h-full flex-col rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={`${testimonial.id}-star-${index}`}
                      className="h-4 w-4"
                      fill={index < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="mt-6 text-lg font-light italic leading-8 text-[#111111]/70">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-8 border-t border-[#E5E7EB] pt-6">
                  <p className="text-xl font-black uppercase tracking-tight text-[#111111]">{testimonial.author}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">{testimonial.meta}</p>
                </div>
              </article>
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
