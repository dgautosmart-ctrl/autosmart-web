/**
 * Section 11 visual — how a customer list becomes a working system.
 * Centre: "רשימת הלקוחות שלך". From it an animated flow:
 * לקוחות קיימים → חלוקה לקהלים → תוכן → דיוור → אוטומציות → תגובות → רכישה נוספת
 * Light pulses run along the links; customer tokens travel the whole route.
 */

const STAGES = [
  "לקוחות קיימים",
  "חלוקה לקהלים",
  "תוכן",
  "דיוור",
  "אוטומציות",
  "תגובות",
  "רכישה נוספת",
];

const RAIL = "M1150 300 H90";

export default function SystemPipeline() {
  return (
    <div className="relative w-full">
      {/* desktop / tablet */}
      <svg viewBox="0 0 1240 420" className="hidden w-full sm:block" role="img" aria-label={STAGES.join(" ← ")}>
        <defs>
          <linearGradient id="sp-rail" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="var(--accent-bright)" />
            <stop offset="50%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-bright)" />
          </linearGradient>
          <filter id="sp-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* central source node */}
        <g transform="translate(620 70)">
          <rect x="-150" y="-34" width="300" height="68" rx="20" fill="var(--navy-2)" stroke="var(--accent-bright)" strokeWidth="1.75" filter="url(#sp-glow)" />
          <text x="0" y="7" textAnchor="middle" fontSize="22" fontWeight="600" fill="var(--text)">
            רשימת הלקוחות שלך
          </text>
        </g>
        {/* feed line from source down to the rail */}
        <path d="M620 104 V300" fill="none" stroke="var(--hairline-bright)" strokeWidth="2" strokeDasharray="6 7" className="dash-flow" style={{ ["--dur" as string]: "9s" }} />

        {/* main rail */}
        <path d={RAIL} fill="none" stroke="var(--hairline-bright)" strokeWidth="2" />
        <path d={RAIL} fill="none" stroke="url(#sp-rail)" strokeWidth="2.5" className="dash-flow" style={{ ["--dur" as string]: "12s" }} opacity="0.9" />

        {/* pulses */}
        {[0, 1.6, 3.2, 4.8].map((delay, i) => (
          <circle key={i} r="4.5" fill="var(--accent-bright)" filter="url(#sp-glow)">
            <animateMotion dur="6.4s" begin={`${delay}s`} repeatCount="indefinite" path={RAIL} />
            <animate attributeName="opacity" dur="6.4s" begin={`${delay}s`} repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.08;0.9;1" />
          </circle>
        ))}

        {/* travelling customer tokens */}
        {[0, 3.4].map((delay, i) => (
          <g key={i}>
            <animateMotion dur="7s" begin={`${delay}s`} repeatCount="indefinite" path={RAIL} rotate="0" />
            <g>
              <rect x="-13" y="-13" width="26" height="26" rx="8" fill="var(--navy-2)" stroke="var(--accent-bright)" strokeWidth="1.5" />
              <circle cx="0" cy="-3" r="3.4" fill="var(--accent-bright)" />
              <path d="M-6 8 A6 6 0 0 1 6 8" fill="none" stroke="var(--accent-bright)" strokeWidth="1.6" />
            </g>
          </g>
        ))}

        {/* stage nodes */}
        {STAGES.map((label, i) => {
          const x = 1150 - i * ((1150 - 90) / (STAGES.length - 1));
          const last = i === STAGES.length - 1;
          return (
            <g key={label} transform={`translate(${x} 300)`}>
              <circle
                r={last ? 12 : 9}
                fill={last ? "var(--accent)" : "var(--navy-2)"}
                stroke="var(--accent-bright)"
                strokeWidth="2"
                filter={last ? "url(#sp-glow)" : undefined}
              />
              <text
                x="0"
                y={i % 2 === 0 ? -26 : 40}
                textAnchor="middle"
                fontSize="17"
                fontWeight="600"
                fill={last ? "var(--accent-bright)" : "var(--text-soft)"}
              >
                {label}
              </text>
              <line x1="0" y1={i % 2 === 0 ? -14 : 14} x2="0" y2={i % 2 === 0 ? -20 : 20} stroke="var(--hairline-bright)" strokeWidth="1.5" />
            </g>
          );
        })}
      </svg>

      {/* mobile: vertical */}
      <div className="sm:hidden">
        <div className="mx-auto mb-4 w-full rounded-2xl border border-accent-bright/40 bg-navy-2 px-4 py-3 text-center text-base font-semibold text-text shadow-[0_0_30px_-10px_var(--accent-glow)]">
          רשימת הלקוחות שלך
        </div>
        <ul className="mx-auto flex max-w-xs flex-col items-center">
          {STAGES.map((label, i) => (
            <li key={label} className="flex w-full flex-col items-center">
              <span className="my-1.5 h-5 w-px bg-gradient-to-b from-accent-bright/60 to-accent/20" />
              <div
                className={`w-full rounded-xl border px-4 py-3 text-center text-sm font-semibold ${
                  i === STAGES.length - 1
                    ? "border-accent-bright/50 bg-navy-2 text-accent-bright shadow-[0_0_24px_-8px_var(--accent-glow)]"
                    : "border-hairline bg-surface text-text-soft"
                }`}
              >
                {label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
