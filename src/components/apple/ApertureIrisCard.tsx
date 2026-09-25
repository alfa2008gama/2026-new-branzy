import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ApertureIrisCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

/**
 * Card Animation 1: "Aperture Iris & Precision Lift"
 * Inspired by luxury camera & watch aperture lenses.
 * Pure GPU transform (scale + y + opacity) for guaranteed 120fps stutter-free fluidity.
 */
export const ApertureIrisCard: React.FC<ApertureIrisCardProps> = ({
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
          scale: 0.92,
          y: 35,
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
          duration: 0.75,
          delay,
          ease: [0.16, 1, 0.3, 1], // Apple / Swiss precision ease
        }}
        whileHover={{
          y: -6,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        className="w-full h-full rounded-3xl relative overflow-hidden will-change-transform transform-gpu"
      >
        {/* Specular Iris Glint Sweep */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={isInView ? { x: '180%', opacity: [0, 0.5, 0] } : {}}
          transition={{
            duration: 1.1,
            delay: delay + 0.15,
            ease: 'easeOut',
          }}
          className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none z-30 transform-gpu"
        />

        {children}
      </motion.div>
    </div>
  );
};
