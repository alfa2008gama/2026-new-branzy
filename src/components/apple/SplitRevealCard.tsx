import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface SplitRevealCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  wipeColor?: string;
  onClick?: () => void;
}

/**
 * Apple Card 2: "Split Reveal"
 * Card content is masked/clipped and reveals left-to-right like an Apple keynote wipe,
 * while typography and buttons slide in from underneath in sequenced layers.
 */
export const SplitRevealCard: React.FC<SplitRevealCardProps> = ({
  children,
  className = '',
  delay = 0,
  wipeColor = '#85ff2d',
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`relative group rounded-3xl h-full will-change-transform ${className}`}
    >
      {/* GPU Smooth Reveal Container */}
      <motion.div
        initial={{
          opacity: 0,
          x: -25,
          scale: 0.96,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                scale: 1,
              }
            : {}
        }
        transition={{
          duration: 0.75,
          delay,
          ease: [0.16, 1, 0.3, 1], // Apple smooth ease-out
        }}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl will-change-transform transform-gpu"
      >
        {/* Leading Edge Line during Wipe */}
        <motion.div
          initial={{ left: '0%', opacity: 0.8 }}
          animate={isInView ? { left: '100%', opacity: 0 } : {}}
          transition={{
            duration: 0.85,
            delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-0 bottom-0 w-[1px] pointer-events-none z-30 bg-white/30"
        />

        {/* Inner Content that slides up from underneath */}
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.65,
            delay: delay + 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
