import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useInView } from 'motion/react';

interface TiltParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  maxTilt?: number;
  glowColor?: string;
  onClick?: () => void;
}

/**
 * Apple Card 3: "3D Tilt Parallax"
 * Tactile Apple hardware feel with perspective(1200px), dynamic pointer & scroll tilt,
 * layered translateZ(20px) depth, and specular glossy light reflection.
 */
export const TiltParallaxCard: React.FC<TiltParallaxCardProps> = ({
  children,
  className = '',
  delay = 0,
  maxTilt = 8,
  glowColor = 'rgba(133, 255, 45, 0.25)',
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window));
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Spring smoothed physics for butter-smooth Apple motion
  const springConfig = { stiffness: 220, damping: 22 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    rotateX.set(rX);
    rotateY.set(rY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.45,
    });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, rotateX: 12 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotateX: 0 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        perspective: isMobile ? 'none' : 1200,
        transformStyle: 'preserve-3d',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
      className={`relative group rounded-3xl h-full will-change-transform ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <motion.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
        className="w-full h-full rounded-3xl relative transition-shadow duration-300"
      >
        {/* Dynamic Specular Gloss Glare Overlay */}
        {!isMobile && (
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.22) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Card Content with elevated transformZ */}
        <div 
          className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-xl"
          style={{ 
            transform: isMobile ? 'none' : 'translateZ(18px)',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};
