"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";

export function MorphingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const shapes = containerRef.current.querySelectorAll(".morph-shape");

    // Animate positions and rotations
    shapes.forEach((shape, i) => {
      // Continuous floating animation
      anime({
        targets: shape,
        translateX: () => anime.random(-30, 30),
        translateY: () => anime.random(-30, 30),
        rotate: () => anime.random(-180, 180),
        scale: () => anime.random(0.8, 1.2),
        duration: () => anime.random(3000, 6000),
        easing: "easeInOutSine",
        loop: true,
        direction: "alternate",
        delay: i * 500,
      });

      // Opacity pulse
      anime({
        targets: shape,
        opacity: [0.1, 0.3],
        duration: () => anime.random(2000, 4000),
        easing: "easeInOutSine",
        loop: true,
        direction: "alternate",
        delay: i * 300,
      });
    });

    return () => {
      anime.remove(shapes);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden opacity-20"
    >
      {/* Animated circles */}
      <div className="morph-shape absolute left-[10%] top-[20%] h-64 w-64 rounded-full border-2 border-cyan-400/30" />
      <div className="morph-shape absolute right-[15%] top-[60%] h-48 w-48 rounded-full border-2 border-violet-400/30" />
      <div className="morph-shape absolute left-[20%] bottom-[15%] h-56 w-56 rounded-full border-2 border-blue-400/30" />
      <div className="morph-shape absolute right-[10%] top-[10%] h-32 w-32 rounded-full border-2 border-cyan-300/20" />
      <div className="morph-shape absolute left-[50%] top-[50%] h-40 w-40 rounded-full border-2 border-purple-400/20" />
    </div>
  );
}
