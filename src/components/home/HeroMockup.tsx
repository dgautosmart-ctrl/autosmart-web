"use client";

import { motion } from "motion/react";

const AUTOMATIONS = [
  "טופס ליד חדש הוזן אוטומטית ל-CRM",
  "תזכורת תור נשלחה בוואטסאפ ללקוח",
  "דוח מכירות שבועי נשלח למייל",
];

const STATS = [
  { label: "משימות שרצו החודש", value: "412" },
  { label: "שעות עבודה שנחסכו", value: "72" },
];

export default function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-3xl"
    >
      {/* floating badge */}
      <motion.div
        initial={{ opacity: 0, y: -10, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute -top-5 right-4 z-20 hidden items-center gap-2 rounded-full border border-white/15 bg-brand-navy/90 px-4 py-2 text-xs font-semibold text-brand-cyan shadow-lg shadow-brand-blue/20 backdrop-blur-xl sm:right-10 sm:flex"
      >
        <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse-dot" />
        אוטומציה בזמן אמת
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
                בוקר טוב 👋 הנה סקירת האוטומציות שלכם
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
              <span>צמצום עבודה ידנית</span>
              <span className="font-semibold text-brand-navy">78%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-brand-navy/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "78%" }}
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
  );
}
