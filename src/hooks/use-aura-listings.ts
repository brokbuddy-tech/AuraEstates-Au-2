"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getListings, type AuraProperty } from "@/lib/api";
import { cleanQueryForCategory, matchesTemplateCategory, normalizeCategory } from "@/lib/search-utils";

type ListingMode = "buy" | "rent" | "sold" | "commercial";

function getApiSort(sort: string | null) {
  switch (sort) {
    case "price-high":
      return "price-desc";
    case "price-low":
      return "price-asc";
    case "size":
      return "area-desc";
    default:
      return "";
  }
}

function applyClientSort(properties: AuraProperty[], sort: string | null) {
  if (sort === "beds") {
    return [...properties].sort((a, b) => b.beds - a.beds);
  }

  if (sort === "size") {
    return [...properties].sort((a, b) => b.area - a.area);
  }

  return properties;
}

export function useAuraListings(mode: ListingMode) {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<AuraProperty[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadListings() {
      setLoading(true);
      const activeSort = searchParams.get("sort") || (mode === "commercial" ? "price-high" : "");
      const category = (searchParams.get("category") || "")
        .split(",")
        .map(normalizeCategory)
        .filter(Boolean)
        .join(",");
      const searchQuery = cleanQueryForCategory(searchParams.get("q"), category) || "";

      const params: Record<string, string | number> = {
        q: searchQuery,
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        bedrooms: searchParams.get("bedrooms") || "",
        bathrooms: searchParams.get("bathrooms") || "",
        minArea: searchParams.get("minArea") || "",
        maxArea: searchParams.get("maxArea") || "",
        readiness: searchParams.get("readiness") || "",
        page: category ? "1" : searchParams.get("page") || "1",
        limit: category ? 96 : 12,
        sort: getApiSort(activeSort),
      };

      if (mode === "rent") {
        params.transactionType = "RENT";
        params.status = "ACTIVE";
      } else if (mode === "sold") {
        params.status = "SOLD";
      } else {
        params.transactionType = "SALE";
        params.status = "ACTIVE";
      }

      if (mode === "commercial") {
        params.propertyType = "COMMERCIAL";
      }

      const result = await getListings(params);
      if (!active) return;

      const matchedProperties = result.properties.filter((property) => matchesTemplateCategory(property, category));
      setProperties(applyClientSort(matchedProperties, activeSort));
      setTotal(category ? matchedProperties.length : result.total);
      setPage(category ? 1 : result.page);
      setTotalPages(category ? 1 : result.totalPages);
      setLoading(false);
    }

    loadListings();

    return () => {
      active = false;
    };
  }, [mode, searchParams]);

  return { properties, total, page, totalPages, loading };
}
