import React, { useState } from 'react';
import { motion } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  onClick,
  disabled = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => {
        if (!disabled) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!disabled) setIsHovered(false);
      }}
      animate={{
        y: isHovered ? -5 : 0,
      }}
      transition={{
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
      className={`relative group h-full w-full ${className}`}
    >
      {/* Content wrapper with crystal-clear, razor-sharp text */}
      <div 
        className="relative z-10 w-full h-full rounded-[inherit]"
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

