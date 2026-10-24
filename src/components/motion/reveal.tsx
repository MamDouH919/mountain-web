"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

// No filter: blur here. Animating blur on many elements exhausts GPU memory on
// mobile Safari, which paints the page black while scrolling.
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};

// A low threshold so elements taller than the phone screen still trigger.
const viewport = { once: true, amount: 0.1 } as const;

type RevealProps = HTMLMotionProps<"div"> & { delay?: number };

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={item}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Staggers any <RevealItem> children as the group scrolls into view. */
export function RevealGroup({
  stagger = 0.08,
  children,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  );
}
