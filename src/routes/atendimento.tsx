import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/nham/Shell";
import {
  ChevronLeft,
  Star,
  AlertTriangle,
  PackageX,
  Lightbulb,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/atendimento")({
  head: () => ({
    meta: [
      { title: "Atendimento ao cliente — Nham" },
      {
        name: "description",
        content:
          "Avalie o app, registre reclamações sobre produtos e envie sugestões para o time do Nham.",
      },
    ],
  }),
  component: Atendimento,
});

type TabId = "avaliar" | "estragado" | "indisponivel" | "sugestao" | "outro";

const tabs: { id: TabId; label: string; icon: typeof Star }[] = [
  { id: "avaliar", label: "Avaliar app", icon: Star },
  { id: "estragado", label: "Produto estragado", icon: AlertTriangle },
  { id: "indisponivel", label: "Faltou em estoque", icon: PackageX },
  { id: "sugestao", label: "Sugestão", icon: Lightbulb },
  { id: "outro", label: "Outro assunto", icon: MessageSquare },
];

function Atendimento() {
  const [tab, setTab] = useState<TabId>("avaliar");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const reset = () => {
    setRating(0);
    setProduct("");
    setMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 3500);
  };

  const showProductField = tab === "estragado" || tab === "indisponivel";
  const placeholder =
    tab === "avaliar"
      ? "Conte o que você curtiu ou o que podemos melhorar..."
      : tab === "estragado"
        ? "Descreva o problema (validade, embalagem, sabor)..."
        : tab === "indisponivel"
          ? "Quando aconteceu? O app marcava como disponível?"
          : tab === "sugestao"
            ? "Qual item ou marca você gostaria de ver no Nham?"
            : "Como podemos te ajudar?";

  return (
    <Shell>
      <header className="flex items-center gap-3 px-5 pb-2 pt-6">
        <Link
          to="/perfil"
          className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground hover:bg-surface-2"
          aria-label="Voltar"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black tracking-tight">Atendimento</h1>
          <p className="text-xs text-muted-foreground">
            A gente lê tudo. Promessa NHAM!
          </p>
        </div>
      </header>

      <section className="px-5 pt-4">
        <div className="-mx-1 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-bold transition-all ${
                  active
                    ? "border-lime bg-lime text-lime-foreground shadow-[0_10px_24px_-12px_var(--lime)]"
                    : "border-border bg-surface text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>
      </section>

      {sent && (
        <section className="mx-5 mt-4 flex items-center gap-3 rounded-2xl border border-lime/40 bg-lime-soft p-4">
          <CheckCircle2 className="h-5 w-5 text-lime" />
          <div>
            <p className="text-sm font-bold text-foreground">Enviado com sucesso</p>
            <p className="text-xs text-muted-foreground">
              Nosso time vai responder em até 24h.
            </p>
          </div>
        </section>
      )}

      <form onSubmit={handleSubmit} className="px-5 pt-4">
        <div className="rounded-3xl border border-border bg-surface p-5">
          {tab === "avaliar" && (
            <div className="mb-5">
              <p className="mb-3 text-sm font-bold">Como você avalia o NHAM?</p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => {
                  const filled = (hover || rating) >= n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(n)}
                      aria-label={`${n} estrelas`}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          filled
                            ? "fill-lime text-lime"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              {rating > 0 && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {rating === 5
                    ? "Uau, valeu demais! 💚"
                    : rating >= 3
                      ? "Bora melhorar ainda mais."
                      : "Sentimos muito. Conta o que rolou abaixo."}
                </p>
              )}
            </div>
          )}

          {showProductField && (
            <div className="mb-4">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Produto
              </label>
              <input
                type="text"
                required
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Ex: Coca-Cola Lata 350ml"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium outline-none transition-colors focus:border-lime"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {tab === "sugestao" ? "Sua sugestão" : "Mensagem"}
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder}
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-lime"
            />
          </div>

          <button
            type="submit"
            disabled={tab === "avaliar" && rating === 0}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime p-4 text-sm font-bold text-lime-foreground shadow-[0_12px_30px_-12px_var(--lime)] transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Enviar
          </button>
        </div>
      </form>

      <section className="mt-6 px-5">
        <div className="rounded-2xl border border-border bg-surface-2 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Precisa de ajuda urgente?
          </p>
          <p className="mt-1 text-sm">
            Fale com a gente no WhatsApp{" "}
            <span className="font-bold text-lime">(11) 99999-NHAM</span> —
            seg a sex, 8h às 20h.
          </p>
        </div>
      </section>
    </Shell>
  );
}
