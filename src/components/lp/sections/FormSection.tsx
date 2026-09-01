import { Section, Container, Marker } from "@/components/lp/primitives";
import { FORM_ID } from "@/lib/lp-config";
import Reveal from "@/components/lp/Reveal";
import LeadForm from "@/components/lp/LeadForm";

/** Section 15 — the lead form. Every primary CTA scrolls here. */
export default function FormSection() {
  return (
    <Section
      id={FORM_ID}
      className="scroll-mt-24 overflow-hidden border-t border-hairline bg-navy-2/25"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-radial opacity-50" />
      <div
        aria-hidden
        className="glow glow-strong anim-breathe absolute -top-40 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full"
      />

      <Container>
        <div className="mx-auto grid max-w-4xl items-start gap-10 lg:grid-cols-2 lg:gap-12">
          {/* pitch */}
          <Reveal className="flex flex-col items-center text-center lg:items-start lg:pt-4 lg:text-right">
            <Marker />
            <p className="mt-5 text-lg font-bold text-text sm:text-xl">
              רוצה להזניק את העסק? רוצה לראות את היומן מתמלא?
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.12]">
              בוא נבדוק מה מסתתר ברשימת הלקוחות שלך.
            </h2>
            <p className="mt-5 max-w-md text-lg text-text-soft">
              השאר פרטים ונבדוק יחד האם יש אצלך בסיס למערכת שתעזור לשמור על קשר
              עם לקוחות קיימים ולהחזיר אותם לעבוד איתך שוב.
            </p>
            <p className="mt-6 inline-flex items-center gap-2.5 rounded-xl border border-accent-bright/25 bg-navy-2/80 px-4 py-3 text-[0.95rem] font-semibold text-text-soft">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} className="h-4 w-4 shrink-0 text-accent-bright">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              לסוגרים עד ראש השנה — תינתן הנחה משמעותית!
            </p>
          </Reveal>

          {/* card */}
          <Reveal delay={0.1} className="w-full">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(60%_60%_at_50%_0%,var(--accent-glow),transparent_75%)] opacity-40 blur-xl"
              />
              <div className="rounded-3xl border border-hairline-bright bg-navy/60 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-8">
                <LeadForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
