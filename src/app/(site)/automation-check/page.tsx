import type { Metadata } from "next";
import AutomationQuiz from "@/components/quiz/AutomationQuiz";

/**
 * שאלון "כמה עבודה מיותרת יש בעסק שלך?".
 *
 * הדף **לא מפורסם**: אין אליו קישור מהאתר, הוא לא ב-sitemap והוא חסום לאינדוקס.
 * הכניסה היחידה אליו היא הכתובת הישירה: /automation-check
 *
 * הראוט באנגלית מסיבה טכנית - ראו ההערה ליד `QUIZ_PATH` ב-src/lib/site-config.ts.
 *
 * כדי לפרסם אותו בעתיד:
 *   1. להסיר את `robots` למטה.
 *   2. להוסיף את הראוט ל-`src/app/sitemap.ts`.
 *   3. להוסיף קישורים (Header / עמוד הבית / פוטר / תחתית מאמרים).
 */
export const metadata: Metadata = {
  title: "בדיקה של 5 דקות: כמה עבודה מיותרת יש בעסק שלך? | AutoSmart",
  description:
    "שאלון קצר שמזהה אילו תהליכים בעסק שלכם אפשר להפוך לאוטומטיים, כמה זמן אפשר לחסוך, ואיפה לידים ומשימות נופלים בדרך.",
  robots: { index: false, follow: false },
};

export default function AutomationQuizPage() {
  return <AutomationQuiz />;
}
