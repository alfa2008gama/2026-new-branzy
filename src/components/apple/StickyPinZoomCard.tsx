import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface StickyPinZoomCardProps {
  children: React.ReactNode;
  className?: string;
  badge?: string;
  zoomMedia?: React.ReactNode;
  specs?: Array<{ label: string; value: string }>;
  accentColor?: string;
}

/**
 * Apple Card 4: "Sticky Pin & Zoom"
 * Signature Apple product-feature technique (AirPods, iPhone camera, Watch Ultra).
 * As the user scrolls into the section, the card pins in place, the inner visual
 * zooms in (scale 1.00 -> 1.14), floating spec chips crossfade into view in layers,
 * and then the card releases smoothly to continue down the page.
 */
export const StickyPinZoomCard: React.FC<StickyPinZoomCardProps> = ({
  children,
  className = '',
  badge,
  zoomMedia,
  specs = [],
  accentColor = '#85ff2d',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure scroll progress through this specific card's runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll spring for butter-smooth scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 24,
    restDelta: 0.001,
  });

  // Apple scale scrub: 1.0 -> 1.14
  const mediaScale = useTransform(smoothProgress, [0.05, 0.75], [1.0, 1.14]);
  const mediaY = useTransform(smoothProgress, [0.05, 0.75], [0, -15]);

  // Floating specs reveal as user scrubs past 25%
  const specsOpacity = useTransform(smoothProgress, [0.2, 0.45], [0, 1]);
  const specsY = useTransform(smoothProgress, [0.2, 0.45], [20, 0]);

  // Ambient glow expansion
  const glowOpacity = useTransform(smoothProgress, [0.1, 0.6], [0.4, 0.85]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[135vh] lg:min-h-[155vh] py-4"
    >
      {/* Sticky Frame: Locks in place while scrubbing */}
      <div className="sticky top-20 sm:top-24 w-full flex items-center justify-center">
        <div
          className={`relative w-full rounded-3xl glass-card overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
          style={{
            border: `1px solid rgba(255,255,255,0.12)`,
          }}
        >
          {/* Zooming Media Backdrop/Artwork */}
          {zoomMedia && (
            <div className="relative w-full overflow-hidden rounded-t-3xl min-h-[220px] sm:min-h-[260px]">
              <motion.div
                style={{
                  scale: mediaScale,
                  y: mediaY,
                }}
                className="w-full h-full will-change-transform origin-center"
              >
                {zoomMedia}
              </motion.div>

              {/* Floating Apple-style interactive spec chips */}
              {specs.length > 0 && (
                <motion.div
                  style={{
                    opacity: specsOpacity,
                    y: specsY,
                  }}
                  className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2 pointer-events-none"
                >
                  {specs.map((spec, i) => (
                    <div
                      key={i}
                      className="badge-dark-glass px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1.5 shadow-lg backdrop-blur-xl border border-white/20"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#85ff2d] animate-pulse" />
                      <span className="text-gray-400">{spec.label}:</span>
                      <span className="text-white font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}

          {/* Card Body */}
          <div className="relative z-10 w-full p-6 sm:p-8">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-semibold text-[#85ff2d] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#85ff2d]" />
                {badge}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
