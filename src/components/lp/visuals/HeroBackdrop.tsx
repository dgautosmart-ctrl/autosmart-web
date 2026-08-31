/**
 * Hero background — "dormant potential igniting into upward momentum".
 * A field of scattered, mostly-inactive points; a portion ignite, glow and
 * drift upward, gathering into a few refined streams of rising energy.
 * Meant to create curiosity — value already present, waking up — not to
 * explain anything. Fully abstract: no lines-between-nodes diagram, no icons,
 * no text. Masked clear through the upper-centre so the Hebrew headline,
 * supporting copy and CTA stay highly readable.
 */

const W = 1600;
const H = 900;

// centre of the "keep it clean" reading zone (headline sits upper-centre)
const CX = 820;
const CY = 380;
const RX = 680;
const RY = 320;

/** deterministic pseudo-random in [0,1) — identical on server and client */
function h(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

type Dot = {
  x: number;
  y: number;
  r: number;
  hot: boolean;
  op: number;
  dur: string;
  delay: string;
  rise: string;
};

const DOTS: Dot[] = (() => {
  const out: Dot[] = [];
  const cols = 20;
  const rows = 12;
  let k = 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      k++;
      const gx = ((col + 0.5) / cols) * W;
      const gy = ((row + 0.5) / rows) * H;
      const x = gx + (h(k) - 0.5) * (W / cols) * 1.1;
      const y = gy + (h(k + 91) - 0.5) * (H / rows) * 1.1;

      const d = ((x - CX) / RX) ** 2 + ((y - CY) / RY) ** 2;
      if (d < 1) continue; // inside the reading zone

      // thin out: heavier near the reading zone; keep more density low & left
      const lower = y / H; // 0 top .. 1 bottom
      const cull = (d < 1.7 ? 0.62 : 0.24) + (1 - lower) * 0.28 + (x > W * 0.55 ? 0.3 : 0);
      if (h(k + 13) < cull) continue;

      out.push({
        x: Math.round(x),
        y: Math.round(y),
        r: 1.6 + h(k + 3) * 3.2,
        hot: h(k + 27) < 0.3 + lower * 0.18, // more ignition lower down
        op: 0.05 + h(k + 41) * 0.08,
        dur: `${(5.5 + h(k + 8) * 7).toFixed(1)}s`,
        delay: `${(-h(k + 5) * 10).toFixed(2)}s`,
        rise: `${(7 + h(k + 17) * 8).toFixed(1)}s`,
      });
    }
  }
  return out;
})();

// refined streams of rising energy — organic curves fanning upward from a
// low origin, NOT a connect-the-dots diagram.
const STREAMS = [
  "M180 900 C 240 720, 200 560, 320 430 S 470 250, 430 60",
  "M60 900 C 120 700, 220 600, 210 430 S 330 220, 470 70",
  "M420 900 C 440 740, 560 690, 590 540 S 680 320, 700 120",
  "M1520 900 C 1440 720, 1500 560, 1380 440 S 1280 240, 1330 60",
  "M1180 900 C 1160 740, 1240 640, 1200 480 S 1120 280, 1160 90",
];

