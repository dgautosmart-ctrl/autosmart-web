/**
 * Abstract "flow of information" backdrop: a light constellation of nodes
 * and connecting lines that hints at systems, connections and automation
 * moving data around - without any literal imagery. Purely decorative.
 */

type Point = readonly [number, number];

const NODES: Point[] = [
  [80, 120],
  [210, 60],
  [330, 180],
  [180, 300],
  [60, 430],
  [420, 340],
  [520, 120],
  [640, 260],
  [560, 470],
  [740, 80],
  [860, 220],
  [980, 140],
  [1080, 300],
  [900, 420],
  [760, 520],
  [1120, 470],
  [300, 520],
  [470, 610],
  [650, 620],
  [1010, 560],
];

const EDGES: Point[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 3],
  [2, 5],
  [5, 6],
  [6, 7],
  [5, 8],
  [7, 8],
  [6, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [10, 13],
  [7, 10],
  [8, 14],
  [13, 14],
  [13, 15],
  [12, 15],
  [3, 16],
  [16, 17],
  [5, 17],
  [17, 18],
  [8, 18],
  [14, 18],
  [18, 19],
  [19, 15],
];

const ACCENT = new Set([5, 10, 14]);

export default function TechBackdrop({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const line = tone === "dark" ? "rgba(110,201,232,0.45)" : "rgba(43,147,201,0.28)";
  const node = tone === "dark" ? "rgba(150,224,255,0.9)" : "rgba(43,147,201,0.55)";
  const shape = tone === "dark" ? "rgba(110,201,232,0.16)" : "rgba(43,147,201,0.1)";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        viewBox="0 0 1200 680"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{
          maskImage:
            "radial-gradient(120% 90% at 50% 30%, #000 35%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(120% 90% at 50% 30%, #000 35%, transparent 82%)",
        }}
      >
        {/* faint geometric shapes for depth */}
        <circle cx="1010" cy="120" r="230" fill="none" stroke={shape} strokeWidth="1.5" />
        <circle cx="120" cy="560" r="180" fill="none" stroke={shape} strokeWidth="1.5" />
        <rect
          x="560"
          y="-40"
          width="180"
          height="180"
          rx="24"
          fill="none"
          stroke={shape}
          strokeWidth="1.5"
          transform="rotate(18 650 50)"
        />

        {/* connections */}
        <g stroke={line} strokeWidth="1" fill="none">
          {EDGES.map(([a, b], i) => (
            <line
              key={`e${i}`}
              className="tech-line"
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              style={{ animationDelay: `${(i % 7) * -0.45}s` }}
            />
          ))}
        </g>

        {/* nodes */}
        <g fill={node}>
          {NODES.map(([x, y], i) => (
            <g key={`n${i}`}>
              {ACCENT.has(i) && (
                <circle cx={x} cy={y} r="9" fill={node} opacity="0.14" />
              )}
              <circle
                cx={x}
                cy={y}
                r={ACCENT.has(i) ? 3.4 : 2}
                className="tech-node"
                style={{ animationDelay: `${(i % 9) * -0.5}s` }}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
