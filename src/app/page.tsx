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
      <main id="main-content">
        <HeroSection eyebrow={hero.eyebrow} title={hero.title} sub={hero.sub} />

        <ManifestoSceneClient
          eyebrow={manifesto.eyebrow}
          heading={manifesto.heading}
          paragraphs={manifesto.paragraphs}
        />

        <OpusGrid
          id="work"
          eyebrow="What is real"
          heading="Balsam is first."
          lead="The lab matters because one product is being made in public. The rest stays quieter until it earns more weight."
          projects={projects}
        />

        <WritingFeed
          id="journal"
          eyebrow="Journal"
          heading="Notes from the work."
          lead="Short writing from the lab while the products are still taking shape."
          entries={writing}
        />

        <ClosingSceneClient
          id="waitlist"
          eyebrow={closingCta.eyebrow}
          title={closingCta.title}
          sub={closingCta.sub}
        >
          <WaitlistForm />
        </ClosingSceneClient>

        <Footer />
      </main>
    </>
  );
}
