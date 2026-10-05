'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps, Variants } from 'motion/react';

export const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: (stagger: number = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.05,
    },
  }),
};

export const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const reducedMotionItemVariants: Variants = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export interface RevealGroupProps extends HTMLMotionProps<'div'> {
  stagger?: number;
  amount?: number;
  once?: boolean;
}

export function RevealGroup({
  children,
  className = '',
  stagger = 0.08,
  amount = 0.2,
  once = true,
  ...props
}: RevealGroupProps) {
  return (
    <motion.div
      variants={defaultContainerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface RevealItemProps extends HTMLMotionProps<'div'> {
  variants?: Variants;
}

export function RevealItem({
  children,
  className = '',
  variants = defaultItemVariants,
  ...props
}: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const effectiveVariants = shouldReduceMotion ? reducedMotionItemVariants : variants;

  return (
    <motion.div
      variants={effectiveVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
