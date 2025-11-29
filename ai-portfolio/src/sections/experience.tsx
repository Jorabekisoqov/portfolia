"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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
              animate({
                targets: titleRef.current,
                opacity: [0, 1],
                translateY: [-30, 0],
                duration: 800,
                easing: "easeOutExpo",
              });
            }

            // Stagger animation for timeline items
            if (timelineRef.current) {
              const timelineItems = timelineRef.current.querySelectorAll(".timeline-item");
              const dots = timelineRef.current.querySelectorAll(".timeline-dot");

              // Animate dots first
              animate({
                targets: dots,
                scale: [0, 1],
                opacity: [0, 1],
                duration: 600,
                delay: (el: Element, i: number) => 400 + i * 200,
                easing: "easeOutBack",
              });

              // Then animate items with alternating directions
              animate({
                targets: timelineItems,
                opacity: [0, 1],
                translateX: (el, i) => (i % 2 === 0 ? [-100, 0] : [100, 0]),
                duration: 800,
                delay: (el: Element, i: number) => 600 + i * 200,
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

  // Add hover animations for timeline items
  useEffect(() => {
    const items = timelineRef.current?.querySelectorAll(".timeline-item");
    if (!items) return;

    items.forEach((item) => {
      const handleMouseEnter = () => {
        anime({
          targets: item,
          scale: 1.05,
          translateX: (el, i) => (i % 2 === 0 ? -10 : 10),
          duration: 300,
          easing: "easeOutQuad",
        });
      };

      const handleMouseLeave = () => {
        anime({
          targets: item,
          scale: 1,
          translateX: 0,
          duration: 300,
          easing: "easeOutQuad",
        });
      };

      item.addEventListener("mouseenter", handleMouseEnter);
      item.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        item.removeEventListener("mouseenter", handleMouseEnter);
        item.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
      <h2
        ref={titleRef}
        className="text-center text-3xl font-semibold text-white md:text-4xl"
        style={{ opacity: 0 }}
      >
        Experience & Education
      </h2>
      <div
        ref={timelineRef}
        className="mt-12 relative before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-gradient-to-b before:from-cyan-400/20 before:via-white/10 before:to-violet-400/20"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={`timeline-item relative grid grid-cols-1 gap-4 md:grid-cols-2 ${
              i % 2 ? "md:justify-items-start" : "md:justify-items-end"
            }`}
            style={{ opacity: 0 }}
          >
            <div className={`${i % 2 ? "md:col-start-2" : "md:col-start-1"} w-full md:max-w-md`}>
              <article className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-zinc-300 backdrop-blur">
                <div
                  className="timeline-dot absolute -left-3 top-6 hidden h-3 w-3 rounded-full bg-cyan-400 md:block"
                  style={{ opacity: 0 }}
                />
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-zinc-400">{item.time}</p>
                <p className="mt-2 text-sm">{item.description}</p>
              </article>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
