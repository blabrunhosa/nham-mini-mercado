import type { Product } from "@/lib/nham-data";
import { StockBadge } from "./StockBadge";
import { Plus, Flame } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const out = product.stockStatus === "out";
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-3 transition-all hover:border-lime/40 hover:bg-surface-2">
      <div className="relative mb-3 grid aspect-square place-items-center overflow-hidden rounded-xl bg-surface-3 text-5xl">
        <span aria-hidden>{product.emoji}</span>
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-lime px-2 py-0.5 text-[10px] font-bold text-lime-foreground">
            {product.badge}
          </span>
        )}
        {product.bestSeller && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur">
            <Flame className="h-3 w-3 text-warning" /> Top
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <StockBadge status={product.stockStatus} stock={product.stock} />
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">{product.name}</h4>
        {product.expiresIn && (
          <p className="text-[11px] text-muted-foreground">Validade: {product.expiresIn}</p>
        )}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[11px] text-muted-foreground line-through">
                R$ {product.oldPrice.toFixed(2)}
              </span>
            )}
            <span className="text-base font-bold text-foreground">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <button
            disabled={out}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-lime text-lime-foreground transition-all hover:scale-105 disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-muted-foreground"
            aria-label="Adicionar"
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
