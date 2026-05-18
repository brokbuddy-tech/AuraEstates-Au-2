"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { replaceTemplateBranding } from "@/lib/public-site";

const FAQS = [
  {
    question: "What regions does {{agencyName}} cover?",
    answer: "We specialize in premium metropolitan hubs and coastal estates across New South Wales, Victoria, Queensland, Western Australia, and South Australia. Our network is focused on high-growth and established premium postcodes."
  },
  {
    question: "How does the AI-powered property search work?",
    answer: "Our proprietary AI search engine goes beyond simple filters. It analyzes multi-decade market cycles, infrastructure developments, and lifestyle data to match you with properties that align with your long-term strategic and personal goals."
  },
  {
    question: "Are your property appraisals and reports free?",
    answer: "Yes. We provide complimentary instant digital property reports and expert in-person appraisals to help homeowners understand their property's true value in the current 2026 market cycle."
  },
  {
    question: "How do I connect with a local {{agencyName}} agent?",
    answer: "You can browse our directory on the 'Find Agent' page to see specialists in your specific region, or simply click 'Contact Us' to be matched with a consultant best suited to your requirements."
  },
  {
    question: "What makes {{agencyName}} different from traditional agencies?",
    answer: "Traditional agencies focus on transactions; {{agencyName}} focuses on strategic clarity. We combine deep architectural appreciation with predictive AI market intelligence to ensure our clients secure extraordinary outcomes."
  }
];

export function FAQSection({ agencyName = "Agency Website" }: { agencyName?: string }) {
  const faqs = FAQS.map((faq) => ({
    question: replaceTemplateBranding(faq.question, agencyName),
    answer: replaceTemplateBranding(faq.answer, agencyName),
  }));

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Knowledge Hub</span>
          <h2 className="text-3xl md:text-5xl font-black text-[#111111] uppercase tracking-tighter">
            Frequently Asked <span className="text-primary italic">Questions.</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-6" />
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem 
              key={idx} 
              value={`item-${idx}`}
              className="bg-white border border-[#E5E7EB] rounded-2xl px-6 py-2 transition-all hover:shadow-md data-[state=open]:shadow-lg"
            >
              <AccordionTrigger className="text-lg font-bold text-[#111111] hover:no-underline hover:text-primary transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#111111]/60 leading-relaxed pb-6 pt-2 font-light">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
