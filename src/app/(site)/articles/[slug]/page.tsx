import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getAllArticles,
  getArticleBySlug,
  getArticleSlugs,
  formatArticleDate,
} from "@/lib/articles";
import { getRelatedArticles } from "@/lib/related-articles";
import Reveal from "@/components/Reveal";
import RelatedArticles from "@/components/RelatedArticles";
import ArticleSignature from "@/components/ArticleSignature";
import TagPill from "@/components/TagPill";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(decodeURIComponent(slug));

  if (!article) {
    return { title: "מאמר לא נמצא | AutoSmart" };
  }

  return {
    title: `${article.title} | AutoSmart`,
    description: article.excerpt,
    keywords: article.tags.length > 0 ? article.tags : undefined,
    openGraph: {
      title: `${article.title} | AutoSmart`,
      description: article.excerpt,
      type: "article",
      images: article.image ? [article.image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = getArticleBySlug(decodeURIComponent(slug));

  if (!article) {
    notFound();
  }

  const related = getRelatedArticles(article, getAllArticles());

  return (
    <article className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 right-1/4 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Reveal className="mb-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
            {article.category && (
              <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-brand-blue">
                {article.category}
              </span>
            )}
            {article.date && (
              <span className="text-brand-navy/50">{formatArticleDate(article.date)}</span>
            )}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-brand-navy sm:text-4xl">
            {article.title}
          </h1>
          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
              {article.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          )}
        </Reveal>

        {article.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="mb-10 aspect-[1200/630] w-full rounded-2xl border border-brand-navy/10 object-cover"
          />
        )}

        <div className="prose prose-neutral max-w-none prose-headings:text-brand-navy prose-a:text-brand-blue">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
        </div>

        <ArticleSignature fromSlug={article.slug} />
      </div>

      {related.length > 0 && (
        <div className="relative mx-auto max-w-5xl px-4 pb-16 sm:pb-24">
          <Reveal>
            <RelatedArticles items={related} fromSlug={article.slug} />
          </Reveal>
        </div>
      )}
    </article>
  );
}
