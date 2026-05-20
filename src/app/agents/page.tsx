import { AuraAgentsPageContent } from "@/components/public/agency-agents-page";
import { Footer } from "@/components/footer";
import { getAgents, getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function AgentsPage() {
  const agencySlug = await getRequestAgencySlug();
  const [siteConfig, agentsResponse] = await Promise.all([
    getSiteConfig(agencySlug),
    getAgents(agencySlug),
  ]);

  return (
    <>
      <AuraAgentsPageContent
        initialSiteConfig={siteConfig}
        initialAgents={agentsResponse.agents}
      />
      <Footer />
    </>
  );
}
