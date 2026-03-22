import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import BackgroundParticles from "@/components/BackgroundParticles";

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
  description: "Experience transformative tarot readings with Vielorine. Illuminate your path with mystical guidance, spiritual tools, and sacred wisdom.",
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
        <BackgroundParticles />
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}

