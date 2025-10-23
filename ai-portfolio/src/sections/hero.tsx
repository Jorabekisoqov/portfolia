"use client";

import { motion } from "framer-motion";
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-balance text-4xl font-semibold tracking-tight text-white drop-shadow md:text-6xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mt-3 text-lg text-cyan-300 md:text-2xl"
        >
          {subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-pretty text-base text-zinc-300 md:text-lg"
        >
          Building intelligent systems that think, learn, and create.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
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
            Let’s Build the Future
          </a>
        </motion.div>
      </div>
    </section>
  );
}
