import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: string;
}

export default function GlassCard({ children, className = '', hoverColor = '#7c3aed' }: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 ${className}`}
      whileHover={{
        borderColor: `${hoverColor}4d`,
        boxShadow: `0 0 30px ${hoverColor}14`,
        scale: 1.02,
      }}
      transition={{ type: 'spring', stiffness: 270, damping: 19 }}
    >
      {children}
    </motion.div>
  );
}
