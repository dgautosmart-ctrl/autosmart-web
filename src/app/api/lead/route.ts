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
 *
 * משתני סביבה נדרשים (צד שרת בלבד — לא NEXT_PUBLIC):
 *  - RESEND_API_KEY   מפתח API מ-resend.com
 *  - LEAD_MAIL_FROM   כתובת שולח מאומתת, למשל: "AutoSmart <info@autosmartbiz.co.il>"
 */

// מנקה תקלות נפוצות בהגדרת המשתנה: מרכאות עוטפות, רווחים, וגרש-סוגר כפול (">>").
function normalizeFrom(raw: string | undefined) {
  const value = (raw ?? "AutoSmart <onboarding@resend.dev>").trim().replace(/^["']|["']$/g, "");
  return value.replace(/>{2,}\s*$/, ">");
}

const FROM = normalizeFrom(process.env.LEAD_MAIL_FROM);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Variant = "site" | "returning";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  business?: string;
  message?: string;
  source?: string;
  variant?: string;
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
      `היי ${first}`,
      "תודה שהשארת פרטים :)",
      "<strong>יש לך כבר לקוחות שמכירים אותך?</strong>",
      "אנחנו רוצים לעזור לך להחזיר אותם לעסק ולשמור איתם על קשר לאורך זמן.",
      "<strong>כדי להבין איך אפשר לעשות את זה אצלך 👇</strong>",
      "<strong>📩 האם יש לך כתובות מייל של הלקוחות שלך? ואם כן, איפה הן שמורות היום?</strong>",
      "(זה יכול להיות באקסל, מערכת CRM, מערכת חשבוניות או בכל מקום אחר)",
    ],
    signature: "<strong>בברכה,<br>צוות AutoSmart</strong>",
  },
};

function toVariant(value: string | undefined): Variant {
  return value === "returning" ? "returning" : "site";
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
