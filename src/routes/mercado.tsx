import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/nham/Shell";
import { ProductCard } from "@/components/nham/ProductCard";
import { categories } from "@/lib/nham-data";
import {
  Search,
  CupSoda,
  Cookie,
  Candy,
  Snowflake,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/mercado")({
  head: () => ({
    meta: [
      { title: "Mercado — Nham" },
      { name: "description", content: "Bebidas, snacks, doces, refrigerados e itens de higiene com estoque ao vivo." },
      { property: "og:title", content: "Mercado — Nham" },
      { property: "og:description", content: "Tudo do mini mercado do campus, sem fila." },
    ],
  }),
  component: Mercado,
});

const iconMap: Record<string, LucideIcon> = {
  CupSoda,
  Cookie,
  Candy,
  Snowflake,
  HeartPulse,
};

function Mercado() {
  const [activeCat, setActiveCat] = useState(categories[0].id);
  const [query, setQuery] = useState("");

  const category = categories.find((c) => c.id === activeCat)!;

  const filteredSubs = useMemo(() => {
    if (!query.trim()) return category.subcategories;
    const q = query.toLowerCase();
    return category.subcategories
      .map((s) => ({ ...s, products: s.products.filter((p) => p.name.toLowerCase().includes(q)) }))
      .filter((s) => s.products.length > 0);
  }, [category, query]);

  return (
    <Shell>
      <header className="sticky top-0 z-30 glass">
        <div className="px-5 pb-3 pt-5">
          <h1 className="text-2xl font-black tracking-tight">Mercado</h1>
          <p className="text-xs text-muted-foreground">Tudo do mini mercado, em tempo real</p>
        </div>
        <div className="px-5 pb-3">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 focus-within:border-lime/60">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        {/* Category tabs */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
          {categories.map((c) => {
            const Icon = iconMap[c.icon] ?? Cookie;
            const active = c.id === activeCat;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl border px-3.5 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "border-lime bg-lime text-lime-foreground"
                    : "border-border bg-surface text-foreground hover:bg-surface-2"
                }`}
              >
                <Icon className="h-4 w-4" />
                {c.name}
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-5 pt-2">
        <div className="rounded-2xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Categoria</p>
          <h2 className="mt-0.5 text-xl font-black">{category.name}</h2>
          <p className="text-xs text-muted-foreground">{category.blurb}</p>
        </div>
      </div>

      {filteredSubs.map((sub) => (
        <section key={sub.id} className="mt-6 px-5">
          <div className="mb-3 flex items-center gap-3">
            <h3 className="text-base font-bold text-foreground">{sub.name}</h3>
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11px] text-muted-foreground">{sub.products.length} itens</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sub.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ))}

      {filteredSubs.length === 0 && (
        <div className="px-5 pt-10 text-center text-sm text-muted-foreground">
          Nada encontrado para "{query}".
        </div>
      )}
    </Shell>
  );
}
