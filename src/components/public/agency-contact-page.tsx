"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getSiteConfig, hasMeaningfulSiteConfig, type SiteConfig } from "@/lib/public-site";
import { prefixAgencyPath, resolveAgencySlugFromPathname } from "@/lib/agency-routing";

function getDisplayName(siteConfig: SiteConfig | null) {
  return siteConfig?.branding?.displayName || siteConfig?.organization.name || "Agency Website";
}

export function AuraContactPageContent({
  initialSiteConfig = null,
}: {
  initialSiteConfig?: SiteConfig | null;
}) {
  const pathname = usePathname();
  const agencySlug = resolveAgencySlugFromPathname(pathname);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(initialSiteConfig);

  useEffect(() => {
    setSiteConfig(initialSiteConfig);
  }, [initialSiteConfig]);

  useEffect(() => {
    let active = true;

    async function load() {
      const nextSiteConfig = await getSiteConfig(agencySlug);
      if (active && hasMeaningfulSiteConfig(nextSiteConfig)) {
        setSiteConfig(nextSiteConfig);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [agencySlug]);

  const displayName = getDisplayName(siteConfig);
  const officeEmail =
    siteConfig?.profile?.contact?.officialEmail ||
    siteConfig?.branding?.publicEmail ||
    siteConfig?.leadAgent?.email ||
    "hello@example.com";
  const officePhone =
    siteConfig?.profile?.contact?.primaryPhone ||
    siteConfig?.branding?.publicPhone ||
    siteConfig?.leadAgent?.phone ||
    "Phone available on request";
  const officeAddress = siteConfig?.profile?.officeAddress?.trim() || "Address shared on request";
  const officeTimings = siteConfig?.profile?.officeTimings?.trim() || "Available by appointment";

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <section className="relative flex-1 flex items-center justify-center pt-24 pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/aura-contact-dynamic/1600/1200"
            alt={displayName}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
        </div>

        <div className="relative z-20 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-white/60 text-lg max-w-md">
                Contact information and office hours for {displayName} are pulled dynamically from the organization profile in Broker OS.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Email Us</p>
                  <p className="text-lg font-medium">{officeEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Call Us</p>
                  <p className="text-lg font-medium">{officePhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Visit Us</p>
                  <p className="text-lg font-medium">{officeAddress}</p>
                  <p className="text-sm text-white/50">{officeTimings}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-morphism p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-white/60">First Name</Label>
                  <Input id="first-name" placeholder="Jane" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-white/60">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/60">Email Address</Label>
                <Input id="email" type="email" placeholder="jane@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/60">Message</Label>
                <Textarea id="message" placeholder={`Tell ${displayName} how the team can help...`} className="bg-white/5 border-white/10 text-white placeholder:text-white/20 min-h-[120px] rounded-xl focus:ring-primary" />
              </div>
              <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] group">
                Send Message
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
