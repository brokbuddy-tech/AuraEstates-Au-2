'use client';

import { useEffect, useRef } from 'react';

type ListingViewTrackerProps = {
  listingId: string;
  agencySlug?: string | null;
};

export function ListingViewTracker({ listingId, agencySlug }: ListingViewTrackerProps) {
  const recordedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const normalizedListingId = listingId.trim();
    if (!normalizedListingId) return;

    const normalizedAgencySlug = agencySlug?.trim() || '';
    const viewKey = `${normalizedAgencySlug}:${normalizedListingId}`;
    if (recordedKeyRef.current === viewKey) return;
    recordedKeyRef.current = viewKey;

    const proxyBase = normalizedAgencySlug
      ? `/api/public-template/${encodeURIComponent(normalizedAgencySlug)}`
      : '/api/public-template-proxy';

    void fetch(`${proxyBase}/listing-views/${encodeURIComponent(normalizedListingId)}`, {
      method: 'POST',
      cache: 'no-store',
      credentials: 'same-origin',
      keepalive: true,
    }).catch(() => undefined);
  }, [agencySlug, listingId]);

  return null;
}
