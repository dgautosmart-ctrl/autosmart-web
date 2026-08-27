import type { CSSProperties } from "react";

/**
 * Abstract "digital machinery" backdrop - takes its cue from data-mosaic /
 * circuitry visuals: a scattered field of small data cells, a few stray
 * binary digits, and two very faint rotating gears. Deliberately low
 * contrast and masked to a soft vignette so it never competes with content.
 * No literal imagery.
 *
 * The cell field is generated once at module load from a fixed seed, so the
 * server and client render identical markup (no hydration mismatch).
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

type Cell = {
  x: number;
  y: number;
  s: number;
  o: number;
  round: boolean;
  bright: boolean;
  flick: boolean;
  delay: string;
  digit: string | null;
};

const CELLS: Cell[] = (() => {
  const rand = mulberry32(20260827);
  const cols = 40;
  const rows = 23;
  const gw = VW / cols;
  const gh = VH / rows;
  const out: Cell[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (rand() > 0.24) continue;
      const jx = (rand() - 0.5) * gw * 0.7;
      const jy = (rand() - 0.5) * gh * 0.7;
      const s = 4 + rand() * 12;
      const bright = rand() > 0.91;
      const base = 0.035 + rand() * 0.14;
      const digit = rand() > 0.93 ? (rand() > 0.5 ? "1" : "0") : null;
      out.push({
        x: col * gw + gw / 2 + jx - s / 2,
        y: row * gh + gh / 2 + jy - s / 2,
        s,
        o: bright ? base + 0.16 : base,
        round: rand() > 0.72,
        bright,
        flick: rand() > 0.9,
        delay: `-${(rand() * 6).toFixed(2)}s`,
        digit,
      });
    }
  }
  return out;
})();

function gearPath(cx: number, cy: number, ro: number, ri: number, teeth: number) {
  const step = (Math.PI * 2) / teeth;
  let d = "";
  for (let t = 0; t < teeth; t++) {
    const a = t * step;
    const pts: [number, number][] = [
      [a, ro],
      [a + step * 0.36, ro],
      [a + step * 0.5, ri],
      [a + step * 0.86, ri],
    ];
    pts.forEach(([ang, r], i) => {
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      d += `${t === 0 && i === 0 ? "M" : "L"}${px.toFixed(1)} ${py.toFixed(1)} `;
    });
  }
  return `${d}Z`;
}

export default function TechBackdrop({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const cellBase = tone === "dark" ? "150, 210, 245" : "43, 147, 201";
  const cellBright = tone === "dark" ? "225, 242, 255" : "20, 90, 150";
  const gear = tone === "dark" ? "rgba(130, 195, 240, 0.13)" : "rgba(43, 147, 201, 0.08)";

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
            "radial-gradient(125% 95% at 50% 25%, #000 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(125% 95% at 50% 25%, #000 30%, transparent 85%)",
        }}
      >
        {/* faint rotating gears - machinery, kept abstract as thin outlines */}
        <g
          className="gear-spin"
          style={{ transformBox: "view-box", transformOrigin: "985px 70px" } as CSSProperties}
        >
          <path d={gearPath(985, 70, 250, 212, 16)} fill="none" stroke={gear} strokeWidth={2} />
          <circle cx={985} cy={70} r={118} fill="none" stroke={gear} strokeWidth={2} />
          <circle cx={985} cy={70} r={14} fill={gear} />
        </g>
        <g
          className="gear-spin-rev"
          style={{ transformBox: "view-box", transformOrigin: "150px 585px" } as CSSProperties}
        >
          <path d={gearPath(150, 585, 196, 165, 13)} fill="none" stroke={gear} strokeWidth={2} />
          <circle cx={150} cy={585} r={92} fill="none" stroke={gear} strokeWidth={2} />
          <circle cx={150} cy={585} r={12} fill={gear} />
        </g>

        {/* scattered data cells + stray binary digits */}
        <g>
          {CELLS.map((c, i) => {
            const color = c.bright ? cellBright : cellBase;
            if (c.digit) {
              const o = c.o + 0.06;
              return (
                <text
                  key={i}
                  x={c.x + c.s / 2}
                  y={c.y + c.s}
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                  fontSize={c.s * 1.6}
                  fill={`rgb(${color})`}
                  opacity={o}
                  className={c.flick ? "cell-flicker" : undefined}
                  style={
                    c.flick
                      ? ({ "--o": o, animationDelay: c.delay } as CSSProperties)
                      : undefined
                  }
                >
                  {c.digit}
                </text>
              );
            }
            return (
              <rect
                key={i}
                x={c.x}
                y={c.y}
                width={c.s}
                height={c.s}
                rx={c.round ? 1.5 : 0}
                fill={`rgb(${color})`}
                opacity={c.o}
                className={c.flick ? "cell-flicker" : undefined}
                style={
                  c.flick
                    ? ({ "--o": c.o, animationDelay: c.delay } as CSSProperties)
                    : undefined
                }
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
