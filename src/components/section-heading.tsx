import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}

/**
 * A heading and, when there is something worth saying, one line under it.
 *
 * It used to carry a letterspaced uppercase eyebrow above the title and a
 * gradient hairline beneath it, both animating in on scroll. Neither said
 * anything: "What We Offer" above "Everything in One Place" is two labels for
 * one idea, and the rule divided nothing. They are the house style of every
 * generated page, which is exactly why they read as filler to a customer
 * trying to find out what a brake job costs.
 *
 * Headings are left-aligned by default now. Centred text is a poster move; a
 * price list is read, not admired.
 */
export function SectionHeading({
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 max-w-full sm:mb-10 ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      <h2 className="break-words text-2xl font-bold leading-[1.15] tracking-tight text-[var(--ink)] sm:text-3xl sm:leading-tight md:text-[2.5rem]">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-full text-[15px] leading-relaxed text-[var(--ink)] sm:text-base ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
