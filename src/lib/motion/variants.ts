import { motionDistance } from "@/lib/motion/constants";
import { defaultTransition, slowTransition } from "@/lib/motion/transitions";

export const fadeUp = {
  hidden: { opacity: 0, y: motionDistance.medium },
  visible: { opacity: 1, y: 0, transition: defaultTransition }
};

export const fadeDown = {
  hidden: { opacity: 0, y: -motionDistance.small },
  visible: { opacity: 1, y: 0, transition: defaultTransition }
};

export const fadeLeft = {
  hidden: { opacity: 0, x: motionDistance.large },
  visible: { opacity: 1, x: 0, transition: defaultTransition }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: slowTransition }
};

export const imageReveal = {
  hidden: { opacity: 0, clipPath: "inset(12% 0 12% 0 round 8px)" },
  visible: { opacity: 1, clipPath: "inset(0% 0 0% 0 round 8px)", transition: slowTransition }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

export const staggerItem = fadeUp;
