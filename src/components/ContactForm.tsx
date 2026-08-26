import ContactFormBody from "@/components/contact/ContactFormBody";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-[4.75rem] overflow-hidden bg-gradient-to-br from-brand-navy to-brand-navy-light text-brand-offwhite sm:scroll-mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-cyan/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">בואו נדבר</h2>
          <p className="mt-2 text-brand-offwhite/70">
            ספרו לנו קצת על העסק שלכם ונחזור אליכם בהקדם
          </p>
        </div>

        <ContactFormBody />
      </div>
    </section>
  );
}
