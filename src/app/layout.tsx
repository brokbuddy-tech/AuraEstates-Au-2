import type {Metadata} from 'next';
import 'leaflet/dist/leaflet.css';
import './globals.css';
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { getSiteConfig } from "@/lib/public-site";
import { getRequestAgencySlug } from "@/lib/server-agency";

export const metadata: Metadata = {
  title: 'Aether Australia | Premium Real Estate Search',
  description: 'Experience a reimagined way to find your next home with AI-powered property insights.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const agencySlug = await getRequestAgencySlug();
  const siteConfig = await getSiteConfig(agencySlug);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <Navbar initialSiteConfig={siteConfig} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
