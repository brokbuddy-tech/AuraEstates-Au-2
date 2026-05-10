import { getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";
import { FooterClient } from "./footer-client";

export async function Footer() {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);

  return <FooterClient initialSiteConfig={siteConfig} />;
}
