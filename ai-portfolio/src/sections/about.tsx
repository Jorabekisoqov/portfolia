"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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
                translateX: [-50, 0],
                duration: 800,
                easing: "easeOutExpo",
              });
            }

            // Animate text paragraphs with stagger
            if (textRef.current) {
              const paragraphs = textRef.current.querySelectorAll("p");
              anime({
                targets: paragraphs,
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 800,
                delay: anime.stagger(150, { start: 300 }),
                easing: "easeOutExpo",
              });
            }

            // Animate image with scale and rotation
            if (imageRef.current) {
              anime({
                targets: imageRef.current,
                opacity: [0, 1],
                scale: [0.8, 1],
                rotate: [5, 0],
                duration: 1000,
                delay: 200,
                easing: "easeOutExpo",
              });

              // Add floating animation
              anime({
                targets: imageRef.current,
                translateY: [0, -10],
                duration: 2000,
                easing: "easeInOutSine",
                loop: true,
                direction: "alternate",
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

  return (
    <section ref={sectionRef} id="about" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div ref={textRef} className="order-2 md:order-1">
          <h2
            ref={titleRef}
            className="text-3xl font-semibold text-white md:text-4xl"
            style={{ opacity: 0 }}
          >
            About Me
          </h2>
          <p className="mt-4 text-zinc-300" style={{ opacity: 0 }}>
            I'm a software developer passionate about building intelligent systems. My work focuses on creating AI models — from large language models (LLMs) and retrieval-augmented generation (RAG) architectures to machine learning frameworks driven by reinforcement learning.
          </p>
          <p className="mt-4 text-zinc-300" style={{ opacity: 0 }}>
            I have a strong foundation in calculus, physics, probability, statistics, and linear algebra, which allows me to approach AI not just as a coder, but as a scientist.
          </p>
          <p className="mt-4 text-zinc-300" style={{ opacity: 0 }}>
            Currently, I'm a senior student at New Uzbekistan University, constantly expanding my understanding of how machines learn and reason. My goal is simple: to push the boundaries of intelligence through code, and to keep learning, building, and thriving.
          </p>
        </div>
        <div
          ref={imageRef}
          className="order-1 md:order-2"
          style={{ opacity: 0 }}
        >
          <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/20 via-transparent to-transparent p-1 shadow-[0_0_40px_rgba(0,255,255,0.15)] backdrop-blur md:w-80">
            <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/60">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.15),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.15),transparent_40%)]" />
              <img
                src="/image.png"
                alt="Profile"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
