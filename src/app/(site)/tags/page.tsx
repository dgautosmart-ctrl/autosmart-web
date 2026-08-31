import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/articles";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "תגיות | AutoSmart",
  description: "כל התגיות והנושאים שמכוסים במאמרים של AutoSmart.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-1/3 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-brand-cyan/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">תגיות</h1>
          <p className="mt-2 text-brand-navy/70">כל הנושאים שכתבנו עליהם</p>
        </Reveal>

        {tags.length === 0 ? (
          <p className="text-center text-brand-navy/60">אין עדיין תגיות כאן.</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-blue/20"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
