import Link from "next/link";

export function SignatureLine({
  href,
  label = "Book this estimate",
}: {
  href: string;
  label?: string;
}) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <section className="ledger tier-prose px-4 sm:px-6">
      <div className="rule-total flex flex-col gap-6 pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-[10rem] flex-1">
          <p className="field-label">Authorized by</p>
          <p className="figure mt-6 border-t border-[var(--rule)] pt-1 text-sm text-[var(--ink-muted)]">
            Signature
          </p>
        </div>
        <div className="min-w-[8rem]">
          <p className="field-label">Date</p>
          <p className="figure mt-6 border-t border-[var(--rule)] pt-1 text-sm">{today}</p>
        </div>
        <Link href={href} className="btn-primary">{label}</Link>
      </div>
    </section>
  );
}
