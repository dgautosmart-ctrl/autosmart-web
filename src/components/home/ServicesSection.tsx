import { services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";

export default function ServicesSection() {
  return (
    <section id="services" className="relative scroll-mt-[4.75rem] overflow-hidden bg-gradient-to-b from-brand-offwhite to-white sm:scroll-mt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-glow opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <Reveal className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-4 py-1.5 text-xs font-semibold text-brand-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />
            התחומים שלנו
          </span>
          <h2 className="text-3xl font-bold text-brand-navy sm:text-4xl">
            איך אנחנו יכולים לעזור
          </h2>
          <p className="mt-2 text-brand-navy/70">
            כמה מהתחומים שבהם אנחנו עוזרים לעסקים לעבוד חכם יותר
          </p>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
