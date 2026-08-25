"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ArticleMeta } from "@/lib/article-types";
import { formatArticleDate } from "@/lib/format-date";

export default function ArticleCard({
  article,
  index = 0,
}: {
  article: ArticleMeta;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="flex h-full flex-col gap-2 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-blue/15"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          {article.category && (
            <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-brand-blue">
              {article.category}
            </span>
          )}
          {article.date && (
            <span className="text-brand-navy/50">{formatArticleDate(article.date)}</span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-brand-navy">{article.title}</h3>
        <p className="text-sm text-brand-navy/70">{article.excerpt}</p>
      </Link>
    </motion.div>
  );
}
