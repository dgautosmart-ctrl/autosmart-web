import { Section, Container } from "@/components/lp/primitives";
import { FORM_ID } from "@/lib/lp-config";
import Reveal from "@/components/lp/Reveal";
import LeadForm from "@/components/lp/LeadForm";

/** Section 15 — the lead form. Every primary CTA scrolls here. */
export default function FormSection() {
  return (
    <Section id={FORM_ID} className="scroll-mt-20 overflow-hidden bg-navy-2/20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-radial opacity-50" />
      <div
        aria-hidden
        className="glow glow-soft anim-breathe absolute -top-32 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full"
      />
      <Container size="narrow">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem]">
              בוא נבדוק מה מסתתר ברשימת הלקוחות שלך.
            </h2>
            <p className="mt-6 text-lg text-text-soft">
              השאר פרטים ונבדוק יחד האם יש אצלך בסיס למערכת שתעזור לשמור על קשר
              עם לקוחות קיימים ולהחזיר אותם לרכישות נוספות.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-hairline bg-navy/30 p-6 backdrop-blur-md sm:p-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
