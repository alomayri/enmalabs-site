import { Nav } from "@/components/Nav";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { NarratedStory } from "@/components/narration/NarratedStory";
import { ManifestoSceneClient } from "@/components/scenes/ManifestoSceneClient";
import { BalsamSceneClient } from "@/components/scenes/BalsamSceneClient";
import { ChaptersRibbon } from "@/components/scenes/ChaptersRibbon";
import { ClosingSceneClient } from "@/components/scenes/ClosingSceneClient";
import {
  hero,
  manifesto,
  apps,
  chapters,
  closingCta,
  balsamStory,
  balsamSection,
  chaptersSection,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <Nav />

      <HeroSection eyebrow={hero.eyebrow} title={hero.title} sub={hero.sub} />

      <ManifestoSceneClient
        eyebrow={manifesto.eyebrow}
        heading={manifesto.heading}
        paragraphs={manifesto.paragraphs}
      />

      <BalsamSceneClient
        eyebrow={balsamSection.eyebrow}
        heading={balsamSection.heading}
        app={apps[0]}
      />

      <NarratedStory eyebrow={balsamStory.eyebrow} beats={balsamStory.beats} />

      <ChaptersRibbon
        eyebrow={chaptersSection.eyebrow}
        heading={
          <>
            {chaptersSection.headingLead},{" "}
            <span className="italic text-soul">{chaptersSection.headingAccent}</span>
            {chaptersSection.headingTrail}
          </>
        }
        chapters={chapters}
      />

      <ClosingSceneClient
        eyebrow={closingCta.eyebrow}
        title={closingCta.title}
        sub={closingCta.sub}
      >
        <WaitlistForm />
      </ClosingSceneClient>

      <Footer />
    </>
  );
}
