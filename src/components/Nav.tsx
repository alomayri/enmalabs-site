"use client";

import Link from "next/link";
import { nav, site } from "@/lib/content";
import {
  controls,
  cx,
  layout,
  surfaces,
  typography,
} from "@/lib/design-system";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 pointer-events-none">
      <div
        className={cx(
          layout.page,
          "pointer-events-auto flex items-center justify-between py-5",
        )}
      >
        <Link href="/" className="flex flex-col leading-tight">
          <span className={typography.brandMark}>{site.name}</span>
          <span className={typography.brandMeta}>{site.tagline}</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className={cx("hidden items-center gap-1 md:flex", surfaces.navCapsule)}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={controls.navLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#manifesto"
            className={cx("hidden md:inline-flex", controls.secondaryButton)}
          >
            Why this exists
          </a>
          <a
            href="#waitlist"
            className={controls.pillButton}
          >
            Join waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
