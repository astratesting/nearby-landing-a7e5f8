import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NearBy — Buy and Sell with Neighbors You Can Trust",
  description:
    "A neighborhood marketplace built on real trust and verification. Buy and sell with the people who actually live around you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ivory text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
