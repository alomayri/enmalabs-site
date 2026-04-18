import { site, socials } from "@/lib/content";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl tracking-tight">{site.name}</p>
          <p className="mt-3 max-w-md text-base text-whisper">
            <em className="italic-display text-lg text-paper">Anima</em> and{" "}
            <em className="italic-display text-lg text-paper">إنماء</em> — soul and growth.
            A small lab in Riyadh, making slow software.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-whisper">Contact</p>
          <ul className="mt-4 space-y-2 text-base">
            <li>
              <a className="text-paper transition hover:text-ember" href={`mailto:${site.contactEmail}`}>
                {site.contactEmail}
              </a>
            </li>
            <li>
              <a className="text-whisper transition hover:text-ember" href={`mailto:${site.adminEmail}`}>
                {site.adminEmail}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-whisper">Follow</p>
          <ul className="mt-4 space-y-2 text-base">
            {socials.map((s) => (
              <li key={s.label}>
                <a className="text-paper transition hover:text-ember" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-whisper md:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. Riyadh, Saudi Arabia.</p>
          <p className="font-mono">enmalabs.com</p>
        </div>
      </div>
    </footer>
  );
}
