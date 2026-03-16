"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 sm:mb-16 ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="orbitron inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400"
      >
        {badge}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {align === "center" && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="section-title-accent mx-auto mt-4 origin-center"
        />
      )}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
