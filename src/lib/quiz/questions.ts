import type { CategoryId, QuizQuestion } from "./types";

/**
 * 11 שאלות בחירה + שאלת טקסט חופשי אחת בסוף.
 *
 * שתי השאלות הראשונות (תחום העסק, גודל הצוות) הן הקשר בלבד: גודל צוות אינו
 * מדד לפוטנציאל אוטומציה - עסק של אדם אחד עם 100 לידים בחודש הוא ליד חזק
 * בדיוק כמו צוות של 10. הן משמשות לניסוח התובנות ולהבנת העסק לפני השיחה.
 */
export const QUESTIONS: QuizQuestion[] = [
  {
    id: "field",
    title: "במה העסק שלך עוסק?",
    hint: "רק כדי להתאים את התוצאה לסוג העסק שלך.",
    compact: true,
    options: [
      { value: "services", label: "שירותים מקצועיים" },
      { value: "retail", label: "מסחר וקמעונאות" },
      { value: "health", label: "בריאות וטיפול" },
      { value: "education", label: "חינוך והדרכה" },
      { value: "construction", label: "בנייה ושיפוצים" },
      { value: "events", label: "אירועים ומזון" },
      { value: "other", label: "אחר" },
    ],
  },
  {
    id: "teamSize",
    title: "כמה אנשים עובדים בעסק?",
    compact: true,
    options: [
      { value: "solo", label: "רק אני" },
      { value: "2to3", label: "2–3" },
      { value: "4to10", label: "4–10" },
      { value: "11plus", label: "11+" },
    ],
  },
  {
    id: "leadsPerMonth",
    title: "בערך כמה פניות או לקוחות חדשים מגיעים אליכם בחודש?",
    category: "leads",
    options: [
      { value: "under10", label: "פחות מ-10", points: 4 },
      { value: "10to30", label: "10–30", points: 10 },
      { value: "30to100", label: "30–100", points: 16 },
      { value: "over100", label: "יותר מ-100", points: 20 },
      { value: "noProcess", label: "אין לנו תהליך קבוע של קבלת פניות", points: 14 },
    ],
  },
  {
    id: "newLead",
    title: "כשנכנסת פנייה חדשה — מה קורה איתה?",
    category: "leads",
    options: [
      { value: "inSystem", label: "הכול מסודר במערכת", points: 0 },
      { value: "manualEntry", label: "אני מכניס אותה ידנית למערכת או לרשימה", points: 14 },
      { value: "dependsOnSource", label: "תלוי מאיפה היא הגיעה", points: 15 },
      { value: "whatsappMemory", label: "היא נשמרת בוואטסאפ או במייל ואני זוכר לחזור אליה", points: 18 },
      { value: "sometimesLost", label: "לפעמים פניות פשוט הולכות לאיבוד", points: 20 },
    ],
  },
  {
    id: "followUpToday",
    title: "איך אתם יודעים למי צריך לחזור היום?",
    category: "tasks",
    options: [
      { value: "system", label: "יש מערכת שמנהלת את זה", points: 0 },
      { value: "calendar", label: "יומן או תזכורות", points: 10 },
      { value: "listExcel", label: "רשימה או אקסל", points: 12 },
      { value: "whatsappMail", label: "וואטסאפ או מייל", points: 16 },
      { value: "memory", label: "בעיקר מהזיכרון", points: 20 },
    ],
  },
  {
    id: "copyData",
    title: "האם אתם מעתיקים מידע ידנית ממקום למקום?",
    hint: "לדוגמה: מטופס לאקסל, ממייל למערכת, ממערכת אחת לאחרת.",
    category: "systems",
    options: [
      { value: "almostNever", label: "כמעט אף פעם", points: 2 },
      { value: "sometimes", label: "מדי פעם", points: 9 },
      { value: "dailyTimes", label: "כמה פעמים ביום", points: 16 },
      { value: "alot", label: "הרבה מאוד", points: 20 },
    ],
  },
  {
    id: "repetitive",
    title: "האם יש פעולות שחוזרות אצלכם שוב ושוב?",
    hint: "לדוגמה: שליחת הודעות, פתיחת משימות, תזכורות, עדכון סטטוסים, מסמכים, מעקבים.",
    category: "manual",
    options: [
      { value: "almostNone", label: "כמעט ולא", points: 2 },
      { value: "someOf", label: "יש כמה", points: 9 },
      { value: "many", label: "יש הרבה", points: 16 },
      { value: "most", label: "חלק גדול מהעבודה שלנו ככה", points: 20 },
    ],
  },
  {
    id: "afterQuote",
    title: "מה קורה אחרי שלקוח מתעניין או מקבל הצעת מחיר?",
    category: "leads",
    options: [
      { value: "automated", label: "יש תהליך מעקב מסודר ואוטומטי", points: 0 },
      { value: "manualProcess", label: "יש תהליך מסודר אבל ידני", points: 12 },
      { value: "tryRemember", label: "אני משתדל לזכור לחזור", points: 18 },
      { value: "noProcess", label: "אין תהליך קבוע", points: 20 },
    ],
  },
  {
    id: "missed",
    title: "כמה פעמים קורה שמשימה, פנייה או טיפול בלקוח מתפספסים?",
    category: "tasks",
    options: [
      { value: "almostNever", label: "כמעט אף פעם", points: 2 },
      { value: "sometimes", label: "מדי פעם", points: 10 },
      { value: "moreThanWanted", label: "יותר ממה שהייתי רוצה", points: 17 },
      { value: "significant", label: "זו בעיה משמעותית אצלנו", points: 20 },
    ],
  },
  {
    id: "systemsCount",
    title: "בכמה מערכות או מקומות נמצא היום המידע של העסק?",
    hint: "לדוגמה: מייל, וואטסאפ, אקסל, מערכת ניהול לקוחות, מערכת חשבוניות, טפסים.",
    category: "systems",
    compact: true,
    options: [
      { value: "1to2", label: "1–2", points: 4 },
      { value: "3to4", label: "3–4", points: 11 },
      { value: "5plus", label: "5+", points: 18 },
      { value: "unknown", label: "אני כבר לא באמת יודע 😅", points: 20 },
    ],
  },
  {
    id: "weeklyHours",
    title: "בערך כמה זמן בשבוע לוקחת העבודה הידנית הזו?",
    hint: "הקלדות, מעקבים, עדכוני סטטוס, חיפוש מידע והעברתו ממקום למקום.",
    category: "manual",
    options: [
      { value: "under1", label: "פחות משעה", points: 3 },
      { value: "1to3", label: "1–3 שעות", points: 9 },
      { value: "3to8", label: "3–8 שעות", points: 15 },
      { value: "over8", label: "יותר מ-8 שעות", points: 20 },
      { value: "unknown", label: "לא בדקתי אף פעם", points: 12 },
    ],
  },
];

