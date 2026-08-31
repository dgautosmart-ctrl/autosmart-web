import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";

/** Section 8 — מה AutoSmart עושה. */
export default function WhatWeDoSection() {
  return (
    <Section>
      <Container size="narrow" className="flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <Marker />
          <h2 className="mt-5 text-4xl sm:text-6xl lg:text-7xl">
            אנחנו עושים עבורך <span className="lit-soft">הכול.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-2xl text-xl text-text-soft sm:text-2xl">
            אתה לא צריך להתחיל ללמוד מערכות דיוור, לבנות אוטומציות או לחשוב כל
            שבוע מה לשלוח.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-text-dim sm:text-lg">
            אנחנו מקימים ומנהלים עבורך את המערכת — מהלקוחות הקיימים ועד לתוכן,
            האוטומציות והמעקב.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
