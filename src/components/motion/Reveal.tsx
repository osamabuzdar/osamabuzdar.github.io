"use client";

import { m } from "motion/react";
import { fadeUp } from "@/lib/motion/variants";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = m[as];

  return (
    <Component
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
