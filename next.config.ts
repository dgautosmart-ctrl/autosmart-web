import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // הפניה קבועה (308) מהכתובת הישנה של Vercel לדומיין הרשמי,
      // כולל כל נתיב פנימי. כתובות תצוגה מקדימה (preview) לא מושפעות.
      {
        source: "/:path*",
        has: [{ type: "host", value: "autosmart-web.vercel.app" }],
        destination: "https://autosmartbiz.co.il/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
