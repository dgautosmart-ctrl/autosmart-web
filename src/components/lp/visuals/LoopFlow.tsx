/**
 * Section 3 visual — the ordinary loop.
 * פרסום → ליד → שיחת מכירה → לקוח → שירות → סוף הקשר, then a line arcs back
 * to פרסום. The first stretch glows; at "סוף הקשר" the light goes out; the
 * return arc pulls the business back to spending again.
 */

const NODES = [
  { label: "פרסום", lit: true },
  { label: "ליד", lit: true },
  { label: "שיחת מכירה", lit: true },
  { label: "לקוח", lit: true },
  { label: "שירות", lit: false },
  { label: "סוף הקשר", lit: false, dead: true },
];

export default function LoopFlow() {
  return (
    <div className="relative w-full">
      {/* desktop / tablet: horizontal RTL chain */}
      <svg
        viewBox="0 0 1200 440"
        className="hidden w-full sm:block"
        role="img"
        aria-label="פרסום, ליד, שיחת מכירה, לקוח, שירות, סוף הקשר — ואז חזרה לפרסום"
      >
        <defs>
          <linearGradient id="lf-lit" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-bright)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
          <filter id="lf-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="9" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* base track */}
        <path d="M1140 120 H60" fill="none" stroke="var(--hairline-bright)" strokeWidth="3.5" />
        {/* lit portion (right → toward the middle) */}
        <path
          d="M1140 120 H540"
          fill="none"
          stroke="url(#lf-lit)"
          strokeWidth="6"
          filter="url(#lf-glow)"
          className="dash-flow"
          style={{ ["--dur" as string]: "10s" }}
        />

        {/* travelling light that dies at the end */}
        <circle r="9" fill="var(--accent-bright)" filter="url(#lf-glow)">
          <animateMotion dur="4.5s" repeatCount="indefinite" keyPoints="0;0.72;0.78" keyTimes="0;0.8;1" calcMode="linear" path="M1140 120 H60" />
          <animate attributeName="opacity" dur="4.5s" repeatCount="indefinite" values="0;1;1;0.15;0" keyTimes="0;0.1;0.72;0.82;1" />
        </circle>

        {/* nodes */}
        {NODES.map((n, i) => {
          const x = 1140 - i * 216;
          return (
            <g key={n.label} transform={`translate(${x} 120)`}>
              <circle
                r="18"
                fill={n.dead ? "var(--bg-2)" : "var(--navy-2)"}
                stroke={n.lit ? "var(--accent-bright)" : "var(--hairline-bright)"}
                strokeWidth="3"
                filter={n.lit ? "url(#lf-glow)" : undefined}
              />
              {n.dead && (
                <path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="var(--text-faint)" strokeWidth="3" strokeLinecap="round" />
              )}
              <text
                x="0"
                y="62"
                textAnchor="middle"
                fontSize="27"
                fontWeight="600"
                fill={n.lit ? "var(--text)" : "var(--text-faint)"}
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* return arc: from סוף הקשר back to פרסום */}
        <path
          id="lf-return"
          d="M60 120 C 60 400, 1140 400, 1140 130"
          fill="none"
          stroke="var(--hairline)"
          strokeWidth="3.5"
          strokeDasharray="10 12"
        />
        <polygon points="1140,108 1131,128 1149,128" fill="var(--text-faint)" />
        <circle r="7" fill="var(--text-dim)">
          <animateMotion dur="5s" repeatCount="indefinite" path="M60 120 C 60 400, 1140 400, 1140 130" />
          <animate attributeName="opacity" dur="5s" repeatCount="indefinite" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" />
        </circle>
      </svg>

      {/* mobile: vertical chain */}
      <ul className="mx-auto flex max-w-xs flex-col items-stretch gap-0 sm:hidden">
        {NODES.map((n, i) => (
          <li key={n.label} className="flex flex-col items-center">
            <div
              className={`w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                n.lit
                  ? "border-accent-bright/50 bg-navy-2 text-text shadow-[0_0_24px_-8px_var(--accent-glow)]"
                  : "border-hairline bg-bg-2 text-text-faint"
              }`}
            >
              {n.label}
            </div>
            {i < NODES.length - 1 && (
              <span
                className={`my-1 h-6 w-px ${n.lit ? "bg-accent-bright/50" : "bg-hairline"}`}
              />
            )}
          </li>
        ))}
        <li aria-hidden className="mt-2 flex justify-center text-text-faint">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6 rotate-180">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-1" />
          </svg>
        </li>
      </ul>
    </div>
  );
}
