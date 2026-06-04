import { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function RevealOnScroll({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, revealed } = useScrollReveal(0.05);
  return (
    <div ref={ref} className={`${className} ${revealed ? "animate-fade-in-up" : "opacity-0"}`}>
      {children}
    </div>
  );
}
