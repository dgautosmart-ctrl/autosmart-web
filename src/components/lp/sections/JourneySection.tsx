import Reveal from "@/components/lp/Reveal";

const LINES = [
  "השקעת כסף בפרסום.",
  "ענית ללידים.",
  "מכרת.",
  "נתת שירות.",
];

/**
 * Section 2 — "המסע הרגיל". Storytelling in scroll: each sentence lands on its
 * own, then the whole thing fades and a near-empty screen asks "ואז מה?".
 */
export default function JourneySection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />

      <div className="relative">
        {LINES.map((line, i) => (
          <div
            key={line}
            className="flex min-h-[24vh] items-center justify-center px-4 sm:min-h-[30vh]"
          >
            <Reveal>
              <p
                className={`display text-center text-4xl sm:text-6xl lg:text-7xl ${
                  i === LINES.length - 1 ? "text-text-dim" : "text-text"
                }`}
              >
                {line}
              </p>
            </Reveal>
          </div>
        ))}

        {/* the beat where it all thins out and disappears */}
        <div className="flex min-h-[36vh] flex-col items-center justify-center px-4 pb-8">
          <Reveal>
            <p className="display text-center text-5xl text-text sm:text-7xl lg:text-8xl">
              ואז מה?
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
