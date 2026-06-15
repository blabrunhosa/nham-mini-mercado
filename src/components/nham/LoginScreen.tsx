import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import logo from "@/assets/logo.png.png";
import { Mail, Lock, ArrowRight, UserRound } from "lucide-react";

export function LoginScreen() {
  const { signIn, continueAsGuest } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && password.length >= 4;
    if (!ok) {
      setErr("Verifique seu e-mail e senha (mín. 4 caracteres).");
      return;
    }
    signIn(email.trim());
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--lime) 0%, transparent 60%)" }}
      />
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-16">
        <div className="flex flex-col items-center text-center">
          <div className="grid h-28 w-28 place-items-center rounded-[2rem] bg-white p-4 shadow-[0_20px_60px_-20px_var(--lime)]">
            <img src={logo} alt="NHAM" className="h-full w-full object-contain"/>
          </div>
          <h1 className="mt-8 font-display text-3xl font-black tracking-tight">
            Bem-vindo ao Nham
          </h1>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Mini-mercado inteligente do seu campus. Entre para acumular pontos no Clube NHAM!.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 space-y-3">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 focus-within:border-lime/60">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <input
              type="email"
              autoComplete="email"
              placeholder="seu@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3.5 focus-within:border-lime/60">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>

          {err && (
            <p className="rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-xs text-danger">
              {err}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-sm font-bold text-lime-foreground shadow-[0_12px_30px_-12px_var(--lime)] transition-transform active:scale-[0.98]"
          >
            Entrar <ArrowRight className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Esqueci minha senha
          </button>
        </form>

        <div className="my-7 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            ou
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          onClick={continueAsGuest}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-4 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
        >
          <UserRound className="h-4 w-4" />
          Entrar como visitante
        </button>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          No modo visitante, o Clube Nham fica indisponível.
        </p>

        <p className="mt-auto pt-10 text-center text-[11px] text-muted-foreground">
          Ao continuar você aceita os Termos e a Política de Privacidade do Nham.
        </p>
      </div>
    </div>
  );
}
