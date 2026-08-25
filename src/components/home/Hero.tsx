import Link from "next/link";
import Reveal from "@/components/Reveal";
import FloatingLogo from "@/components/home/FloatingLogo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-navy to-[#081b30] text-brand-offwhite">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-blue/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-cyan/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-brand-blue/20 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:py-24">
        <FloatingLogo />
        <Reveal delay={0.15} className="max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            אוטומציה חכמה שמניעה את העסק שלך{" "}
            <span className="bg-gradient-to-l from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              קדימה
            </span>
          </h1>
          <p className="text-base text-brand-offwhite/80 sm:text-lg">
            עוזרים לעסקים קטנים ובינוניים לחסוך זמן, לצמצם טעויות ולשפר
            תהליכים - באמצעות אוטומציה מותאמת אישית לעסק שלכם.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="#contact"
            className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/30 transition-all hover:scale-105 hover:bg-brand-cyan hover:text-brand-navy hover:shadow-brand-cyan/40 sm:text-base"
          >
            בואו נדבר על העסק שלכם
          </Link>
          <Link
            href="#services"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-brand-offwhite transition-all hover:scale-105 hover:border-brand-cyan hover:text-brand-cyan sm:text-base"
          >
            מה אנחנו עושים
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
