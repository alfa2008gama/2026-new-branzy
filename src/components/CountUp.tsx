import React, { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'motion/react';

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  formatter?: (value: number) => string;
  className?: string;
  glowOnComplete?: boolean;
}

export const CountUp: React.FC<CountUpProps> = ({
  to,
  from = 0,
  duration = 2.2,
  prefix = '',
  suffix = '',
  decimals,
  formatter,
  className = '',
  glowOnComplete = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [isCompleted, setIsCompleted] = useState(false);

  const numDecimals =
    decimals ?? (to.toString().includes('.') ? to.toString().split('.')[1].length : 0);

  const formatVal = (val: number) => {
    if (formatter) return formatter(val);
    return val.toLocaleString('en-IN', {
      minimumFractionDigits: numDecimals,
      maximumFractionDigits: numDecimals,
    });
  };

  const [displayValue, setDisplayValue] = useState<string>(formatVal(from));

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = (timestamp - startTime) / 1000;
      const progress = Math.min(elapsedTime / duration, 1);

      // Smooth easeOutExpo for dramatic slowdown at the end
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = from + (to - from) * easeProgress;

      setDisplayValue(formatVal(currentVal));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(formatVal(to));
        setIsCompleted(true);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, from, to, duration, numDecimals]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`inline-flex items-baseline tracking-tight font-jakarta ${className}`}
    >
      {prefix && <span>{prefix}</span>}
      <span>{displayValue}</span>
      {suffix && <span>{suffix}</span>}
    </motion.span>
  );
};
