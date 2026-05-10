import PropertyDetailPage from '../../properties/[id]/page';
import { getPropertyById } from '@/lib/api';
import { getRequestAgencySlug } from '@/lib/server-agency';

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agencySlug = await getRequestAgencySlug();
  const property = await getPropertyById(id, agencySlug);

  return (
    <PropertyDetailPage
      propertyId={id}
      agencySlug={agencySlug}
      initialProperty={property}
    />
  );
}
