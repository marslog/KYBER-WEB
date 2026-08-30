import type { Transition, Variants } from "framer-motion";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Confident deceleration — used across scroll reveals and hovers */
export const easeOut: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export const staggerItemReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

export function scrollRevealTransition(delay = 0, reduced = false): Transition {
  return {
    duration: reduced ? 0.2 : 0.5,
    delay,
    ease: easeOut,
  };
}

export function gentleFloatTransition(index = 0, reduced = false): Transition | undefined {
  if (reduced) return undefined;
  return {
    duration: 4.5 + index * 0.6,
    repeat: Infinity,
    ease: "easeInOut",
    delay: index * 0.8,
  };
}
