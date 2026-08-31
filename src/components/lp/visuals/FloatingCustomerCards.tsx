"use client";

/**
 * Floating "customer cards" around the hero headline.
 * Some are near / sharp / large, some far / blurred / transparent / small —
 * they should read as sitting at different depths. Thin connector lines fade
 * in after load. Decorative; the only permitted copy is the four card labels.
 */

type Card = {
  n: string;
  className: string; // position + responsive visibility
  depth: string; // scale / blur / opacity
  dur: string;
  delay: string; // float delay
  stage: string; // reveal delay (hero sequence)
};

const CARDS: Card[] = [
  {
    n: "001",
    className: "right-[2%] top-[14%] w-60 lg:right-[4%] lg:top-[16%]",
    depth: "scale-100 opacity-100",
    dur: "7.5s",
    delay: "-1s",
    stage: "3.2s",
  },
  {
    n: "002",
    className: "left-[1%] top-[26%] hidden w-56 md:block lg:left-[3%]",
    depth: "scale-[0.92] opacity-90",
    dur: "9s",
    delay: "-3s",
    stage: "3.5s",
  },
  {
    n: "003",
    className: "left-[8%] bottom-[12%] hidden w-44 lg:block",
    depth: "scale-[0.8] opacity-50 blur-[2px]",
    dur: "11s",
    delay: "-5s",
    stage: "3.8s",
  },
  {
    n: "004",
    className: "right-[10%] bottom-[8%] hidden w-40 lg:block",
    depth: "scale-[0.72] opacity-35 blur-[3px]",
    dur: "12.5s",
    delay: "-2s",
    stage: "4.1s",
  },
];

function CardFace({ n }: { n: string }) {
  return (
    <div className="card-glow relative overflow-hidden rounded-2xl border border-hairline-bright bg-navy/70 p-4 backdrop-blur-md shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-hairline bg-surface-2 font-mono text-xs text-accent-bright">
          {n}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">לקוח {n}</p>
          <span className="mt-0.5 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-accent-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
            לקוח קיים
          </span>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-text-dim">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5 text-text-faint">
          <path strokeLinecap="round" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        לא נוצר קשר לאחרונה
      </p>
    </div>
  );
}

export default function FloatingCustomerCards() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden sm:block">
      {/* connector lines — draw in after the cards */}
      <svg
        className="stage absolute inset-0 hidden h-full w-full lg:block"
        style={{ ["--delay" as string]: "4.4s" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-link" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path
          className="dash-flow"
          d="M88 22 C70 34, 60 40, 50 46"
          fill="none"
          stroke="url(#hero-link)"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
          style={{ ["--dur" as string]: "18s" }}
        />
        <path
          className="dash-flow"
          d="M8 32 C24 40, 36 44, 50 50"
          fill="none"
          stroke="url(#hero-link)"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
          style={{ ["--dur" as string]: "22s" }}
        />
        <path
          className="dash-flow"
          d="M14 84 C30 74, 42 66, 50 58"
          fill="none"
          stroke="url(#hero-link)"
          strokeWidth="0.2"
          vectorEffect="non-scaling-stroke"
          style={{ ["--dur" as string]: "26s" }}
        />
      </svg>

      {CARDS.map((c) => (
        <div
          key={c.n}
          className={`stage absolute ${c.className}`}
          style={{ ["--delay" as string]: c.stage }}
        >
          <div className={`anim-float ${c.depth}`} style={{ ["--dur" as string]: c.dur, ["--delay" as string]: c.delay }}>
            <CardFace n={c.n} />
          </div>
        </div>
      ))}
    </div>
  );
}
