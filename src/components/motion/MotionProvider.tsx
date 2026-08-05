"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { defaultTransition } from "@/lib/motion/transitions";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user" transition={defaultTransition}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
