import type { Metadata } from "next";
import { IBM_Plex_Sans_Hebrew } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONTACT, SITE_URL } from "@/lib/site-config";
import "./globals.css";

const sans = IBM_Plex_Sans_Hebrew({
  variable: "--font-ibm",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_TITLE =
  "AutoSmart - אוטומציה, מערכות חכמות ו-AI שמביאים לעסק יותר לקוחות";
const SITE_DESCRIPTION =
  "AutoSmart בונה לעסקים קטנים ובינוניים אוטומציה, מערכות חכמות ופתרונות AI שחוסכים שעות עבודה ומביאים יותר לקוחות - יחד עם שיווק דיגיטלי מדויק.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "AutoSmart",
    locale: "he_IL",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AutoSmart",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  email: CONTACT.email,
  telephone: `+${CONTACT.whatsappNumber}`,
  areaServed: "IL",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={`${sans.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
