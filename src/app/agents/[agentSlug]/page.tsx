import { AuraAgentProfilePageContent } from "@/components/public/agency-agent-profile-page";
import { getAgentProfile } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ agentSlug: string }>;
}) {
  const { agentSlug } = await params;
  const agencySlug = await getRequestAgencySlug();
  const profile = await getAgentProfile(agentSlug, agencySlug);

  return (
    <AuraAgentProfilePageContent
      agentSlug={agentSlug}
      initialProfile={profile}
    />
  );
}
