"use client";

import React from "react";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function ContactPage() {
  const backgroundImage = PlaceHolderImages.find(img => img.id === "editorial-1")?.imageUrl;

  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <section className="relative flex-1 flex items-center justify-center pt-24 pb-12 px-6">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {backgroundImage && (
            <Image
              src={backgroundImage}
              alt="Contact Background"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
        </div>

        <div className="relative z-20 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="text-white space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-white/60 text-lg max-w-md">
                Have questions about a property or need expert advice? Our team of premium real estate consultants is here to help you every step of the way.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Email Us</p>
                  <p className="text-lg font-medium">hello@auraestates.com.au</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Call Us</p>
                  <p className="text-lg font-medium">+61 2 8888 0000</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl glass-morphism flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Visit Us</p>
                  <p className="text-lg font-medium">100 Barangaroo Ave, Sydney NSW 2000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-morphism p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-white/60">First Name</Label>
                  <Input 
                    id="first-name" 
                    placeholder="Jane" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-white/60">Last Name</Label>
                  <Input 
                    id="last-name" 
                    placeholder="Doe" 
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/60">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="jane@example.com" 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 h-12 rounded-xl focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/60">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help..." 
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 min-h-[120px] rounded-xl focus:ring-primary"
                />
              </div>

              <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all active:scale-[0.98] group">
                Send Message
                <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}