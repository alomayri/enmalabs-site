"use client";

import { motion, useInView, useReducedMotion, HTMLMotionProps } from "framer-motion";
import { useRef, ReactNode } from "react";
import { motion as motionSystem } from "@/lib/design-system";

/**
 * Scroll-triggered reveal: fades in + slight rise when entering the viewport.
 * Used as the basic building block of the narrative scenes.
 */
type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "h1" | "h2" | "h3" | "p" | "span" | "li";
};

export function Reveal({ children, delay = 0, y = 24, className, as = "div" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduce = useReducedMotion();

  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;

  return (
    <MotionTag
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: motionSystem.reveal.duration,
        delay,
        ease: motionSystem.reveal.ease,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
