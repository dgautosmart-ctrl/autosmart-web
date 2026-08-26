"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ArticleMeta } from "@/lib/article-types";
import { formatArticleDate } from "@/lib/format-date";
import TagPill from "@/components/TagPill";

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
      <div className="group relative flex h-full flex-col gap-2 overflow-hidden rounded-2xl border border-brand-navy/10 bg-gradient-to-b from-white to-brand-offwhite/50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-blue/15">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-gradient-to-l from-brand-blue to-brand-cyan transition-transform duration-300 group-hover:scale-x-100"
        />
        <Link href={`/articles/${article.slug}`} className="flex flex-1 flex-col gap-2">
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
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            {article.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
