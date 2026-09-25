import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ZenithHeroCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

/**
 * Card Animation 4: "Zenith Hero Elevation"
 * Designed specifically for hero/featured tier cards.
 * Scales up from 0.88 with prominent spring settle and an ambient expanding ring.
 */
export const ZenithHeroCard: React.FC<ZenithHeroCardProps> = ({
  children,
  className = '',
  delay = 0,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} onClick={onClick} className={`relative group h-full ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.88,
          y: 45,
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
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -8,
          scale: 1.015,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        className="w-full h-full rounded-3xl relative overflow-hidden will-change-transform transform-gpu"
      >
        {/* Subtle Pulse Aura on entry */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: [0, 0.6, 0], scale: [0.9, 1.08, 1.15] } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
          className="absolute -inset-2 rounded-3xl border border-white/40 pointer-events-none z-0"
        />

        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
