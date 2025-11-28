/**
 * Animation Standards
 *
 * توحيد Animation Styles و Timing في النظام لضمان الاتساق
 */

import { Variants } from 'framer-motion';

/**
 * Animation Durations (in seconds)
 */
export const animationDuration = {
  fast: 0.15, // 150ms
  normal: 0.2, // 200ms
  slow: 0.3, // 300ms
  slower: 0.5, // 500ms
} as const;

/**
 * Animation Easing Functions
 */
export const easing = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  spring: [0.68, -0.55, 0.265, 1.55],
} as const;

/**
 * Common Animation Variants
 */
export const animationVariants = {
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: animationDuration.normal, ease: easing.easeInOut },
  },

  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: animationDuration.normal, ease: easing.easeOut },
  },

  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: animationDuration.normal, ease: easing.easeOut },
  },

  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: animationDuration.normal, ease: easing.easeOut },
  },

  scaleUp: {
    initial: { scale: 1 },
    animate: { scale: 1.05 },
    transition: { duration: animationDuration.fast, ease: easing.easeOut },
  },

  scaleDown: {
    initial: { scale: 1 },
    animate: { scale: 0.95 },
    transition: { duration: animationDuration.fast, ease: easing.easeOut },
  },

  // Slide animations
  slideInRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: animationDuration.normal, ease: easing.easeOut },
  },

  slideInLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: animationDuration.normal, ease: easing.easeOut },
  },

  // Hover animations
  hoverLift: {
    y: -8,
    transition: { duration: animationDuration.normal, ease: easing.easeOut },
  },

  hoverScale: {
    scale: 1.05,
    transition: { duration: animationDuration.fast, ease: easing.easeOut },
  },

  // Tap animations
  tapScale: {
    scale: 0.95,
    transition: { duration: animationDuration.fast, ease: easing.easeOut },
  },
} as const;

/**
 * Common Hover Props for Framer Motion
 */
export const hoverProps = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: animationDuration.fast, ease: easing.easeOut },
  },
  lift: {
    whileHover: { y: -8 },
    transition: { duration: animationDuration.normal, ease: easing.easeOut },
  },
  opacity: {
    whileHover: { opacity: 0.8 },
    transition: { duration: animationDuration.fast, ease: easing.easeOut },
  },
} as const;

/**
 * Stagger Animation for Lists
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: animationDuration.normal,
      ease: easing.easeOut,
    },
  },
};
