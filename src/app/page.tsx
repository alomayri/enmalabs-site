import { Nav } from "@/components/Nav";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSceneClient } from "@/components/scenes/ManifestoSceneClient";
import { ClosingSceneClient } from "@/components/scenes/ClosingSceneClient";
import { OpusGrid } from "@/components/scenes/OpusGrid";
import { BalsamPreviewScene } from "@/components/scenes/BalsamPreviewScene";
import { WritingFeed } from "@/components/scenes/WritingFeed";
import { hero, manifesto, projects, writing, closingCta, balsamPreview } from "@/lib/content";

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
          eyebrow="The Work"
          heading="Balsam is first. The rest is still forming."
          lead="One tool is being made in public. The others are still in outline."
          projects={projects}
        />

        <BalsamPreviewScene
          id="balsam-preview"
          eyebrow={balsamPreview.eyebrow}
          heading={balsamPreview.heading}
          lead={balsamPreview.lead}
          helper={balsamPreview.helper}
          moments={balsamPreview.moments}
        />

        <WritingFeed
          id="journal"
          eyebrow="Journal"
          heading="Notes from the process."
          lead="The journal stays public while the products are still finding their shape."
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
