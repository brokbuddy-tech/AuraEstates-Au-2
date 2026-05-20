import { AuraAboutPageContent } from "@/components/public/agency-about-page";
import { getAgents, getSiteConfig, getTestimonials } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function AboutPage() {
  const agencySlug = await getRequestAgencySlug();
  const [siteConfig, agentsResponse, testimonials] = await Promise.all([
    getSiteConfig(agencySlug),
    getAgents(agencySlug),
    getTestimonials(agencySlug),
  ]);

  return (
    <AuraAboutPageContent
      initialSiteConfig={siteConfig}
      initialAgents={agentsResponse.agents}
      initialTestimonials={testimonials}
    />
  );
}
