"use client";

import { animate } from "animejs";
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

            const element = elementRef.current;
            if (!element) return;
            const el = element as HTMLElement;
            if (opacity) el.style.opacity = "0";
            el.style.transform = `translateY(${translateY}px)`;
            const easeName = easing.replace("ease", "").toLowerCase() || "outExpo";
            const animParams: any = {
              translateY: 0,
              duration,
              delay,
              ease: easeName,
            };
            if (opacity) {
              animParams.opacity = 1;
            }
            animate(element, animParams);

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

