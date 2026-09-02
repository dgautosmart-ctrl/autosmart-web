import { pointsFor } from "./scoring";
import type { Answers, Insight, QuizScore } from "./types";

type Rule = {
  id: string;
  icon: string;
  title: string;
  /** מוחזר `null` כשהתנאי לא מתקיים - תובנה שהתשובות לא מצדיקות לא מוצגת. */
  match: (answers: Answers, score: QuizScore) => { body: string; priority: number } | null;
};

const RULES: Rule[] = [
  {
    id: "leads",
    icon: "🎯",
    title: "ניהול פניות ולידים",
    match: (answers, score) => {
      if (score.categories.leads < 50) return null;
      const severe = ["whatsappMemory", "sometimesLost"].includes(answers.newLead);
      const priority = pointsFor(answers, "newLead") + pointsFor(answers, "leadsPerMonth") / 2;
      return {
        priority,
        body: severe
          ? "חלק מהפניות שמגיעות אליך נשמרות היום בוואטסאפ, במייל או בראש. ברגע שהכמות גדלה, זה המקום הראשון שבו לקוחות פוטנציאליים נעלמים בלי שאף אחד שם לב. מערכת מסודרת מוודאת שכל פנייה נקלטת ומקבלת טיפול בזמן."
          : "המעקב אחרי פניות חדשות עדיין תלוי בעבודה ידנית שלך. זה עובד, אבל זה מבזבז זמן ותלוי בכך שמישהו יזכור. אפשר לקלוט כל פנייה אוטומטית מכל מקור, ולראות הכול במקום אחד.",
      };
    },
  },
  {
    id: "quotes",
    icon: "💬",
    title: "מעקב אחרי הצעות מחיר",
    match: (answers) => {
      if (!["tryRemember", "noProcess"].includes(answers.afterQuote)) return null;
      return {
        priority: pointsFor(answers, "afterQuote") + 6,
        body: "אחרי שלקוח מקבל הצעת מחיר אין אצלך תהליך מעקב קבוע. בפועל זה המקום שבו נסגרות הכי הרבה עסקאות - רוב האנשים פשוט לא חוזרים מעצמם. תזכורת אוטומטית שיוצאת בזמן הנכון היא בדרך כלל השינוי שמחזיר את עצמו הכי מהר.",
      };
    },
  },
  {
    id: "repetition",
    icon: "⚡",
    title: "עבודה שחוזרת על עצמה",
    match: (answers) => {
      const heavy = ["many", "most"].includes(answers.repetitive);
      const longHours = ["3to8", "over8"].includes(answers.weeklyHours);
      if (!heavy && !longHours) return null;
      return {
        priority: Math.max(pointsFor(answers, "repetitive"), pointsFor(answers, "weeklyHours")),
        body: "ציינת שיש בעסק פעולות שמתבצעות שוב ושוב. פעולה שחוזרת על עצמה באותו אופן היא בדרך כלל המקום הראשון שכדאי לבדוק - היא ניתנת לאוטומציה כמעט תמיד, והחיסכון מורגש כבר בשבוע הראשון.",
      };
    },
  },
  {
    id: "scattered",
    icon: "🔗",
    title: "מידע מפוזר בין מערכות",
    match: (answers) => {
      const manySystems = ["5plus", "unknown"].includes(answers.systemsCount);
      const copying = ["dailyTimes", "alot"].includes(answers.copyData);
      if (!manySystems && !copying) return null;
      return {
        priority: Math.max(pointsFor(answers, "systemsCount"), pointsFor(answers, "copyData")) - 1,
        body: "המידע של העסק מפוזר בין כמה מקומות, ובפועל אתם מעבירים אותו ביניהם ידנית. חוץ מהזמן, זה גם המקום שבו נוצרות טעויות ואי-התאמות. ברוב המקרים אפשר לחבר בין המערכות כך שעדכון במקום אחד מתעדכן בכל השאר לבד.",
      };
    },
  },
  {
    id: "memory",
    icon: "📋",
    title: "מעקב שמסתמך על הזיכרון",
    match: (answers) => {
      if (!["whatsappMail", "memory"].includes(answers.followUpToday)) return null;
      return {
        priority: pointsFor(answers, "followUpToday") + 2,
        body: "היום אתה יודע למי לחזור בעיקר מהזיכרון או מתוך שיחות בוואטסאפ. זה עובד כשהעומס נמוך, ומתחיל לדלוף בדיוק כשהעסק עמוס - כלומר כשהכי חשוב שלא יפספסו. רשימת משימות שנבנית מעצמה כל בוקר פותרת את זה.",
      };
    },
  },
  {
    id: "dropped",
    icon: "⚠️",
    title: "דברים שנופלים בין הכיסאות",
    match: (answers) => {
      if (!["moreThanWanted", "significant"].includes(answers.missed)) return null;
      return {
        priority: pointsFor(answers, "missed") + 4,
        body: "ציינת שקורה שמשימות או לקוחות מתפספסים. זה כמעט תמיד לא עניין של אחריות אלא של תהליך: כשאין מי שמזכיר, דברים נופלים. אוטומציה של התזכורות והסטטוסים מורידה את זה כמעט לאפס.",
      };
    },
  },
  {
    id: "solo",
    icon: "🧍",
    title: "הרבה עומס על אדם אחד",
    match: (answers, score) => {
      if (answers.teamSize !== "solo") return null;
      const busy =
        ["30to100", "over100"].includes(answers.leadsPerMonth) || score.categories.manual >= 60;
      if (!busy) return null;
      return {
        priority: 12,
        body: "אתה מנהל את העסק לבד, ובכל זאת עובר דרכך נפח עבודה לא קטן. במצב כזה כל שעה שחוזרת לך היא לא רק חיסכון - היא ההבדל בין להספיק לטפל בלקוחות לבין להיות עסוק בתחזוקה של העסק.",
      };
    },
  },
  {
    id: "organized",
    icon: "✅",
    title: "הבסיס אצלך מסודר",
    match: (_answers, score) => {
      if (score.total >= 30) return null;
      return {
        priority: 5,
        body: "רוב התהליכים המרכזיים בעסק שלך כבר מנוהלים בצורה מסודרת, וזה לא מובן מאליו. בעסקים כאלה השיפור בדרך כלל לא נמצא בסדר הבסיסי אלא בפינות ספציפיות - ושם אפשר עדיין לחסוך זמן יפה.",
      };
    },
  },
];

