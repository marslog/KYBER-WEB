"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, fadeUpReduced, scrollRevealTransition } from "@/lib/motion";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export default function Reveal({ children, delay = 0, className, ...props }: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={reduced ? fadeUpReduced : fadeUp}
      transition={scrollRevealTransition(delay, Boolean(reduced))}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
