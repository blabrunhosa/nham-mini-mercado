import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/nham/Shell";
import { ProductCard } from "@/components/nham/ProductCard";
import { categories, marmitas } from "@/lib/nham-data";
import { useAuth, isMember } from "@/lib/auth";
import {
  Bell,
  Search,
  ShoppingBasket,
  UtensilsCrossed,
  Sparkles,
  Zap,
  MapPin,
  Flame,
  ChevronRight,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nham — Mini mercado inteligente do campus" },
      { name: "description", content: "Reserve refeições, peça snacks e acompanhe o estoque do Nham em tempo real." },
      { property: "og:title", content: "Nham" },
      { property: "og:description", content: "O mini mercado inteligente do seu campus." },
    ],
  }),
  component: Home,
});

const shortcuts = [
  { to: "/mercado", label: "Mercado", icon: ShoppingBasket, hint: "Snacks & bebidas" },
  { to: "/marmitas", label: "Marmitas", icon: UtensilsCrossed, hint: "Almoço do dia" },
  { to: "/clube", label: "Clube Nham", icon: Sparkles, hint: "Pontos & perks" },
] as const;

function Home() {
  const { session, signOut } = useAuth();
  const member = isMember(session);
  const greetName = member ? session.name.split(" ")[0] : "visitante";
  const allProducts = categories.flatMap((c) => c.subcategories.flatMap((s) => s.products));
  const bestSellers = allProducts.filter((p) => p.bestSeller).slice(0, 6);
  const promos = allProducts.filter((p) => p.badge).slice(0, 4);
  const availableNow = allProducts.filter((p) => p.stockStatus !== "out").slice(0, 8);
  const todayMeals = marmitas.slice(0, 3);

  return (
    <Shell>
      {/* Header */}
      <header className="sticky top-0 z-30 glass">
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-lime text-lime-foreground font-black text-lg">
              N
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Olá, {greetName} 👋</p>
              <p className="flex items-center gap-1 truncate text-sm font-semibold text-foreground">
                <MapPin className="h-3.5 w-3.5 text-lime" />
                Ilum
              </p>
            </div>
          </div>
          <button className="relative grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-lime" />
          </button>
        </div>

        <div className="px-5 pb-4">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 focus-within:border-lime/60">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Buscar bebida, snack, marmita..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>
      </header>

      {/* Banner Clube Nham (somente para usuários logados) */}
      {member ? (
        <section className="px-5">
          <Link
            to="/clube"
            className="relative block overflow-hidden rounded-3xl border border-lime/30 bg-gradient-to-br from-lime/25 via-surface to-surface p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1 rounded-full bg-lime/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lime">
                  <Sparkles className="h-3 w-3" /> Clube Nham
                </span>
                <h2 className="mt-2 text-2xl font-black leading-tight text-foreground">
                  Ganhe pontos a cada Nham.
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Troque por marmitas, bebidas e descontos exclusivos.
                </p>
              </div>
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-lime text-lime-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <span>Nível Prata · 1.240 pts</span>
                <span>1.500 pts → Ouro</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                <div className="h-full w-[82%] rounded-full bg-lime" />
              </div>
            </div>
          </Link>
        </section>
      ) : (
        <section className="px-5">
          <button
            onClick={signOut}
            className="flex w-full items-center gap-4 rounded-3xl border border-border bg-surface p-4 text-left"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lime-soft text-lime">
              <Sparkles className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-foreground">Modo visitante</p>
              <p className="truncate text-xs text-muted-foreground">
                Entre para acumular pontos no Clube Nham
              </p>
            </div>
            <span className="rounded-full bg-lime px-3 py-1.5 text-[11px] font-bold text-lime-foreground">
              Entrar
            </span>
          </button>
        </section>
      )}

      {/* Shortcuts */}
      <section className="mt-6 px-5">
        <div className={`grid gap-3 ${member ? "grid-cols-3" : "grid-cols-2"}`}>
          {shortcuts.filter((s) => member || s.to !== "/clube").map(({ to, label, icon: Icon, hint }) => (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-lime/40 hover:bg-surface-2"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime-soft text-lime">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="truncate text-[11px] text-muted-foreground">{hint}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promoções */}
      <section className="mt-7">
        <SectionHeader title="Promoções do dia" subtitle="Só hoje" to="/mercado" icon={<Zap className="h-4 w-4" />} />
        <div className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
          {promos.map((p) => (
            <div key={p.id} className="w-44 shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Marmitas hoje */}
      <section className="mt-7 px-5">
        <SectionHeader title="Marmitas hoje" subtitle="Garanta seu almoço!" to="/marmitas" icon={<UtensilsCrossed className="h-4 w-4" />} inline />
        <div className="mt-3 space-y-3">
          {todayMeals.map((m) => (
            <Link
              key={m.id}
              to="/marmitas"
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:bg-surface-2"
            >
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-surface-3 text-3xl">
                {m.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="truncate text-sm font-semibold text-foreground">{m.name}</h4>
                </div>
                <p className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{m.kcal} kcal</span>
                  <span>·</span>
                  <span>{m.protein}g prot</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-lime">
                    <Clock className="h-3 w-3" /> {m.stock} disp.
                  </span>
                </p>
              </div>
              <span className="text-sm font-bold text-foreground">R$ {m.price.toFixed(2)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Mais vendidos */}
      <section className="mt-7">
        <SectionHeader title="Mais vendidos" subtitle="Pelos estudantes" to="/mercado" icon={<Flame className="h-4 w-4" />} />
        <div className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
          {bestSellers.map((p) => (
            <div key={p.id} className="w-40 shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Disponível agora */}
      <section className="mt-7 px-5">
        <SectionHeader title="Disponível agora" subtitle="Estoque em tempo real" to="/mercado" inline />
        <div className="mt-3 grid grid-cols-2 gap-3">
          {availableNow.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </Shell>
  );
}

function SectionHeader({
  title,
  subtitle,
  to,
  icon,
  inline,
}: {
  title: string;
  subtitle?: string;
  to: string;
  icon?: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <div className={`flex items-end justify-between ${inline ? "" : "px-5"}`}>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lime">{icon}</span>}
          <h3 className="text-lg font-black text-foreground">{title}</h3>
        </div>
        {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
      </div>
      <Link to={to} className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-lime">
        Ver tudo <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
