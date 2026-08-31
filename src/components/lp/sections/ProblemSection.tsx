import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";

/** Section 3 — הבעיה. */
export default function ProblemSection() {
  return (
    <Section className="bg-navy-2/20">
      <div aria-hidden className="absolute inset-0 -z-10 bg-radial opacity-40" />
      <Container size="narrow">
        <Reveal className="flex flex-col items-center text-center">
          <Marker />
          <h2 className="mt-6 text-4xl sm:text-6xl lg:text-[4rem] lg:leading-[1.08]">
            ברוב העסקים — הלקוח פשוט{" "}
            <span className="text-text-dim">נעלם מהרשימה.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-xl text-text-soft sm:text-2xl">
            והעסק חוזר להשקיע עוד כסף כדי להביא את הלקוח הבא.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
