import {
  API_BASE_URLS,
  PUBLIC_API_BASE_URLS,
  PUBLIC_TEMPLATE_PROXY_BASE_PATH,
  getConfiguredTemplateHexCode,
  getClientTemplateFetchUrl,
  normalizePublicTemplateAssetUrl,
  shouldRetryApiRequest,
} from './api-base';
import { getDefaultAgencySlug, getEffectiveAgencySlug } from './agency-routing';

const API_BASE_URL = API_BASE_URLS[0] || 'http://localhost:4000/api';
const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, '');

export function getPublicTemplateUrl(path = '', agencySlug?: string | null) {
  return getClientTemplateFetchUrl(path, agencySlug);
}

async function safeFetch(url: string, extraOpts?: RequestInit & { next?: any }, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const opts: RequestInit = { ...extraOpts, signal: controller.signal };

  if (typeof window !== "undefined") {
    delete (opts as any).next;
  }

  try {
    return await fetch(url, opts);
  } catch {
    return new Response(null, { status: 503, statusText: "Service Unavailable" });
  } finally {
    clearTimeout(timer);
  }
}

type ResolvedAgencyContext = {
  organization?: {
    slug?: string;
    hexCode?: string;
  };
};

function appendHexToSearch(search: string, hexCode: string) {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  params.set('hex', hexCode);
  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
}

