import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // הערה: הפניית 308 מהכתובת הישנה (autosmart-web.vercel.app) לדומיין הרשמי
  // תתווסף בחזרה רק אחרי ש-www.autosmartbiz.co.il יעלה ויוגדר כ-Valid ב-Vercel.
  // עד אז חייבים להשאיר את vercel.app עובד ישירות.
};

export default nextConfig;
