import type { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-xl pb-28">{children}</div>
      <BottomNav />
    </div>
  );
}
