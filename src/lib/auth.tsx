import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Session =
  | { kind: "user"; email: string; name: string }
  | { kind: "guest" };

type AuthCtx = {
  ready: boolean;
  session: Session | null;
  signIn: (email: string) => void;
  continueAsGuest: () => void;
  signOut: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "nham.session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const persist = (s: Session | null) => {
    setSession(s);
    try {
      if (s) localStorage.setItem(KEY, JSON.stringify(s));
      else localStorage.removeItem(KEY);
    } catch {}
  };

  return (
    <Ctx.Provider
      value={{
        ready,
        session,
        signIn: (email) => {
          const name = email.split("@")[0]?.replace(/[._-]+/g, " ") || "Estudante";
          persist({ kind: "user", email, name: name.charAt(0).toUpperCase() + name.slice(1) });
        },
        continueAsGuest: () => persist({ kind: "guest" }),
        signOut: () => persist(null),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function isMember(s: Session | null): s is Extract<Session, { kind: "user" }> {
  return s?.kind === "user";
}
