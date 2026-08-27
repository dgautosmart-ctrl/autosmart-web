"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const AUTOMATIONS = [
  "ליד חדש מהקמפיין נקלט אוטומטית ל-CRM",
  "הודעת המשך נשלחה ללקוח בוואטסאפ",
  "דוח מקורות לידים שבועי נשלח למייל",
];

const STATS = [
  { label: "לידים חדשים החודש", value: "128" },
  { label: "שעות עבודה שנחסכו", value: "72" },
];

const NODE_ICONS: Record<string, ReactNode> = {
  lead: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <circle cx="9" cy="8" r="3" />
      <path strokeLinecap="round" d="M4 19c0-3 2.3-5 5-5s5 2 5 5" />
      <path strokeLinecap="round" d="M18 8v4M16 10h4" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 7 9 6 9-6" />
    </svg>
  ),
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path strokeLinecap="round" d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path strokeLinecap="round" d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  sheet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-3.5 w-3.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path strokeLinecap="round" d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M19 15l.6 1.9L21.5 18l-1.9.6L19 20.5l-.6-1.9-1.9-.6 1.9-.6.6-1.9z" />
    </svg>
  ),
};

type NodeSide = "left" | "right";

const NODES: {
  id: string;
  label: string;
  icon: keyof typeof NODE_ICONS;
  side: NodeSide;
  vertical: "top" | "middle" | "bottom";
  delay: number;
}[] = [
  { id: "lead", label: "ליד מקמפיין", icon: "lead", side: "left", vertical: "top", delay: 0.5 },
  { id: "crm", label: "CRM", icon: "crm", side: "left", vertical: "middle", delay: 0.65 },
  { id: "sheet", label: "Sheets", icon: "sheet", side: "left", vertical: "bottom", delay: 0.8 },
  { id: "whatsapp", label: "WhatsApp", icon: "chat", side: "right", vertical: "top", delay: 0.55 },
  { id: "mail", label: "Email", icon: "mail", side: "right", vertical: "middle", delay: 0.7 },
  { id: "ai", label: "AI", icon: "ai", side: "right", vertical: "bottom", delay: 0.85 },
];

const VERTICAL_CLASSES: Record<string, string> = {
  top: "top-9",
  middle: "top-1/2 -translate-y-1/2",
  bottom: "bottom-9",
};

function NodeBadge({ node }: { node: (typeof NODES)[number] }) {
  const isLeft = node.side === "left";

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, x: isLeft ? -12 : 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: node.delay }}
      className={`pointer-events-none absolute hidden items-center gap-2 xl:flex ${isLeft ? "left-0" : "right-0"} ${VERTICAL_CLASSES[node.vertical]}`}
    >
      <span
        aria-hidden
        className={`h-px w-10 bg-gradient-to-r ${isLeft ? "from-transparent to-brand-cyan/60" : "from-brand-cyan/60 to-transparent"}`}
      />
      <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-brand-navy/90 py-1.5 pr-1.5 pl-3 text-[11px] font-semibold text-brand-offwhite/90 shadow-lg shadow-brand-blue/15 backdrop-blur-xl">
        {node.label}
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-brand-navy">
          {NODE_ICONS[node.icon]}
        </span>
      </span>
    </motion.div>
  );
}

export default function HeroMockup() {
  return (
    <div className="relative mx-auto max-w-3xl xl:max-w-none">
      {NODES.filter((node) => node.side === "left").map((node) => (
        <NodeBadge key={node.id} node={node} />
      ))}
      {NODES.filter((node) => node.side === "right").map((node) => (
        <NodeBadge key={node.id} node={node} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-3xl"
      >
        {/* stacked card behind the dashboard, for a layered depth effect */}
        <div
          aria-hidden
          className="absolute inset-x-5 -bottom-2 top-4 -z-10 rotate-1 rounded-3xl border border-white/10 bg-white/[0.04]"
        />

        {/* floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -10, rotate: -6 }}
          whileInView={{ opacity: 1, y: 0, rotate: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute -top-5 right-4 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-brand-navy/90 px-4 py-2 text-xs font-semibold text-brand-cyan shadow-lg shadow-brand-blue/20 backdrop-blur-xl sm:right-10 sm:flex"
        >
          <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse-dot" />
          המנוע פועל בזמן אמת
        </motion.div>

        <div className="animate-float-y rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-2 shadow-2xl shadow-brand-blue/25 backdrop-blur-xl sm:p-3">
          {/* window chrome */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-brand-offwhite/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              מחובר ופעיל
            </span>
          </div>

          {/* app surface */}
          <div className="rounded-2xl bg-brand-offwhite p-4 text-right sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-base font-bold text-brand-navy sm:text-lg">
                  בוקר טוב 👋 הנה התמונה של העסק שלכם
                </p>
                <p className="text-xs text-brand-navy/60 sm:text-sm">7 הימים האחרונים</p>
              </div>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-brand-navy/10 bg-white px-3 py-3 sm:px-4"
                >
                  <p className="text-xl font-bold text-brand-navy sm:text-2xl">{stat.value}</p>
                  <p className="text-[11px] text-brand-navy/60 sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mb-5 rounded-xl border border-brand-navy/10 bg-white px-4 py-3">
              <div className="mb-2 flex items-center justify-between text-xs text-brand-navy/70 sm:text-sm">
                <span>לידים שקיבלו מענה תוך שעה</span>
                <span className="font-semibold text-brand-navy">92%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-brand-navy/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-l from-brand-blue to-brand-cyan"
                />
              </div>
            </div>

            <ul className="space-y-2.5">
              {AUTOMATIONS.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                  className="flex items-center gap-2.5 text-xs text-brand-navy/80 sm:text-sm"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                    ✓
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
