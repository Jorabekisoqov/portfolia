"use client";

import anime from "animejs";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "NeuroRAG",
    description: "Retrieval-augmented generation pipeline with hybrid search, reranking, and tool-use.",
    stack: ["Next.js", "TypeScript", "Python", "LangChain"],
    github: "https://github.com/isoqovjorabek2",
    demo: "https://example.com",
  },
  {
    title: "LLM Orchestrator",
    description: "Agentic workflow engine with memory, function-calling, and streaming UI.",
    stack: ["Next.js", "Node", "OpenAI", "Postgres"],
    github: "https://github.com/isoqovjorabek2",
    demo: "https://example.com",
  },
  {
    title: "ReinforceKit",
    description: "Reinforcement learning experiments toolkit with visualization and dashboards.",
    stack: ["Python", "PyTorch", "Weights & Biases"],
    github: "https://github.com/isoqovjorabek2",
    demo: "https://example.com",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            // Animate title
            if (titleRef.current) {
              anime({
                targets: titleRef.current,
                opacity: [0, 1],
                translateY: [-30, 0],
                duration: 800,
                easing: "easeOutExpo",
              });
            }

            // Stagger animation for cards
            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll(".project-card");
              anime({
                targets: cards,
                opacity: [0, 1],
                translateY: [60, 0],
                scale: [0.8, 1],
                duration: 1000,
                delay: anime.stagger(150, { start: 300 }),
                easing: "easeOutExpo",
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Add hover animations
  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".project-card");
    if (!cards) return;

    cards.forEach((card) => {
      const handleMouseEnter = () => {
        anime({
          targets: card,
          scale: 1.05,
          duration: 300,
          easing: "easeOutQuad",
        });
      };

      const handleMouseLeave = () => {
        anime({
          targets: card,
          scale: 1,
          duration: 300,
          easing: "easeOutQuad",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2
        ref={titleRef}
        className="text-center text-3xl font-semibold text-white md:text-4xl"
        style={{ opacity: 0 }}
      >
        Projects
      </h2>
      <div ref={cardsRef} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <article
            key={p.title}
            className="project-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300 backdrop-blur transition hover:border-cyan-400/30 hover:bg-white/10"
            style={{ opacity: 0 }}
          >
            <div className="absolute -inset-1 -z-10 rounded-3xl opacity-0 blur-2xl transition group-hover:opacity-100" style={{
              background:
                "radial-gradient(120px 80px at 20% 0%, rgba(34,211,238,0.25), transparent), radial-gradient(150px 80px at 80% 100%, rgba(99,102,241,0.25), transparent)",
            }} />
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-sm text-zinc-300">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-xs text-cyan-200"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-3 py-2 text-xs text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-400/25 hover:text-white hover:ring-cyan-300/50"
              >
                <ExternalLink size={16} /> Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
