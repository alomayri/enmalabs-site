"use client";

import Link from "next/link";
import { nav, site } from "@/lib/content";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 pointer-events-none">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-6 py-5 pointer-events-auto">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-serif italic text-lg text-paper">
            {site.name}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-whisper flex items-center gap-1">
            {site.tagline ?? "AI research lab"}
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-positive shadow-[0_0_8px_var(--color-positive)]"
              aria-hidden
            />
          </span>
        </Link>

        {/* Capsule nav — desktop only */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-rule bg-ink/50 px-2 py-1.5 backdrop-blur-xl shadow-[0_4px_32px_rgba(14,12,10,0.4)]"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-sans text-whisper transition-colors hover:text-paper hover:bg-mist"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          {/* Secondary — hidden on mobile to save space */}
          <a
            href="#waitlist"
            className="hidden md:inline-flex rounded-full border border-rule bg-ink/50 px-4 py-2 text-sm text-paper backdrop-blur-xl hover:bg-mist transition-colors"
          >
            Sign in
          </a>
          {/* Primary violet pill */}
          <a
            href="#waitlist"
            className="rounded-full bg-violet px-4 py-2 text-sm font-medium text-paper shadow-[0_6px_24px_rgba(212,145,61,0.45)] transition hover:brightness-110 active:brightness-95"
          >
            Join waitlist
          </a>
        </div>
      </div>
    </header>
  );
}
