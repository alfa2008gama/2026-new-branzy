import React from 'react';
import { 
  Target, 
  PenTool, 
  Globe, 
  TrendingUp, 
  Search, 
  Video, 
  Users, 
  Lightbulb, 
  ArrowRight 
} from 'lucide-react';
import { TiltParallaxCard } from './apple';

interface ServicesProps {
  onOpenModal: (title: string, type: 'contact' | 'services' | 'work' | 'info') => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenModal }) => {
  const servicesList = [
    {
      id: 'brand-strategy',
      icon: Target,
      title: 'Brand Strategy',
      description: "We define your brand's purpose, positioning, and roadmap to build meaningful connections and long-term value.",
      cta: 'Explore Strategy'
    },
    {
      id: 'creative-design',
      icon: PenTool,
      title: 'Creative Design',
      description: "From visuals to storytelling, we craft design that captures attention and communicates your brand's essence.",
      cta: 'View Design Work'
    },
    {
      id: 'web-experiences',
      icon: Globe,
      title: 'Web Experiences',
      description: 'We design and develop fast, responsive, and conversion-focused websites that deliver seamless experiences.',
      cta: 'Explore Web Work'
    },
    {
      id: 'performance-marketing',
      icon: TrendingUp,
      title: 'Performance Marketing',
      description: 'Data-driven campaigns across Meta, Google, and beyond—built to maximize ROI and drive measurable results.',
      cta: 'See Campaigns'
    },
    {
      id: 'search-growth',
      icon: Search,
      title: 'Search Growth',
      description: 'We help you rank higher, attract the right audience, and grow organically through smart SEO strategies.',
      cta: 'Improve Rankings'
    },
    {
      id: 'content-production',
      icon: Video,
      title: 'Content Production',
      description: 'High-quality photo, video, and content that tell your story, engage your audience, and elevate your brand.',
      cta: 'View Our Work'
    },
    {
      id: 'social-growth',
      icon: Users,
      title: 'Social Growth',
      description: 'We grow your presence, build communities, and turn followers into loyal customers through strategic social media.',
      cta: 'Grow Social'
    },
    {
      id: 'creative-consulting',
      icon: Lightbulb,
      title: 'Creative Consulting',
      description: 'Expert guidance to solve challenges, unlock opportunities, and take your brand to the next level.',
      cta: 'Book a Call'
    }
  ];

  return (
    <section id="services" className="scroll-section w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 relative z-10 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
        
        {/* Top Capsule Badge */}
        <div className="reveal-headline badge-dark-glass rounded-full px-6 py-1.5 inline-flex items-center justify-center shadow-lg mb-6">
          <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide font-jakarta">
            Our Services
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="reveal-headline text-4xl sm:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.1] font-jakarta mb-4">
          <span className="text-white">Everything Your Brand </span>
          <br className="hidden sm:inline" />
          <span className="text-white">Needs to </span>
          <span className="text-[#85ff2d] font-normal tracking-wide">Grow</span>
        </h2>

        {/* Subtitle Paragraph */}
        <p className="reveal-supporting max-w-2xl text-center text-gray-400 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal font-jakarta px-2">
          From strategy to execution, we build powerful digital experiences that help brands get noticed, connect with the right audience, and grow with purpose.
        </p>

      </div>

      {/* 8 Services Grid - 3D Tilt Parallax Cards with Dynamic Glare */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
        {servicesList.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <TiltParallaxCard
              key={service.id}
              delay={index * 0.06}
              maxTilt={8}
              className="h-full"
            >
              <div className="glass-card glass-card-hover relative overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[300px] h-full shadow-xl group">
                {/* Liquid Glass Upper Meniscus Reflection */}
                <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-2xl sm:rounded-t-3xl" />

                {/* TOP CONTENT */}
                <div className="relative z-10">
                  {/* Icon Box with Apple Keynote Style Glow */}
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] mb-6 shadow-lg shadow-black/50 group-hover:bg-[#85ff2d]/15 group-hover:border-[#85ff2d]/60 group-hover:scale-110 transition-all duration-300">
                    <IconComponent size={22} className="stroke-[1.75]" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight mb-2.5 font-jakarta">
                    {service.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-jakarta font-normal">
                    {service.description}
                  </p>
                </div>

                {/* BOTTOM CTA LINK */}
                <div className="pt-6 relative z-10">
                  <button
                    onClick={() => onOpenModal(service.title, service.id === 'creative-consulting' ? 'contact' : 'services')}
                    className="btn-dark-glass px-4 py-2 rounded-full text-xs font-semibold text-gray-200 group-hover:text-[#85ff2d] hover:border-[#85ff2d]/50 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>{service.cta}</span>
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1.5 text-[#85ff2d]" />
                  </button>
                </div>
              </div>
            </TiltParallaxCard>
          );
        })}
      </div>
    </section>
  );
};

