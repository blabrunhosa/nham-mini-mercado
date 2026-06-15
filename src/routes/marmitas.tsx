import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/nham/Shell";
import { marmitas, type Marmita, type MarmitaStatus } from "@/lib/nham-data";
import { Flame, Beef, Wheat, Plus, Clock, Sparkles, Bell, Check } from "lucide-react";

export const Route = createFileRoute("/marmitas")({
  head: () => ({
    meta: [
      { title: "Marmitas — Nham" },
      { name: "description", content: "Veja quais marmitas estão disponíveis agora, quantas restam e quando o próximo lote chega." },
      { property: "og:title", content: "Marmitas — Nham" },
      { property: "og:description", content: "Disponibilidade ao vivo, próximas reposições e novidades do cardápio." },
    ],
  }),
  component: MarmitasPage,
});

type Filter = "todas" | "disponiveis" | "chegando" | "novidades";

const filters: { id: Filter; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "disponiveis", label: "Disponíveis" },
  { id: "chegando", label: "Chegando" },
  { id: "novidades", label: "Novidades" },
];

function MarmitasPage() {
  const [filter, setFilter] = useState<Filter>("todas");

  const list = useMemo(() => {
    if (filter === "disponiveis") return marmitas.filter((m) => m.status === "available");
    if (filter === "chegando") return marmitas.filter((m) => m.status === "incoming");
    if (filter === "novidades") return marmitas.filter((m) => m.status === "new");
    return marmitas;
  }, [filter]);

  const available = marmitas.filter((m) => m.status === "available");
  const incoming = marmitas.filter((m) => m.status === "incoming");
  const novelties = marmitas.filter((m) => m.status === "new");

  return (
    <Shell>
      <header className="sticky top-0 z-30 glass">
        <div className="px-5 pb-3 pt-5">
          <h1 className="text-2xl font-black tracking-tight">Marmitas</h1>
          <p className="text-xs text-muted-foreground">
            Lotes limitados · sem reposição diária
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 px-5 pb-3">
          <Stat label="Disponíveis" value={available.length} tone="lime" />
          <Stat label="Chegando" value={incoming.length} tone="muted" />
          <Stat label="Novidades" value={novelties.length} tone="accent" />
        </div>

        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
          {filters.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-2xl border px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "border-lime bg-lime text-lime-foreground"
                    : "border-border bg-surface text-foreground hover:bg-surface-2"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </header>

      <section className="px-5 pt-2 pb-10">
        <div className="space-y-4">
          {list.map((m) => (
            <MarmitaCard key={m.id} m={m} />
          ))}
          {list.length === 0 && (
            <p className="rounded-2xl border border-border bg-surface p-6 text-center text-sm text-muted-foreground">
              Nada por aqui ainda. Volte em breve!
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "lime" | "muted" | "accent" }) {
  const toneClass =
    tone === "lime"
      ? "text-lime"
      : tone === "accent"
      ? "text-foreground"
      : "text-muted-foreground";
  return (
    <div className="rounded-2xl border border-border bg-surface px-3 py-2">
      <div className={`text-xl font-black leading-none ${toneClass}`}>{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function statusMeta(status: MarmitaStatus) {
  if (status === "available") return { label: "Disponível", icon: Check, cls: "bg-lime text-lime-foreground" };
  if (status === "incoming") return { label: "Chegando", icon: Clock, cls: "bg-surface-3 text-foreground" };
  return { label: "Novidade", icon: Sparkles, cls: "bg-foreground text-background" };
}

function MarmitaCard({ m }: { m: Marmita }) {
  const out = m.stock === 0;
  const low = m.stock > 0 && m.stock <= 3;
  const total = m.initialStock ?? Math.max(m.stock, 10);
  const pct = Math.max(0, Math.min(100, Math.round((m.stock / total) * 100)));
  const meta = statusMeta(m.status);
  const StatusIcon = meta.icon;

  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-lime/40">
      <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br from-surface-3 to-surface text-7xl">
        {m.image ? (
          <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <span>{m.emoji}</span>
        )}

        <span className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.cls}`}>
          <StatusIcon className="h-3 w-3" strokeWidth={2.8} />
          {meta.label}
        </span>

        {m.tag && (
          <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground backdrop-blur">
            {m.tag}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold leading-tight text-foreground">{m.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{m.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Macro icon={<Flame className="h-3 w-3" />} label={`${m.kcal} kcal`} />
          <Macro icon={<Beef className="h-3 w-3" />} label={`${m.protein}g prot`} />
          <Macro icon={<Wheat className="h-3 w-3" />} label={`${m.carbs}g carb`} />
        </div>

        {/* Disponibilidade */}
        <div className="mt-4">
          {m.status === "available" ? (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${low ? "text-orange-400" : "text-lime"}`}>
                  {m.stock} {m.stock === 1 ? "unidade" : "unidades"} disponíveis
                </span>
                <span className="text-muted-foreground">de {total}</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
                <div
                  className={`h-full rounded-full transition-all ${low ? "bg-orange-400" : "bg-lime"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-surface-2 px-3 py-2 text-xs">
              <Clock className="h-3.5 w-3.5 text-lime" />
              <span className="text-muted-foreground">Próximo lote:</span>
              <span className="font-semibold text-foreground">{m.restockAt ?? "em breve"}</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-black">R$ {m.price.toFixed(2)}</span>
          {m.status === "available" ? (
            <button
              disabled={out}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-lime px-4 py-2.5 text-sm font-bold text-lime-foreground transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-surface-3 disabled:text-muted-foreground"
            >
              <Plus className="h-4 w-4" strokeWidth={2.8} />
              Reservar
            </button>
          ) : (
            <button className="inline-flex items-center gap-1.5 rounded-2xl border border-border bg-surface-2 px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-surface-3">
              <Bell className="h-4 w-4" strokeWidth={2.6} />
              Avisar-me
            </button>
          )}
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
