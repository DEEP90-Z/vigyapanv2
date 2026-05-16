export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

export const revealUp = {
  initial: { y: "100%" },
  animate: { y: 0 },
  transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
};

export const smoothScroll = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
};
