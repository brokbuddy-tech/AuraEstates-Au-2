import { Footer } from "@/components/footer";
import { AuraContactPageContent } from "@/components/public/agency-contact-page";
import { getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function ContactPage() {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);

  return (
    <>
      <AuraContactPageContent initialSiteConfig={siteConfig} />
      <Footer />
    </>
  );
}
