/**
 * Section 4 background — the same steps going round and round.
 * A faint ring of words rotating slowly; on mobile a slow vertical marquee.
 * Only the given words are used.
 */

const RING = ["פרסום", "לידים", "שיחות", "מכירה", "שירות", "פרסום", "לידים", "שיחות"];

export default function OrbitingWords() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* rotating ring — sm and up */}
      <div className="absolute left-1/2 top-1/2 hidden h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 sm:block">
        <div className="spin-slow absolute inset-0" style={{ ["--dur" as string]: "150s" }}>
          {RING.map((w, i) => {
            const angle = (360 / RING.length) * i;
            return (
              <span
                key={w + i}
                className="absolute left-1/2 top-1/2 text-2xl font-semibold tracking-tight text-white/[0.05] lg:text-3xl"
                style={{
                  transform: `rotate(${angle}deg) translateY(-23rem) rotate(-${angle}deg)`,
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
        {/* inner faint ring line */}
        <div className="absolute inset-10 rounded-full border border-white/[0.04]" />
        <div className="absolute inset-24 rounded-full border border-white/[0.03]" />
      </div>

      {/* mobile — vertical marquee */}
      <div className="absolute inset-0 flex justify-center overflow-hidden sm:hidden">
        <div className="marquee-y flex flex-col items-center gap-8 py-8 text-3xl font-semibold text-white/[0.05]" style={{ ["--dur" as string]: "26s" }}>
          {[...RING, ...RING].map((w, i) => (
            <span key={w + i}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
