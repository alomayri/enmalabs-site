import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { writing } from "@/lib/content";

type JournalPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return writing.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: JournalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = writing.find((item) => item.slug === slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.title,
    description: entry.excerpt,
  };
}

export default async function JournalEntryPage({ params }: JournalPageProps) {
  const { slug } = await params;
  const entry = writing.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-32">
      <Link
        href="/#journal"
        className="inline-flex min-h-11 items-center rounded-full border border-rule bg-ink/50 px-4 py-2 text-sm text-paper backdrop-blur-xl transition-colors hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        Back to journal
      </Link>

      <article className="mt-10">
        <p className="font-mono text-xs uppercase tracking-[0.42em] text-whisper">
          {entry.category} · {new Date(entry.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-6 font-display text-5xl leading-tight tracking-tight text-paper md:text-[clamp(3.25rem,6vw,5.5rem)]">
          {entry.title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-whisper md:text-xl">
          {entry.excerpt}
        </p>

        <div className="mt-14 space-y-7 text-lg leading-relaxed text-paper/82">
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
