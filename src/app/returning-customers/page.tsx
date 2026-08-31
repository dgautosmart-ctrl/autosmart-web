import type { Metadata } from "next";
import LpHeader from "@/components/lp/Header";
import LpFooter from "@/components/lp/Footer";
import MobileStickyCta from "@/components/lp/MobileStickyCta";
import Hero from "@/components/lp/sections/Hero";
import JourneySection from "@/components/lp/sections/JourneySection";
import ProblemSection from "@/components/lp/sections/ProblemSection";
import CoreMessageSection from "@/components/lp/sections/CoreMessageSection";
import AlreadyKnowsYouSection from "@/components/lp/sections/AlreadyKnowsYouSection";
import FormSection from "@/components/lp/sections/FormSection";

const TITLE = "החזרת לקוחות ומכירות חוזרות | AutoSmart";
const DESCRIPTION =
  "עברו אצלך בעסק יותר מ־100 לקוחות? AutoSmart מקימה ומנהלת עבורך מערכת מסודרת לשמירה על קשר עם לקוחות קיימים באמצעות דיוור, תוכן ואוטומציות.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Landing page for direct/paid traffic — kept out of search and the sitemap.
  robots: { index: false, follow: false },
  openGraph: {
    title: "הלקוחות שכבר עבדו איתך יכולים לחזור שוב | AutoSmart",
    description:
      "הופכים את רשימת הלקוחות הקיימת לערוץ תקשורת מסודר שעוזר לעסק להישאר בקשר ולהחזיר אנשים לעבוד איתך שוב.",
    locale: "he_IL",
    type: "website",
  },
};

export default function ReturningCustomersLanding() {
  return (
    <div className="lp-root flex min-h-dvh flex-col font-sans">
      <LpHeader />
      <main className="flex-1">
        <Hero />
        <JourneySection />
        <ProblemSection />
        <CoreMessageSection />
        <AlreadyKnowsYouSection />
        <FormSection />
      </main>
      <LpFooter />
      <MobileStickyCta />
    </div>
  );
}
