import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import CosmosBackground from "@/components/CosmosBackground";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vielorine | Mystical Tarot Readings & Spiritual Guidance",
  description: "Experience transformative tarot readings with Vielorine. Illuminate your path with mystical guidance, spiritual tools, and sacred wisdom. Book your personalized reading today.",
  keywords: ["tarot reading", "spiritual guidance", "astrology", "major arcana", "tarot reading online", "clairvoyant", "mystical guidance", "healing crystals", "spiritual awakening", "Vielorine"],
  openGraph: {
    title: "Vielorine | Mystical Tarot Readings & Spiritual Guidance",
    description: "Experience transformative tarot readings with Vielorine. Illuminate your path with mystical guidance, spiritual tools, and sacred wisdom.",
    url: "https://vielorine.com",
    siteName: "Vielorine",
    images: [{ url: "/images/vielorine-logo.png", width: 800, height: 600, alt: "Vielorine Tarot & Spiritual Guidance" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vielorine | Mystical Tarot Readings",
    description: "Illuminate your path with mystical guidance and sacred wisdom.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
        <CosmosBackground />
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}

