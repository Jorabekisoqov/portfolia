"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (
        scrolled + windowHeight > elementTop &&
        scrolled < elementTop + elementHeight
      ) {
        const yPos = -(scrolled - elementTop) * speed;
        animate(sectionRef.current, {
          translateY: yPos,
          duration: 0,
          ease: "linear",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}

