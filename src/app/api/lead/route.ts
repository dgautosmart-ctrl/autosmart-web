import { NextRequest } from "next/server";
import { Resend } from "resend";
import { CONTACT } from "@/lib/site-config";

/**
 * מקבל פנייה מטופס באתר ושולח שני מיילים דרך Resend:
 *  1. התראה לבעל העסק (CONTACT.email) עם reply-to של הפונה.
 *  2. מייל אישור אוטומטי לפונה עצמו (לא חוסם — אם נכשל, הפנייה עדיין הצליחה).
 *
 * הנוסח (כותרת ההתראה + גוף מייל האישור) נבחר לפי `variant`:
 *  - "site"      טופס יצירת קשר רגיל באתר, הפופאפ והכפתור.
 *  - "returning" דף הנחיתה של החזרת לקוחות / מכירות חוזרות.
 *  - "quiz"      שאלון פוטנציאל האוטומציה. מגיע עם אובייקט `quiz` מלא.
 *
 * משתני סביבה נדרשים (צד שרת בלבד — לא NEXT_PUBLIC):
 *  - RESEND_API_KEY   מפתח API מ-resend.com
 *  - LEAD_MAIL_FROM   כתובת שולח מאומתת, למשל: "AutoSmart <info@autosmartbiz.co.il>"
 *
 * אופציונלי:
 *  - LEAD_WEBHOOK_URL  כתובת שאליה נשלח ה-payload המלא (כולל תשובות השאלון)
 *                      כדי לחבר את הפניות ל-CRM. השליחה לא חוסמת ולא מפילה
 *                      את הפנייה אם היא נכשלת.
 */

// מנקה תקלות נפוצות בהגדרת המשתנה: מרכאות עוטפות, רווחים, וגרש-סוגר כפול (">>").
function normalizeFrom(raw: string | undefined) {
  const value = (raw ?? "AutoSmart <onboarding@resend.dev>").trim().replace(/^["']|["']$/g, "");
  return value.replace(/>{2,}\s*$/, ">");
}

const FROM = normalizeFrom(process.env.LEAD_MAIL_FROM);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Variant = "site" | "returning" | "quiz";

/** תוצאות שאלון פוטנציאל האוטומציה, כפי שהן נשלחות מהדפדפן. */
type QuizPayload = {
  version?: number;
  completedAt?: string;
  score?: {
    total?: number;
    band?: string;
    categories?: Record<string, number>;
  };
  estimate?: { weeklyHours?: number; monthlyLow?: number; monthlyHigh?: number; show?: boolean };
  answers?: { id: string; question: string; value: string; label: string; points: number | null }[];
  freeText?: string | null;
  insights?: string[];
};

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  business?: string;
  message?: string;
  source?: string;
  variant?: string;
  quiz?: QuizPayload;
};

const BAND_LABELS: Record<string, string> = {
  low: "בסיס מסודר",
  medium: "פוטנציאל בינוני",
  high: "פוטנציאל גבוה",
  veryHigh: "פוטנציאל גבוה מאוד",
};

const CATEGORY_LABELS: Record<string, string> = {
  leads: "ניהול לידים ומכירות",
  manual: "עבודה ידנית וחזרתית",
  systems: "חיבור בין מערכות ומידע",
  tasks: "ניהול משימות ומעקב",
};

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const VARIANTS: Record<
  Variant,
  {
    ownerHeading: string;
    ownerSubject: (name: string) => string;
    confirmSubject: string;
    confirmParagraphs: (firstName: string) => string[];
    signature: string;
  }
> = {
  site: {
    ownerHeading: "פנייה חדשה מהאתר",
    ownerSubject: (name) => `פנייה חדשה מהאתר — ${name}`,
    confirmSubject: "קיבלנו את הפרטים שלך — AutoSmart",
    confirmParagraphs: (first) => [
      `היי ${first},`,
      "תודה שפנית אלינו, הפרטים שלך התקבלו בהצלחה.",
      "נעבור על מה ששלחת וניצור איתך קשר במהלך יום העסקים הקרוב.",
      `אם יש משהו שחשוב לך שנדע או שתרצה להוסיף — אפשר פשוט להשיב למייל הזה, או לפנות אלינו בוואטסאפ: <a href="https://wa.me/${CONTACT.whatsappNumber}" style="color:#0b5">${CONTACT.whatsappDisplay}</a>.`,
    ],
    signature: "AutoSmart – פתרונות חכמים לעסק",
  },
  returning: {
    ownerHeading: "פנייה חדשה — החזרת לקוחות",
    ownerSubject: (name) => `פנייה חדשה — החזרת לקוחות — ${name}`,
    confirmSubject: "קיבלנו את הפרטים שלך — AutoSmart",
    confirmParagraphs: (first) => [
      `היי ${first},`,
      "תודה שהשארת פרטים.",
      "קיבלנו את הפנייה ונחזור אליך בקרוב.",
    ],
    signature: "<strong>בברכה,<br>צוות AutoSmart</strong>",
  },
  quiz: {
    ownerHeading: "ליד חדש מהשאלון",
    ownerSubject: (name) => `ליד חדש מהשאלון — ${name}`,
    confirmSubject: "התוצאות שלך התקבלו — AutoSmart",
    confirmParagraphs: (first) => [
      `היי ${first},`,
      "תודה שמילאת את השאלון — הפרטים והתשובות שלך התקבלו.",
      "אעבור על מה שענית לפני שנדבר, כך שנגיע לשיחה כשאני כבר מכיר את העסק ואת התהליכים שציינת.",
      "אחזור אליך במהלך יום העסקים הקרוב.",
    ],
    signature: "<strong>בברכה,<br>צוות AutoSmart</strong>",
  },
};

function toVariant(value: string | undefined): Variant {
  if (value === "returning") return "returning";
  if (value === "quiz") return "quiz";
  return "site";
}

/** טבלת התשובות המלאה + הציונים, כדי להיכנס לשיחה עם תמונה מלאה של העסק. */
function quizSection(quiz: QuizPayload) {
  const total = quiz.score?.total;
  const band = quiz.score?.band ? (BAND_LABELS[quiz.score.band] ?? quiz.score.band) : "";
  const categories = Object.entries(quiz.score?.categories ?? {})
    .map(([key, value]) => `${CATEGORY_LABELS[key] ?? key}: <strong>${value}</strong>`)
    .join(" &nbsp;·&nbsp; ");

  const estimate =
    quiz.estimate?.show && quiz.estimate.monthlyLow !== undefined
      ? `<p style="margin:0 0 14px">הערכת חיסכון: <strong>${quiz.estimate.monthlyLow}–${quiz.estimate.monthlyHigh} שעות בחודש</strong> (${quiz.estimate.weeklyHours} שעות עבודה ידנית בשבוע לפי דיווחו)</p>`
      : "";

  const answers = (quiz.answers ?? [])
    .map(
      (answer) =>
        `<tr><td style="padding:5px 12px 5px 0;vertical-align:top;color:#555">${esc(
          answer.question,
        )}</td><td style="padding:5px 0;font-weight:700;vertical-align:top">${esc(answer.label)}${
          answer.points === null ? "" : ` <span style="font-weight:400;color:#999">(${answer.points})</span>`
        }</td></tr>`,
    )
    .join("");

  const freeText = quiz.freeText
    ? `<p style="margin:16px 0 0"><strong>המשימה שהוא היה מוריד:</strong><br>${esc(quiz.freeText).replace(
        /\n/g,
        "<br>",
      )}</p>`
    : "";

  return `<hr style="margin:20px 0;border:none;border-top:1px solid #ddd">
    <h3 style="margin:0 0 10px">תוצאות השאלון</h3>
    <p style="margin:0 0 8px;font-size:17px">ציון כולל: <strong>${total ?? "—"}/100</strong>${
      band ? ` — ${band}` : ""
    }</p>
    ${categories ? `<p style="margin:0 0 14px;color:#333">${categories}</p>` : ""}
    ${estimate}
    <table style="border-collapse:collapse;font-size:14px">${answers}</table>
    ${freeText}`;
}

/**
 * שליחת ה-payload המלא ליעד חיצוני (CRM) אם הוגדר. פועל ב-fire-and-forget:
 * כישלון כאן לא נוגע בפנייה עצמה, שכבר נשלחה במייל.
 */
function forwardToWebhook(payload: unknown) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {
    // מכוון: הליד כבר נשמר במייל, אין טעם להכשיל את הבקשה בגלל ה-CRM.
  });
}

