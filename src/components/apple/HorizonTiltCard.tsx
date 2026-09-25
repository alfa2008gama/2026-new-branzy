import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface HorizonTiltCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

/**
 * Card Animation 2: "3D Horizon Tilt & Elevation"
 * Inspired by luxury watch case dials rotating into perspective view.
 * Uses 3D perspective rotation around the X-axis for distinctive architectural depth.
 */
export const HorizonTiltCard: React.FC<HorizonTiltCardProps> = ({
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
          rotateX: 14,
          y: 45,
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
          rotateX: -2,
          transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom center',
        }}
        className="w-full h-full rounded-3xl relative overflow-hidden will-change-transform transform-gpu"
      >
        {/* Ambient Top Light Rim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 0.8, 0.2] } : {}}
          transition={{ duration: 0.9, delay: delay + 0.1 }}
          className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#85ff2d]/60 to-transparent pointer-events-none z-30"
        />

        {children}
      </motion.div>
    </div>
  );
};
