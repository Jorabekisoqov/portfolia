"use client";

import { CountingNumber } from "./counting-number";

type StatsSectionProps = {
  projectCount: number;
  contributionsTotal: number | null;
  yearsExperience: number;
  linesDisplayEnd: number;
  linesDisplaySuffix: string;
};

export function StatsSection({
  projectCount,
  contributionsTotal,
  yearsExperience,
  linesDisplayEnd,
  linesDisplaySuffix,
}: StatsSectionProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-600 md:text-5xl dark:text-cyan-400">
            <CountingNumber end={Math.max(projectCount, 0)} />
          </div>
          <p className="mt-2 text-sm text-zinc-600 md:text-base dark:text-zinc-400">
            Projects
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-600 md:text-5xl dark:text-cyan-400">
            {contributionsTotal !== null ? (
              <CountingNumber end={contributionsTotal} />
            ) : (
              <span className="text-zinc-400 dark:text-white/60">—</span>
            )}
          </div>
          <p className="mt-2 text-sm text-zinc-600 md:text-base dark:text-zinc-400">
            Contributions (last year)
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-600 md:text-5xl dark:text-cyan-400">
            <CountingNumber end={Math.max(yearsExperience, 1)} suffix="+" />
          </div>
          <p className="mt-2 text-sm text-zinc-600 md:text-base dark:text-zinc-400">
            Years on GitHub
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-600 md:text-5xl dark:text-cyan-400">
            {linesDisplayEnd > 0 ? (
              <CountingNumber
                end={linesDisplayEnd}
                suffix={linesDisplaySuffix}
              />
            ) : (
              <span className="text-zinc-400 dark:text-white/60">—</span>
            )}
          </div>
          <p className="mt-2 text-sm text-zinc-600 md:text-base dark:text-zinc-400">
            Lines of code (approx.)
          </p>
        </div>
      </div>
    </section>
  );
}

