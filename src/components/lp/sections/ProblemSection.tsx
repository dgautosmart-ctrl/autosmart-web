import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";
import LoopFlow from "@/components/lp/visuals/LoopFlow";

/** Section 3 — הבעיה. */
export default function ProblemSection() {
  return (
    <Section className="bg-bg-2">
      <div aria-hidden className="absolute inset-0 -z-10 bg-radial opacity-40" />
      <Container>
        <Reveal className="max-w-3xl">
          <Marker />
          <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">
            ברוב העסקים — הלקוח פשוט{" "}
            <span className="text-text-dim">נעלם מהרשימה.</span>
          </h2>
          <p className="mt-6 text-lg text-text-soft sm:text-xl">
            והעסק חוזר להשקיע עוד כסף כדי להביא את הלקוח הבא.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 sm:mt-20">
          <div className="rounded-3xl border border-hairline bg-navy/30 p-5 backdrop-blur-sm sm:p-10">
            <LoopFlow />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
