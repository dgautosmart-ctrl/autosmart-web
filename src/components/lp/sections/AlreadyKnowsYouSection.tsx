import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";

/** Section 5 — הלקוח שכבר מכיר אותך. */
export default function AlreadyKnowsYouSection() {
  return (
    <Section>
      <Container size="narrow">
        <Reveal className="flex flex-col items-center text-center">
          <Marker />
          <h2 className="mt-6 text-4xl sm:text-6xl lg:text-[4rem] lg:leading-[1.08]">
            מי שכבר קיבל ממך שירות{" "}
            <span className="lit-soft">מכיר אותך.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-xl text-text-soft sm:text-2xl">
            הם כבר עבדו איתך פעם אחת. הדרך הקצרה ביותר לעבודה הבאה עוברת דרכם.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
