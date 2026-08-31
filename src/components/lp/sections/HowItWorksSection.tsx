"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Container, Marker } from "@/components/lp/primitives";

const STEPS = [
  {
    n: "01",
    title: "מרכזים את הרשימה",
    text: "מתחילים מהלקוחות שכבר קיימים אצלך ומרכזים אותם בצורה מסודרת.",
  },
  {
    n: "02",
    title: "מסדרים ומחלקים לקהלים",
    text: "מבינים מי נמצא ברשימה ומחלקים אותה לקבוצות כדי שאפשר יהיה לעבוד בצורה מדויקת יותר.",
  },
  {
    n: "03",
    title: "בונים את מערכת התקשורת",
    text: "מקימים את מערכת הדיוור, מכינים את התוכן ובונים את האוטומציות הנדרשות.",
  },
  {
    n: "04",
    title: "שולחים, מודדים ומשפרים",
    text: "המערכת מתחילה לעבוד ואנחנו עוקבים אחרי התוצאות כדי להבין מה עובד ומה כדאי לשפר.",
  },
];

/** Section 10 — איך זה עובד. Sticky timeline on desktop, vertical flow on mobile. */
export default function HowItWorksSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
    setActive(idx);
  });

  return (
    <section className="relative bg-bg">
      <Container className="pt-24 sm:pt-32">
        <Marker />
        <h2 className="mt-5 max-w-4xl text-3xl sm:text-5xl lg:text-6xl">
          מרשימת לקוחות ישנה למערכת שעובדת בשביל העסק.
        </h2>
      </Container>

      {/* desktop: pinned */}
      <div ref={wrapRef} className="relative mt-10 hidden lg:block" style={{ height: `${STEPS.length * 90}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <Container size="wide">
            <div className="grid grid-cols-[1.1fr_1fr] items-center gap-16">
              {/* pinned stage */}
              <div className="relative min-h-[26rem]">
                <span className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[20rem] font-bold leading-none text-white/[0.04]">
                  {STEPS[active].n}
                </span>
                {STEPS.map((step, i) => (
                  <motion.div
                    key={step.n}
                    className="absolute inset-0 flex flex-col justify-center"
                    animate={{
                      opacity: i === active ? 1 : 0,
                      y: i === active ? 0 : 30,
                      filter: i === active ? "blur(0px)" : "blur(6px)",
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-mono text-lg text-accent-bright">{step.n}</span>
                    <h3 className="mt-3 text-4xl font-semibold xl:text-5xl">{step.title}</h3>
                    <p className="mt-5 max-w-lg text-lg text-text-soft">{step.text}</p>
                  </motion.div>
                ))}
              </div>

              {/* progress rail */}
              <ul className="space-y-6 border-r border-hairline pr-8">
                {STEPS.map((step, i) => (
                  <li key={step.n} className="flex items-center gap-4">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border font-mono text-sm transition-all duration-500 ${
                        i === active
                          ? "border-accent-bright bg-accent/15 text-accent-bright shadow-[0_0_28px_-4px_var(--accent-glow)]"
                          : i < active
                            ? "border-hairline-bright text-text-dim"
                            : "border-hairline text-text-faint"
                      }`}
                    >
                      {step.n}
                    </span>
                    <span
                      className={`text-base transition-colors duration-500 ${
                        i === active ? "text-text" : "text-text-faint"
                      }`}
                    >
                      {step.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </div>

      {/* mobile: vertical */}
      <Container className="mt-14 space-y-12 pb-24 lg:hidden">
        {STEPS.map((step) => (
          <motion.div
            key={step.n}
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="pointer-events-none absolute -top-6 right-0 select-none text-8xl font-bold leading-none text-white/[0.05]">
              {step.n}
            </span>
            <div className="relative pt-6">
              <span className="font-mono text-sm text-accent-bright">{step.n}</span>
              <h3 className="mt-2 text-2xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-base text-text-soft">{step.text}</p>
            </div>
          </motion.div>
        ))}
      </Container>
    </section>
  );
}
