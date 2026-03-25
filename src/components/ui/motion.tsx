"use client";

import { motion, type Variants, type Easing } from "framer-motion";

const ease: Easing = "easeOut";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

interface MotionProps {
  children: React.ReactNode;
  className?: string;
}

export function FadeUpContainer({ children, className }: MotionProps): React.JSX.Element {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeUpItem({ children, className }: MotionProps): React.JSX.Element {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
