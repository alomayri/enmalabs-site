import { site, socials } from "@/lib/content";
import { controls, cx, layout, surfaces, typography } from "@/lib/design-system";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-rule">
      <div className={cx(layout.page, layout.sectionSpace)}>
        <div
          className={cx(
            surfaces.footerPanel,
            "grid gap-12 p-8 md:grid-cols-[2fr_1fr_1fr] md:p-10",
          )}
        >
          <div>
            <p className="font-display text-2xl tracking-tight">{site.name}</p>
            <p className="mt-3 max-w-md text-base text-whisper">
              <em className="italic-display text-lg text-paper">Anima</em> and{" "}
              <em className="italic-display text-lg text-paper">إنماء</em>. Soul and growth.
              A small, independent lab making slow software.
            </p>
          </div>

          <div>
            <p className={typography.eyebrow}>Contact</p>
            <ul className="mt-4 space-y-2 text-base">
              <li>
                <a className={controls.footerLink} href={`mailto:${site.contactEmail}`}>
                  {site.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={typography.eyebrow}>Follow</p>
            <ul className="mt-4 space-y-2 text-base">
              {socials.map((s) => (
                <li key={s.label}>
                  <a className={controls.footerLink} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-rule">
        <div
          className={cx(
            layout.page,
            "flex flex-col items-center justify-between gap-3 py-6 text-xs text-whisper md:flex-row",
          )}
        >
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="font-mono">enmalabs.com</p>
        </div>
      </div>
    </footer>
  );
}
