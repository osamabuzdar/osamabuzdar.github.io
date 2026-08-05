"use client";

import { m, useScroll, useSpring } from "motion/react";

export function PageProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return <m.div className="page-progress" style={{ scaleX }} aria-hidden="true" />;
}
