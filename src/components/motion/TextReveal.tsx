"use client";

import { m } from "motion/react";
import { staggerContainer } from "@/lib/motion/variants";

export function TextReveal({ text, className }: { text: string; className?: string }) {
  return (
    <m.span className={className} variants={staggerContainer} initial="hidden" animate="visible" aria-label={text}>
      {text.split(" ").map((word, index) => (
        <m.span
          aria-hidden="true"
          className="text-reveal-word"
          key={`${word}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" }
          }}
        >
          {word}
        </m.span>
      ))}
    </m.span>
  );
}
