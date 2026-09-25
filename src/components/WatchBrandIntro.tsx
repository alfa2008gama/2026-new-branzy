import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface WatchBrandIntroProps {
  onComplete?: () => void;
}

export const WatchBrandIntro: React.FC<WatchBrandIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'ticking' | 'opening' | 'done'>('ticking');

  useEffect(() => {
    // 1. Ticking / Chronometer sweep phase (approx 1.0s)
    const timer1 = setTimeout(() => {
      setPhase('opening');
    }, 1100);

    // 2. Shutter opening phase finishes (approx 1.8s total)
    const timer2 = setTimeout(() => {
      setPhase('done');
      if (onComplete) onComplete();
    }, 1850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('done');
    if (onComplete) onComplete();
  };

  if (phase === 'done') return null;

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[100] pointer-events-auto cursor-pointer overflow-hidden select-none"
      aria-label="Click to skip luxury reveal"
    >
      {/* TOP SHUTTER (Vault Upper Half) */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: phase === 'opening' ? '-100%' : '0%' }}
        transition={{
          duration: 0.8,
          ease: [0.77, 0, 0.175, 1], // Swiss horology precision snap
        }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#060607] border-b border-white/[0.08] flex items-end justify-center overflow-hidden z-20"
      >
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(133,255,45,0.06)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Horizon Gleam Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: phase === 'opening' ? 0 : 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#85ff2d] to-transparent z-30"
        />
      </motion.div>

      {/* BOTTOM SHUTTER (Vault Lower Half) */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: phase === 'opening' ? '100%' : '0%' }}
        transition={{
          duration: 0.8,
          ease: [0.77, 0, 0.175, 1],
        }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#060607] border-t border-white/[0.08] flex items-start justify-center overflow-hidden z-20"
      >
        {/* Subtle radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(133,255,45,0.06)_0%,transparent_60%)] pointer-events-none" />
      </motion.div>

      {/* CENTER HOROLOGICAL DIAL & LOGO DISPLAY */}
      <AnimatePresence>
        {phase === 'ticking' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
          >
            {/* Precision Watch Chronometer Chapter Ring */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-white/15 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              {/* Outer Minute/Second Tick Marks (Swiss Calibre Style) */}
              <div className="absolute inset-2 rounded-full border border-dashed border-white/10" />

              {/* 12 Precise Cardinal Bezel Pips */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-2 rounded-full bg-white/40"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-88px)`,
                    transformOrigin: '50% 88px',
                  }}
                />
              ))}

              {/* High-Beat Precision Chrono Hand (Rotating Sweep) */}
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute w-[2px] h-20 bg-gradient-to-t from-transparent via-[#85ff2d] to-[#85ff2d] origin-bottom -top-1"
                style={{ transformOrigin: '50% 100%' }}
              >
                {/* Needle Tip Pip */}
                <div className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-[#85ff2d] shadow-[0_0_8px_#85ff2d]" />
              </motion.div>

              {/* Center Axis Jewel / Hub */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-[#111] border border-[#85ff2d] flex items-center justify-center shadow-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[#85ff2d] animate-ping" />
              </div>

              {/* Brand Typography Inside Dial */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-8">
                <span className="text-lg sm:text-xl font-extrabold tracking-[0.25em] text-white font-jakarta">
                  BRANZY
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#85ff2d] font-jakarta mt-1">
                  CHRONO • 2026
                </span>
              </div>
            </div>

            {/* Sub-label Below Bezel */}
            <div className="mt-8 flex flex-col items-center space-y-1">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 font-medium font-jakarta">
                GENEVE • KOLKATA
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-jakarta">
                Tap to enter
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
