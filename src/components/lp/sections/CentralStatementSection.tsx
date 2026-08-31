import { Container } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";
import CustomerIdField from "@/components/lp/visuals/CustomerIdField";

/** Section 12 — central full-screen statement. */
export default function CentralStatementSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#02040a] py-28">
      <CustomerIdField />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(43,147,201,0.16),transparent_62%)]" />
      <Container size="narrow" className="relative text-center">
        <Reveal>
          <p className="display text-3xl text-text-soft sm:text-5xl lg:text-6xl">
            אתה ממשיך לנהל את העסק.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="display mt-6 text-4xl sm:text-6xl lg:text-7xl">
            אנחנו דואגים שהלקוחות שלך{" "}
            <span className="lit">לא ישכחו ממנו.</span>
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mx-auto mt-10 max-w-2xl text-base text-text-dim sm:text-lg">
            במקום שרשימת הלקוחות תשב בצד — הופכים אותה לערוץ תקשורת פעיל עם
            האנשים שכבר מכירים אותך.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
