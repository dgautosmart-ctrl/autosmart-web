import { Container } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";
import CtaButton from "@/components/lp/CtaButton";

/** Section 16 — dramatic closing CTA. */
export default function FinalCtaSection() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden py-16 sm:py-24">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30" />
      <div
        aria-hidden
        className="glow glow-strong anim-breathe absolute left-1/2 top-1/2 -z-10 h-[46rem] w-[46rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-l from-transparent via-accent-bright/50 to-transparent"
      />

      <Container size="narrow" className="relative text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">
            עברו אצלך בעסק מעל 100 לקוחות?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="display mx-auto mt-7 max-w-3xl text-3xl sm:text-5xl lg:text-6xl">
            יכול להיות שהלקוח הבא שלך הוא בכלל{" "}
            <span className="lit-soft">לקוח שכבר קנה ממך.</span>
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-8 max-w-2xl text-base text-text-dim sm:text-lg">
            במקום להשאיר את רשימת הלקוחות בצד, בוא נבדוק איך אפשר להפוך אותה
            לערוץ שממשיך לעבוד עבור העסק.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex justify-center">
            <CtaButton size="lg">אני רוצה לבדוק את זה</CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
