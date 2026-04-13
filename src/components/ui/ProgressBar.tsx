import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  color: string;
  delay?: number;
}

export default function ProgressBar({ value, color, delay = 0 }: ProgressBarProps) {
  return (
    <div className="h-1.5 rounded-full surf-6 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: 'easeOut' }}
      />
    </div>
  );
}
