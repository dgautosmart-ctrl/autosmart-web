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
          <h2 className="flex items-center justify-center gap-2.5 text-3xl sm:text-4xl">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-brand-cyan sm:h-7 sm:w-7"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            בואו נדבר
          </h2>
          <p className="mt-3 text-lg font-bold text-brand-offwhite sm:text-xl">
            רוצים להזניק את העסק? רוצים לראות את היומן מתמלא?
          </p>
          <p className="mt-2 text-brand-offwhite/85">
            ספרו לנו קצת על העסק שלכם ונחזור אליכם בהקדם
          </p>
        </div>

        <ContactFormBody />
      </div>
    </section>
  );
}