function ownerEmail(
  heading: string,
  lead: Required<Pick<LeadPayload, "name" | "phone" | "email">> & LeadPayload,
) {
  const rows: [string, string | undefined][] = [
    ["שם", lead.name],
    ["טלפון", lead.phone],
    ["מייל", lead.email],
    ["שם העסק", lead.business],
    ["הודעה", lead.message],
    ["מקור", lead.source],
  ];
  const body = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:700;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:4px 0">${esc(
          v!,
        ).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111">
    <h2 style="margin:0 0 12px">${heading}</h2>
    <table style="border-collapse:collapse">${body}</table>
    ${lead.quiz ? quizSection(lead.quiz) : ""}
  </div>`;
}

function confirmationEmail(paragraphs: string[], signature: string) {
  const body = paragraphs
    .map((p) => `<p style="margin:0 0 14px">${p}</p>`)
    .join("");
  return `<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:#111">
    ${body}
    <p style="margin-top:24px">${signature}</p>
  </div>`;
}

export async function POST(request: NextRequest) {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return Response.json({ success: false, error: "bad-request" }, { status: 400 });
  }

  const name = data.name?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();

  if (!name || !phone || !email || !EMAIL_RE.test(email)) {
    return Response.json({ success: false, error: "missing-fields" }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { success: false, error: "mail-not-configured" },
      { status: 500 },
    );
  }

  const variant = toVariant(data.variant);
  const copy = VARIANTS[variant];
  const lead = { ...data, name, phone, email };
  const resend = new Resend(process.env.RESEND_API_KEY);

  const owner = await resend.emails.send({
    from: FROM,
    to: [CONTACT.email],
    replyTo: email,
    subject: copy.ownerSubject(name),
    html: ownerEmail(copy.ownerHeading, lead),
  });

  if (owner.error) {
    return Response.json({ success: false, error: "send-failed" }, { status: 502 });
  }

  forwardToWebhook({ ...lead, variant, receivedAt: new Date().toISOString() });

  const firstName = esc(name.split(/\s+/)[0] || name);
  const confirm = await resend.emails
    .send({
      from: FROM,
      to: [email],
      subject: copy.confirmSubject,
      html: confirmationEmail(copy.confirmParagraphs(firstName), copy.signature),
    })
    .catch(() => ({ error: true }));

  return Response.json({
    success: true,
    confirmationSent: !("error" in confirm && confirm.error),
  });
}
