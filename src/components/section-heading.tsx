"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
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
    <div className={`mb-8 max-w-full sm:mb-12 md:mb-16 ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {badge ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="orbitron inline-block max-w-full text-[9px] font-bold uppercase tracking-[0.2em] text-orange-400 sm:text-[10px] sm:tracking-[0.28em] md:tracking-[0.3em]"
        >
          {badge}
        </motion.p>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`break-words text-2xl font-bold leading-[1.15] tracking-tight text-white sm:text-3xl sm:leading-tight md:text-4xl lg:text-5xl ${
          badge ? "mt-3 sm:mt-4" : "mt-0"
        }`}
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
          className={`mt-4 max-w-full text-[15px] leading-relaxed text-zinc-400 sm:mt-6 sm:text-base md:text-lg ${
            align === "center" ? "mx-auto max-w-2xl px-0" : "max-w-xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
