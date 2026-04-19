import type { Metadata } from "next";
import { InfoPageShell } from "@/components/InfoPageShell";
import { company, site, supportPage } from "@/lib/content";
import { controls, typography } from "@/lib/design-system";

export const metadata: Metadata = {
  title: "Support",
  description: supportPage.lead,
};

export default function SupportPage() {
  return (
    <InfoPageShell
      eyebrow="Support"
      title={supportPage.title}
      lead={supportPage.lead}
    >
      <div className="space-y-10">
        <div className="rounded-[1.5rem] border border-rule bg-mist/30 p-6">
          <p className={typography.eyebrow}>Support contact</p>
          <p className="mt-4 text-sm text-whisper">Legal entity</p>
          <p className="mt-2 text-lg text-paper">{company.legalEntity}</p>
          <p className="mt-4 text-sm text-whisper">Email</p>
          <p className="mt-4 text-lg text-paper">
            <a className={controls.footerLink} href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          </p>
          <p className="mt-4 text-sm text-whisper">Phone</p>
          <p className="mt-2 text-lg text-paper">
            <a className={controls.footerLink} href={`tel:${company.supportPhone.replace(/[^\d+]/g, "")}`}>
              {company.supportPhone}
            </a>
          </p>
          <p className="mt-4 text-sm text-whisper">Mailing address</p>
          <address className="mt-2 not-italic text-whisper">
            {company.mailingAddress.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
          <p className="mt-3 text-sm text-whisper">
            Use these details for app issues, general feedback, feature requests,
            and company or enrollment questions.
          </p>
          <p className="mt-2 text-sm text-whisper">{company.responseWindow}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {supportPage.sections.map((section) => (
            <section key={section.heading} className="rounded-[1.5rem] border border-rule bg-mist/20 p-6">
              <h2 className={typography.journalTitle}>{section.heading}</h2>
              <ul className="mt-5 space-y-3 text-whisper">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </InfoPageShell>
  );
}
