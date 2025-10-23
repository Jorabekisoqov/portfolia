"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl font-semibold text-white md:text-4xl">About Me</h2>
          <p className="mt-4 text-zinc-300">
            I’m a software developer passionate about building intelligent systems. My work focuses on creating AI models — from large language models (LLMs) and retrieval-augmented generation (RAG) architectures to machine learning frameworks driven by reinforcement learning.
          </p>
          <p className="mt-4 text-zinc-300">
            I have a strong foundation in calculus, physics, probability, statistics, and linear algebra, which allows me to approach AI not just as a coder, but as a scientist.
          </p>
          <p className="mt-4 text-zinc-300">
            Currently, I’m a senior student at New Uzbekistan University, constantly expanding my understanding of how machines learn and reason. My goal is simple: to push the boundaries of intelligence through code, and to keep learning, building, and thriving.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2"
        >
          <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent p-1 shadow-[0_0_40px_rgba(0,255,255,0.15)] backdrop-blur md:w-80">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/60">
              <div className="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.25),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.25),transparent_40%)]" />
              <div className="absolute inset-0 grid place-content-center text-6xl text-cyan-300/80">🤖</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
