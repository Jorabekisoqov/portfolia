"use client";

import { CountingNumber } from "./counting-number";

export function StatsSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 md:text-5xl">
            <CountingNumber end={50} suffix="+" />
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">Projects</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 md:text-5xl">
            <CountingNumber end={100} suffix="+" />
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">Contributions</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-cyan-400 md:text-5xl">
            <CountingNumber end={5} suffix="+" />
          </div>
          <p className="mt-2 text-sm text-zinc-400 md:text-base">Years Experience</p>
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

