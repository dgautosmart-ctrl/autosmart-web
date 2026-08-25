"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function FloatingLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/logo.png"
          alt="AutoSmart - אוטומציה חכמה שמניעה את העסק שלך קדימה"
          width={180}
          height={180}
          priority
          className="rounded-2xl shadow-2xl shadow-brand-blue/40"
        />
      </motion.div>
    </motion.div>
  );
}
