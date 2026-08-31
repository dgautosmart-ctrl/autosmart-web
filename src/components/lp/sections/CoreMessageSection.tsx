import { Container } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";
import OrbitingWords from "@/components/lp/visuals/OrbitingWords";

/** Section 4 — המסר המרכזי. Very dark, minimal. */
export default function CoreMessageSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-bg py-28">
      <OrbitingWords />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(43,147,201,0.14),transparent_60%)]" />
      <Container size="narrow" className="relative text-center">
        <Reveal>
          <h2 className="display text-4xl sm:text-6xl lg:text-7xl">
            אבל למה להתחיל כל פעם{" "}
            <span className="lit">מחדש?</span>
          </h2>
        </Reveal>
      </Container>
    </section>
  );
}
