import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import NavbarWrapper from "@/components/NavbarWrapper";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { Manrope, Source_Sans_3 } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NearBy — Safe, Trusted Neighborhood Marketplace",
  description:
    "Buy and sell used baby gear, furniture, electronics, and household items with government-ID-verified neighbors within a 2-mile radius. No strangers. No scams. Just your community.",
  keywords: [
    "neighborhood marketplace",
    "buy and sell locally",
    "verified neighbors",
    "hyperlocal marketplace",
    "used goods",
    "baby gear",
    "furniture",
    "government ID verified",
    "safe marketplace",
  ],
  authors: [{ name: "NearBy" }],
  openGraph: {
    title: "NearBy — Safe, Trusted Neighborhood Marketplace",
    description:
      "Buy and sell used goods with government-ID-verified neighbors within a 2-mile radius. No strangers. No scams. Just your community.",
    type: "website",
    siteName: "NearBy",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NearBy — Safe, Trusted Neighborhood Marketplace",
    description:
      "Buy and sell used goods with government-ID-verified neighbors within a 2-mile radius.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NearBy",
              description:
                "Buy and sell used goods with government-ID-verified neighbors within a 2-mile radius. No strangers. No scams. Just your community.",
              url: "https://nearby.market",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://nearby.market/browse?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-ivory text-charcoal antialiased" style={{ fontFamily: "'DM Sans', 'Inter', 'Plus Jakarta Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        <Providers>
          <NavbarWrapper>
            <Navbar />
          </NavbarWrapper>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}