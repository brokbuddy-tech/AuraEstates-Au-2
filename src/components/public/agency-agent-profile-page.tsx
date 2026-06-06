"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCarousel } from "@/components/review-carousel";
import { getAgentProfile } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";
import { normalizeBrokerReviewCards } from "@/lib/reviews";

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

function getWhatsAppHref(value?: string | null, message?: string) {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (!digits) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function AuraAgentProfilePageContent({
  agentSlug,
  initialProfile = null,
}: {
  agentSlug: string;
  initialProfile?: Awaited<ReturnType<typeof getAgentProfile>> | null;
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [loading, setLoading] = useState(!initialProfile);
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof getAgentProfile>> | null>(initialProfile);

  useEffect(() => {
    setProfile(initialProfile);
    setLoading(!initialProfile);
  }, [initialProfile]);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!initialProfile) {
        setLoading(true);
      }
      const nextProfile = await getAgentProfile(agentSlug, agencySlug);
      if (!active) return;
      if (nextProfile?.agent) {
        setProfile(nextProfile);
      } else if (!initialProfile) {
        setProfile(nextProfile);
      }
      setLoading(false);
    }

    void load();
    return () => {
      active = false;
    };
  }, [agentSlug, agencySlug, initialProfile]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Loading profile</p>
      </main>
    );
  }

  if (!profile?.agent) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Agent not found</h1>
          <Link href={prefixAgencyPath("/agents", agencySlug)} className="inline-flex mt-8">
            <Button className="bg-primary text-white rounded-xl font-bold uppercase tracking-[0.2em]">
              Back to agents
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const displayName = profile.organization?.name || "Agency Website";
  const whatsappHref = getWhatsAppHref(
    profile.agent.whatsapp || profile.agent.phone || profile.profile?.contact?.whatsappNumber,
    `Hi ${profile.agent.name}, I'm interested in your listings with ${displayName}.`
  );
  const brokerRegistrationNumber = profile.agent.brn || profile.agent.licenseNumber;
  const brokerReviews = normalizeBrokerReviewCards(profile.agent.reviewSources);

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      <section className="border-b border-[#E5E7EB] bg-white px-6 py-20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-12 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#F8F9FA] shadow-sm">
            <Image src={getAgentImage(profile.agent.slug || profile.agent.name, profile.agent.avatar)} alt={profile.agent.name} fill className="object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">{displayName}</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-[#111111] md:text-6xl">{profile.agent.name}</h1>
              <p className="mt-3 text-primary text-xs font-bold uppercase tracking-[0.3em]">
                {profile.agent.jobTitle || profile.agent.title || profile.agent.tagline || "Property Consultant"}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-[#111111]/60">
              {brokerRegistrationNumber ? (
                <span className="flex items-center gap-2">
                  <span className="font-black text-primary">BRN</span>
                  {brokerRegistrationNumber}
                </span>
              ) : null}
              {profile.agent.email ? (
                <a href={`mailto:${profile.agent.email}`} className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" />
                  {profile.agent.email}
                </a>
              ) : null}
              {profile.agent.phone ? (
                <a href={`tel:${profile.agent.phone}`} className="flex items-center gap-2 hover:text-primary">
                  <Phone className="h-4 w-4 text-primary" />
                  {profile.agent.phone}
                </a>
              ) : null}
              {whatsappHref ? (
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-black tracking-tight">{profile.agent.name}</h1>
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
                {profile.agent.jobTitle || profile.agent.title || profile.agent.tagline || "Property Consultant"}
              </p>
              {brokerRegistrationNumber ? (
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40">
                  BRN {brokerRegistrationNumber}
                </p>
              ) : null}
              <div className="grid gap-3 pt-4">
                {profile.agent.phone ? (
                  <a href={`tel:${profile.agent.phone}`}>
                    <Button className="w-full bg-[#111111] hover:bg-primary text-white rounded-xl">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </a>
                ) : null}
                {profile.agent.email ? (
                  <a href={`mailto:${profile.agent.email}`}>
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </a>
                ) : null}
                {whatsappHref ? (
                  <a href={whatsappHref} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-xl">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Agent Branding</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-[#111111]">{displayName}</h2>
              <p className="mt-6 text-lg text-[#111111]/60 leading-relaxed">
                {profile.agent.bio || `${profile.agent.name} is part of the public-facing advisor network for ${displayName}.`}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-8">
                <h3 className="text-xl font-bold">Profile Snapshot</h3>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {[
                    { label: "Active", value: profile.stats.activeListings },
                    { label: "Sold", value: profile.stats.soldListings },
                    { label: "Rented", value: profile.stats.rentedListings },
                    { label: "Languages", value: (profile.agent.languages || []).length },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] p-4">
                      <p className="text-2xl font-black">{item.value}</p>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#111111]/40 mt-1">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-8">
                <h3 className="text-xl font-bold">Specializations</h3>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(profile.agent.specializations || []).map((item) => (
                    <span key={item} className="rounded-full bg-primary/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      {item}
                    </span>
                  ))}
                  {(profile.agent.specializations || []).length === 0 ? (
                    <p className="text-sm text-[#111111]/50">No public specializations added yet.</p>
                  ) : null}
                </div>
              </div>
            </div>

            <ReviewCarousel
              title="What My Clients Say"
              description={`Verified feedback from clients who worked directly with ${profile.agent.name}.`}
              items={brokerReviews}
              variant="light"
              className="rounded-3xl border border-[#E5E7EB] bg-white px-0 py-12 shadow-sm"
            />

            <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-sm p-8">
              <h3 className="text-2xl font-bold">Active Listings</h3>
              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {profile.activeListings.map((listing: any) => (
                  <Link key={listing.id} href={prefixAgencyPath(`/property/${listing.id}`, agencySlug)} className="group overflow-hidden rounded-3xl border border-[#E5E7EB]">
                    <div className="relative aspect-[4/3]">
                      <Image src={listing.image} alt={listing.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6 bg-white">
                      <h4 className="text-xl font-black tracking-tight">{listing.title}</h4>
                      <p className="mt-2 text-sm text-[#111111]/50">{listing.location}</p>
                      <p className="mt-4 text-2xl font-black text-primary">{listing.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              {profile.activeListings.length === 0 ? (
                <p className="mt-6 text-sm uppercase tracking-[0.3em] text-[#111111]/40">
                  No public listings are active for this agent yet.
                </p>
              ) : null}
            </div>
          </div>
      </section>
    </main>
  );
}
