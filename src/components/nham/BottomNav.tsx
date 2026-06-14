import { Link, useRouterState } from "@tanstack/react-router";
import { Home, ShoppingBasket, UtensilsCrossed, Sparkles, User } from "lucide-react";

const items = [
  { to: "/", label: "Início", icon: Home },
  { to: "/mercado", label: "Mercado", icon: ShoppingBasket },
  { to: "/marmitas", label: "Marmitas", icon: UtensilsCrossed },
  { to: "/clube", label: "Clube", icon: Sparkles },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border glass">
      <ul className="mx-auto grid max-w-xl grid-cols-5 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="flex">
              <Link
                to={to}
                className={`group mx-auto flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-[11px] font-medium transition-all ${
                  active ? "text-lime" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-2xl transition-all ${
                    active ? "bg-lime text-lime-foreground shadow-[0_8px_24px_-8px_var(--lime)]" : "bg-transparent"
                  }`}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
