import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";
import SystemPipeline from "@/components/lp/visuals/SystemPipeline";

/** Section 11 — Visual System Flow. */
export default function SystemFlowSection() {
  return (
    <Section className="overflow-hidden bg-bg-2">
      <div
        aria-hidden
        className="glow glow-soft absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[64rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/4 rounded-[50%]"
      />
      <Container size="wide">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Marker />
          </div>
          <h2 className="mt-5 text-3xl sm:text-5xl lg:text-6xl">
            כך רשימת לקוחות הופכת למערכת שעובדת.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <div className="rounded-3xl border border-hairline bg-navy/25 p-4 backdrop-blur-sm sm:p-10">
            <SystemPipeline />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
