import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";

export default function ArticlesTeaser({ articles }: { articles: ArticleMeta[] }) {
  return (
    <section className="relative overflow-hidden border-t border-brand-navy/[0.06] bg-brand-offwhite">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <Reveal className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl text-brand-navy sm:text-4xl">מהבלוג</h2>
            <p className="mt-2 font-light text-brand-navy/70">
              תובנות וטיפים על שיווק, מערכות ואוטומציה לעסקים
            </p>
          </div>
          <Link
            href="/articles"
            className="hidden text-sm font-semibold text-brand-blue transition-colors hover:text-brand-cyan sm:block"
          >
            לכל המאמרים ←
          </Link>
        </Reveal>

        {articles.length === 0 ? (
          <p className="text-center text-brand-navy/60">
            מאמרים ראשונים בדרך - חזרו בקרוב.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        )}

        <Link
          href="/articles"
          className="mt-8 block text-center text-sm font-semibold text-brand-blue transition-colors hover:text-brand-cyan sm:hidden"
        >
          לכל המאמרים ←
        </Link>
      </div>
    </section>
  );
}
