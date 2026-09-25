import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ReviewItem {
  id: number;
  name: string;
  role: string;
  company: string;
  tag: string;
  avatar: string;
  comment: string;
  rating: number;
}

export const Reviews: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviewsList: ReviewItem[] = [
    {
      id: 1,
      name: 'Sourabh Saha',
      role: 'Managing Director',
      company: 'SNR Paribahan',
      tag: 'Transit & Logistics',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      comment: 'Their strategy and execution helped us expand our reach and increase bookings significantly. A reliable team that truly understands business growth and digital ticketing infrastructure.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Robin Ghosh',
      role: 'Chairman',
      company: 'Lokenath Bus Service',
      tag: 'Fleet & Passenger Transit',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      comment: 'We saw a noticeable boost in customer engagement and brand visibility across all intercity routes. Their marketing solutions are result-driven, fast, and remarkably effective.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Bittu Sharma',
      role: 'Founder & Owner',
      company: 'The Gravity Salon',
      tag: 'Luxury Salon & Wellness',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      comment: 'From branding to digital presence, everything was handled with creativity and precision. Our salon has never looked better online, and client bookings hit record highs within weeks!',
      rating: 5,
    },
    {
      id: 4,
      name: 'Roushni Sharma',
      role: 'Managing Director',
      company: 'The Gravity Salon',
      tag: 'Brand & Creative Identity',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      comment: 'Their team is professional, responsive, and incredibly talented. They helped us build a strong brand, loyal customer base, and elevated our social media to a whole new luxury tier.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Aniket Roy',
      role: 'Creative Lead',
      company: 'Philo Studio',
      tag: 'Digital Experience & UI/UX',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      comment: 'Branzy transformed our digital brand architecture. The interactive web experience and design systems they created established us as industry innovators and gained viral recognition.',
      rating: 5,
    },
  ];

  const totalReviews = reviewsList.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalReviews);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  // Continuous Circular Motion Autoplay (pauses when user hovers to read)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalReviews);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered, totalReviews]);

  // Compute 3D circular transformation values for each card relative to activeIndex
  const getCardTransform = (index: number) => {
    let diff = (index - activeIndex) % totalReviews;
    if (diff > totalReviews / 2) diff -= totalReviews;
    if (diff < -totalReviews / 2) diff += totalReviews;

    // Center active card - ultra sharp, crystal clear, 100% readable
    if (diff === 0) {
      return {
        x: 0,
        z: 60,
        rotateY: 0,
        scale: 1.02,
        opacity: 1,
        zIndex: 35,
        filter: 'blur(0px) brightness(1)',
      };
    }

    // Right adjacent overlapping card - blurred background depth
    if (diff === 1) {
      return {
        x: '55%',
        z: -110,
        rotateY: -26,
        scale: 0.86,
        opacity: 0.48,
        zIndex: 20,
        filter: 'blur(8px) brightness(0.55)',
      };
    }

    // Left adjacent overlapping card - blurred background depth
    if (diff === -1) {
      return {
        x: '-55%',
        z: -110,
        rotateY: 26,
        scale: 0.86,
        opacity: 0.48,
        zIndex: 20,
        filter: 'blur(8px) brightness(0.55)',
      };
    }

    // Far right overlapping card
    if (diff === 2) {
      return {
        x: '98%',
        z: -260,
        rotateY: -45,
        scale: 0.74,
        opacity: 0.22,
        zIndex: 10,
        filter: 'blur(14px) brightness(0.35)',
      };
    }

    // Far left overlapping card
    if (diff === -2) {
      return {
        x: '-98%',
        z: -260,
        rotateY: 45,
        scale: 0.74,
        opacity: 0.22,
        zIndex: 10,
        filter: 'blur(14px) brightness(0.35)',
      };
    }

    return {
      x: diff > 0 ? '120%' : '-120%',
      z: -380,
      rotateY: diff > 0 ? -60 : 60,
      scale: 0.65,
      opacity: 0,
      zIndex: 5,
      filter: 'blur(20px) brightness(0.2)',
    };
  };

  return (
    <section
      id="reviews"
      className="scroll-section w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 relative z-10 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Top Capsule Badge */}
      <div className="reveal-headline flex flex-col items-center text-center mb-6">
        <div className="badge-dark-glass rounded-full px-6 py-1.5 inline-flex items-center justify-center shadow-lg">
          <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide font-jakarta">
            Client Testimonials
          </span>
        </div>
      </div>

      {/* Headline & Paragraph */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-14">
        <h2 className="reveal-headline text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.1] font-jakarta">
          <span className="text-white">What Clients </span>
          <span className="text-[#85ff2d] font-normal tracking-wide">Say</span>
        </h2>
        <p className="reveal-supporting text-gray-300 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal font-jakarta pt-1">
          Our clients trust us to deliver meaningful strategies, creative solutions, and measurable growth. Explore their verified experiences below.
        </p>
      </div>

      {/* 3D CIRCULAR OVERLAPPING CAROUSEL CONTAINER */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-4xl mx-auto h-[460px] sm:h-[440px] flex items-center justify-center select-none"
        style={{ perspective: 1200 }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {reviewsList.map((rev, index) => {
            const transform = getCardTransform(index);
            const isCurrent = index === activeIndex;

            return (
              <motion.div
                key={rev.id}
                animate={{
                  x: transform.x,
                  z: transform.z,
                  rotateY: transform.rotateY,
                  scale: transform.scale,
                  opacity: transform.opacity,
                  filter: transform.filter,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 26,
                  mass: 0.9,
                }}
                onClick={() => {
                  if (!isCurrent) setActiveIndex(index);
                }}
                style={{
                  zIndex: transform.zIndex,
                  transformStyle: 'preserve-3d',
                }}
                className={`absolute w-[92%] sm:w-[540px] cursor-pointer will-change-transform ${
                  isCurrent ? 'cursor-default select-text' : 'hover:opacity-80'
                }`}
              >
                {/* 3D SOLID GLASS CARD */}
                <div
                  className={`relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 group ${
                    isCurrent
                      ? 'glass-card-solid bg-black/90 backdrop-blur-2xl border border-white/30 border-t-white/70 shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_35px_rgba(133,255,45,0.15)] ring-1 ring-[#85ff2d]/20'
                      : 'glass-card-solid bg-black/60 backdrop-blur-md border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {/* Top Specular Reflection Highlight */}
                  <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-[28px] sm:rounded-t-[32px]" />

                  <div className="relative z-10">
                    {/* Header Row: Quote Icon & Company Category Pill */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="badge-dark-glass rounded-full px-3 py-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/90 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-[#85ff2d]" />
                        <span>{rev.tag}</span>
                      </div>

                      <div className="w-10 h-10 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] shadow-md group-hover:scale-105 transition-transform">
                        <Quote size={18} className="rotate-180 text-[#85ff2d]" />
                      </div>
                    </div>

                    {/* Client Testimonial Paragraph - Front card is 100% sharp and readable */}
                    <p
                      className={`text-sm sm:text-base lg:text-[17px] leading-relaxed font-jakarta mb-6 transition-colors ${
                        isCurrent
                          ? 'text-white font-medium drop-shadow-sm'
                          : 'text-gray-300 font-normal italic'
                      }`}
                    >
                      "{rev.comment}"
                    </p>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-white/15 mb-5" />

                    {/* Client Avatar & Identity Block */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative p-0.5 rounded-full border-2 border-[#85ff2d] shadow-md shrink-0">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                            <CheckCircle2 size={14} className="text-[#85ff2d] fill-black" />
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight font-jakarta flex items-center gap-1.5">
                            {rev.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#85ff2d] font-semibold font-jakarta">
                            {rev.role} • <span className="text-gray-300 font-medium">{rev.company}</span>
                          </p>
                        </div>
                      </div>

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-1 text-[#85ff2d] shrink-0 bg-white/[0.05] px-2.5 py-1.5 rounded-full border border-white/10">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" className="stroke-none" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Left Circular Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous review"
          className="btn-dark-glass absolute -left-2 sm:-left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:text-[#85ff2d] border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Right Circular Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next review"
          className="btn-dark-glass absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white hover:text-[#85ff2d] border border-white/20 shadow-xl transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Pagination Indicators & Circular Motion Hint */}
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="flex items-center gap-2">
          {reviewsList.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Jump to review ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex
                  ? 'w-8 bg-[#85ff2d] shadow-[0_0_10px_rgba(133,255,45,0.7)]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-400 font-jakarta tracking-wide">
          {isHovered ? 'Paused on hover • Click any card to bring forward' : 'Rotating in 3D circular motion • Hover to pause'}
        </p>
      </div>
    </section>
  );
};

