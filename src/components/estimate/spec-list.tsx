/** A ruled inventory or note list. Specificity is the evidence. */
export function SpecList({
  heading,
  items,
}: {
  heading: string;
  items: readonly string[];
}) {
  return (
    <section className="ledger tier-prose px-4 sm:px-6">
      <h2 className="form-header text-xl">{heading}</h2>
      <ul className="measure mt-2">
        {items.map((item) => (
          <li key={item} className="rule-item py-2 text-sm">{item}</li>
        ))}
      </ul>
    </section>
  );
}
