/**
 * טיפוסים לשאלון "כמה עבודה מיותרת יש בעסק שלך?".
 *
 * כל הלוגיקה של השאלון (שאלות, ניקוד, תובנות) יושבת ב-`src/lib/quiz` כנתונים
 * ופונקציות טהורות, כדי שאפשר יהיה לשנות ניסוח, משקלים או תנאי תובנה בלי
 * לגעת ברכיבי ה-UI.
 */

/** ארבע קטגוריות הניקוד. כל שאלה מנקדת קטגוריה אחת לכל היותר - בלי ספירה כפולה. */
export type CategoryId = "leads" | "manual" | "systems" | "tasks";

export type QuizOption = {
  /** מזהה יציב באנגלית - נשמר כמו שהוא ונשלח ל-CRM. */
  value: string;
  label: string;
  /** נקודות פוטנציאל אוטומציה. שאלות הקשר (בלי `category`) לא מנקדות. */
  points?: number;
};

export type QuizQuestion = {
  id: string;
  title: string;
  hint?: string;
  /** ללא קטגוריה = שאלת הקשר בלבד, לא משפיעה על הציון. */
  category?: CategoryId;
  options: QuizOption[];
  /** פריסה קומפקטית בשתי עמודות, לתשובות קצרות. */
  compact?: boolean;
};

export type Answers = Record<string, string>;

export type CategoryScores = Record<CategoryId, number>;

export type Band = "low" | "medium" | "high" | "veryHigh";

export type HoursEstimate = {
  weeklyHours: number;
  monthlyLow: number;
  monthlyHigh: number;
  /** הערכה נמוכה מדי לא מוצגת - עדיף בלי מספר מאשר מספר מגוחך. */
  show: boolean;
};

export type QuizScore = {
  total: number;
  band: Band;
  categories: CategoryScores;
  estimate: HoursEstimate;
};

export type Insight = {
  id: string;
  icon: string;
  title: string;
  body: string;
};

/** מבנה התשובה כפי שהיא נשלחת לשרת - קריא גם בלי מפתח פענוח. */
export type AnswerRecord = {
  id: string;
  question: string;
  value: string;
  label: string;
  points: number | null;
  category: CategoryId | null;
};
