import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 px-6 py-16">
        <div>
          <p className="font-display text-2xl tracking-tight text-paper">{site.name}</p>
          <p className="mt-3 max-w-lg text-base text-whisper">
            {site.tagline} Join the waitlist for occasional updates, or reach out directly if you have a question.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-whisper sm:flex-row sm:items-center sm:gap-6">
          <a className="text-paper transition hover:text-ember" href="#waitlist">
            Join the waitlist
          </a>
          <a className="text-paper transition hover:text-ember" href={`mailto:${site.contactEmail}`}>
            {site.contactEmail}
          </a>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-6 text-xs text-whisper sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.contactEmail}</p>
        </div>
      </div>
    </footer>
  );
}
