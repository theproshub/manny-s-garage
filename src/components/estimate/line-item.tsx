export type LineItem = {
  /** Shop job code, e.g. "A-110". Appears to customers. */
  code: string;
  description: string;
  /** Unit or qualifier: "per axle", "per inch", "per hour". */
  spec?: string;
  /** null renders as "quoted" — used where price depends on the job. */
  price: number | null;
  note?: string;
  href?: string;
};

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}
