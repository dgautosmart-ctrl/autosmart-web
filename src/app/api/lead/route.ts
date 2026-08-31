import { NextRequest } from "next/server";
import { Resend } from "resend";
import { CONTACT } from "@/lib/site-config";

/**
 * מקבל פנייה מטופס באתר ושולח שני מיילים דרך Resend:
 *  1. התראה לבעל העסק (CONTACT.email) עם reply-to של הפונה.
 *  2. מייל אישור אוטומטי לפונה עצמו (לא חוסם — אם נכשל, הפנייה עדיין הצליחה).
 *
 * משתני סביבה נדרשים (צד שרת בלבד — לא NEXT_PUBLIC):
 *  - RESEND_API_KEY   מפתח API מ-resend.com
 *  - LEAD_MAIL_FROM   כתובת שולח מאומתת, למשל: "AutoSmart <hello@autosmartbiz.co.il>"
 */

const FROM = process.env.LEAD_MAIL_FROM ?? "AutoSmart <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  business?: string;
  message?: string;
  source?: string;
};

function esc(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function ownerEmail(lead: Required<Pick<LeadPayload, "name" | "phone" | "email">> & LeadPayload) {
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
    <h2 style="margin:0 0 12px">פנייה חדשה מהאתר</h2>
    <table style="border-collapse:collapse">${body}</table>
  </div>`;
}

function confirmationEmail(name: string) {
  const first = esc(name.trim().split(/\s+/)[0] || name.trim());
  return `<div dir="rtl" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:#111">
    <p>היי ${first},</p>
    <p>קיבלנו את הפנייה שלך ל-AutoSmart. נעבור עליה ונחזור אליך בהקדם — בדרך כלל תוך יום עסקים.</p>
    <p>אם זה דחוף, אפשר גם בוואטסאפ: <a href="https://wa.me/${CONTACT.whatsappNumber}" style="color:#0b5">${CONTACT.whatsappDisplay}</a>.</p>
    <p style="margin-top:24px">— צוות AutoSmart</p>
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

  const lead = { ...data, name, phone, email };
  const resend = new Resend(process.env.RESEND_API_KEY);

  const owner = await resend.emails.send({
    from: FROM,
    to: [CONTACT.email],
    replyTo: email,
    subject: `פנייה חדשה מהאתר — ${name}`,
    html: ownerEmail(lead),
  });

  if (owner.error) {
    return Response.json({ success: false, error: "send-failed" }, { status: 502 });
  }

  const confirm = await resend.emails
    .send({
      from: FROM,
      to: [email],
      subject: "קיבלנו את הפרטים שלך — AutoSmart",
      html: confirmationEmail(name),
    })
    .catch(() => ({ error: true }));

  return Response.json({
    success: true,
    confirmationSent: !("error" in confirm && confirm.error),
  });
}
