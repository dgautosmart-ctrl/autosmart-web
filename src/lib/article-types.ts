export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

export type Article = ArticleMeta & {
  content: string;
};
