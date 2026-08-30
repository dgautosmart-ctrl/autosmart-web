import type { ArticleMeta } from "./article-types";

function sharedTagCount(a: ArticleMeta, b: ArticleMeta): number {
  const bTags = new Set(b.tags);
  return a.tags.reduce((count, tag) => (bTags.has(tag) ? count + 1 : count), 0);
}

function byDateDesc(a: ArticleMeta, b: ArticleMeta): number {
  return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}

/**
 * בוחר מאמרים קשורים לפי רלוונטיות, בסדר עדיפות:
 * 1. הכי הרבה תגיות משותפות (שובר-שוויון: החדש יותר קודם)
 * 2. השלמה ממאמרים באותה קטגוריה
 * 3. השלמה מהמאמרים החדשים ביותר
 * המאמר הנוכחי תמיד מסונן החוצה, ואין כפילויות. פונקציה טהורה.
 */
export function getRelatedArticles(
  current: ArticleMeta,
  all: ArticleMeta[],
  limit = 3,
): ArticleMeta[] {
  const candidates = all.filter((article) => article.slug !== current.slug);

  const tagMatches = candidates
    .map((article) => ({ article, shared: sharedTagCount(current, article) }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || byDateDesc(a.article, b.article))
    .map((entry) => entry.article);

  const categoryMatches = current.category
    ? candidates
        .filter((article) => article.category === current.category)
        .sort(byDateDesc)
    : [];

  const newest = [...candidates].sort(byDateDesc);

  const ordered: ArticleMeta[] = [];
  const seen = new Set<string>();
  for (const article of [...tagMatches, ...categoryMatches, ...newest]) {
    if (seen.has(article.slug)) continue;
    seen.add(article.slug);
    ordered.push(article);
    if (ordered.length === limit) break;
  }

  return ordered;
}
