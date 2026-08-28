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
};

export default nextConfig;
