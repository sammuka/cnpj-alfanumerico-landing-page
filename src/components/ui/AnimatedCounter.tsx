import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  separator?: string;
  className?: string;
}

const easeOutQuart = (t: number, b: number, c: number, d: number) =>
  c * (1 - Math.pow(1 - t / d, 4)) + b;

export default function AnimatedCounter({
  end,
  duration = 2,
  separator = '.',
  className = '',
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp
          end={end}
          duration={duration}
          separator={separator}
          start={0}
          useEasing
          easingFn={easeOutQuart}
        />
      ) : (
        '0'
      )}
    </span>
  );
}
