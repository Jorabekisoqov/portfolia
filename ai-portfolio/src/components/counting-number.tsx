"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";

interface CountingNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
}

export function CountingNumber({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
  decimals = 0,
}: CountingNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const animatedRef = useRef(false);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numberRef.current || animatedRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;

            const animTarget = { value: 0 };
            animate(animTarget, {
              value: end,
              duration,
              ease: "outExpo",
              update: function (anim) {
                const val = animTarget.value;
                setDisplayValue(parseFloat(val.toFixed(decimals)));
              },
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => {
      if (numberRef.current) {
        observer.unobserve(numberRef.current);
      }
    };
  }, [end, duration, decimals]);

  return (
    <span ref={numberRef} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

