import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StaggerGridPopCardProps {
  children: React.ReactNode;
  index: number;
  className?: string;
  glowColor?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Apple Card 5: "Stagger Grid Pop"
 * For multi-card grids (like Services & Features).
 * Pops in with scale (0.90 -> 1.0) + fade, staggered 0.08-0.12s in reading order,
 * with Apple's playful overshoot bounce easing: cubic-bezier(0.34, 1.56, 0.64, 1).
 */
export const StaggerGridPopCard: React.FC<StaggerGridPopCardProps> = ({
  children,
  index,
  className = '',
  glowColor = '#85ff2d',
  icon,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });

  // Stagger calculation based on index in grid
  const staggerDelay = Math.min(0.8, (index % 4) * 0.09 + Math.floor(index / 4) * 0.12);

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 26,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.65,
        delay: staggerDelay,
        // Apple playful overshoot curve
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative group rounded-2xl sm:rounded-3xl h-full will-change-transform ${className}`}
    >
      {/* Optional Top Icon with slight playful spin & settle */}
      {icon && (
        <motion.div
          initial={{ rotate: -8, scale: 0.85 }}
          animate={isInView ? { rotate: 0, scale: 1 } : {}}
          transition={{
            duration: 0.5,
            delay: staggerDelay + 0.12,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative z-20 pointer-events-none"
        >
          {icon}
        </motion.div>
      )}

      {/* Card Content Container */}
      <div className="relative z-10 w-full h-full rounded-[inherit] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};
