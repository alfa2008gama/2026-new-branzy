import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface RevealAndLiftCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Apple Card 1: "Reveal & Lift"
 * Card scales up from 0.85 -> 1.0 and lifts with an elevated shadow as it enters;
 * icon/image inside rotates slightly (-5deg -> 0deg) as it settles with layered depth.
 */
export const RevealAndLiftCard: React.FC<RevealAndLiftCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(133, 255, 45, 0.2)',
  delay = 0,
  icon,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{
        opacity: 0,
        scale: 0.85,
        y: 40,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
              boxShadow: '0 24px 48px -12px rgba(0,0,0,0.8)',
            }
          : {}
      }
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple smooth ease-out: fast start, gentle settle
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
      }}
      className={`relative group rounded-3xl h-full will-change-transform ${className}`}
    >
      {/* Optional Top Icon Container with -5deg -> 0deg rotation settle */}
      {icon && (
        <motion.div
          initial={{ rotate: -7, scale: 0.8, opacity: 0 }}
          animate={isInView ? { rotate: 0, scale: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.65,
            delay: delay + 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative z-20 pointer-events-none"
        >
          {icon}
        </motion.div>
      )}

      {/* Main Card Content */}
      <div className="relative z-10 w-full h-full rounded-[inherit] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};
