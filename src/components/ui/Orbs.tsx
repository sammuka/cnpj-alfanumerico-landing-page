import { motion } from 'framer-motion';

const orbFloat = {
  animate: {
    x: [0, 30, 0],
    y: [0, -20, 0],
    scale: [1, 1.05, 1],
  },
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

export default function Orbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden orb-container" aria-hidden="true">
      <motion.div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-accent-violet/[0.12] blur-[150px]"
        animate={orbFloat.animate}
        transition={orbFloat.transition}
      />
      <motion.div
        className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-accent-blue/[0.10] blur-[130px]"
        animate={orbFloat.animate}
        transition={{ ...orbFloat.transition, delay: 5 }}
      />
      <motion.div
        className="absolute -bottom-16 right-1/4 w-[350px] h-[350px] rounded-full bg-accent-cyan/[0.08] blur-[120px]"
        animate={orbFloat.animate}
        transition={{ ...orbFloat.transition, delay: 10 }}
      />
    </div>
  );
}
