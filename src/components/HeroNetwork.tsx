import type { CSSProperties } from "react";

/**
 * Hero backdrop: a live-feeling network of connected systems.
 *
 * A dense but fine mesh of nodes and links covers the whole hero area - left
 * to right, top to bottom - in a few depth layers (blurred + faint far back,
 * crisper near the front). Over it sit a handful of "workflow" paths that
 * branch and re-join, brighter hub nodes with a soft glow, a barely-there
 * grid, radial depth glows, and the right-hand HUD dial (the circular element,
 * kept and enhanced). Data points drift along some links and paths.
 *
 * A radial mask keeps the whole thing dim behind the headline and fades it at
 * the far edges, so it reads as ambient system activity and never competes
 * with the text. The mesh is generated once at module load from a fixed seed
 * (identical markup on server and client). All motion is CSS (see .hn-* in
 * globals.css) and respects prefers-reduced-motion.
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
  hub: boolean;
  far: boolean;
  dur: string;
  delay: string;
};

type Edge = { a: number; b: number; o: number; far: boolean };
type Chain = { main: string; full: string; o: number };

const { NODES, EDGES, BACKBONE, CHAINS, PULSES, CHAIN_PULSES, FAR } = (() => {
  const rand = mulberry32(20260829);
  const nodes: Node[] = [];

  // Even full-bleed coverage: one jittered node per grid cell (most cells).
  const cols = 13;
  const rows = 8;
  const cw = VW / cols;
  const chh = VH / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rand() > 0.88) continue;
      const x = c * cw + cw / 2 + (rand() - 0.5) * cw * 0.9;
      const y = r * chh + chh / 2 + (rand() - 0.5) * chh * 0.9;
      const hub = rand() > 0.82;
      const far = !hub && rand() > 0.58;
      nodes.push({
        x: Math.max(10, Math.min(VW - 10, x)),
        y: Math.max(10, Math.min(VH - 10, y)),
        r: hub ? 2.3 + rand() * 1.5 : far ? 1 + rand() * 1.1 : 1.4 + rand() * 1.3,
        o: hub ? 0.3 + rand() * 0.14 : far ? 0.06 + rand() * 0.07 : 0.12 + rand() * 0.12,
        hub,
        far,
        dur: `${(4 + rand() * 4.5).toFixed(2)}s`,
        delay: `-${(rand() * 8).toFixed(2)}s`,
      });
    }
  }

  // Anchors that tie the right-hand dial into the mesh.
  ([[858, 152], [948, 238], [1058, 150], [902, 300]] as [number, number][]).forEach(
    ([x, y]) => {
      nodes.push({
        x,
        y,
        r: 2.6 + rand() * 1,
        o: 0.32,
        hub: true,
        far: false,
        dur: `${(5 + rand() * 3).toFixed(2)}s`,
        delay: `-${(rand() * 8).toFixed(2)}s`,
      });
    },
  );

  const count = nodes.length;

  // Fine mesh: link each node to its 2-3 nearest neighbours.
  const seen = new Set<string>();
  const edges: Edge[] = [];
  for (let i = 0; i < count; i++) {
    const near: { j: number; l: number }[] = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const l = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      near.push({ j, l });
    }
    near.sort((p, q) => p.l - q.l);
    const k = 3 + (rand() > 0.4 ? 1 : 0);
    for (let m = 0; m < k && m < near.length; m++) {
      const { j, l } = near[m];
      if (l > 258) continue;
      const a = Math.min(i, j);
      const b = Math.max(i, j);
      const key = `${a}-${b}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const far = nodes[a].far || nodes[b].far;
      edges.push({ a, b, o: (0.17 * (1 - l / 258) + 0.055) * (far ? 0.62 : 1), far });
    }
  }

  // Sparse long-haul "backbone" links between distant nodes.
  const backbone: Edge[] = [];
  for (let t = 0; t < 32 && backbone.length < 15; t++) {
    const a = Math.floor(rand() * count);
    const b = Math.floor(rand() * count);
    if (a === b) continue;
    const l = Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y);
    if (l < 280 || l > 640) continue;
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    backbone.push({ a, b, o: 0.035, far: true });
  }

  // Workflow paths: walk node-to-node, then branch off a midpoint.
  const chains: Chain[] = [];
  for (let t = 0; t < 9 && chains.length < 7; t++) {
    let cur = Math.floor(rand() * count);
    const pts: Node[] = [nodes[cur]];
    const steps = 4 + Math.floor(rand() * 3);
    for (let s = 0; s < steps; s++) {
      let best = -1;
      let bl = Infinity;
      for (let j = 0; j < count; j++) {
        if (j === cur || pts.includes(nodes[j])) continue;
        const l = Math.hypot(nodes[j].x - nodes[cur].x, nodes[j].y - nodes[cur].y);
        if (l > 45 && l < 240 && l < bl) {
          bl = l;
          best = j;
        }
      }
      if (best < 0) break;
      pts.push(nodes[best]);
      cur = best;
    }
    if (pts.length < 3) continue;
    let main = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let p = 1; p < pts.length; p++) {
      main += ` L ${pts[p].x.toFixed(1)} ${pts[p].y.toFixed(1)}`;
    }
    let full = main;
    const mid = pts[Math.floor(pts.length / 2)];
    let best = -1;
    let bl = Infinity;
    for (let j = 0; j < count; j++) {
      if (pts.includes(nodes[j])) continue;
      const l = Math.hypot(nodes[j].x - mid.x, nodes[j].y - mid.y);
      if (l > 45 && l < 210 && l < bl) {
        bl = l;
        best = j;
      }
    }
    if (best >= 0) {
      full += ` M ${mid.x.toFixed(1)} ${mid.y.toFixed(1)} L ${nodes[best].x.toFixed(1)} ${nodes[best].y.toFixed(1)}`;
    }
    chains.push({ main, full, o: 0.17 + rand() * 0.06 });
  }

  // Data points travelling along a spatial spread of links.
  const travellable = edges
    .map((e, i) => ({ e, i }))
    .filter(({ e }) => e.o > 0.06)
    .sort(
      (p, q) =>
        nodes[p.e.a].x + nodes[p.e.a].y - (nodes[q.e.a].x + nodes[q.e.a].y),
    );
  const pulses: { a: number; b: number; dur: string; delay: string }[] = [];
  const stride = Math.max(1, Math.floor(travellable.length / 17));
  for (let i = 0; i < travellable.length && pulses.length < 17; i += stride) {
    const { e } = travellable[i];
    pulses.push({
      a: e.a,
      b: e.b,
      dur: `${(3.6 + (pulses.length % 5) * 0.9).toFixed(2)}s`,
      delay: `-${(pulses.length * 0.8).toFixed(2)}s`,
    });
  }
  const chainPulses = chains.map((c, i) => ({
    d: c.main,
    dur: `${(6 + i * 0.9).toFixed(2)}s`,
    delay: `-${(i * 1.7).toFixed(2)}s`,
  }));

  // Out-of-focus bokeh behind everything, for depth.
  const far = Array.from({ length: 7 }, () => ({
    x: 60 + rand() * (VW - 120),
    y: 40 + rand() * (VH - 80),
    r: 12 + rand() * 26,
    o: 0.04 + rand() * 0.05,
  }));

  return {
    NODES: nodes,
    EDGES: edges,
    BACKBONE: backbone,
    CHAINS: chains,
    PULSES: pulses,
    CHAIN_PULSES: chainPulses,
    FAR: far,
  };
})();

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
    pts.forEach(([ang, rr], i) => {
      const px = DIAL.cx + Math.cos(ang) * rr;
      const py = DIAL.cy + Math.sin(ang) * rr;
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
            "radial-gradient(150% 132% at 50% 33%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.46) 16%, #000 36%, #000 92%, transparent 120%)",
          WebkitMaskImage:
            "radial-gradient(150% 132% at 50% 33%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.46) 16%, #000 36%, #000 92%, transparent 120%)",
        }}
      >
        <defs>
          <radialGradient id="hn-dial-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(43, 147, 201, 0.22)" />
            <stop offset="1" stopColor="rgba(43, 147, 201, 0)" />
          </radialGradient>
          <radialGradient id="hn-glow-a" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(110, 201, 232, 0.12)" />
            <stop offset="1" stopColor="rgba(110, 201, 232, 0)" />
          </radialGradient>
          <radialGradient id="hn-glow-b" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="rgba(43, 147, 201, 0.1)" />
            <stop offset="1" stopColor="rgba(43, 147, 201, 0)" />
          </radialGradient>
          <radialGradient id="hn-hub" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={`rgba(${bright}, 0.5)`} />
            <stop offset="1" stopColor={`rgba(${bright}, 0)`} />
          </radialGradient>
          <pattern id="hn-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path
              d="M44 0H0V44"
              fill="none"
              stroke={`rgba(${line}, 0.05)`}
              strokeWidth={1}
            />
          </pattern>
          <filter id="hn-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" />
          </filter>
          <filter id="hn-blur-far" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {/* barely-there tech grid */}
        <rect width={VW} height={VH} fill="url(#hn-grid)" opacity={0.75} />

        {/* radial depth glows spread across the field */}
        <rect x={DIAL.cx - 300} y={DIAL.cy - 300} width={600} height={600} fill="url(#hn-dial-glow)" />
        <rect x={-140} y={280} width={620} height={620} fill="url(#hn-glow-a)" />
        <rect x={640} y={300} width={720} height={720} fill="url(#hn-glow-b)" />
        <rect x={180} y={-200} width={560} height={560} fill="url(#hn-glow-b)" />

        {/* out-of-focus bokeh for depth */}
        <g filter="url(#hn-soft)" className="hn-far">
          {FAR.map((f, i) => (
            <circle key={`f${i}`} cx={f.x} cy={f.y} r={f.r} fill={`rgba(${line}, ${f.o})`} />
          ))}
        </g>

        {/* far mesh layer - softened, sits back */}
        <g filter="url(#hn-blur-far)">
          {BACKBONE.map((e, i) => (
            <line
              key={`bb${i}`}
              x1={NODES[e.a].x}
              y1={NODES[e.a].y}
              x2={NODES[e.b].x}
              y2={NODES[e.b].y}
              stroke={`rgba(${line}, ${e.o})`}
              strokeWidth={1}
            />
          ))}
          {EDGES.filter((e) => e.far).map((e, i) => (
            <line
              key={`ef${i}`}
              x1={NODES[e.a].x}
              y1={NODES[e.a].y}
              x2={NODES[e.b].x}
              y2={NODES[e.b].y}
              stroke={`rgba(${line}, ${e.o.toFixed(3)})`}
              strokeWidth={1}
            />
          ))}
        </g>

        {/* near mesh layer - crisp */}
        <g>
          {EDGES.filter((e) => !e.far).map((e, i) => (
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

        {/* workflow paths that branch and re-join */}
        <g>
          {CHAINS.map((c, i) => (
            <path
              key={`c${i}`}
              d={c.full}
              fill="none"
              stroke={`rgba(${bright}, ${c.o.toFixed(3)})`}
              strokeWidth={1.1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>

        {/* data points travelling along links and paths */}
        <g>
          {PULSES.map((p, i) => {
            const a = NODES[p.a];
            const b = NODES[p.b];
            return (
              <circle
                key={`p${i}`}
                r={2}
                cx={0}
                cy={0}
                fill={`rgba(${bright}, 0.9)`}
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
          {CHAIN_PULSES.map((p, i) => (
            <circle
              key={`cp${i}`}
              r={2.3}
              cx={0}
              cy={0}
              fill={`rgba(${bright}, 0.95)`}
              className="hn-pulse"
              style={
                {
                  offsetPath: `path('${p.d}')`,
                  "--dur": p.dur,
                  "--delay": p.delay,
                } as CSSProperties
              }
            />
          ))}
        </g>

        {/* nodes: plain dots, plus glowing hubs that breathe */}
        <g>
          {NODES.filter((n) => !n.hub).map((n, i) => (
            <circle
              key={`n${i}`}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={`rgba(${line}, ${n.o.toFixed(3)})`}
            />
          ))}
          {NODES.filter((n) => n.hub).map((n, i) => (
            <g key={`h${i}`}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r * 4.5}
                fill="url(#hn-hub)"
                className="hn-node"
                style={{ "--o": 0.16, animationDuration: n.dur, animationDelay: n.delay } as CSSProperties}
              />
              <circle cx={n.x} cy={n.y} r={n.r} fill={`rgba(${bright}, ${n.o.toFixed(3)})`} />
            </g>
          ))}
        </g>

        {/* right-hand HUD dial - the circular element, kept and enhanced */}
        <g className="hn-dial" style={DIAL_ORIGIN}>
          <path d={dialTeeth(250, 212, 16)} fill="none" stroke={dial} strokeWidth={2} />
          <circle cx={DIAL.cx} cy={DIAL.cy} r={118} fill="none" stroke={dial} strokeWidth={2} />
          <circle cx={DIAL.cx} cy={DIAL.cy} r={14} fill={dial} />
          {[0, 1, 2, 3].map((k) => {
            const ang = (Math.PI / 2) * k + 0.4;
            return (
              <circle
                key={`dn${k}`}
                cx={DIAL.cx + Math.cos(ang) * 118}
                cy={DIAL.cy + Math.sin(ang) * 118}
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
