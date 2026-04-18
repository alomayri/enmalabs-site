import type { Metadata } from "next";
import { Inter, Instrument_Serif, EB_Garamond } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { MuteButton } from "@/components/audio/MuteButton";
import { site, hero } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: hero.sub,
  openGraph: {
    title: site.name,
    description: hero.sub,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [
      {
        url: "/hero-reference.png",
        width: 1408,
        height: 792,
        alt: "A single glass flask on a dark wooden study table, lit by candlelight.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: hero.sub,
    images: ["/hero-reference.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable} ${ebGaramond.variable}`}>
      <body>
        <AudioProvider>
          <MuteButton />
          <LenisProvider>{children}</LenisProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
