import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface SplitWingCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right';
  onClick?: () => void;
}

/**
 * Card Animation 3: "Chrono Wing 3D Yaw Unfold"
 * Rotates on the Y-axis from an angled perspective, settling smoothly into the plane like a watch case display.
 */
export const SplitWingCard: React.FC<SplitWingCardProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'right',
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const angle = direction === 'left' ? -15 : 15;
  const offsetX = direction === 'left' ? -35 : 35;

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{ perspective: 1200 }}
      className={`relative group h-full ${className}`}
    >
      <motion.div
        initial={{
          opacity: 0,
          rotateY: angle,
          x: offsetX,
          scale: 0.95,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                rotateY: 0,
                x: 0,
                scale: 1,
              }
            : {}
        }
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -6,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: direction === 'left' ? 'right center' : 'left center',
        }}
        className="w-full h-full rounded-3xl relative overflow-hidden will-change-transform transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};
