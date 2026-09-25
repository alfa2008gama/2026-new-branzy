import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface MiddleFoldRevealCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

/**
 * Apple Card: "Middle Fold Reveal"
 * The card smoothly unfolds from its vertical center line (middle) outwards to the edges,
 * like an unrolling brochure or folding device opening from the center crease.
 * Completely crisp with zero neon blur or glowing shadows.
 */
export const MiddleFoldRevealCard: React.FC<MiddleFoldRevealCardProps> = ({
  children,
  className = '',
  delay = 0,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{ perspective: 1200 }}
      className={`relative group rounded-3xl h-full will-change-transform ${className}`}
    >
      {/* Middle Folding GPU Transform Container */}
      <motion.div
        initial={{
          scaleX: 0.88,
          scaleY: 0.94,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
              }
            : {}
        }
        transition={{
          duration: 0.75,
          delay,
          ease: [0.16, 1, 0.3, 1], // Apple fluid ease-out
        }}
        style={{
          transformOrigin: 'center center',
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-xl will-change-transform transform-gpu"
      >
        {/* Subtle center fold crease line that dissolves as the card unfolds */}
        <motion.div
          initial={{ opacity: 0.6, scaleY: 1 }}
          animate={isInView ? { opacity: 0, scaleY: 0.7 } : {}}
          transition={{
            duration: 0.45,
            delay: delay + 0.15,
            ease: 'easeOut',
          }}
          className="absolute top-0 bottom-0 left-1/2 -ml-[0.5px] w-[1px] bg-white/25 z-30 pointer-events-none"
        />

        {/* Inner Card Content that lifts into place */}
        <motion.div
          initial={{ y: 22, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + 0.18,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full h-full flex flex-col"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
