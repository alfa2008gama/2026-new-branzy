import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BezelFlipCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

/**
 * Card Animation 5: "Bezel 3D Flip & Rise"
 * Rotates into view from the top/horizon with perspective depth.
 */
export const BezelFlipCard: React.FC<BezelFlipCardProps> = ({
  children,
  className = '',
  delay = 0,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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
          rotateX: -14,
          y: -25,
          scale: 0.95,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                rotateX: 0,
                y: 0,
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
          transformOrigin: 'top center',
        }}
        className="w-full h-full rounded-3xl relative overflow-hidden will-change-transform transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
};
