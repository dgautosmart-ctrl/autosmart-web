import { Section, Container, Marker } from "@/components/lp/primitives";
import Reveal from "@/components/lp/Reveal";
import NewVsExistingFlows from "@/components/lp/visuals/NewVsExistingFlows";

/** Section 5 — הלקוח שכבר מכיר אותך. */
export default function AlreadyKnowsYouSection() {
  return (
    <Section>
      <Container>
        <Reveal className="max-w-3xl">
          <Marker />
          <h2 className="mt-5 text-3xl sm:text-5xl lg:text-[3.5rem]">
            הלקוחות שכבר קנו ממך הם האנשים שכבר מכירים את העסק שלך.
          </h2>
          <p className="mt-6 text-lg text-text-soft sm:text-xl">
            הם כבר נתנו בך אמון — והרבה יותר קל ונכון לשמור איתם על קשר ולהחזיר
            אותם לקנייה נוספת.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 sm:mt-20">
          <NewVsExistingFlows />
        </Reveal>
      </Container>
    </Section>
  );
}
