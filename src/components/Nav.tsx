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
      <div className={cx(layout.page, "pointer-events-auto py-5")}>
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex flex-col leading-tight">
            <span className={typography.brandMark}>{site.name}</span>
            <span className={typography.brandMeta}>{site.tagline}</span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className={cx("hidden items-center gap-1 md:flex", surfaces.navCapsule)}
          >
            {nav.map((item) =>
              item.href.startsWith("/") ? (
                <Link key={item.href} href={item.href} className={controls.navLink}>
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className={controls.navLink}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <a href="#waitlist" className={controls.pillButton}>
            Join waitlist
          </a>
        </div>

        <div className="mt-3 md:hidden">
          <nav
            aria-label="Primary navigation mobile"
            className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className={cx("flex min-w-max items-center gap-1", surfaces.navCapsule)}>
              {nav.map((item) =>
                item.href.startsWith("/") ? (
                  <Link key={item.href} href={item.href} className={controls.navLink}>
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className={controls.navLink}
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
