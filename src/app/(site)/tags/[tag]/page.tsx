import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getArticlesByTag } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `מאמרים בנושא ${decodedTag} | AutoSmart`,
    description: `כל המאמרים של AutoSmart בנושא ${decodedTag}.`,
  };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const articles = getArticlesByTag(decodedTag);

  if (articles.length === 0) {
    notFound();
  }

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
            מאמרים בנושא {decodedTag}
          </h1>
          <p className="mt-2 text-brand-navy/70">
            {articles.length} מאמרים תחת התגית &quot;{decodedTag}&quot;
          </p>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
