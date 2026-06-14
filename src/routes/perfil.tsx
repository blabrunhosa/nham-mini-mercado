import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/nham/Shell";
import { Bell, CreditCard, MapPin, HelpCircle, LogOut, ChevronRight, Settings, Sparkles, LogIn, Headset } from "lucide-react";
import { useAuth, isMember } from "@/lib/auth";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Nham" },
      { name: "description", content: "Configurações, pagamentos e preferências da sua conta Nham." },
    ],
  }),
  component: Perfil,
});

const groups = [
  {
    title: "Conta",
    items: [
      { icon: CreditCard, label: "Pagamentos", hint: "PIX · Cartão" },
      { icon: MapPin, label: "Endereço do campus", hint: "Bloco A" },
      { icon: Bell, label: "Notificações" },
    ],
  },
  {
    title: "Suporte",
    items: [
      { icon: HelpCircle, label: "Central de ajuda" },
      { icon: Settings, label: "Preferências" },
    ],
  },
];

function Perfil() {
  const { session, signOut } = useAuth();
  const member = isMember(session);
  const initial = member ? session.name.charAt(0).toUpperCase() : "V";
  const name = member ? session.name : "Visitante";
  const email = member ? session.email : "Sem conta vinculada";

  return (
    <Shell>
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-black">Perfil</h1>
      </header>

      <section className="px-5">
        <div className="flex items-center gap-4 rounded-3xl border border-border bg-surface p-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-lime text-2xl font-black text-lime-foreground">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold">{name}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
            {member ? (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-lime-soft px-2 py-0.5 text-[10px] font-bold text-lime">
                <Sparkles className="h-3 w-3" /> Clube Prata · 1.240 pts
              </span>
            ) : (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-surface-3 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                Modo visitante
              </span>
            )}
          </div>
        </div>
      </section>

      {!member && (
        <section className="mt-4 px-5">
          <button
            onClick={signOut}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-lime p-4 text-sm font-bold text-lime-foreground shadow-[0_12px_30px_-12px_var(--lime)]"
          >
            <LogIn className="h-4 w-4" /> Entrar na minha conta
          </button>
        </section>
      )}

      {groups.map((g) => (
        <section key={g.title} className="mt-6 px-5">
          <h3 className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {g.title}
          </h3>
          <div className="overflow-hidden rounded-2xl border border-border bg-surface">
            {g.items.map((it, i) => (
              <button
                key={it.label}
                className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-surface-2 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-3 text-foreground">
                  <it.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{it.label}</p>
                  {it.hint && <p className="text-[11px] text-muted-foreground">{it.hint}</p>}
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>
      ))}

      <section className="mt-6 px-5">
        <button
          onClick={signOut}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface p-4 text-sm font-semibold text-danger transition-colors hover:bg-surface-2"
        >
          <LogOut className="h-4 w-4" />
          {member ? "Sair" : "Sair do modo visitante"}
        </button>
      </section>
    </Shell>
  );
}
