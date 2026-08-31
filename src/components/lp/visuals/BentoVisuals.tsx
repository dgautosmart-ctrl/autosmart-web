/**
 * Section 9 — small, specific visuals for each Bento card.
 * Each one shows the thing the card describes: a list filling a database,
 * a mailing UI, an email preview, draft→sent, splitting into groups,
 * connected automation nodes, a mini analytics chart.
 * Decorative — no invented copy, only structural hints.
 */

export function VisualCustomerRows() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden>
      <rect x="8" y="10" width="284" height="130" rx="10" fill="var(--surface)" stroke="var(--hairline)" />
      <text x="20" y="30" fontSize="9" fill="var(--text-faint)" letterSpacing="2">
        DATABASE
      </text>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} style={{ ["--delay" as string]: `${-i * 1.2}s` }} className="anim-float">
          <rect x="20" y={42 + i * 18} width="260" height="12" rx="4" fill="var(--navy-2)" stroke="var(--hairline)" />
          <circle cx="30" cy={48 + i * 18} r="3" fill="var(--accent-bright)" opacity={0.8 - i * 0.13} />
          <rect x="40" y={44 + i * 18} width={120 - i * 12} height="4" rx="2" fill="var(--text-faint)" />
        </g>
      ))}
      <circle r="3" fill="var(--accent-bright)">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M300 60 L280 60" />
        <animate attributeName="opacity" dur="3.5s" repeatCount="indefinite" values="0;1;1;0" />
      </circle>
    </svg>
  );
}

export function VisualMailingUI() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden>
      <rect x="8" y="10" width="284" height="130" rx="10" fill="var(--surface)" stroke="var(--hairline)" />
      <rect x="8" y="10" width="70" height="130" rx="10" fill="var(--bg-2)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="20" y={30 + i * 22} width="44" height="8" rx="3" fill={i === 1 ? "var(--accent)" : "var(--hairline-bright)"} />
      ))}
      <rect x="92" y="28" width="188" height="30" rx="6" fill="var(--navy-2)" stroke="var(--hairline)" />
      <circle cx="108" cy="43" r="6" fill="var(--accent-bright)" opacity="0.7" />
      <rect x="122" y="39" width="120" height="6" rx="3" fill="var(--text-faint)" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="92" y={68 + i * 20} width="188" height="12" rx="4" fill="var(--surface-2)" stroke="var(--hairline)" />
      ))}
    </svg>
  );
}

export function VisualEmailPreview() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden>
      <rect x="30" y="12" width="180" height="126" rx="10" fill="var(--navy-2)" stroke="var(--hairline-bright)" />
      <rect x="30" y="12" width="180" height="26" rx="10" fill="var(--bg-2)" />
      <circle cx="46" cy="25" r="3" fill="var(--accent-bright)" />
      <rect x="56" y="22" width="90" height="6" rx="3" fill="var(--text-faint)" />
      <rect x="46" y="52" width="120" height="8" rx="3" fill="var(--accent-bright)" opacity="0.8" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="46" y={70 + i * 12} width={148 - (i % 2) * 40} height="5" rx="2.5" fill="var(--text-faint)" />
      ))}
      <rect x="46" y="118" width="60" height="12" rx="6" fill="var(--accent)" />
    </svg>
  );
}

export function VisualDraftToSent() {
  return (
    <svg viewBox="0 0 300 140" className="h-full w-full" aria-hidden>
      <g>
        <rect x="20" y="45" width="90" height="50" rx="8" fill="var(--surface)" stroke="var(--hairline)" />
        <text x="65" y="74" textAnchor="middle" fontSize="11" fill="var(--text-faint)" letterSpacing="1">
          DRAFT
        </text>
      </g>
      <path d="M120 70 H185" stroke="var(--hairline-bright)" strokeWidth="2" strokeDasharray="4 5" className="dash-flow" style={{ ["--dur" as string]: "5s" }} />
      <polygon points="185,64 197,70 185,76" fill="var(--accent-bright)" />
      <g>
        <rect x="200" y="45" width="90" height="50" rx="8" fill="var(--navy-2)" stroke="var(--accent-bright)" opacity="0.9" />
        <text x="245" y="74" textAnchor="middle" fontSize="11" fill="var(--accent-bright)" letterSpacing="1">
          SENT
        </text>
      </g>
      <circle r="3.5" fill="#fff">
        <animateMotion dur="3s" repeatCount="indefinite" path="M120 70 H185" />
        <animate attributeName="opacity" dur="3s" repeatCount="indefinite" values="0;1;1;0" />
      </circle>
    </svg>
  );
}

