
import React from "react";
import { Calculator, UserSearch, Compass, Map, Home, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Property Valuations",
    desc: "Get an instant estimate for any home in Australia.",
    icon: Calculator,
    color: "bg-blue-500/10 text-blue-400"
  },
  {
    title: "Find an Agent",
    desc: "Connect with the top-performing agents in your local area.",
    icon: UserSearch,
    color: "bg-emerald-500/10 text-primary"
  },
  {
    title: "Suburb Insights",
    desc: "Explore schools, crime rates, and market trends.",
    icon: Map,
    color: "bg-purple-500/10 text-purple-400"
  },
  {
    title: "Loan Calculator",
    desc: "Find out how much you can borrow for your next move.",
    icon: ShieldCheck,
    color: "bg-orange-500/10 text-orange-400"
  }
];

export function FeatureGrid() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Explore your options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-2xl glass-morphism hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", feat.color)}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feat.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
