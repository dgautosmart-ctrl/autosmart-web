"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

/**
 * A compact "connected system" sketch for the hero: one central engine with
 * campaigns, CRM, WhatsApp, Email, Sheets and AI arranged around it and
 * curved links between them. Links draw themselves in, nodes pop in, and a
 * few data points drift along the links - it stands in for "one solution
 * that ties everything together" without a literal dashboard screenshot.
 */

const VW = 800;
const VH = 380;
const CX = 400;
const CY = 188;

type Cat = {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: ReactNode;
  flowIn?: boolean;
};

const ICONS: Record<string, ReactNode> = {
  leads: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 19c0-3 2.3-5 5-5s5 2 5 5" />
      <path d="M18 8v4M16 10h4" />
    </>
  ),
  whatsapp: (
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  crm: (
    <>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  sheets: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </>
  ),
  ai: (
    <>
      <path d="M12 4l1.9 5.1L19 11l-5.1 1.9L12 18l-1.9-5.1L5 11l5.1-1.9z" />
      <path d="M18.5 15.3l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8z" />
    </>
  ),
};

const CATS: Cat[] = [
  { id: "leads", label: "לידים", x: 716, y: 188, icon: ICONS.leads, flowIn: true },
  { id: "whatsapp", label: "WhatsApp", x: 578, y: 74, icon: ICONS.whatsapp },
  { id: "email", label: "Email", x: 222, y: 74, icon: ICONS.email },
  { id: "crm", label: "CRM", x: 84, y: 188, icon: ICONS.crm },
  { id: "sheets", label: "Sheets", x: 222, y: 302, icon: ICONS.sheets },
  { id: "ai", label: "AI", x: 578, y: 302, icon: ICONS.ai },
];

const NODE_R = 26;

function linkPath(x: number, y: number, bow: number, reverse = false) {
  const dx = x - CX;
  const dy = y - CY;
  const len = Math.hypot(dx, dy) || 1;
  const px = -dy / len;
  const py = dx / len;
  const c1x = CX + dx * 0.32 + px * bow;
  const c1y = CY + dy * 0.32 + py * bow;
  const c2x = CX + dx * 0.68 + px * bow;
  const c2y = CY + dy * 0.68 + py * bow;
  const a = `${CX} ${CY}`;
  const b = `${x} ${y}`;
  const cp1 = `${c1x.toFixed(1)} ${c1y.toFixed(1)}`;
  const cp2 = `${c2x.toFixed(1)} ${c2y.toFixed(1)}`;
  return reverse
    ? `M${b} C ${cp2}, ${cp1}, ${a}`
    : `M${a} C ${cp1}, ${cp2}, ${b}`;
}

const HEX_R = 44;
const HEX_PTS = Array.from({ length: 6 }, (_, i) => {
  const a = Math.PI / 6 + (i * Math.PI) / 3;
  return [CX + Math.cos(a) * HEX_R, CY + Math.sin(a) * HEX_R] as const;
});
const HEX = HEX_PTS.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

export default function HeroMockup() {
  return (
    <Reveal className="relative mx-auto w-full max-w-3xl">
      {/* layered card behind, for depth */}
      <div
        aria-hidden
        className="absolute inset-x-8 -bottom-2 top-4 -z-10 rotate-1 rounded-[2rem] border border-white/10 bg-white/[0.03]"
      />

      <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-2xl shadow-brand-blue/25 backdrop-blur-xl sm:p-7">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="w-full"
          role="img"
          aria-label="AutoSmart כמנוע אחד שמחבר לידים, CRM, וואטסאפ, אימייל, Sheets ובינה מלאכותית"
        >
          <defs>
            <linearGradient id="hm-link" x1="0" y1="0" x2={VW} y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#2b93c9" />
              <stop offset="1" stopColor="#6ec9e8" />
            </linearGradient>
            <linearGradient id="hm-engine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7fd3ee" />
              <stop offset="1" stopColor="#2b93c9" />
            </linearGradient>
            <radialGradient id="hm-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="rgba(110, 201, 232, 0.55)" />
              <stop offset="1" stopColor="rgba(110, 201, 232, 0)" />
            </radialGradient>
            <radialGradient id="hm-nodeglow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="rgba(110, 201, 232, 0.4)" />
              <stop offset="1" stopColor="rgba(110, 201, 232, 0)" />
            </radialGradient>
          </defs>

          {/* links */}
          {CATS.map((c, i) => {
            const bow = i % 2 === 0 ? 18 : -18;
            const d = linkPath(c.x, c.y, bow);
            return (
              <motion.path
                key={`l-${c.id}`}
                d={d}
                fill="none"
                stroke="url(#hm-link)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeOpacity={0.75}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.08, ease: "easeOut" }}
              />
            );
          })}

          {/* data points travelling along the links */}
          {CATS.map((c, i) => {
            const bow = i % 2 === 0 ? 18 : -18;
            const d = linkPath(c.x, c.y, bow, c.flowIn);
            return (
              <circle
                key={`p-${c.id}`}
                r={3}
                cx={0}
                cy={0}
                fill="#e4f6ff"
                className="hm-pulse"
                style={
                  {
                    offsetPath: `path('${d}')`,
                    "--d": `${(3.8 + i * 0.5).toFixed(1)}s`,
                    "--delay": `${(1 + i * 0.6).toFixed(1)}s`,
                  } as CSSProperties
                }
              />
            );
          })}

          {/* connection ports on the engine */}
          {HEX_PTS.map(([x, y], i) => (
            <circle key={`port-${i}`} cx={x} cy={y} r={2.4} fill="rgba(223, 244, 255, 0.7)" />
          ))}

          {/* centre engine */}
          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.05 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" } as CSSProperties}
          >
            <circle cx={CX} cy={CY} r={68} fill="url(#hm-glow)" className="hm-glow" />
            <circle
              cx={CX}
              cy={CY}
              r={56}
              fill="none"
              stroke="rgba(110, 201, 232, 0.4)"
              strokeWidth={1.2}
              strokeDasharray="2 9"
              className="hm-ring"
            />
            <polygon
              points={HEX}
              fill="url(#hm-engine)"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1.5}
            />
            <g
              transform={`translate(${CX} ${CY}) scale(1.5) translate(-12 -12)`}
              fill="#ffffff"
            >
              {ICONS.ai}
            </g>
          </motion.g>

          {/* category nodes */}
          {CATS.map((c, i) => (
            <motion.g
              key={c.id}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 14,
                delay: 0.35 + i * 0.09,
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" } as CSSProperties}
            >
              <circle cx={c.x} cy={c.y} r={NODE_R + 6} fill="url(#hm-nodeglow)" className="hm-nodeglow" />
              <circle
                cx={c.x}
                cy={c.y}
                r={NODE_R}
                fill="#0e2a45"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={1.5}
              />
              <g
                transform={`translate(${c.x - 11} ${c.y - 11})`}
                fill="none"
                stroke="#6ec9e8"
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {c.icon}
              </g>
              <text
                x={c.x}
                y={c.y + NODE_R + 19}
                textAnchor="middle"
                fontSize={16}
                fontWeight={600}
                fill="rgba(245,251,254,0.95)"
                stroke="#0a2440"
                strokeWidth={4}
                paintOrder="stroke"
              >
                {c.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
    </Reveal>
  );
}
