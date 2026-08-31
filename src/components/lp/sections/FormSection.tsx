import { Section, Container, Marker } from "@/components/lp/primitives";
import { FORM_ID } from "@/lib/lp-config";
import Reveal from "@/components/lp/Reveal";
import LeadForm from "@/components/lp/LeadForm";

/** Section 15 — the lead form. Every primary CTA scrolls here. */
export default function FormSection() {
  return (
    <Section
      id={FORM_ID}
      className="scroll-mt-24 overflow-hidden border-y border-hairline bg-navy-2/25"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-radial opacity-60" />
      <div
        aria-hidden
        className="glow glow-strong anim-breathe absolute -top-40 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full"
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* pitch */}
          <Reveal className="text-center lg:text-right">
            <div className="flex justify-center lg:justify-start">
              <Marker />
            </div>
            <h2 className="mt-6 text-4xl sm:text-5xl lg:text-[3.2rem] lg:leading-[1.08]">
              בוא נבדוק מה מסתתר ברשימת הלקוחות שלך.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-text-soft sm:text-xl lg:mx-0">
              השאר פרטים ונבדוק יחד האם יש אצלך בסיס למערכת שתעזור לשמור על קשר
              עם לקוחות קיימים ולהחזיר אותם לרכישות נוספות.
            </p>
          </Reveal>

          {/* card — pulled toward the centre on desktop */}
          <Reveal delay={0.1} className="w-full lg:max-w-[27rem] lg:justify-self-start">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_0%,var(--accent-glow),transparent_75%)] opacity-50 blur-xl"
              />
              <div className="rounded-3xl border border-hairline-bright bg-navy/60 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] backdrop-blur-md sm:p-9">
                <LeadForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
