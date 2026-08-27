import ContactFormBody from "@/components/contact/ContactFormBody";
import TechBackdrop from "@/components/TechBackdrop";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-[4.75rem] overflow-hidden bg-gradient-to-br from-brand-navy to-[#06182b] text-brand-offwhite sm:scroll-mt-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-glow opacity-60" />
      <TechBackdrop tone="dark" className="opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-cyan/15 blur-3xl animate-drift-b"
      />
      <div className="relative mx-auto max-w-2xl px-4 py-20 sm:py-24">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl">בואו נדבר</h2>
          <p className="mt-3 font-light text-brand-offwhite/70">
            ספרו לנו קצת על העסק שלכם ונחזור אליכם בהקדם
          </p>
        </div>

        <ContactFormBody />
      </div>
    </section>
  );
}
