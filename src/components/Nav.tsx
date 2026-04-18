"use client";

import Link from "next/link";
import { site } from "@/lib/content";

const productNav = [
  { label: "Why Balsam", href: "#manifesto" },
  { label: "How it helps", href: "#chapters" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <nav className="pointer-events-auto mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-3 text-paper">
          <span className="font-display text-xl tracking-tight">{site.name}</span>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-whisper md:inline">
            {site.tagline}
          </span>
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-whisper md:flex">
          {productNav.map((item) => (
            <li key={item.href}>
              <a className="transition-colors hover:text-paper" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#waitlist"
          className="rounded-full border border-rule bg-mist/40 px-4 py-1.5 text-sm text-paper backdrop-blur-md transition hover:border-paper hover:bg-mist/60"
        >
          Waitlist
        </a>
      </nav>
    </header>
  );
}
