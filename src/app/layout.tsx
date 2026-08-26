import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { CONTACT, SITE_URL } from "@/lib/site-config";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["hebrew", "latin"],
});

const SITE_TITLE = "AutoSmart - אוטומציה עסקית לעסקים קטנים ובינוניים";
const SITE_DESCRIPTION =
  "AutoSmart מסייעת לעסקים קטנים ובינוניים לחסוך זמן ולשפר תהליכים באמצעות אוטומציה חכמה.";

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
    <html lang="he" dir="rtl" className={`${rubik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgressBar />
        <Header />
        <main className="flex-1 pt-[4.75rem] sm:pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
