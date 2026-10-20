"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  /** Cover photographs, cycled. One is fine. */
  imageSlides: string[];
  /** What the cheapest job in this trade starts at, already formatted. */
  startsAt: string;
  href: string;
  /** Straight to this trade's calendar. Omitted for I.T., which is quoted. */
  bookHref?: string;
  /** Button text. Explicit, because lower-casing the title broke "DIY bay". */
  bookLabel?: string;
  priority?: boolean;
}

const SLIDESHOW_INTERVAL_MS = 6000;

/**
 * A service card.
 *
 * What came out: the category icon in a glowing rounded square, the uppercase
 * tag pill over the photo, the "Learn more →" row, and the fade-up-on-scroll.
 * A generic glyph of a car tells a customer nothing they did not get from the
 * word "Auto Repair", and an arrow after a link that is already a link is
 * decoration standing where information should be.
 *
 * What went in: the price the trade starts at, and a direct line to its
 * calendar. Those are the two questions someone opens this page with.
 */
export function ServiceCard({
  title,
  description,
  imageSlides,
  startsAt,
  href,
  bookHref,
  bookLabel,
  priority = false,
}: ServiceCardProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (imageSlides.length <= 1) return;
    const timer = setInterval(
      () => setSlideIndex((prev) => (prev + 1) % imageSlides.length),
      SLIDESHOW_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [imageSlides.length]);

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-[var(--rule)] bg-[var(--surface-elevated)]">
      <Link href={href} className="relative block h-40 w-full overflow-hidden sm:h-44">
        {imageSlides.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt=""
            fill
            className={`object-cover transition-opacity duration-700 ${i === slideIndex ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            quality={75}
            priority={priority && i === 0}
          />
        ))}
      </Link>

      <div className="flex flex-1 flex-col border-t border-[var(--rule)] p-4 sm:p-5">
        <h3 className="text-[1.0625rem] font-semibold text-[var(--ink)]">
          <Link href={href} className="hover:underline underline-offset-4">
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-[1.55] text-[var(--ink)]">{description}</p>

        <p className="mt-3 text-sm text-[var(--ink)]">
          <span className="figure text-base text-[var(--ink)]">{startsAt}</span>
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
          {bookHref ? (
            <Link href={bookHref} className="btn-primary card-action">
              {bookLabel ?? `Book ${title}`}
            </Link>
          ) : (
            <Link href="/quote" className="btn-primary card-action">
              Get a price
            </Link>
          )}
          <Link href={href} className="btn-outline card-action">
            Prices
          </Link>
        </div>
      </div>
    </article>
  );
}
