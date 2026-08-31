import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // הפניית 308 מהכתובת הישנה (autosmart-web.vercel.app) לדומיין הרשמי.
  // Vercel לא מסיר / לא מפנה אוטומטית את כתובת ה-vercel.app, לכן ההפניה נעשית כאן.
  // חשוב: להשאיר את זה פעיל רק כש-www.autosmartbiz.co.il עולה ומוגדר Valid ב-Vercel.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "autosmart-web.vercel.app" }],
        destination: "https://www.autosmartbiz.co.il/:path*",
        permanent: true,
      },
    ];
  },

  // דף הנחיתה יושב פנימית תחת /returning-customers, אבל הכתובת הציבורית
  // היא בעברית. rewrite שומר על ה-URL היפה בלי תיקיית route בעברית
  // (שגרמה ל-InvalidCharacterError ב-prerender).
  async rewrites() {
    return [
      { source: "/לקוחות-חוזרים", destination: "/returning-customers" },
      {
        source: "/%D7%9C%D7%A7%D7%95%D7%97%D7%95%D7%AA-%D7%97%D7%95%D7%96%D7%A8%D7%99%D7%9D",
        destination: "/returning-customers",
      },
    ];
  },
};

export default nextConfig;
