"use client";

import anime from "animejs";
import { useEffect, useRef } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  duration?: number;
  delay?: number;
  easing?: string;
  translateY?: number;
  opacity?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const elementRef = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);

  const {
    threshold = 0.1,
    duration = 800,
    delay = 0,
    easing = "easeOutExpo",
    translateY = 50,
    opacity = true,
  } = options;

  useEffect(() => {
    if (!elementRef.current || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            anime({
              targets: elementRef.current,
              translateY: [translateY, 0],
              opacity: opacity ? [0, 1] : undefined,
              duration,
              delay,
              easing,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, duration, delay, easing, translateY, opacity]);

  return elementRef;
}

