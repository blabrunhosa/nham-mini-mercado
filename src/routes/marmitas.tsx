import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/nham/Shell";
import { marmitas, dayLabels, type Marmita } from "@/lib/nham-data";
import { StockBadge } from "@/components/nham/StockBadge";
import { Flame, Beef, Wheat, Plus } from "lucide-react";

export const Route = createFileRoute("/marmitas")({
  head: () => ({
    meta: [
      { title: "Marmitas — Nham" },
      { name: "description", content: "Reserve sua marmita do dia no Nham. Refeições balanceadas com macros e disponibilidade ao vivo." },
      { property: "og:title", content: "Marmitas — Nham" },
      { property: "og:description", content: "Almoço pronto, sem fila." },
    ],
  }),
  component: MarmitasPage,
});

function MarmitasPage() {
  const [day, setDay] = useState<Marmita["day"]>("seg");
  const filtered = marmitas; // show all + highlight day; keep simple
  const todays = marmitas.filter((m) => m.day === day);

  return (
    <Shell>
      <header className="sticky top-0 z-30 glass">
        <div className="px-5 pb-3 pt-5">
          <h1 className="text-2xl font-black tracking-tight">Marmitas</h1>
          <p className="text-xs text-muted-foreground">Reserve agora, retire na hora do almoço</p>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
          {dayLabels.map((d) => {
            const active = d.id === day;
            return (
              <button
                key={d.id}
                onClick={() => setDay(d.id)}
                className={`flex shrink-0 flex-col items-center rounded-2xl border px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "border-lime bg-lime text-lime-foreground"
                    : "border-border bg-surface text-foreground hover:bg-surface-2"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </header>

      <section className="px-5 pt-2">
        <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
          Hoje · {todays.length} {todays.length === 1 ? "opção" : "opções"}
        </p>
        <div className="space-y-4">
          {todays.map((m) => (
            <MarmitaCard key={m.id} m={m} />
          ))}
          {todays.length === 0 && (
            <p className="rounded-2xl border border-border bg-surface p-6 text-center text-sm text-muted-foreground">
              Sem marmitas para esse dia ainda.
            </p>
          )}
        </div>

        <h3 className="mb-3 mt-8 text-base font-bold">Da semana toda</h3>
        <div className="space-y-4">
          {filtered.filter((m) => m.day !== day).map((m) => (
            <MarmitaCard key={m.id} m={m} compact />
          ))}
        </div>
      </section>
    </Shell>
  );
}

function MarmitaCard({ m, compact }: { m: Marmita; compact?: boolean }) {
  const out = m.stock === 0;
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-lime/40">
      <div className={`relative grid place-items-center overflow-hidden bg-gradient-to-br from-surface-3 to-surface ${compact ? "h-32 text-6xl" : "h-44 text-7xl"}`}>
        {m.image ? (
          <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span>{m.emoji}</span>
        )}
        {m.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-lime-foreground">
            {m.tag}
          </span>
        )}
        <span className="absolute right-3 top-3">
          <StockBadge status={out ? "out" : m.stock <= 5 ? "low" : "in"} stock={m.stock} />
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold leading-tight text-foreground">{m.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Macro icon={<Flame className="h-3 w-3" />} label={`${m.kcal} kcal`} />
          <Macro icon={<Beef className="h-3 w-3" />} label={`${m.protein}g prot`} />
          <Macro icon={<Wheat className="h-3 w-3" />} label={`${m.carbs}g carb`} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-black">R$ {m.price.toFixed(2)}</span>
          <button
            disabled={out}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-lime px-4 py-2.5 text-sm font-bold text-lime-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-muted-foreground"
          >
            <Plus className="h-4 w-4" strokeWidth={2.8} />
            Reservar
          </button>
        </div>
      </div>
    </article>
  );
}

function Macro({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-foreground">
      <span className="text-lime">{icon}</span>
      {label}
    </span>
  );
}