export default function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* deep colour wash + very faint grid for texture */}
      <div className="absolute inset-0 bg-radial" />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />

      {/* spotlight cone from the top, behind the headline */}
      <div
        className="absolute inset-x-0 top-0 h-[75%] bg-[linear-gradient(180deg,rgba(60,170,225,0.22),rgba(60,170,225,0.06)_40%,transparent_75%)]"
        style={{ clipPath: "polygon(34% 0, 66% 0, 96% 100%, 4% 100%)" }}
      />

      {/* lit stage behind the headline */}
      <div
        className="anim-breathe absolute left-1/2 top-[40%] h-[36rem] w-[58rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(60,165,220,0.2),transparent_70%)]"
        style={{ ["--dur" as string]: "9s" }}
      />

      {/* the "source" — a broad soft glow rising from the lower field */}
      <div
        className="glow glow-strong anim-breathe absolute -bottom-56 left-1/2 h-[52rem] w-[80rem] max-w-[130vw] -translate-x-1/2 rounded-[50%]"
        style={{ ["--dur" as string]: "17s" }}
      />
      <div
        className="glow anim-breathe absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full"
        style={{ ["--dur" as string]: "21s", ["--glow-c" as string]: "rgba(60,165,220,0.28)" }}
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="hb-clear-grad" cx="51%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="50%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </radialGradient>
          <mask id="hb-clear">
            <rect width={W} height={H} fill="url(#hb-clear-grad)" />
          </mask>

          <linearGradient id="hb-stream" x1="0" y1="1" x2="0.15" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--accent-bright)" stopOpacity="0.55" />
          </linearGradient>

          <filter id="hb-soft" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* slow orbit rings — a refined, futuristic signature */}
        <g opacity="0.5" style={{ transformBox: "view-box", transformOrigin: "800px 440px" } as object}>
          <circle
            cx="800"
            cy="440"
            r="540"
            fill="none"
            stroke="var(--hairline-bright)"
            strokeWidth="1.25"
            strokeDasharray="760 3000"
            className="spin-slow"
            style={{ ["--dur" as string]: "240s", transformBox: "view-box", transformOrigin: "800px 440px" } as object}
          />
          <circle
            cx="800"
            cy="440"
            r="700"
            fill="none"
            stroke="var(--hairline)"
            strokeWidth="1"
            strokeDasharray="520 4000"
            className="spin-rev"
            style={{ ["--dur" as string]: "320s", transformBox: "view-box", transformOrigin: "800px 440px" } as object}
          />
        </g>

        <g mask="url(#hb-clear)">
          {/* rising energy streams */}
          {STREAMS.map((d, i) => (
            <g key={`s${i}`}>
              <path
                d={d}
                fill="none"
                stroke="url(#hb-stream)"
                strokeWidth={1.6 + (i % 2) * 0.8}
                className="dash-flow"
                style={{ ["--dur" as string]: `${24 + i * 5}s` }}
              />
              <circle r="3.6" fill="var(--accent-bright)" className="hb-pulse" filter="url(#hb-soft)">
                <animateMotion dur={`${10 + i * 2}s`} begin={`${i * 1.7}s`} repeatCount="indefinite" path={d} />
                <animate
                  attributeName="opacity"
                  dur={`${10 + i * 2}s`}
                  begin={`${i * 1.7}s`}
                  repeatCount="indefinite"
                  values="0;0.95;0.95;0"
                  keyTimes="0;0.1;0.8;1"
                />
              </circle>
            </g>
          ))}

          {/* scattered points — dormant, with a portion ignited and drifting up */}
          {DOTS.map((n, i) => (
            <g
              key={`d${i}`}
              className={n.hot ? "anim-float" : undefined}
              style={n.hot ? ({ ["--dur" as string]: n.rise, animationDelay: n.delay } as object) : undefined}
            >
              {n.hot && (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r * 3.6}
                  fill="var(--accent-bright)"
                  className="anim-breathe"
                  style={{ ["--o" as string]: 0.1, ["--dur" as string]: n.dur, animationDelay: n.delay } as object}
                  opacity={0.1}
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.hot ? "var(--accent-bright)" : "#d3e5f4"}
                className={n.hot ? "anim-breathe" : undefined}
                style={
                  n.hot
                    ? ({ ["--o" as string]: 0.55, ["--dur" as string]: n.dur, animationDelay: n.delay } as object)
                    : undefined
                }
                opacity={n.hot ? 0.9 : n.op}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* cinematic framing: calm right edge, top + bottom vignette, page fade */}
      <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-bg/60 via-bg/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(130%_110%_at_50%_-10%,transparent_55%,rgba(0,0,0,0.55))]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
