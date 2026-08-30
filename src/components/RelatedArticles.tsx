"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import type { ArticleMeta } from "@/lib/article-types";
import { formatArticleDate } from "@/lib/format-date";

export default function RelatedArticles({
  items,
  fromSlug,
}: {
  items: ArticleMeta[];
  fromSlug: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackedImpression = useRef(false);

  useEffect(() => {
    if (items.length === 0) return;
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        if (trackedImpression.current) return;
        trackedImpression.current = true;
        items.forEach((item, idx) => {
          sendGAEvent("event", "related_impression", {
            from_slug: fromSlug,
            to_slug: item.slug,
            position: idx + 1,
          });
        });
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [items, fromSlug]);

  if (items.length === 0) return null;

  return (
    <section ref={sectionRef} className="mt-16 border-t border-brand-navy/10 pt-12">
      <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">אולי יעניין אותך גם –</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <Link
            key={item.slug}
            href={`/articles/${item.slug}`}
            onClick={() =>
              sendGAEvent("event", "related_click", {
                from_slug: fromSlug,
                to_slug: item.slug,
                position: idx + 1,
              })
            }
            className="group relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-brand-navy/10 bg-gradient-to-b from-white to-brand-offwhite/50 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/15 sm:p-8"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 z-10 h-[3px] scale-x-0 bg-gradient-to-l from-brand-blue to-brand-cyan transition-transform duration-300 group-hover:scale-x-100"
            />
            {item.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.image}
                alt={item.title}
                className="-mx-7 -mt-7 mb-1 aspect-[1200/630] w-[calc(100%+3.5rem)] max-w-none object-cover sm:-mx-8 sm:-mt-8 sm:w-[calc(100%+4rem)]"
              />
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              {item.category && (
                <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-brand-blue">
                  {item.category}
                </span>
              )}
              {item.date && (
                <span className="text-brand-navy/65">{formatArticleDate(item.date)}</span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-blue sm:text-xl">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="text-[0.95rem] leading-relaxed text-brand-navy/80 sm:text-base">
                {item.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
