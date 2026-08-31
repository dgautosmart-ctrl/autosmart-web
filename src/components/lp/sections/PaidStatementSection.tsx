import { Container } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";

/** Section 7 — Statement. Almost-empty screen. */
export default function PaidStatementSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden py-28">
      <div
        aria-hidden
        className="glow glow-faint absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <Container size="narrow" className="relative text-center">
        <Reveal>
          <p className="text-base text-text-dim sm:text-lg">
            כבר שילמת כדי להביא את הלקוח.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="display mt-6 text-4xl sm:text-6xl lg:text-7xl">
            עכשיו צריך לדאוג שהוא{" "}
            <span className="lit">לא ישכח ממך.</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