function buildBackendPublicUrl(
  publicApiBaseUrl: string,
  agencySlug: string,
  hexCode: string,
  path = '',
) {
  const normalizedPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  const [pathname, search = ''] = normalizedPath.split('?');
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `${publicApiBaseUrl}/organization${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'listings') {
    if (segments[1]) {
      return `${publicApiBaseUrl}/listings/${encodeURIComponent(segments[1])}${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
    }
    return `${publicApiBaseUrl}/listings${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'agents') {
    if (segments[1]) {
      return `${publicApiBaseUrl}/agent/${encodeURIComponent(segments[1])}${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
    }
    return `${publicApiBaseUrl}/agents${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'inquiry') {
    return `${publicApiBaseUrl}/inquiries${appendHexToSearch(search ? `?${search}` : '', hexCode)}`;
  }

  if (segments[0] === 'logo' && segments[1] === 'view') {
    return `${publicApiBaseUrl}/templates/${encodeURIComponent(agencySlug)}/${encodeURIComponent(hexCode)}/logo/view${search ? `?${search}` : ''}`;
  }

  if (segments[0] === 'images' && segments[1]) {
    const trailing = segments.slice(2).map(encodeURIComponent).join('/');
    return `${publicApiBaseUrl}/templates/${encodeURIComponent(agencySlug)}/${encodeURIComponent(hexCode)}/images/${encodeURIComponent(segments[1])}/${trailing}${search ? `?${search}` : ''}`;
  }

  const joinedPath = segments.map(encodeURIComponent).join('/');
  return `${publicApiBaseUrl}/templates/${encodeURIComponent(agencySlug)}/${encodeURIComponent(hexCode)}/${joinedPath}${search ? `?${search}` : ''}`;
}

function getConfiguredAgencyContext(agencySlug?: string | null): ResolvedAgencyContext | null {
  const resolvedAgencySlug = getEffectiveAgencySlug(agencySlug);
  const defaultAgencySlug = getDefaultAgencySlug();
  const configuredHexCode = getConfiguredTemplateHexCode();

  if (!resolvedAgencySlug || !defaultAgencySlug || !configuredHexCode || resolvedAgencySlug !== defaultAgencySlug) {
    return null;
  }

  return {
    organization: {
      slug: resolvedAgencySlug,
      hexCode: configuredHexCode,
    },
  };
}

async function resolveAgencyContext(agencySlug?: string | null) {
  const resolvedAgencySlug = getEffectiveAgencySlug(agencySlug);
  if (!resolvedAgencySlug) return null;

  const configuredContext = getConfiguredAgencyContext(resolvedAgencySlug);
  if (configuredContext) {
    return configuredContext;
  }

  for (const publicApiBaseUrl of PUBLIC_API_BASE_URLS) {
    try {
      const response = await safeFetch(`${publicApiBaseUrl}/agency/${encodeURIComponent(resolvedAgencySlug)}/resolve`, {
        cache: 'no-store',
      }, 4000);

      if (!response.ok) {
        continue;
      }

      const data = await response.json() as ResolvedAgencyContext;
      if (data?.organization?.hexCode) {
        return data;
      }
    } catch {
      continue;
    }
  }

  return null;
}

async function fetchDirectTemplateResponse(
  resolvedAgencySlug: string,
  path = '',
  options?: RequestInit,
  timeout = 10000,
) {
  const resolvedContext = await resolveAgencyContext(resolvedAgencySlug);
  const hexCode = resolvedContext?.organization?.hexCode;
  if (!hexCode) {
    return new Response(null, { status: 404, statusText: 'Agency Not Found' });
  }

  let lastResponse: Response | null = null;
  for (const publicApiBaseUrl of PUBLIC_API_BASE_URLS) {
    const backendUrl = buildBackendPublicUrl(publicApiBaseUrl, resolvedAgencySlug, hexCode, path);
    const response = await safeFetch(backendUrl, options as RequestInit & { next?: any }, timeout);
    lastResponse = response;
    if (response.ok || !(await shouldRetryApiRequest(response))) {
      return response;
    }
  }

  return lastResponse || new Response(null, { status: 502, statusText: 'Service Unavailable' });
}

async function fetchTemplateResponse(
  path = '',
  options?: RequestInit,
  timeout = 10000,
  agencySlug?: string | null,
) {
  const resolvedAgencySlug = getEffectiveAgencySlug(agencySlug) || getDefaultAgencySlug();
  if (!resolvedAgencySlug) {
    return new Response(null, { status: 404, statusText: 'Agency Not Found' });
  }

  if (typeof window !== 'undefined') {
    return safeFetch(
      getClientTemplateFetchUrl(path, resolvedAgencySlug),
      options as RequestInit & { next?: any },
      timeout,
    );
  }

  return fetchDirectTemplateResponse(resolvedAgencySlug, path, options, timeout);
}

function getStringValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

function getNumberValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim().length > 0) {
      const parsed = Number(value.replace(/,/g, ""));
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return undefined;
}

function normalizeListingDescription(description?: string) {
  const plainText = (description || "")
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/\s*(div|p|section|article|h[1-6])\s*>/gi, "\n\n")
    .replace(/<\/\s*li\s*>/gi, "\n")
    .replace(/<\s*li\b[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return plainText || "Property details coming soon.";
}

type ListingImage = {
  id?: string | null;
  url?: string | null;
  mediumUrl?: string | null;
  thumbnailUrl?: string | null;
  cdnUrl?: string | null;
  variants?: Record<string, string> | null;
};

type RawListing = {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  propertyType?: string;
  transactionType?: string;
  readiness?: string;
  status?: string;
  price?: number | string;
  area?: string;
  subArea?: string;
  emirate?: string;
  streetAddress?: string;
  address?: string;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  builtUpArea?: number | string | null;
  areaM2?: number | string | null;
  landSize?: number | string | null;
  size?: number | string | null;
  carSpaces?: number | string | null;
  parkingSpaces?: number | string | null;
  parking?: number | string | null;
  garageSpaces?: number | string | null;
  latitude?: number | string | null;
  longitude?: number | string | null;
  amenities?: string[];
  images?: ListingImage[];
  broker?: {
    firstName?: string;
    lastName?: string;
    avatar?: string | null;
    phone?: string | null;
    email?: string | null;
    brokerProfile?: {
      displayName?: string | null;
      avatar?: string | null;
      publicPhone?: string | null;
      publicEmail?: string | null;
      whatsapp?: string | null;
    } | null;
  } | null;
  agent?: {
    name?: string | null;
    avatar?: string | null;
    avatarUrl?: string | null;
    phone?: string | null;
    email?: string | null;
    whatsapp?: string | null;
  } | null;
};

export type AuraProperty = {
  id: string;
  title: string;
  image: string;
  images: string[];
  imageHint?: string;
  price: string;
  priceValue: number;
  address: string;
  location: string;
  beds: number;
  baths: number;
  cars: number;
  area: number;
  description: string;
  features: string[];
  status: string;
  transactionType: "SALE" | "RENT";
  propertyType: string;
  category: string;
  agentName: string;
  agentAvatar?: string;
  agentPhone?: string;
  agentEmail?: string;
  agentWhatsapp?: string;
  latitude: number | null;
  longitude: number | null;
};

export type AuraPropertyResults = {
  properties: AuraProperty[];
  total: number;
  page: number;
  totalPages: number;
};

function toAbsoluteImageUrl(path: string) {
  if (!path) return path;
  const normalizedProxyPath = normalizePublicTemplateAssetUrl(path) || path;
  if (/^https?:\/\//i.test(normalizedProxyPath)) return normalizedProxyPath;
  if (normalizedProxyPath.startsWith(PUBLIC_TEMPLATE_PROXY_BASE_PATH)) return normalizedProxyPath;
  return `${API_ORIGIN}${normalizedProxyPath.startsWith("/") ? normalizedProxyPath : `/${normalizedProxyPath}`}`;
}

function getPublicListingMediaUrl(
  image?: ListingImage | null,
  variant: "thumbnail" | "medium" | "compressed" | "original" = "compressed",
  agencySlug?: string | null,
) {
  if (!image?.id) return "";
  return getPublicTemplateUrl(`/images/${image.id}/view?variant=${variant}`, agencySlug);
}

function getListingImageUrl(image?: ListingImage | null, agencySlug?: string | null) {
  if (!image) return "";
  const publicImageUrl = getPublicListingMediaUrl(image, "compressed", agencySlug);
  if (publicImageUrl) return publicImageUrl;

  return toAbsoluteImageUrl(
    image.mediumUrl
      || image.thumbnailUrl
      || image.url
      || image.cdnUrl
      || image.variants?.medium
      || image.variants?.original
      || ""
  );
}

function getGalleryImages(images?: ListingImage[], agencySlug?: string | null) {
  return Array.from(
    new Set(
      (images || [])
        .map((image) => getListingImageUrl(image, agencySlug))
        .filter(Boolean)
    )
  );
}

function getListingsUrl(searchParams: URLSearchParams, agencySlug?: string | null) {
  const query = searchParams.toString();
  return `/listings${query ? `?${query}` : ""}`;
}

function getPropertyUrl(id: string) {
  return `/listings/${id}`;
}

function isMappedAuraProperty(value: unknown): value is AuraProperty {
  return Boolean(
    value
      && typeof value === "object"
      && "id" in value
      && "priceValue" in value
      && "transactionType" in value
      && "address" in value
  );
}

function getStatusLabel(listing: RawListing) {
  if (listing.status?.toUpperCase() === "SOLD") {
    return (getNumberValue(listing.price) || 0) >= 5_000_000 ? "Record Price" : "Sold";
  }

  if (listing.transactionType?.toUpperCase() === "RENT") {
    return "For Rent";
  }

  if (listing.propertyType?.toUpperCase() === "COMMERCIAL") {
    const category = (listing.category || "").toLowerCase();
    if (category.includes("office")) return "Premium Office";
    if (category.includes("warehouse") || category.includes("industrial")) return "Industrial";
    if (category.includes("medical")) return "Medical/Consulting";
    if (category.includes("showroom")) return "Showroom/Warehouse";
    if (category.includes("retail") || category.includes("shop")) return "Retail";
    return "Development Site";
  }

  if (listing.readiness?.toUpperCase() === "OFFPLAN") {
    return "Auction";
  }

  return (getNumberValue(listing.price) || 0) >= 3_000_000 ? "Exclusive" : "New Listing";
}

function getPriceLabel(listing: RawListing, priceValue: number) {
  const formatted = `$${priceValue.toLocaleString("en-AU")}`;
  if (listing.status?.toUpperCase() === "SOLD") {
    return priceValue > 0 ? `Sold for ${formatted}` : "Sold";
  }
  return formatted;
}

export function mapListingToAuraProperty(listing: RawListing, agencySlug?: string | null): AuraProperty {
  const images = getGalleryImages(listing.images, agencySlug);
  const priceValue = getNumberValue(listing.price) || 0;
  const location = [listing.subArea, listing.area, listing.emirate].filter(Boolean).join(", ") || "Australia";
  const address = getStringValue(listing.streetAddress, listing.address, listing.title, location) || "Address on request";

  return {
    id: listing.id,
    title: getStringValue(listing.title, address) || "Untitled Property",
    image: images[0] || "https://picsum.photos/seed/aura-fallback/1200/800",
    images,
    imageHint: "Australian premium property",
    price: getPriceLabel(listing, priceValue),
    priceValue,
    address,
    location,
    beds: getNumberValue(listing.bedrooms) || 0,
    baths: getNumberValue(listing.bathrooms) || 0,
    cars: getNumberValue(listing.carSpaces, listing.parkingSpaces, listing.parking, listing.garageSpaces) || 0,
    area: getNumberValue(listing.areaM2, listing.builtUpArea, listing.landSize, listing.size) || 0,
    description: normalizeListingDescription(listing.description),
    features: Array.isArray(listing.amenities) ? listing.amenities : [],
    status: getStatusLabel(listing),
    transactionType: listing.transactionType?.toUpperCase() === "RENT" ? "RENT" : "SALE",
    propertyType: listing.propertyType || "RESIDENTIAL",
    category: listing.category || "Property",
    agentName: getStringValue(
      listing.agent?.name,
      listing.broker?.brokerProfile?.displayName,
      [listing.broker?.firstName, listing.broker?.lastName].filter(Boolean).join(" ")
    ) || "Aura Estates Advisor",
    agentAvatar: getStringValue(
      listing.agent?.avatarUrl,
      listing.agent?.avatar,
      listing.broker?.brokerProfile?.avatar,
      listing.broker?.avatar,
    ) || '',
    agentPhone: getStringValue(listing.agent?.phone, listing.broker?.brokerProfile?.publicPhone, listing.broker?.phone),
    agentEmail: getStringValue(listing.agent?.email, listing.broker?.brokerProfile?.publicEmail, listing.broker?.email),
    agentWhatsapp: getStringValue(listing.agent?.whatsapp, listing.broker?.brokerProfile?.whatsapp),
    latitude: getNumberValue(listing.latitude) ?? null,
    longitude: getNumberValue(listing.longitude) ?? null,
  };
}

export async function getListings(
  params: Record<string, string | number | undefined> = {},
  agencySlug?: string | null,
): Promise<AuraPropertyResults> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const response = await fetchTemplateResponse(
    getListingsUrl(searchParams, agencySlug),
    { next: { revalidate: 120 } } as any,
    10000,
    agencySlug,
  );

  if (!response.ok) {
    return { properties: [], total: 0, page: 1, totalPages: 1 };
  }

  const data = await response.json();
  if (Array.isArray(data.properties)) {
    return {
      properties: data.properties,
      total: data.total || data.properties.length,
      page: data.page || 1,
      totalPages: data.totalPages || 1,
    };
  }

  const rawListings = Array.isArray(data) ? data : (data.listings || []);

  return {
    properties: rawListings.map((listing: RawListing) => mapListingToAuraProperty(listing, agencySlug)),
    total: data.total || rawListings.length,
    page: data.page || 1,
    totalPages: data.totalPages || 1,
  };
}

export async function getPropertyById(id: string, agencySlug?: string | null): Promise<AuraProperty | null> {
  const response = await fetchTemplateResponse(
    getPropertyUrl(id),
    { next: { revalidate: 120 } } as any,
    10000,
    agencySlug,
  );
  if (!response.ok) return null;

  const data = await response.json();
  if (isMappedAuraProperty(data)) {
    return data;
  }

  return mapListingToAuraProperty(data, agencySlug);
}
