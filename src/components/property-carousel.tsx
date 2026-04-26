"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PropertyCard } from "./property-card";
import { getListings, type AuraProperty } from "@/lib/api";

export function PropertyCarousel() {
  const [properties, setProperties] = useState<AuraProperty[]>([]);

  useEffect(() => {
    let active = true;

    async function loadProperties() {
      const result = await getListings({ transactionType: "SALE", status: "ACTIVE", limit: 6 });
      if (active) setProperties(result.properties);
    }

    loadProperties();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tighter">
              Recommended <span className="text-primary italic">for you.</span>
            </h2>
            <p className="text-[#111111]/40 text-sm mt-2 font-medium">Handpicked properties matching your lifestyle</p>
          </div>
          <Link href="/buy" className="text-primary hover:underline transition-colors font-bold text-xs uppercase tracking-widest">
            View all
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar scroll-smooth">
          {properties.map((property) => (
            <div key={property.id} className="min-w-[320px] md:min-w-[400px]">
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
