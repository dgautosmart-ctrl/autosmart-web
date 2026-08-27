import Reveal from "@/components/Reveal";
import HeroMockup from "@/components/home/HeroMockup";
import ScrollLink from "@/components/ScrollLink";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-brand-navy to-[#081b30] text-brand-offwhite">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-aurora opacity-90" />
        <div className="absolute inset-0 bg-beam opacity-70" />
        <div className="absolute -top-24 left-1/2 h-80 w-80 rounded-full bg-brand-blue/30 blur-3xl animate-drift-a" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-cyan/25 blur-3xl animate-drift-b" />
        <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-brand-blue/20 blur-3xl animate-drift-c" />
        <div className="absolute inset-0 bg-noise opacity-[0.12] mix-blend-soft-light" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pt-16 pb-24 text-center sm:pt-24 sm:pb-32">
        <Reveal className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand-cyan backdrop-blur-sm sm:text-sm">
          <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse-dot" />
          שיווק מדויק · מערכות חכמות · אוטומציה
        </Reveal>

        <Reveal delay={0.1} className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold leading-[1.15] sm:text-6xl">
            מניעים את העסק שלכם{" "}
            <span className="block bg-gradient-to-l from-brand-cyan to-brand-blue bg-clip-text text-transparent sm:inline">
              קדימה.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-brand-offwhite/75 sm:text-lg">
            בונים לעסק שלכם מנוע שמביא יותר לקוחות - עם שיווק מדויק, מערכות
            חכמות ואוטומציה שעובדת בשבילכם.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col gap-3 sm:flex-row">
          <ScrollLink
            href="#contact"
            className="rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan px-7 py-3.5 text-sm font-semibold text-brand-navy shadow-lg shadow-brand-blue/30 transition-all hover:scale-105 hover:shadow-brand-cyan/40 sm:text-base"
          >
            בואו נדבר על העסק שלכם
          </ScrollLink>
          <ScrollLink
            href="#services"
            className="rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-brand-offwhite backdrop-blur-sm transition-all hover:scale-105 hover:border-brand-cyan hover:text-brand-cyan sm:text-base"
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