/** שאלת הסיום - טקסט חופשי, אופציונלית. חומר הגלם הכי טוב לשיחת המכירה. */
export const FREE_TEXT = {
  id: "oneTask",
  title: "אם היית יכול להוריד מהעסק משימה ידנית אחת שחוזרת על עצמה — מה היא הייתה?",
  hint: "אופציונלי, אבל זה בדיוק מה שנתחיל ממנו.",
  placeholder: "לדוגמה: לעדכן כל לקוח חדש בשלוש מערכות שונות...",
} as const;

/** מספר המסכים בשאלון, כולל שאלת הטקסט החופשי. */
export const TOTAL_STEPS = QUESTIONS.length + 1;

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  leads: "ניהול לידים ומכירות",
  manual: "עבודה ידנית וחזרתית",
  systems: "חיבור בין מערכות ומידע",
  tasks: "ניהול משימות ומעקב",
};

/**
 * משקלי הציון הכולל. הציון הוא ממוצע משוקלל של ציוני הקטגוריות ולא סכום גולמי,
 * כדי שקטגוריית הלידים (שלוש שאלות) לא תשתלט על התוצאה.
 */
export const CATEGORY_WEIGHTS: Record<CategoryId, number> = {
  leads: 0.3,
  manual: 0.3,
  systems: 0.2,
  tasks: 0.2,
};

export function getQuestion(id: string) {
  return QUESTIONS.find((question) => question.id === id);
}

export function getOptionLabel(questionId: string, value: string) {
  return getQuestion(questionId)?.options.find((option) => option.value === value)?.label ?? value;
}
