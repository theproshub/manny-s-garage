"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedCardProps {
  title: string;
  description: string;
  /** Single cover image (used when imageSlides is not provided) */
  imageSrc?: string;
  /** Multiple images for cover slideshow; takes precedence over imageSrc */
  imageSlides?: string[];
  icon: React.ReactNode;
  tag?: string;
  href?: string;
  delay?: number;
}

const SLIDESHOW_INTERVAL_MS = 4500;

export function AnimatedCard({
  title,
  description,
  imageSrc,
  imageSlides,
  icon,
  tag,
  href,
  delay = 0,
}: AnimatedCardProps) {
  const slides = imageSlides?.length ? imageSlides : imageSrc ? [imageSrc] : [];
  const [slideIndex, setSlideIndex] = useState(0);
  const currentSlide = slides[slideIndex % slides.length];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  const content = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--surface-elevated)]/80 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-950/15 cursor-pointer"
    >
      <div className="relative h-40 w-full overflow-hidden sm:h-48 lg:h-44">
        <AnimatePresence mode="wait" initial={false}>
          {currentSlide && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${currentSlide})` }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        {tag && (
          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <span className="rounded-md bg-black/50 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-orange-300 ring-1 ring-white/10 backdrop-blur-sm sm:text-xs">
              {tag}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/25 ring-1 ring-orange-400/40 text-orange-300 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/35 group-hover:text-white sm:bottom-4 sm:left-4 sm:h-11 sm:w-11 [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5">
          {icon}
        </div>
      </div>
      <div className="relative z-10 border-t border-white/[0.06] p-4 sm:p-5">
        <h3 className="text-base font-bold text-white transition-colors duration-300 group-hover:text-orange-300 sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-[1.4] text-zinc-400 sm:mt-2.5 sm:text-sm sm:leading-relaxed min-h-[2.8em] sm:min-h-[3.1em] line-clamp-2">
          {description}
        </p>
      </div>
    </motion.article>
  );

  return href ? (
    <a href={href} className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-[var(--radius-card)]">
      {content}
    </a>
  ) : content;
}
