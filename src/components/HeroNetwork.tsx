import type { CSSProperties } from "react";

/**
 * Hero backdrop: a connected-systems mesh instead of scattered noise.
 *
 * A faint field of nodes linked by thin edges, a few data points drifting
 * along those edges, a barely-there tech grid, soft radial depth glows and a
 * slow-turning HUD dial on the right (the circular element kept from the
 * earlier backdrop, now with a glow and an inner counter-rotating ring).
 * Everything is low-contrast and masked to a ring so it frames the headline
 * without ever competing with it.
 *
 * The mesh is generated once at module load from a fixed seed, so server and
 * client render identical markup (no hydration mismatch). All motion is CSS
 * (see .hn-* in globals.css) and respects prefers-reduced-motion.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VW = 1200;
const VH = 680;

const DIAL = { cx: 985, cy: 70 };

type Node = {
  x: number;
  y: number;
  r: number;
  o: number;
  bright: boolean;
  dur: string;
  delay: string;
};

type Edge = { a: number; b: number; o: number; len: number };

const { NODES, EDGES, PULSES, FAR } = (() => {
  const rand = mulberry32(20260828);

  const nodes: Node[] = [];

  // A few anchors that tie the right-hand dial into the mesh, then a scatter.
  const anchors: [number, number][] = [
    [846, 150],
    [928, 232],
    [1052, 168],
    [140, 470],
    [70, 250],
  ];
  for (const [x, y] of anchors) {
    nodes.push({
      x,
      y,
      r: 2.6 + rand() * 1.2,
      o: 0.24 + rand() * 0.1,
      bright: true,
      dur: `${(4.5 + rand() * 3).toFixed(2)}s`,
      delay: `-${(rand() * 6).toFixed(2)}s`,
    });
  }

  const SCATTER = 20;
  for (let i = 0; i < SCATTER; i++) {
    const bright = rand() > 0.68;
    nodes.push({
      x: 44 + rand() * (VW - 88),
      y: 26 + rand() * (VH - 52),
      r: bright ? 2.3 + rand() * 1.5 : 1.3 + rand() * 1.3,
      o: bright ? 0.2 + rand() * 0.12 : 0.07 + rand() * 0.09,
      bright,
      dur: `${(4 + rand() * 3.6).toFixed(2)}s`,
      delay: `-${(rand() * 6).toFixed(2)}s`,
    });
  }

  // Edges: connect near neighbours, then keep the strongest ones.
  const all: Edge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const len = Math.hypot(dx, dy);
      if (len < 268) {
        all.push({ a: i, b: j, len, o: 0.16 * (1 - len / 268) + 0.035 });
      }
    }
  }
  all.sort((p, q) => q.o - p.o);
  const edges = all.slice(0, 34);

  // Data points travel along a spread-out handful of the longer edges.
  const pulseEdges = [...edges]
    .sort((p, q) => q.len - p.len)
    .filter((_, i) => i % 2 === 0)
    .slice(0, 6);
  const pulses = pulseEdges.map((e, i) => ({
    ...e,
    dur: `${(4.6 + i * 0.7).toFixed(2)}s`,
    delay: `-${(i * 1.4).toFixed(2)}s`,
  }));

  // Out-of-focus bokeh behind the sharp mesh, for depth.
  const far = Array.from({ length: 5 }, () => ({
    x: 80 + rand() * (VW - 160),
    y: 40 + rand() * (VH - 80),
    r: 10 + rand() * 22,
    o: 0.05 + rand() * 0.06,
  }));

  return { NODES: nodes, EDGES: edges, PULSES: pulses, FAR: far };
})();

function ringNode(angle: number, radius: number) {
  return {
    x: DIAL.cx + Math.cos(angle) * radius,
    y: DIAL.cy + Math.sin(angle) * radius,
  };
}

function dialTeeth(ro: number, ri: number, teeth: number) {
  const step = (Math.PI * 2) / teeth;
  let d = "";
  for (let t = 0; t < teeth; t++) {
    const a = t * step;
    const pts: [number, number][] = [
      [a, ro],
      [a + step * 0.34, ro],
      [a + step * 0.5, ri],
      [a + step * 0.84, ri],
    ];
    pts.forEach(([ang, r], i) => {
      const px = DIAL.cx + Math.cos(ang) * r;
      const py = DIAL.cy + Math.sin(ang) * r;
      d += `${t === 0 && i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)} `;
    });
  }
  return `${d}Z`;
}

const DIAL_ORIGIN = {
  transformBox: "view-box",
  transformOrigin: `${DIAL.cx}px ${DIAL.cy}px`,
} as CSSProperties;

export default function HeroNetwork({ className = "" }: { className?: string }) {
  const line = "150, 210, 245";
  const bright = "205, 238, 255";
  const dial = "rgba(130, 195, 240, 0.14)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{
          maskImage:
            "radial-gradient(125% 100% at 50% 30%, transparent 3%, #000 25%, #000 76%, transparent 104%)",
          WebkitMaskImage:
            "radial-gradient(125% 100% at 50% 30%, transparent 3%, #000 25%, #000 76%, transparent 104%)",
        }}
      >
        <defs>
          <radialGradient id="hn-dial-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(43, 147, 201, 0.22)" />
            <stop offset="1" stopColor="rgba(43, 147, 201, 0)" />
          </radialGradient>
          <radialGradient id="hn-focus-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(110, 201, 232, 0.12)" />
            <stop offset="1" stopColor="rgba(110, 201, 232, 0)" />
          </radialGradient>
          <pattern
            id="hn-grid"
            width="46"
            height="46"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M46 0H0V46"
              fill="none"
              stroke={`rgba(${line}, 0.05)`}
              strokeWidth={1}
            />
          </pattern>
          <filter id="hn-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* barely-there tech grid */}
        <rect width={VW} height={VH} fill="url(#hn-grid)" opacity={0.7} />

        {/* radial depth glows */}
        <rect
          x={DIAL.cx - 300}
          y={DIAL.cy - 300}
          width={600}
          height={600}
          fill="url(#hn-dial-glow)"
        />
        <rect x={60} y={260} width={520} height={520} fill="url(#hn-focus-glow)" />

        {/* out-of-focus bokeh for depth */}
        <g filter="url(#hn-soft)">
          {FAR.map((f, i) => (
            <circle
              key={`f${i}`}
              cx={f.x}
              cy={f.y}
              r={f.r}
              fill={`rgba(${line}, ${f.o})`}
            />
          ))}
        </g>

        {/* the connected mesh */}
        <g>
          {EDGES.map((e, i) => (
            <line
              key={`e${i}`}
              x1={NODES[e.a].x}
              y1={NODES[e.a].y}
              x2={NODES[e.b].x}
              y2={NODES[e.b].y}
              stroke={`rgba(${line}, ${e.o.toFixed(3)})`}
              strokeWidth={1}
            />
          ))}
        </g>

        {/* data points travelling between nodes */}
        <g>
          {PULSES.map((p, i) => {
            const a = NODES[p.a];
            const b = NODES[p.b];
            return (
              <circle
                key={`p${i}`}
                r={2.1}
                cx={0}
                cy={0}
                fill={`rgba(${bright}, 0.85)`}
                className="hn-pulse"
                style={
                  {
                    offsetPath: `path('M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}')`,
                    "--dur": p.dur,
                    "--delay": p.delay,
                  } as CSSProperties
                }
              />
            );
          })}
        </g>

        <g>
          {NODES.map((n, i) => (
            <circle
              key={`n${i}`}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={`rgba(${n.bright ? bright : line}, ${n.o.toFixed(3)})`}
              className={n.bright ? "hn-node" : undefined}
              style={
                n.bright
                  ? ({ "--o": n.o, animationDuration: n.dur, animationDelay: n.delay } as CSSProperties)
                  : undefined
              }
            />
          ))}
        </g>

        {/* right-hand HUD dial - the circular element, kept and enhanced */}
        <g className="hn-dial" style={DIAL_ORIGIN}>
          <path d={dialTeeth(250, 212, 16)} fill="none" stroke={dial} strokeWidth={2} />
          <circle cx={DIAL.cx} cy={DIAL.cy} r={118} fill="none" stroke={dial} strokeWidth={2} />
          <circle cx={DIAL.cx} cy={DIAL.cy} r={14} fill={dial} />
          {[0, 1, 2, 3].map((k) => {
            const p = ringNode((Math.PI / 2) * k + 0.4, 118);
            return (
              <circle
                key={`dn${k}`}
                cx={p.x}
                cy={p.y}
                r={2.4}
                fill={`rgba(${bright}, 0.5)`}
              />
            );
          })}
        </g>
        <g className="hn-dial-inner" style={DIAL_ORIGIN}>
          <circle
            cx={DIAL.cx}
            cy={DIAL.cy}
            r={88}
            fill="none"
            stroke={`rgba(${line}, 0.12)`}
            strokeWidth={1.5}
            strokeDasharray="2 12"
          />
        </g>
      </svg>
    </div>
  );
}
