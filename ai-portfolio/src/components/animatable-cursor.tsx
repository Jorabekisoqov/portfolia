"use client";

import { createAnimatable, utils } from "animejs";
import { useEffect, useRef } from "react";

export function AnimatableCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const animatableRef = useRef<ReturnType<typeof createAnimatable> | null>(null);

  useEffect(() => {
    if (!squareRef.current || !containerRef.current) return;

    // Initialize the animatable with smooth animation settings
    const animatableSquare = createAnimatable(squareRef.current, {
      x: 500, // 500ms duration for x animation
      y: 500, // 500ms duration for y animation
      ease: "out(3)", // Smooth easing function
    });

    // Set initial position to center (0, 0)
    animatableSquare.x(0);
    animatableSquare.y(0);

    animatableRef.current = animatableSquare;

    const container = containerRef.current;
    let bounds = container.getBoundingClientRect();

    const refreshBounds = () => {
      bounds = container.getBoundingClientRect();
    };

    const onMouseMove = (e: MouseEvent) => {
      const { width, height, left, top } = bounds;
      const hw = width / 2;
      const hh = height / 2;
      
      // Calculate relative position from center
      const x = utils.clamp(e.clientX - left - hw, -hw, hw);
      const y = utils.clamp(e.clientY - top - hh, -hh, hh);

      // Animate to the new position smoothly
      animatableSquare.x(x);
      animatableSquare.y(y);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", refreshBounds);
    window.addEventListener("scroll", refreshBounds);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", refreshBounds);
      window.removeEventListener("scroll", refreshBounds);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0">
      <div
        ref={squareRef}
        className="absolute left-1/2 top-1/2 h-8 w-8 rounded-full bg-cyan-400/40 shadow-lg shadow-cyan-400/50 ring-2 ring-cyan-300/30 backdrop-blur-sm transition-opacity duration-300"
        style={{
          willChange: "transform",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}

