export const variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 1.7
    }
  }
};

export const item = {
  hidden: { opacity: 0, x: -50 },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};
