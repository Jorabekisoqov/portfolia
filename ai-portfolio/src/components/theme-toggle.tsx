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
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300/80 bg-white/80 text-zinc-800 shadow-sm backdrop-blur transition hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] focus:outline-none dark:border-white/10 dark:bg-black/20 dark:text-white dark:shadow-[0_0_20px_rgba(0,255,255,0.15)] dark:hover:shadow-[0_0_24px_rgba(0,255,255,0.35)]"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/20 opacity-0 blur-md transition group-hover:opacity-100" />
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