export function VisualSegments() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden>
      <circle cx="46" cy="75" r="10" fill="var(--navy-2)" stroke="var(--accent-bright)" />
      {[
        { y: 32, c: "var(--accent-bright)" },
        { y: 75, c: "var(--accent)" },
        { y: 118, c: "var(--accent-deep)" },
      ].map((g, i) => (
        <g key={i}>
          <path d={`M56 75 C 110 75, 150 ${g.y}, 210 ${g.y}`} fill="none" stroke="var(--hairline-bright)" strokeWidth="1.75" className="dash-flow" style={{ ["--dur" as string]: `${8 + i * 3}s` }} />
          <rect x="212" y={g.y - 14} width="70" height="28" rx="8" fill="var(--surface)" stroke="var(--hairline)" />
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={226 + k * 16} cy={g.y} r="4" fill={g.c} opacity={0.85 - k * 0.2} />
          ))}
        </g>
      ))}
    </svg>
  );
}

export function VisualAutomationNodes() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden>
      {[
        ["M40 110 C 90 110, 90 40, 150 40", "7s"],
        ["M150 40 C 210 40, 210 110, 260 110", "9s"],
        ["M40 110 C 120 130, 190 130, 260 110", "11s"],
      ].map(([d, dur], i) => (
        <path key={i} d={d} fill="none" stroke="var(--hairline-bright)" strokeWidth="1.75" className="dash-flow" style={{ ["--dur" as string]: dur }} />
      ))}
      {[
        [40, 110],
        [150, 40],
        [260, 110],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="11" fill="var(--navy-2)" stroke="var(--accent-bright)" strokeWidth="1.75" />
          <circle cx={cx} cy={cy} r="4" fill="var(--accent-bright)" className="anim-breathe" style={{ ["--dur" as string]: `${4 + i}s` }} />
        </g>
      ))}
      <circle r="3.5" fill="#fff">
        <animateMotion dur="4s" repeatCount="indefinite" path="M40 110 C 90 110, 90 40, 150 40" />
      </circle>
      <circle r="3.5" fill="#fff">
        <animateMotion dur="4s" begin="1.2s" repeatCount="indefinite" path="M150 40 C 210 40, 210 110, 260 110" />
      </circle>
    </svg>
  );
}

export function VisualAnalytics() {
  const bars = [26, 40, 34, 56, 48, 70, 62, 84];
  return (
    <svg viewBox="0 0 320 140" className="h-full w-full" aria-hidden>
      <line x1="16" y1="116" x2="304" y2="116" stroke="var(--hairline)" strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={24 + i * 35}
          y={116 - h}
          width="18"
          height={h}
          rx="4"
          fill="url(#bento-bar)"
          className="anim-float"
          style={{ ["--dur" as string]: `${5 + (i % 3)}s`, ["--delay" as string]: `${-i * 0.4}s` }}
        />
      ))}
      <path
        d="M33 90 L68 78 L103 84 L138 60 L173 68 L208 40 L243 48 L278 24"
        fill="none"
        stroke="var(--accent-bright)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[90, 78, 84, 60, 68, 40, 48, 24].map((cy, i) => (
        <circle key={i} cx={33 + i * 35} cy={cy} r="2.5" fill="#fff" />
      ))}
      <defs>
        <linearGradient id="bento-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--accent-deep)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
