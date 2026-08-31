"use client";

import { useMemo } from "react";

/**
 * Hero background: radial glow + a masked fine grid + a scatter of faint
 * customer-ID chips drifting slowly, plus two blurred navy shapes.
 * Deliberately business-technological, not sci-fi. Purely decorative.
 */
export default function HeroBackdrop() {
  const ids = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: `לקוח ${String(i * 7 + 3).padStart(3, "0")}`,
        top: `${(i * 37 + 8) % 92}%`,
        left: `${(i * 53 + 5) % 90}%`,
        dur: `${9 + (i % 5) * 2.4}s`,
        delay: `${-(i * 1.7)}s`,
        size: i % 3 === 0 ? "text-[13px]" : "text-[11px]",
        op: i % 4 === 0 ? "opacity-[0.14]" : "opacity-[0.07]",
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* deep gradient wash */}
      <div className="absolute inset-0 bg-radial" />
      {/* masked grid */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
      {/* blurred navy shapes for depth */}
      <div className="glow glow-soft anim-breathe absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full" style={{ ["--dur" as string]: "14s" }} />
      <div className="glow anim-breathe absolute -left-32 bottom-0 h-[32rem] w-[32rem] rounded-full" style={{ ["--dur" as string]: "18s", ["--glow-c" as string]: "rgba(18,58,92,0.5)" }} />
      {/* drifting customer IDs */}
      {ids.map((c) => (
        <span
          key={c.id + c.left}
          className={`anim-float absolute font-mono tracking-widest text-accent-bright ${c.size} ${c.op}`}
          style={{ top: c.top, left: c.left, ["--dur" as string]: c.dur, ["--delay" as string]: c.delay }}
        >
          {c.id}
        </span>
      ))}
      {/* a couple of single particles */}
      <span className="anim-float absolute left-[18%] top-[30%] h-1 w-1 rounded-full bg-accent-bright/60" style={{ ["--dur" as string]: "8s" }} />
      <span className="anim-float absolute left-[72%] top-[62%] h-1.5 w-1.5 rounded-full bg-accent-bright/40" style={{ ["--dur" as string]: "11s", ["--delay" as string]: "-3s" }} />
      {/* bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
