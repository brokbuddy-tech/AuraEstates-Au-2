
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
    description: "Experience coastal living at its finest in this stunning contemporary residence. Featuring floor-to-ceiling windows with panoramic ocean views, a gourmet chef's kitchen, and expansive outdoor entertaining areas. This property offers the perfect blend of luxury and relaxation."
  },
  {
    id: "2",
    image: PlaceHolderImages.find(img => img.id === "prop-2")?.imageUrl || "",
    price: "$1,890,000",
    address: "45 Serenity Crescent, Noosa Heads QLD 4567",
    beds: 5,
    baths: 4,
    cars: 3,
    description: "An architectural masterpiece nestled in a quiet cul-de-sac. This family haven boasts high ceilings, premium finishes throughout, a private home cinema, and a heated infinity pool. Minutes away from world-class dining and pristine beaches."
  },
  {
    id: "3",
    image: PlaceHolderImages.find(img => img.id === "prop-3")?.imageUrl || "",
    price: "$3,200,000",
    address: "Penthouse 402/88 Elizabeth St, Sydney NSW 2000",
    beds: 3,
    baths: 2,
    cars: 2,
    description: "Luxury urban living in the heart of the CBD. This executive penthouse offers unrivaled 360-degree views of the Sydney skyline and harbour. Smart home automation, a wrap-around balcony, and exclusive access to resident facilities including a rooftop gym and spa."
  },
  {
    id: "4",
    image: PlaceHolderImages.find(img => img.id === "prop-4")?.imageUrl || "",
    price: "$1,350,000",
    address: "7 Blossom Lane, Malvern VIC 3144",
    beds: 4,
    baths: 3,
    cars: 2,
    description: "A charming blend of period elegance and modern comfort. This beautifully renovated family home features open-plan living zones, a sun-drenched backyard with a designer pool, and a dedicated workspace. Close to prestigious schools and vibrant parklands."
  }
];

export function PropertyCarousel() {
  return (
    <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-background to-[#151d1a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Recommended for you</h2>
            <p className="text-white/40">Handpicked properties matching your preferences</p>
          </div>
          <button className="text-primary hover:text-accent transition-colors font-medium">View all</button>
        </div>

        <div className="flex overflow-x-auto pb-8 gap-8 no-scrollbar scroll-smooth">
          {PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}
