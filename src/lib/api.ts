export const ORG_SLUG = "aussie-re-01";

function normalizeApiBaseUrl(value: string) {
  const normalized = value.trim().replace(/\/+$/, "");
  if (!normalized) return "";
  if (/\/api$/i.test(normalized)) return normalized;
  if (/\/api\/public$/i.test(normalized)) return normalized.replace(/\/public$/i, "");
  return `${normalized}/api`;
}

const API_BASE_URL = normalizeApiBaseUrl(
  ((globalThis as any).process?.env?.NEXT_PUBLIC_API_URL) || "http://localhost:4000"
);
const API_ORIGIN = API_BASE_URL.replace(/\/api$/i, "");

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
    phone?: string | null;
    email?: string | null;
    brokerProfile?: {
      displayName?: string | null;
      publicPhone?: string | null;
      publicEmail?: string | null;
      whatsapp?: string | null;
    } | null;
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
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

function getPublicListingMediaUrl(
  image?: ListingImage | null,
  variant: "thumbnail" | "medium" | "compressed" | "original" = "compressed"
) {
  if (!image?.id) return "";
  return `${API_BASE_URL}/public/aus/images/${image.id}/view?variant=${variant}`;
}

function getListingImageUrl(image?: ListingImage | null) {
  if (!image) return "";
  const publicImageUrl = getPublicListingMediaUrl(image, "compressed");
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

function getGalleryImages(images?: ListingImage[]) {
  return Array.from(
    new Set(
      (images || [])
        .map((image) => getListingImageUrl(image))
        .filter(Boolean)
    )
  );
}

function getListingsUrl(searchParams: URLSearchParams) {
  const query = searchParams.toString();

  if (typeof window !== "undefined") {
    return `/api/listings${query ? `?${query}` : ""}`;
  }

  return `${API_BASE_URL}/public/aus/org/${ORG_SLUG}/listings${query ? `?${query}` : ""}`;
}

function getPropertyUrl(id: string) {
  if (typeof window !== "undefined") {
    return `/api/listings/${id}`;
  }

  return `${API_BASE_URL}/public/aus/listing/${id}`;
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

export function mapListingToAuraProperty(listing: RawListing): AuraProperty {
  const images = getGalleryImages(listing.images);
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
      listing.broker?.brokerProfile?.displayName,
      [listing.broker?.firstName, listing.broker?.lastName].filter(Boolean).join(" ")
    ) || "Aura Estates Advisor",
    agentPhone: getStringValue(listing.broker?.brokerProfile?.publicPhone, listing.broker?.phone),
    agentEmail: getStringValue(listing.broker?.brokerProfile?.publicEmail, listing.broker?.email),
    agentWhatsapp: getStringValue(listing.broker?.brokerProfile?.whatsapp),
    latitude: getNumberValue(listing.latitude) ?? null,
    longitude: getNumberValue(listing.longitude) ?? null,
  };
}

export async function getListings(params: Record<string, string | number | undefined> = {}): Promise<AuraPropertyResults> {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const response = await safeFetch(getListingsUrl(searchParams), { next: { revalidate: 120 } } as any);

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
    properties: rawListings.map(mapListingToAuraProperty),
    total: data.total || rawListings.length,
    page: data.page || 1,
    totalPages: data.totalPages || 1,
  };
}

export async function getPropertyById(id: string): Promise<AuraProperty | null> {
  const response = await safeFetch(getPropertyUrl(id), { next: { revalidate: 120 } } as any);
  if (!response.ok) return null;

  const data = await response.json();
  if (isMappedAuraProperty(data)) {
    return data;
  }

  return mapListingToAuraProperty(data);
}
