"use client";

import React from "react";
import { PropertyCard } from "./property-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const PROPERTIES = [
  {
    id: "1",
    image: PlaceHolderImages.find(img => img.id === "prop-1")?.imageUrl || "",
    price: "$2,450,000",
    address: "12 Marine Parade, Cottesloe WA 6011",
    beds: 4,
    baths: 3,
    cars: 2,
    description: "Experience coastal living at its finest in this stunning contemporary residence. Featuring floor-to-ceiling windows with panoramic ocean views, a gourmet chef's kitchen, and expansive outdoor entertaining areas."
  },
  {
    id: "2",
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
    price: "$1,890,000",
    address: "45 Serenity Crescent, Noosa Heads QLD 4567",
    beds: 5,
    baths: 4,
    cars: 3,
    description: "An architectural masterpiece nestled in a quiet cul-de-sac. This family haven boasts high ceilings, premium finishes throughout, a private home cinema, and a heated infinity pool."
  },
  {
    id: "3",
    image: PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
    price: "$3,200,000",
    address: "Penthouse 402/88 Elizabeth St, Sydney NSW 2000",
    beds: 3,
    baths: 2,
    cars: 2,
    description: "Luxury urban living in the heart of the CBD. This executive penthouse offers unrivaled 360-degree views of the Sydney skyline and harbour."
  },
  {
    id: "4",
    image: PlaceHolderImages.find(img => img.id === "prop-4")?.imageUrl || "",
    price: "$1,350,000",
    address: "7 Blossom Lane, Malvern VIC 3144",
    beds: 4,
    baths: 3,
    cars: 2,
    description: "A charming blend of period elegance and modern comfort. This beautifully renovated family home features open-plan living zones and a designer pool."
  }
];

export function PropertyCarousel() {
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
          <button className="text-primary hover:underline transition-colors font-bold text-xs uppercase tracking-widest">
            View all
          </button>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar scroll-smooth">
          {PROPERTIES.map((prop) => (
            <div key={prop.id} className="min-w-[320px] md:min-w-[400px]">
              <PropertyCard {...prop} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
