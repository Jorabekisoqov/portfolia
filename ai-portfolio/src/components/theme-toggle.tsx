"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme !== "light";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white shadow-[0_0_20px_rgba(0,255,255,0.15)] backdrop-blur transition hover:shadow-[0_0_24px_rgba(0,255,255,0.35)] focus:outline-none"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/20 opacity-0 blur-md transition group-hover:opacity-100" />
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
