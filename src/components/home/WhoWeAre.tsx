import Reveal from "@/components/Reveal";
import TechBackdrop from "@/components/TechBackdrop";

const PARTS = ["שיווק שמביא לקוחות", "מערכות שמנהלות את העסק", "אוטומציה שמניעה הכל"];

export default function WhoWeAre() {
  return (
    <section
      id="about"
      className="relative scroll-mt-[4.75rem] overflow-hidden border-t border-brand-navy/[0.06] bg-white sm:scroll-mt-20"
    >
      <TechBackdrop tone="light" className="opacity-[0.35]" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-cyan/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:py-24">
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-blue/[0.06] px-3.5 py-1.5 text-xs font-medium tracking-wide text-brand-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            מי אנחנו
          </span>
          <h2 className="text-3xl text-brand-navy sm:text-[2.6rem]">
            מביאים לקוחות. מחברים מערכות. מניעים את העסק קדימה.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-normal leading-relaxed text-brand-navy/90 sm:text-lg">
            AutoSmart משלבת שיווק, מערכות ואוטומציה לפתרון אחד שעוזר לעסק
            למכור יותר, לעבוד טוב יותר ולא לאבד הזדמנויות בדרך.
          </p>
        </Reveal>

        <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {PARTS.map((part, i) => (
            <div key={part} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-lg text-brand-blue/70">
                  +
                </span>
              )}
              <span className="rounded-full bg-brand-navy px-4 py-2 text-sm font-medium text-brand-offwhite shadow-md shadow-brand-navy/15">
                {part}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
