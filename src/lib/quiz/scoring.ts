import { CATEGORY_WEIGHTS, QUESTIONS } from "./questions";
import type {
  AnswerRecord,
  Answers,
  Band,
  CategoryId,
  CategoryScores,
  HoursEstimate,
  QuizScore,
} from "./types";

const CATEGORIES: CategoryId[] = ["leads", "manual", "systems", "tasks"];

/**
 * ציון קטגוריה = נקודות שנצברו חלקי המקסימום האפשרי, בסולם 0-100.
 * שאלות שלא נענו לא נספרות גם במונה וגם במכנה, כך ששאלון חלקי עדיין נותן
 * ציון הגיוני ולא ציון נמוך מלאכותית.
 */
function categoryScores(answers: Answers): CategoryScores {
  const earned: Record<string, number> = {};
  const max: Record<string, number> = {};

  for (const question of QUESTIONS) {
    if (!question.category) continue;
    const value = answers[question.id];
    if (!value) continue;
    const option = question.options.find((o) => o.value === value);
    if (!option || option.points === undefined) continue;

    const best = Math.max(...question.options.map((o) => o.points ?? 0));
    earned[question.category] = (earned[question.category] ?? 0) + option.points;
    max[question.category] = (max[question.category] ?? 0) + best;
  }

  return CATEGORIES.reduce((acc, category) => {
    const total = max[category] ?? 0;
    acc[category] = total === 0 ? 0 : Math.round(((earned[category] ?? 0) / total) * 100);
    return acc;
  }, {} as CategoryScores);
}

function bandOf(total: number): Band {
  if (total < 30) return "low";
  if (total < 55) return "medium";
  if (total < 75) return "high";
  return "veryHigh";
}

export const BAND_COPY: Record<Band, { label: string; line: string }> = {
  low: {
    label: "בסיס מסודר",
    line: "העסק שלך מנוהל מסודר יחסית. יש כמה נקודות ממוקדות שכדאי לבדוק, אבל אתה לא נמצא במקום שבו הדברים נופלים.",
  },
  medium: {
    label: "פוטנציאל בינוני",
    line: "לפי התשובות שלך יש בעסק כמה תהליכים שאפשר לחסוך בהם זמן משמעותי בלי לשנות את איך שאתה עובד.",
  },
  high: {
    label: "פוטנציאל גבוה",
    line: "לפי התשובות שלך, יש בעסק מספר תהליכים שכדאי מאוד לבדוק לאוטומציה - וחלק מהם פשוטים ליישום.",
  },
  veryHigh: {
    label: "פוטנציאל גבוה מאוד",
    line: "חלק ניכר מהעבודה בעסק נעשה היום ידנית. זה בדיוק המצב שבו יש הכי הרבה מה לחסוך, ובדרך כלל גם הכי מהר.",
  },
};

/** שעות שבועיות מוערכות לפי התשובה. "לא בדקתי" נגזר מעוצמת העבודה הידנית. */
function weeklyHoursOf(answers: Answers, categories: CategoryScores) {
  switch (answers.weeklyHours) {
    case "under1":
      return 0.5;
    case "1to3":
      return 2;
    case "3to8":
      return 5;
    case "over8":
      return 10;
    case "unknown": {
      const manualLoad = (categories.manual + categories.systems) / 2;
      if (manualLoad < 40) return 2;
      if (manualLoad < 70) return 5;
      return 8;
    }
    default:
      return 0;
  }
}

/**
 * הערכת השעות שאפשר לחסוך בחודש. מכוונת בכוונה לצד השמרני: בעל עסק שמזהה
 * מספר מנופח מפסיק להאמין לכל השאר.
 */
function hoursEstimate(
  answers: Answers,
  categories: CategoryScores,
  total: number,
): HoursEstimate {
  const weeklyHours = weeklyHoursOf(answers, categories);
  const automatable = 0.25 + 0.35 * (total / 100); // 25%-60%
  const monthly = weeklyHours * 4.3 * automatable;

  return {
    weeklyHours,
    monthlyLow: Math.round(monthly * 0.8),
    monthlyHigh: Math.round(monthly * 1.2),
    show: monthly >= 2,
  };
}

export function scoreQuiz(answers: Answers): QuizScore {
  const categories = categoryScores(answers);
  const total = Math.round(
    CATEGORIES.reduce((sum, category) => sum + categories[category] * CATEGORY_WEIGHTS[category], 0),
  );

  return {
    total,
    band: bandOf(total),
    categories,
    estimate: hoursEstimate(answers, categories, total),
  };
}

/** נקודות התשובה שנבחרה לשאלה מסוימת - משמש את תנאי התובנות. */
export function pointsFor(answers: Answers, questionId: string) {
  const question = QUESTIONS.find((q) => q.id === questionId);
  const option = question?.options.find((o) => o.value === answers[questionId]);
  return option?.points ?? 0;
}

/** רשימת התשובות בפורמט קריא, לשליחה במייל ול-CRM. */
export function answerRecords(answers: Answers): AnswerRecord[] {
  return QUESTIONS.filter((question) => answers[question.id]).map((question) => {
    const option = question.options.find((o) => o.value === answers[question.id]);
    return {
      id: question.id,
      question: question.title,
      value: answers[question.id],
      label: option?.label ?? answers[question.id],
      points: option?.points ?? null,
      category: question.category ?? null,
    };
  });
}
