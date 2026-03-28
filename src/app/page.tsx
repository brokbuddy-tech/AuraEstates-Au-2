
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeatureGrid } from "@/components/feature-grid";
import { PropertyCarousel } from "@/components/property-carousel";
import { Editorial } from "@/components/editorial";
import { TrustAndFinancials } from "@/components/trust-and-financials";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <Hero />
      <PropertyCarousel />
      <FeatureGrid />
      <TrustAndFinancials />
      <Editorial />
      
      <section className="py-32 px-6 md:px-12 bg-white flex flex-col items-center text-center">
        <div className="max-w-4xl bg-[#F8F9FA] rounded-[2.5rem] p-12 md:p-20 border border-[#E5E7EB] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/10 transition-colors" />
          
          <span className="text-primary font-bold tracking-[0.3em] text-xs uppercase mb-6 block">Take the Leap</span>
          <h2 className="text-4xl md:text-6xl font-black text-[#111111] mb-8 uppercase tracking-tighter leading-none">
            Ready to find your <br /><span className="text-primary italic">dream property?</span>
          </h2>
          <p className="text-[#111111]/50 text-lg mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Join over 2 million Australians using Aether Australia to secure their future. 
            Personalized recommendations, AI-powered insights, and expert strategic advice.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/buy">
              <button className="px-10 py-5 bg-[#111111] text-white font-bold rounded-2xl hover:bg-primary transition-all active:scale-95 shadow-2xl shadow-black/10">
                Search Properties
              </button>
            </Link>
            <Link href="/buy">
              <button className="px-10 py-5 bg-white text-[#111111] font-bold rounded-2xl border border-[#E5E7EB] hover:border-primary transition-all active:scale-95">
                Explore Suburbs
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
