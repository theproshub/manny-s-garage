"use client";

import { motion } from "framer-motion";

interface AnimatedCardProps {
  title: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  tag?: string;
  href?: string;
  delay?: number;
}

export function AnimatedCard({
  title,
  description,
  imageSrc,
  icon,
  tag,
  href,
  delay = 0,
}: AnimatedCardProps) {
  const content = (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="panel-strong group relative overflow-hidden rounded-[var(--radius-card)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/25 hover:shadow-xl hover:shadow-cyan-950/25 cursor-pointer"
    >
      <div className="relative h-64 w-full overflow-hidden">
        {/* Parallax Image Zoom */}
        <motion.div
          className="h-full w-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
        
        {/* Badge */}
        {tag && (
          <div className="absolute left-5 top-5">
            <span className="cyber-badge">{tag}</span>
          </div>
        )}

        {/* Floating Icon */}
        <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/20 ring-1 ring-orange-400/30 backdrop-blur-md text-orange-300 transition-transform duration-500 group-hover:-translate-y-2 group-hover:bg-orange-500/30 group-hover:text-white">
          {icon}
        </div>
      </div>
      
      <div className="relative z-10 p-6">
        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
          {title}
        </h3>
        {/* Description reveals smoothly on hover (height auto trick) */}
        <div className="grid grid-rows-[0fr] opacity-60 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100">
          <div className="overflow-hidden">
            <p className="mt-3 text-sm leading-6 text-zinc-300">{description}</p>
          </div>
        </div>
        
        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 bg-gradient-to-r from-orange-500 via-orange-400 to-cyan-500 transition-transform duration-500 ease-out origin-left group-hover:scale-x-100" />
      </div>
    </motion.article>
  );

  return href ? (
    <a href={href} className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded-[var(--radius-card)]">
      {content}
    </a>
  ) : content;
}
