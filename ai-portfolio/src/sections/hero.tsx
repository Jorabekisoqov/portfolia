"use client";

import { animate } from "animejs";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useTypewriter(text: string, speed = 45) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i += 1;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return display;
}

export function Hero() {
  const title = useTypewriter("Isoqov Jo'rabek", 55);
  const subtitle = useTypewriter(
    "AI Developer | Machine Learning Engineer",
    25
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!buttonsRef.current) return;

    const buttons = buttonsRef.current.querySelectorAll("a");

    buttons.forEach((button) => {
      const handleMouseEnter = () => {
        animate({
          targets: button,
          scale: 1.05,
          duration: 200,
          easing: "easeOutQuad",
        });
      };

      const handleMouseLeave = () => {
        animate({
          targets: button,
          scale: 1,
          duration: 200,
          easing: "easeOutQuad",
        });
      };

      const handleClick = () => {
        animate({
          targets: button,
          scale: [1, 0.95, 1],
          duration: 300,
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        button.removeEventListener("click", handleClick);
      };
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Spline background */}
      <div className="pointer-events-auto absolute inset-0 -z-10">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-NyUM8S2imVsPXsUiJgO5UZUc/"
          frameBorder="0"
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-8">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white drop-shadow md:text-6xl">
          {title}
        </h1>
        <p className="mt-3 text-lg text-cyan-300 md:text-2xl">
          {subtitle}
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-zinc-300 md:text-lg">
          Building intelligent systems that think, learn, and create.
        </p>

        <div ref={buttonsRef} className="mt-8 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-5 py-3 text-sm font-medium text-cyan-200 ring-1 ring-cyan-400/30 backdrop-blur transition hover:bg-cyan-400/25 hover:text-white hover:ring-cyan-300/50"
          >
            Explore My Work
            <ArrowRight className="transition group-hover:translate-x-0.5" size={18} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition hover:bg-white/10 hover:text-white"
          >
            Let's Build the Future
          </a>
        </div>
      </div>
    </section>
  );
}
