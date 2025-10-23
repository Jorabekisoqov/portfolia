"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "New Uzbekistan University — B.S. (Senior)",
    time: "2021 — Present",
    description:
      "Studying Computer Science with focus on AI, ML, and systems design.",
  },
  {
    title: "AI Research Intern",
    time: "2024",
    description:
      "Worked on LLM evaluation, RAG benchmarking, and tool-augmented agents.",
  },
  {
    title: "Open Source Contributor",
    time: "2023 — Present",
    description:
      "Contributed to ML tooling and Next.js developer experience in AI apps.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
      <h2 className="text-center text-3xl font-semibold text-white md:text-4xl">
        Experience & Education
      </h2>
      <div className="mt-12 relative before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-gradient-to-b before:from-cyan-400/20 before:via-white/10 before:to-violet-400/20">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className={`relative grid grid-cols-1 gap-4 md:grid-cols-2 ${
              i % 2 ? "md:justify-items-start" : "md:justify-items-end"
            }`}
          >
            <div className={`${i % 2 ? "md:col-start-2" : "md:col-start-1"} w-full md:max-w-md`}>
              <article className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300 backdrop-blur">
                <div className="absolute -left-3 top-6 hidden h-3 w-3 rounded-full bg-cyan-400 md:block" />
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-zinc-400">{item.time}</p>
                <p className="mt-2 text-sm">{item.description}</p>
              </article>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
