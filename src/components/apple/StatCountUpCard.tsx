import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCountUpCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Apple Card 6: "Number/Stat Count-Up"
 * Metric cards featuring SVG stroke draw-in ring (dasharray/dashoffset)
 * and counting numbers smoothly from 0 to target value with Apple motion easing.
 */
export const StatCountUpCard: React.FC<StatCountUpCardProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  label,
  sublabel,
  icon: Icon,
  duration = 2.0,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let frameId: number;

    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Apple smooth ease-out: 1 - Math.pow(1 - progress, 3)
        const easeOutProgress = 1 - Math.pow(1 - progress, 3.5);
        setDisplayValue(easeOutProgress * value);

        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };

      frameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameId);
    };
  }, [isInView, value, duration, delay]);

  const formattedNumber = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toString();

  // SVG Circle stroke animation values
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group rounded-3xl glass-card p-6 sm:p-7 flex flex-col items-center text-center justify-between overflow-hidden shadow-xl border border-white/10 ${className}`}
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

      {/* Top Graphic: SVG Animated Stroke Ring with Centered Icon */}
      <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Track Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-white/10"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Animated Draw-In Stroke Ring */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-[#85ff2d]"
            strokeWidth="4"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference * 0.15 } : {}}
            transition={{
              duration: duration + 0.2,
              delay: delay + 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>

        {/* Center Icon */}
        {Icon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: delay + 0.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-md flex items-center justify-center text-[#85ff2d] border border-white/20 shadow-md"
            >
              <Icon size={20} className="stroke-[2]" />
            </motion.div>
          </div>
        )}
      </div>

      {/* Counting Number Display */}
      <div className="relative z-10 space-y-1">
        <div className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-jakarta flex items-baseline justify-center">
          <span>{prefix}</span>
          <span className="font-mono tabular-nums">{formattedNumber}</span>
          <span className="text-[#85ff2d] ml-0.5">{suffix}</span>
        </div>

        {/* Metric Label */}
        <h4 className="text-sm sm:text-base font-semibold text-gray-200 font-jakarta pt-1">
          {label}
        </h4>

        {sublabel && (
          <p className="text-xs text-gray-400 font-jakarta">
            {sublabel}
          </p>
        )}
      </div>

      {/* Bottom Accent Beam */}
      <div className="absolute bottom-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#85ff2d]/50 to-transparent pointer-events-none" />
    </motion.div>
  );
};
