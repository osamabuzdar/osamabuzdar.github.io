"use client";

import { useEffect, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || reducedMotion) {
      if (reducedMotion) {
        const id = window.setTimeout(() => setCurrent(value), 0);
        return () => window.clearTimeout(id);
      }
      return;
    }

    let frame = 0;
    const totalFrames = 34;
    const interval = window.setInterval(() => {
      frame += 1;
      setCurrent(Math.round((value * frame) / totalFrames));
      if (frame >= totalFrames) window.clearInterval(interval);
    }, 24);

    return () => window.clearInterval(interval);
  }, [inView, reducedMotion, value]);

  return <span ref={ref}>{current}{suffix}</span>;
}
