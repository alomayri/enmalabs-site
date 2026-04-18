import { Nav } from "@/components/Nav";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSceneClient } from "@/components/scenes/ManifestoSceneClient";
import { ClosingSceneClient } from "@/components/scenes/ClosingSceneClient";
import { OpusGrid } from "@/components/scenes/OpusGrid";
import { WritingFeed } from "@/components/scenes/WritingFeed";
import { hero, manifesto, projects, writing, closingCta } from "@/lib/content";

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

      <OpusGrid
        id="work"
        eyebrow="The Work"
        heading="Four tools. One lab."
        projects={projects}
      />

      <WritingFeed
        id="journal"
        eyebrow="Journal"
        heading="Notes from the process."
        entries={writing}
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
