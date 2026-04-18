"use client";

import { motion, useInView, useReducedMotion, HTMLMotionProps } from "framer-motion";
import { useRef, ReactNode } from "react";

/**
 * Scroll-triggered reveal with a gentler editorial settle-in than a standard fade-up.
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
  const inView = useInView(ref, { once: true, margin: "-12% 0px -8% 0px" });
  const reduce = useReducedMotion();

  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<"div">>;
  const initial = reduce
    ? false
    : {
        opacity: 0,
        y,
        scale: 0.985,
        filter: "blur(10px)",
      };
  const animate = inView
    ? {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }
    : undefined;

  return (
    <MotionTag
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: reduce ? 0 : 1.05,
        delay,
        ease: [0.2, 0.9, 0.22, 1],
      }}
      className={className}
      style={reduce ? undefined : { willChange: "opacity, transform, filter" }}
    >
      {children}
    </MotionTag>
  );
}
