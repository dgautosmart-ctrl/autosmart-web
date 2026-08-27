"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { Service } from "@/data/services";

const ICONS: Record<Service["icon"], ReactNode> = {
  marketing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 11v2a1 1 0 0 0 1 1h3l4.5 4a1 1 0 0 0 1.5-.85V6.85A1 1 0 0 0 11.5 6L7 10H4a1 1 0 0 0-1 1z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 9a3.5 3.5 0 0 1 0 6M19.5 6.5a7 7 0 0 1 0 11" />
    </svg>
  ),
  systems: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <ellipse cx="12" cy="5.5" rx="7" ry="3" />
      <path strokeLinecap="round" d="M5 5.5v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
      <path strokeLinecap="round" d="M5 11.5v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </svg>
  ),
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h9a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 15l3 3-3 3M7 3 4 6l3 3" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7" />
    </svg>
  ),
};

export default function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-brand-navy/10 bg-gradient-to-b from-white to-brand-offwhite/50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-blue/15"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-gradient-to-l from-brand-blue to-brand-cyan transition-transform duration-300 group-hover:scale-x-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rounded-full bg-brand-cyan/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-cyan/20"
      />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-md shadow-brand-blue/30 transition-transform duration-300 group-hover:scale-110">
        {ICONS[service.icon]}
      </div>
      <h3 className="relative text-lg font-semibold text-brand-navy">{service.title}</h3>
      <p className="relative text-sm leading-relaxed text-brand-navy/70">{service.description}</p>
    </motion.div>
  );
}
