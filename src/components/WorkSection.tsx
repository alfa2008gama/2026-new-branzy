import React from 'react';
import { Instagram, ArrowUpRight, Sparkles } from 'lucide-react';
import { TiltParallaxCard } from './apple';

interface WorkSectionProps {
  onOpenModal: (title: string, type: 'contact' | 'services' | 'work' | 'info') => void;
}

interface ProjectData {
  id: string;
  number: string;
  unit: string;
  categoryTag: string;
  badgeText: string;
  title: string;
  subtitle: string;
  metric: string;
  instagramUrl: string;
  imageSrc: string;
  accentColor: string;
  delay: number;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onOpenModal }) => {
  const projects: ProjectData[] = [
    {
      id: '01',
      number: '01',
      unit: 'Fleet',
      categoryTag: 'Transit & Fleet',
      badgeText: 'Brand Identity',
      title: 'Lokenath Bus Services',
      subtitle: 'Premium Bus Service & Fleet Identity',
      metric: '24+ Routes',
      instagramUrl: 'https://www.instagram.com/lokenathbus.in?stkn=MWJreDUwd2V1d2o3OQ==',
      imageSrc: '/coach_highway.jpg',
      accentColor: '#38bdf8',
      delay: 0.08,
    },
    {
      id: '02',
      number: '02',
      unit: 'Travel',
      categoryTag: 'Travel Platform',
      badgeText: 'UI/UX Design',
      title: 'SNR PARIBAHAN',
      subtitle: 'Travel With Comfort & Express Transit',
      metric: '50k+ Riders',
      instagramUrl: 'https://www.instagram.com/snr_paribahan?stkn=bW8wNml6aGg3OHVy',
      imageSrc: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1789690657/ChatGPT_Image_Jun_18_2026_01_33_45_AM_v7r8p4.png',
      accentColor: '#c084fc',
      delay: 0.16,
    },
    {
      id: '03',
      number: '03',
      unit: 'Studio',
      categoryTag: 'Creative Studio',
      badgeText: 'Digital Experience',
      title: 'Philo',
      subtitle: 'Brand System & Digital Architecture',
      metric: 'Award Winning',
      instagramUrl: 'https://www.instagram.com/philosalon.in?stkn=MW1meHNkY3VrazN4bA==',
      imageSrc: 'https://res.cloudinary.com/kbiolcw6/image/upload/v1789690868/%E0%A6%B8%E0%A6%BE%E0%A6%9C_20260829_115948_0000_bgp4bl.png',
      accentColor: '#85ff2d',
      delay: 0.24,
    },
  ];

  return (
    <section
      id="work"
      className="scroll-section w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 relative z-10 min-h-screen flex flex-col justify-center"
    >
      {/* Top Capsule Badge */}
      <div className="reveal-headline flex flex-col items-center mb-6 sm:mb-8">
        <div className="badge-dark-glass rounded-full px-6 py-1.5 inline-flex items-center justify-center shadow-md">
          <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide font-jakarta flex items-center gap-2">
            <Sparkles size={14} className="text-[#85ff2d]" />
            Our Works
          </span>
        </div>
      </div>

      {/* Headline & Subtitle */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16">
        <h2 className="reveal-headline text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-none font-jakarta">
          <span className="text-white">Work That Moves </span>
          <span className="text-[#85ff2d]">Brands Forward</span>
        </h2>
        <p className="reveal-supporting text-gray-300 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal font-jakarta pt-2 max-w-2xl mx-auto">
          Explore our premier portfolio where bold strategy meets immaculate craft. Designed with Apple-grade clarity and high-precision execution.
        </p>
      </div>

      {/* Responsive Work Grid: 3 Flagship Projects with 3D Tilt Parallax Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl w-full mx-auto items-stretch">
        {projects.map((project) => {
          return (
            <div key={project.id} className="flex h-full">
              <TiltParallaxCard
                delay={project.delay}
                maxTilt={8}
                className="w-full h-full"
                onClick={() => onOpenModal(`Case Study: ${project.title}`, 'work')}
              >
                <div className="rounded-[28px] sm:rounded-[32px] glass-card glass-card-hover p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-2xl relative overflow-hidden group h-full border border-white/20 cursor-pointer">
                  {/* Top Specular Glass Reflection Bar */}
                  <div className="glass-reflection-top absolute top-0 left-0 right-0 h-28 z-0 pointer-events-none rounded-t-[28px] sm:rounded-t-[32px]" />

                  {/* TOP BANNER MEDIA CONTAINER WITH REAL HIGH-RES IMAGE */}
                  <div className="relative h-52 sm:h-56 w-full rounded-[20px] sm:rounded-[22px] overflow-hidden bg-black/60 border border-white/15 flex flex-col justify-between p-3.5 z-10 shadow-lg">
                    {/* Real Image Background Layer */}
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Ambient High-Grade Vignette Overlay for Solid Clear Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40 pointer-events-none" />

                    {/* Overlaid Badges: Clear Solid Frosted Glass */}
                    <div className="relative z-10 w-full flex items-center justify-between">
                      {/* Top-Left Category Tag */}
                      <div className="badge-dark-glass rounded-full px-3 py-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/95 border border-white/25 shadow-md">
                        <span
                          className="w-2 h-2 rounded-full animate-pulse"
                          style={{ backgroundColor: project.accentColor }}
                        />
                        <span className="tracking-wide">{project.categoryTag}</span>
                      </div>

                      {/* Top-Right Badge */}
                      <div className="badge-dark-glass rounded-full px-3 py-1 inline-flex items-center text-[11px] font-semibold text-white/95 border border-white/25 shadow-md">
                        <span className="tracking-wide">{project.badgeText}</span>
                      </div>
                    </div>

                    {/* Bottom Image Tag with Accent Line */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="h-1 w-10 rounded-full bg-white/40 group-hover:w-16 transition-all duration-300" style={{ backgroundColor: project.accentColor }} />
                      <span className="text-[10px] font-bold text-white/75 uppercase tracking-widest font-jakarta bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        Featured Case
                      </span>
                    </div>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="px-2 pt-5 pb-1 flex flex-col flex-1 justify-between relative z-10">
                    <div>
                      {/* Title & Diagonal Arrow Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-jakarta group-hover:text-[#85ff2d] transition-colors leading-snug">
                            {project.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-300 font-normal font-jakarta mt-1.5 leading-relaxed">
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Circular Glass Arrow Action Button */}
                        <a
                          href={project.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-dark-glass w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#85ff2d] hover:border-[#85ff2d]/50 transition-all hover:scale-105 active:scale-95 shrink-0 mt-0.5 shadow-md"
                          aria-label={`View ${project.title}`}
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      </div>
                    </div>

                    {/* BOTTOM METADATA & STATS BAR */}
                    <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                      {/* Left: Big Stat Number + Unit */}
                      <div className="flex items-baseline">
                        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-jakarta">
                          {project.number}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 font-medium ml-2 font-jakarta uppercase tracking-wider">
                          {project.unit}
                        </span>
                      </div>

                      {/* Right: Metric Counter + Glass View Pill + Instagram Link */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs text-gray-300 font-medium font-jakarta hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                          {project.metric}
                        </span>

                        {/* View Work Button */}
                        <a
                          href={project.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="btn-dark-glass px-3.5 py-1.5 rounded-full text-xs font-semibold text-white hover:text-[#85ff2d] hover:border-[#85ff2d]/50 transition-all inline-flex items-center gap-1 shadow-sm whitespace-nowrap shrink-0"
                        >
                          <span className="whitespace-nowrap">View Work</span>
                          <ArrowUpRight size={13} className="text-[#85ff2d] shrink-0" />
                        </a>

                        {/* Instagram Icon */}
                        {project.instagramUrl && (
                          <a
                            href={project.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${project.title} on Instagram`}
                            className="btn-dark-glass w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:scale-105 transition-all"
                          >
                            <Instagram size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltParallaxCard>
            </div>
          );
        })}
      </div>
    </section>
  );
};



