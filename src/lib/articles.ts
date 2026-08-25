import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ArticleMeta, Article } from "./article-types";

export { formatArticleDate } from "./format-date";
export type { ArticleMeta, Article } from "./article-types";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content/articles");

function readArticleFile(fileName: string): Article {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(ARTICLES_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    category: data.category ?? "",
    content,
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(ARTICLES_DIRECTORY).filter((name) => name.endsWith(".md"));

  const articles: ArticleMeta[] = fileNames.map((fileName) => {
    const { slug, title, date, excerpt, category } = readArticleFile(fileName);
    return { slug, title, date, excerpt, category };
  });

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(ARTICLES_DIRECTORY)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(ARTICLES_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return readArticleFile(`${slug}.md`);
}
