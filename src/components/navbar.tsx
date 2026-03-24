
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, User, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex items-center justify-between",
        scrolled ? "glass-morphism py-3" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">
            Aura<span className="text-primary">Estates</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/90">
          <Link href="#" className="hover:text-primary transition-colors">Buy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Rent</Link>
          <Link href="#" className="hover:text-primary transition-colors">Sold</Link>
          <Link href="#" className="hover:text-primary transition-colors">New Homes</Link>
          <Link href="#" className="hover:text-primary transition-colors">Commercial</Link>
          <Link href="#" className="hover:text-primary transition-colors">News</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Heart className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          className="hidden md:flex items-center gap-2 border-white/20 text-white hover:bg-primary hover:border-primary transition-all duration-300 backdrop-blur-sm"
        >
          <User className="w-4 h-4" />
          Sign in / Join
        </Button>
        <Button variant="ghost" size="icon" className="lg:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </div>
    </nav>
  );
}
