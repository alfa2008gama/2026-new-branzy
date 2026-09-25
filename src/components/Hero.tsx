import React from 'react';
import { motion } from 'motion/react';
import { CountUp } from './CountUp';

interface HeroProps {
  onOpenModal: (title: string, type: 'contact' | 'services' | 'work' | 'info') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const clientAvatars = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      alt: 'Client avatar 1'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      alt: 'Client avatar 2'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      alt: 'Client avatar 3'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      alt: 'Client avatar 4'
    }
  ];

  return (
    <section id="home" className="scroll-section w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-12 sm:py-16 lg:py-20 flex flex-col justify-center min-h-screen">
      <div className="max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col items-start text-left gap-6 sm:gap-8">
        
        {/* Top Capsule Badge */}
        <div className="reveal-headline badge-dark-glass rounded-full px-4 py-1.5 sm:px-4.5 sm:py-2 inline-flex items-center gap-2.5 transition-all">
          <span className="w-2 h-2 rounded-full bg-[#85ff2d]"></span>
          <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide font-jakarta">
            Digital Marketing Agency
          </span>
        </div>

        {/* Main Headline */}
        <div className="reveal-headline space-y-1 sm:space-y-2 overflow-hidden">
          <h1 className="text-5xl sm:text-7xl lg:text-[88px] xl:text-[96px] 2xl:text-[104px] font-extrabold tracking-tight text-white leading-[1.05] font-jakarta">
            Turning Vision
          </h1>
          <h1 className="text-5xl sm:text-7xl lg:text-[88px] xl:text-[96px] 2xl:text-[104px] font-extrabold tracking-tight text-white leading-[1.05] font-jakarta flex flex-wrap items-baseline gap-x-3 sm:gap-x-4">
            <span>Into Marketing</span>
            <span className="font-serif-italic text-[#85ff2d] font-normal lowercase tracking-normal text-6xl sm:text-8xl lg:text-[98px] xl:text-[110px] 2xl:text-[120px]">
              dominance
            </span>
          </h1>
        </div>

        {/* Subheadline Paragraphs */}
        <div className="reveal-supporting text-base sm:text-lg lg:text-[20px] xl:text-[22px] leading-relaxed text-gray-300 font-normal font-jakarta space-y-0.5 pt-1 sm:pt-2 max-w-3xl">
          <p>We don't just market brands - we build dominance.</p>
          <p>Smart strategies. Powerful content. Real results.</p>
        </div>

        {/* Action Buttons */}
        <div className="reveal-cta flex flex-wrap items-center gap-4 sm:gap-5 pt-2 sm:pt-4">
          <button
            onClick={() => {
              const el = document.getElementById('services');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onOpenModal('Explore Services', 'services');
              }
            }}
            className="btn-green-glossy rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-white font-bold text-base sm:text-lg tracking-tight cursor-pointer hover:scale-105 transition-transform whitespace-nowrap shrink-0 inline-flex items-center justify-center"
          >
            Explore Services
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('work');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onOpenModal('View Work', 'work');
              }
            }}
            className="btn-dark-glass rounded-full px-7 py-3.5 sm:px-8 sm:py-4 text-white font-medium text-base sm:text-lg tracking-tight cursor-pointer hover:scale-105 transition-transform whitespace-nowrap shrink-0 inline-flex items-center justify-center"
          >
            View Work
          </button>
        </div>

        {/* Social Proof */}
        <div className="reveal-supporting flex items-center gap-4 pt-4 sm:pt-6">
          <div className="flex items-center -space-x-3">
            {clientAvatars.map((avatar) => (
              <img
                key={avatar.id}
                src={avatar.src}
                alt={avatar.alt}
                referrerPolicy="no-referrer"
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-black object-cover shadow-lg hover:z-10 hover:scale-110 transition-transform"
              />
            ))}
          </div>
          <span className="text-lg sm:text-xl text-white font-normal font-jakarta pl-1 flex items-center gap-1.5">
            <CountUp to={50} suffix="+" duration={1.8} className="font-bold text-[#85ff2d]" />
            <span>happy clients</span>
          </span>
        </div>

      </div>
    </section>
  );
};

