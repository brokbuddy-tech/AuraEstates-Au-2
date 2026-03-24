
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Watermark Logo */}
      <div className="absolute bottom-[-50px] right-[-50px] opacity-[0.02] select-none pointer-events-none">
        <span className="text-[200px] font-black italic">AURA</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 relative z-10">
        <div>
          <h4 className="text-white font-bold mb-6">States & Territories</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-primary">New South Wales</Link></li>
            <li><Link href="#" className="hover:text-primary">Victoria</Link></li>
            <li><Link href="#" className="hover:text-primary">Queensland</Link></li>
            <li><Link href="#" className="hover:text-primary">Western Australia</Link></li>
            <li><Link href="#" className="hover:text-primary">South Australia</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Real Estate by Capital</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-primary">Sydney Real Estate</Link></li>
            <li><Link href="#" className="hover:text-primary">Melbourne Real Estate</Link></li>
            <li><Link href="#" className="hover:text-primary">Brisbane Real Estate</Link></li>
            <li><Link href="#" className="hover:text-primary">Perth Real Estate</Link></li>
            <li><Link href="#" className="hover:text-primary">Adelaide Real Estate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Domain Services</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="#" className="hover:text-primary">Property Appraisals</Link></li>
            <li><Link href="#" className="hover:text-primary">Domain Home Loans</Link></li>
            <li><Link href="#" className="hover:text-primary">Commercial Real Estate</Link></li>
            <li><Link href="#" className="hover:text-primary">Domain News</Link></li>
            <li><Link href="#" className="hover:text-primary">Agent Admin</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Connect</h4>
          <div className="flex gap-4 mb-8">
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"><Linkedin className="w-5 h-5" /></Link>
          </div>
          <div className="flex gap-4">
            <img src="https://placehold.co/120x40/1e293b/white?text=App+Store" alt="App Store" className="h-10 rounded border border-slate-700" />
            <img src="https://placehold.co/120x40/1e293b/white?text=Play+Store" alt="Play Store" className="h-10 rounded border border-slate-700" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
           <span className="text-xl font-bold tracking-tighter text-white">Aura<span className="text-primary">Estates</span></span>
           <span className="text-slate-500 text-xs ml-4">© 2024 AuraEstates Australia Pty Ltd.</span>
        </div>
        <div className="flex gap-6 text-xs text-slate-500 font-medium">
          <Link href="#" className="hover:text-primary">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary">Terms of Use</Link>
          <Link href="#" className="hover:text-primary">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
