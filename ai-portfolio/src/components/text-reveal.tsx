"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  duration = 1000,
  stagger = 50,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            const chars = containerRef.current?.querySelectorAll(".char");
            if (chars) {
              Array.from(chars).forEach((char, i) => {
                const el = char as HTMLElement;
                el.style.opacity = "0";
                el.style.transform = "translateY(50px) rotateX(-90deg)";
                animate(char, {
                  opacity: 1,
                  translateY: 0,
                  rotateX: 0,
                  duration,
                  delay: delay + i * stagger,
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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [delay, duration, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ opacity: 0 }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