/** תובנות גיבוי, כדי שמסך התוצאה לעולם לא יציג פחות משתיים. */
const FALLBACKS: Insight[] = [
  {
    id: "general",
    icon: "🔍",
    title: "יש מה לבדוק",
    body: "גם כשהעסק מתנהל בסדר, כמעט תמיד יש שניים-שלושה תהליכים שנעשים ידנית רק מפני שכך זה התחיל. סקירה קצרה בדרך כלל מאתרת אותם מהר.",
  },
  {
    id: "growth",
    icon: "📈",
    title: "מה שעובד היום לא בהכרח יחזיק בצמיחה",
    body: "תהליכים ידניים מחזיקים מעמד כל עוד הנפח קבוע, ונשברים בדיוק כשהעסק גדל. כדאי לסדר אותם לפני שהם הופכים לצוואר בקבוק ולא אחרי.",
  },
];

/**
 * עד ארבע תובנות, מינימום שתיים, ממוינות לפי חומרת התשובה שהפעילה אותן.
 */
export function buildInsights(answers: Answers, score: QuizScore): Insight[] {
  const matched = RULES.flatMap((rule) => {
    const result = rule.match(answers, score);
    if (!result) return [];
    return [{ id: rule.id, icon: rule.icon, title: rule.title, body: result.body, priority: result.priority }];
  })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 4)
    .map(({ id, icon, title, body }) => ({ id, icon, title, body }));

  return matched.length >= 2 ? matched : [...matched, ...FALLBACKS].slice(0, 2);
}
