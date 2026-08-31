export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  /** כותרת ייעודית ל-<title> ולתגי OG (SEO). ברירת מחדל: title. */
  metaTitle?: string;
  /** תיאור ייעודי ל-meta description ול-OG (SEO). ברירת מחדל: excerpt. */
  metaDescription?: string;
};

export type Article = ArticleMeta & {
  content: string;
};
