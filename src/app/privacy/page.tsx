import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { privacyPage, site } from "@/lib/content";
import { controls, typography } from "@/lib/design-system";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyPage.lead,
};

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy"
      title={privacyPage.title}
      lead={privacyPage.lead}
    >
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-rule bg-mist/20 px-6 py-4">
          <p className="text-sm text-whisper">Last updated: {privacyPage.updated}</p>
          <a className={controls.footerLink} href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {privacyPage.facts.map((fact) => (
            <div key={fact.label} className="rounded-[1.5rem] border border-rule bg-mist/20 p-5">
              <p className={typography.eyebrow}>{fact.label}</p>
              <p className="mt-3 text-sm leading-6 text-paper/88">{fact.value}</p>
            </div>
          ))}
        </div>

        {privacyPage.sections.map((section) => (
          <section key={section.heading} className="rounded-[1.5rem] border border-rule bg-mist/20 p-6">
            <h2 className={typography.journalTitle}>{section.heading}</h2>
            <div className="mt-4 space-y-4 text-whisper">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </InfoPageShell>
  );
}
