import Reveal from "@/components/Reveal";
import HeroMockup from "@/components/home/HeroMockup";
import ScrollLink from "@/components/ScrollLink";
import TechBackdrop from "@/components/TechBackdrop";
import HandDrawnArrow from "@/components/HandDrawnArrow";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy via-brand-navy to-[#06182b] text-brand-offwhite">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-glow opacity-90" />
        <TechBackdrop tone="dark" className="opacity-[0.6]" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 rounded-full bg-brand-blue/25 blur-3xl animate-drift-a" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl animate-drift-b" />
        <div className="absolute inset-0 bg-noise opacity-[0.1] mix-blend-soft-light" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#06182b]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
        <Reveal className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-brand-cyan backdrop-blur-sm sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse-dot" />
          שיווק מדויק · מערכות חכמות · אוטומציה
        </Reveal>

        <Reveal delay={0.08} className="max-w-3xl space-y-5">
          <h1 className="text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-7xl">
            מניעים את העסק שלכם{" "}
            <span className="whitespace-nowrap">
              <span className="bg-gradient-to-l from-brand-cyan via-brand-cyan to-brand-blue bg-clip-text text-transparent">
                קדימה
              </span>
              <HandDrawnArrow className="ms-2 h-[1.05em] w-[1.05em] align-[0.06em] text-brand-cyan" />
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-brand-offwhite/75 sm:text-lg">
            בונים לעסק שלכם מנוע שמביא יותר לקוחות - עם שיווק מדויק, מערכות
            חכמות ואוטומציה שעובדת בשבילכם.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="flex flex-col gap-3 sm:flex-row">
          <ScrollLink
            href="#contact"
            className="rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-7 py-3.5 text-sm font-semibold text-brand-navy shadow-lg shadow-brand-blue/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-cyan/30 sm:text-base"
          >
            בואו נדבר על העסק שלכם
          </ScrollLink>
          <ScrollLink
            href="#services"
            className="rounded-full border border-white/20 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-brand-offwhite backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/60 hover:text-brand-cyan sm:text-base"
          >
            מה אנחנו עושים
          </ScrollLink>
        </Reveal>
      </div>

      <div className="relative mx-auto -mb-20 max-w-6xl px-4 sm:-mb-28">
        <HeroMockup />
      </div>
    </section>
  );
}
