import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/nham/Shell";
import { Sparkles, Crown, Gift, Coffee, UtensilsCrossed, Check, Lock, TrendingUp, LogIn } from "lucide-react";
import { useAuth, isMember } from "@/lib/auth";

export const Route = createFileRoute("/clube")({
  head: () => ({
    meta: [
      { title: "Clube Nham — Fidelidade do campus" },
      { name: "description", content: "Acumule pontos a cada compra, suba de nível e desbloqueie recompensas no Clube Nham." },
      { property: "og:title", content: "Clube Nham" },
      { property: "og:description", content: "Pontos, níveis e recompensas para quem vive o campus." },
    ],
  }),
  component: ClubePage,
});

const history = [
  { id: 1, label: "Marmita Frango Grelhado", pts: 25, when: "Hoje · 12:14" },
  { id: 2, label: "Red Bull 250ml", pts: 10, when: "Ontem · 09:32" },
  { id: 3, label: "Bônus de check-in semanal", pts: 50, when: "2 dias atrás" },
  { id: 4, label: "Combo Bis 2x", pts: 18, when: "3 dias atrás" },
];

const perksUnlocked = [
  { icon: Coffee, label: "Café grátis às segundas" },
  { icon: Gift, label: "Brinde no aniversário" },
];
const perksLocked = [
  { icon: UtensilsCrossed, label: "1 marmita grátis / mês", at: "Nível Ouro" },
  { icon: Sparkles, label: "Acesso antecipado a promoções", at: "Nível Ouro" },
  { icon: Crown, label: "Desconto fixo de 15%", at: "Nível Diamante" },
];

function ClubePage() {
  const { session, signOut } = useAuth();
  const points = 1240;
  const nextLevel = 1500;
  const pct = Math.min(100, Math.round((points / nextLevel) * 100));

  if (!isMember(session)) {
    return (
      <Shell>
        <header className="px-5 pb-4 pt-6">
          <h1 className="text-2xl font-black tracking-tight">Clube Nham</h1>
          <p className="text-xs text-muted-foreground">Disponível apenas para alunos com conta</p>
        </header>
        <section className="px-5">
          <div className="relative overflow-hidden rounded-3xl border border-lime/30 bg-gradient-to-br from-lime/25 via-surface to-surface p-6 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-lime text-lime-foreground">
              <Lock className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-xl font-black">Você está como visitante</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
              Crie sua conta ou faça login para acumular pontos, subir de nível e desbloquear marmitas e bebidas grátis.
            </p>
            <button
              onClick={signOut}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-lime px-5 py-3 text-sm font-bold text-lime-foreground shadow-[0_12px_30px_-12px_var(--lime)]"
            >
              <LogIn className="h-4 w-4" /> Entrar na minha conta
            </button>
          </div>
        </section>
        <section className="mt-6 px-5">
          <h3 className="mb-3 text-base font-bold">O que você desbloqueia</h3>
          <div className="space-y-2">
            {[...perksUnlocked, ...perksLocked.map(p => ({ icon: p.icon, label: p.label }))].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-3 text-muted-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="flex-1 text-sm font-semibold">{label}</p>
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>
      </Shell>
    );
  }


  return (
    <Shell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-black tracking-tight">Clube Nham</h1>
        <p className="text-xs text-muted-foreground">Suas compras rendendo pontos</p>
      </header>

      {/* Hero card */}
      <section className="px-5">
        <div className="relative overflow-hidden rounded-3xl border border-lime/30 bg-gradient-to-br from-lime/25 via-surface to-surface p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime text-lime-foreground">
              <Sparkles className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Nível atual</p>
              <p className="text-xl font-black">Prata</p>
            </div>
            <span className="ml-auto rounded-full bg-surface-3 px-3 py-1 text-[11px] font-semibold">
              {points} pts
            </span>
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
              <span>Faltam {nextLevel - points} pts para Ouro</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-3">
              <div className="h-full rounded-full bg-lime transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 text-center text-[11px]">
            {[
              { l: "Bronze", at: 0, active: true },
              { l: "Prata", at: 500, active: true },
              { l: "Ouro", at: 1500, active: false },
              { l: "Diamante", at: 3000, active: false },
            ].map((lv) => (
              <div key={lv.l} className="flex flex-col items-center gap-1">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ${
                    lv.active ? "bg-lime text-lime-foreground" : "bg-surface-3 text-muted-foreground"
                  }`}
                >
                  {lv.active ? <Check className="h-3.5 w-3.5" /> : <Lock className="h-3 w-3" />}
                </span>
                <span className={`font-semibold ${lv.active ? "text-foreground" : "text-muted-foreground"}`}>
                  {lv.l}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-5 grid grid-cols-3 gap-3 px-5">
        <Stat label="Pontos" value="1.240" icon={<Sparkles className="h-4 w-4" />} />
        <Stat label="Compras" value="38" icon={<TrendingUp className="h-4 w-4" />} />
        <Stat label="Economizou" value="R$ 87" icon={<Gift className="h-4 w-4" />} />
      </section>

      {/* Benefícios desbloqueados */}
      <section className="mt-7 px-5">
        <h3 className="mb-3 text-base font-bold">Benefícios desbloqueados</h3>
        <div className="space-y-2">
          {perksUnlocked.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-lime/30 bg-lime-soft p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime text-lime-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <p className="flex-1 text-sm font-semibold">{label}</p>
              <Check className="h-4 w-4 text-lime" />
            </div>
          ))}
        </div>
      </section>

      {/* Recompensas futuras */}
      <section className="mt-7 px-5">
        <h3 className="mb-3 text-base font-bold">Recompensas futuras</h3>
        <div className="space-y-2">
          {perksLocked.map(({ icon: Icon, label, at }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-3 text-muted-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{label}</p>
                <p className="text-[11px] text-muted-foreground">Desbloqueia no {at}</p>
              </div>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      {/* Histórico */}
      <section className="mt-7 px-5">
        <h3 className="mb-3 text-base font-bold">Histórico de pontos</h3>
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          {history.map((h, i) => (
            <div
              key={h.id}
              className={`flex items-center justify-between p-4 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{h.label}</p>
                <p className="text-[11px] text-muted-foreground">{h.when}</p>
              </div>
              <span className="rounded-full bg-lime-soft px-2.5 py-1 text-xs font-bold text-lime">+{h.pts}</span>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime-soft text-lime">{icon}</span>
      <p className="mt-2 text-lg font-black leading-none">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
