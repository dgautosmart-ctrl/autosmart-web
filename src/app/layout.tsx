import type { Metadata } from "next";
import { IBM_Plex_Sans_Hebrew } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import LeadPopup from "@/components/LeadPopup";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { ContactModalProvider } from "@/components/contact/ContactModalContext";
import ContactModal from "@/components/contact/ContactModal";
import { CONTACT, SITE_URL } from "@/lib/site-config";
import "./globals.css";

const sans = IBM_Plex_Sans_Hebrew({
  variable: "--font-ibm",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_TITLE = "AutoSmart - יותר לקוחות עם שיווק מדויק, מערכות חכמות ואוטומציה";
const SITE_DESCRIPTION =
  "AutoSmart עוזרת לעסקים קטנים ובינוניים להביא יותר לקוחות - בשילוב של שיווק דיגיטלי מדויק, מערכות חכמות ואוטומציה שעובדת בשבילכם.";

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
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ContactModalProvider>
          <ScrollProgressBar />
          <Header />
          <main className="flex-1 pt-[4.75rem] sm:pt-20">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
          <ContactModal />
          <LeadPopup />
        </ContactModalProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
