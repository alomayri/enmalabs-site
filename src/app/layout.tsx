import type { Metadata } from "next";
import { Newsreader, EB_Garamond } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { AmbientBed } from "@/components/audio/AmbientBed";
import { MuteButton } from "@/components/audio/MuteButton";
import { site, hero } from "@/lib/content";

// Newsreader (Production Type, OFL) — optical-size axis means the letterforms
// physically change shape at display sizes, unlike uniform-scale UI sans.
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
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
    default: `${site.name}. ${site.tagline}`,
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
    <html lang="en" className={`${newsreader.variable} ${ebGaramond.variable}`}>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-violet-soft focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink">
          Skip to content
        </a>
        <AudioProvider>
          <AmbientBed />
          <MuteButton />
          <LenisProvider>{children}</LenisProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
