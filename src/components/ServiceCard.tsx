"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { Service } from "@/data/services";

const ICONS: Record<Service["icon"], ReactNode> = {
  workflow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h9a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H8a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 15l3 3-3 3M7 3 4 6l3 3" />
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path strokeLinecap="round" d="M9 6h6a3 3 0 0 1 3 3v0M9 18h6" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-7" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
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
      className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-brand-blue/15"
    >
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
