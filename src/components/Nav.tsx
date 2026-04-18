"use client";

import Link from "next/link";
import { nav, site } from "@/lib/content";

export function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <nav className="pointer-events-auto mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-baseline gap-2 text-paper">
          <span className="font-display text-xl tracking-tight">{site.name}</span>
          <span className="text-xs text-whisper">{site.location}</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-whisper md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a className="transition-colors hover:text-paper" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#waitlist"
          className="rounded-full border border-rule bg-mist/60 px-4 py-1.5 text-sm text-paper backdrop-blur-md transition hover:border-ember hover:text-ember"
        >
          Waitlist
        </a>
      </nav>
    </header>
  );
}
