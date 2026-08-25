import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "מאמרים | AutoSmart",
  description: "תובנות וטיפים על אוטומציה עסקית מהצוות של AutoSmart.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

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
          <h1 className="text-3xl font-bold text-brand-navy sm:text-4xl">
            מאמרים
          </h1>
          <p className="mt-2 text-brand-navy/70">
            תובנות וטיפים על אוטומציה עסקית
          </p>
        </Reveal>

        {articles.length === 0 ? (
          <p className="text-center text-brand-navy/60">
            אין עדיין מאמרים כאן - חזרו בקרוב.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
