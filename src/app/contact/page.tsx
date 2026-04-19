import type { Metadata } from "next";
import Link from "next/link";
import { InfoPageShell } from "@/components/InfoPageShell";
import { company, companyLinks, contactPage, site } from "@/lib/content";
import { controls, typography } from "@/lib/design-system";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.lead,
};

export default function ContactPage() {
  return (
    <InfoPageShell
      eyebrow="Contact"
      title={contactPage.title}
      lead={contactPage.lead}
    >
      <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className={typography.journalTitle}>Email</h2>
          <p className="mt-4 text-whisper">
            {company.supportNote}
          </p>
          <p className="mt-6">
            <a className={controls.footerLink} href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          </p>
          <p className="mt-3 text-sm text-whisper">{company.responseWindow}</p>
        </div>

        <div>
          <h2 className={typography.journalTitle}>What belongs here</h2>
          <ul className="mt-4 space-y-3 text-whisper">
            <li>Balsam beta questions, bug reports, and playback issues</li>
            <li>Feature requests, notes about what would make the app feel better, and the small things that still resist you</li>
            <li>A simple hello, if you want to say one</li>
            <li>Partnership, press, company, and enrollment verification questions</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className={controls.secondaryButton}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </InfoPageShell>
  );
}
