import React from "react";
import Link from "next/link";
import { Calculator, UserSearch, Map, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Property Valuations",
    desc: "Get an instant estimate for any home in Australia.",
    icon: Calculator,
    color: "bg-blue-500/10 text-blue-600",
    href: "/sell"
  },
  {
    title: "Find an Agent",
    desc: "Connect with the top-performing agents in your local area.",
    icon: UserSearch,
    color: "bg-emerald-500/10 text-primary",
    href: "/agents"
  },
  {
    title: "Suburb Insights",
    desc: "Explore schools, crime rates, and market trends.",
    icon: Map,
    color: "bg-purple-500/10 text-purple-600",
    href: "/buy"
  },
  {
    title: "Loan Calculator",
    desc: "Find out how much you can borrow for your next move.",
    icon: ShieldCheck,
    color: "bg-orange-500/10 text-orange-600",
    href: "/buy"
  }
];

export function FeatureGrid() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tighter">
            Explore Your <span className="text-primary italic">Options.</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => (
            <Link
              key={idx}
              href={feat.href}
              className="group p-8 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", feat.color)}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#111111] mb-3 group-hover:text-primary transition-colors">{feat.title}</h3>
              <p className="text-[#111111]/50 text-sm leading-relaxed font-light">{feat.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
