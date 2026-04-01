"use client";

import { CountingNumber } from "./counting-number";

type StatsSectionProps = {
  projectCount: number;
  contributionsTotal: number | null;
  yearsExperience: number;
};

export function StatsSection({
  projectCount,
  contributionsTotal,
  yearsExperience,
}: StatsSectionProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 md:text-5xl">
            <CountingNumber end={Math.max(projectCount, 0)} />
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">Projects</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 md:text-5xl">
            {contributionsTotal !== null ? (
              <CountingNumber end={contributionsTotal} />
            ) : (
              <span className="text-white/60">—</span>
            )}
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">
            Contributions (last year)
          </p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 md:text-5xl">
            <CountingNumber end={Math.max(yearsExperience, 1)} suffix="+" />
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">Years on GitHub</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 md:text-5xl">
            <CountingNumber end={10} suffix="K+" />
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">Lines of Code</p>
        </div>
      </div>
    </section>
  );
}

