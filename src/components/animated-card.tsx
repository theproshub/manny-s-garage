"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  priority?: boolean;
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
  priority = false,
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
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[var(--surface-elevated)]/80 shadow-md shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-950/10 cursor-pointer"
    >
      <div className="relative h-36 w-full overflow-hidden sm:h-42 lg:h-40">
        <AnimatePresence mode="wait" initial={false}>
          {currentSlide && (
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
            >
              <Image
                src={currentSlide}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={75}
                priority={priority && slideIndex === 0}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
        {tag && (
          <div className="absolute left-3 top-3 sm:left-3.5 sm:top-3.5">
            <span className="rounded-md bg-black/50 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-orange-300 ring-1 ring-white/10 backdrop-blur-sm sm:text-[10px]">
              {tag}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/25 ring-1 ring-orange-400/40 text-orange-300 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/35 group-hover:text-white sm:h-9 sm:w-9 [&>svg]:h-3.5 [&>svg]:w-3.5 sm:[&>svg]:h-4 sm:[&>svg]:w-4">
          {icon}
        </div>
      </div>
      <div className="relative z-10 border-t border-white/[0.06] p-3.5 sm:p-4">
        <h3 className="text-[0.95rem] font-semibold text-white transition-colors duration-300 group-hover:text-orange-300 sm:text-base">
          {title}
        </h3>
        <p className="mt-1.5 text-[11px] leading-[1.4] text-zinc-400 sm:mt-2 sm:text-xs sm:leading-relaxed min-h-[2.6em] sm:min-h-[2.8em] line-clamp-2">
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
