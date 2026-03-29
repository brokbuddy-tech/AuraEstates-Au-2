"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  theme?: "light" | "dark";
}

export function Navbar({ theme: manualTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine theme based on pathname if not manually provided
  // Pages with heroes/dark backgrounds get "dark" (white text) by default
  // Detail pages or others might prefer "light" (dark text) initially
  const isDetailPage = pathname.includes("/properties/");
  const effectiveTheme = manualTheme || (isDetailPage ? "light" : "dark");
  
  const isLight = effectiveTheme === "light" || scrolled;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between",
        scrolled ? "glass-morphism py-3 shadow-sm border-b border-black/5" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <span className={cn(
            "text-2xl font-bold tracking-tighter transition-colors",
            isLight ? "text-[#111111]" : "text-white"
          )}>
            Aether<span className="text-primary"> Australia</span>
          </span>
        </Link>

        <div className={cn(
          "hidden lg:flex items-center gap-8 text-sm font-medium transition-colors",
          isLight ? "text-[#111111]/80" : "text-white/90"
        )}>
          <Link href="/buy" className="hover:text-primary transition-colors">Buy</Link>
          <Link href="/rent" className="hover:text-primary transition-colors">Rent</Link>
          <Link href="/sold" className="hover:text-primary transition-colors">Sold</Link>
          <Link href="/agents" className="hover:text-primary transition-colors">Find Agent</Link>
          <Link href="/commercial" className="hover:text-primary transition-colors">Commercial</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/contact" className="hidden md:block">
          <Button
            variant="outline"
            className={cn(
              "items-center gap-2 transition-all duration-300 backdrop-blur-sm",
              isLight 
                ? "border-primary/20 text-primary hover:bg-primary hover:text-white" 
                : "border-white/20 text-white hover:bg-white hover:text-primary"
            )}
          >
            Contact Us
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden transition-colors",
            isLight ? "text-[#111111]" : "text-white"
          )}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-white z-40 p-8 flex flex-col gap-6 animate-in slide-in-from-right duration-300">
           <Link href="/buy" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Buy</Link>
           <Link href="/rent" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Rent</Link>
           <Link href="/sold" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Sold</Link>
           <Link href="/agents" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Find Agent</Link>
           <Link href="/commercial" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">Commercial</Link>
           <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-[#111111] uppercase tracking-tighter">About Us</Link>
           <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-8">
             <Button className="w-full h-14 bg-primary text-white font-bold rounded-xl">Contact Us</Button>
           </Link>
        </div>
      )}
    </nav>
  );
}
