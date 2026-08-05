import { motionDuration } from "@/lib/motion/constants";

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const softSpring = { type: "spring", stiffness: 120, damping: 18 };

export const defaultTransition = {
  duration: motionDuration.normal,
  ease: easeOut
};

export const slowTransition = {
  duration: motionDuration.slow,
  ease: easeOut
};
