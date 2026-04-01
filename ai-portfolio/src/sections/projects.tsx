"use client";

import { animate } from "animejs";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PortfolioProject } from "@/lib/github";

type ProjectsProps = {
  projects: PortfolioProject[];
};

export function Projects({ projects }: ProjectsProps) {
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
              if (titleRef.current) {
                titleRef.current.style.opacity = "0";
                titleRef.current.style.transform = "translateY(-30px)";
                animate(titleRef.current, {
                  opacity: 1,
                  translateY: 0,
                  duration: 800,
                  ease: "outExpo",
                });
              }
            }

            // Stagger animation for cards
            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll(".project-card");
              Array.from(cards).forEach((card, i) => {
                const el = card as HTMLElement;
                el.style.opacity = "0";
                el.style.transform = "translateY(60px) scale(0.8)";
                animate(card, {
                  opacity: 1,
                  translateY: 0,
                  scale: 1,
                  duration: 1000,
                  delay: 300 + i * 150,
                  ease: "outExpo",
                });
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
        animate(card, {
          scale: 1.05,
          duration: 300,
          ease: "outQuad",
        });
      };

      const handleMouseLeave = () => {
        animate(card, {
          scale: 1,
          duration: 300,
          ease: "outQuad",
        });
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [projects]);

  return (
    <section ref={sectionRef} id="projects" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <h2
        ref={titleRef}
        className="text-center text-3xl font-semibold text-zinc-900 md:text-4xl dark:text-white"
        style={{ opacity: 0 }}
      >
        Projects
      </h2>
      {projects.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-600 dark:text-zinc-400">
          No public repositories loaded. Set{" "}
          <code className="rounded bg-zinc-200/80 px-1.5 py-0.5 text-cyan-800 dark:bg-white/10 dark:text-cyan-200">
            GITHUB_USERNAME
          </code>{" "}
          and check the network connection.
        </p>
      ) : null}
      <div ref={cardsRef} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article
            key={p.github}
            className="project-card group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/70 p-5 text-zinc-700 shadow-sm backdrop-blur transition hover:border-cyan-500/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:shadow-none dark:hover:border-cyan-400/30 dark:hover:bg-white/10"
            style={{ opacity: 0 }}
          >
            <div className="absolute -inset-1 -z-10 rounded-3xl opacity-0 blur-2xl transition group-hover:opacity-100" style={{
              background:
                "radial-gradient(120px 80px at 20% 0%, rgba(34,211,238,0.25), transparent), radial-gradient(150px 80px at 80% 100%, rgba(99,102,241,0.25), transparent)",
            }} />
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-cyan-600/35 bg-cyan-500/15 px-2 py-1 text-xs text-cyan-800 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-200"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 bg-zinc-100/80 px-3 py-2 text-xs text-zinc-700 transition hover:bg-zinc-200 hover:text-zinc-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <Github size={16} /> GitHub
              </a>
              {p.demo ? (
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500/15 px-3 py-2 text-xs text-cyan-800 ring-1 ring-cyan-500/40 transition hover:bg-cyan-500/25 hover:text-cyan-950 hover:ring-cyan-600/50 dark:bg-cyan-500/20 dark:text-cyan-200 dark:ring-cyan-400/30 dark:hover:bg-cyan-400/25 dark:hover:text-white dark:hover:ring-cyan-300/50"
                >
                  <ExternalLink size={16} /> Demo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
