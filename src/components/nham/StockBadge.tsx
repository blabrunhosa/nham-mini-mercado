import type { Stock } from "@/lib/nham-data";

export function StockBadge({ status, stock }: { status: Stock; stock: number }) {
  if (status === "out") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-danger/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-danger">
        <span className="h-1.5 w-1.5 rounded-full bg-danger" /> Esgotado
      </span>
    );
  }
  if (status === "low") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning">
        <span className="h-1.5 w-1.5 rounded-full bg-warning" /> Restam {stock}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-success">
      <span className="h-1.5 w-1.5 rounded-full bg-success" /> Em estoque
    </span>
  );
}
