export function formatArticleDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" });
}
