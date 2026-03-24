
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FeatureGrid } from "@/components/feature-grid";
import { PropertyCarousel } from "@/components/property-carousel";
import { Editorial } from "@/components/editorial";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <FeatureGrid />
      <PropertyCarousel />
      <Editorial />
      <section className="py-24 px-6 md:px-12 bg-background flex flex-col items-center text-center">
        <div className="max-w-3xl glass-morphism rounded-3xl p-12 shimmer-effect border border-primary/20">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to find your dream property?</h2>
          <p className="text-white/60 text-lg mb-8">
            Join over 2 million Australians using AuraEstates to find their perfect home. 
            Personalized recommendations, AI-powered insights, and expert advice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20">
              Get Started for Free
            </button>
            <button className="px-8 py-4 glass-morphism text-white font-bold rounded-xl hover:bg-white/10 transition-all active:scale-95 border border-white/20">
              Explore Suburbs
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
