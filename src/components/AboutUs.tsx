import React from 'react';
import { Sparkles, Compass, Target, Users, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import { 
  TiltParallaxCard, 
  StatCountUpCard 
} from './apple';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="scroll-section w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-24 relative z-10 min-h-screen flex flex-col justify-center">
      <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
        
        {/* Top Capsule Badge: "About Us" */}
        <div className="reveal-headline badge-dark-glass rounded-full px-6 py-1.5 inline-flex items-center justify-center shadow-lg">
          <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide font-jakarta">
            About Us
          </span>
        </div>

        {/* Main Heading */}
        <div className="reveal-headline space-y-1 sm:space-y-2 max-w-4xl">
          <h2 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight text-white leading-[1.1] font-jakarta">
            Where Strategy
          </h2>
          <h2 className="text-4xl sm:text-6xl lg:text-[76px] font-extrabold tracking-tight leading-[1.1] font-jakarta">
            <span className="text-white">Meets </span>
            <span className="text-[#85ff2d]">Creativity</span>
          </h2>
        </div>

        {/* Subtitle Paragraph */}
        <p className="reveal-supporting max-w-3xl text-center text-gray-300 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal font-jakarta px-2">
          Branzy.in is a creative branding and digital marketing agency helping ambitious businesses grow through strategy, design, and performance-driven marketing. We create meaningful brand experiences that capture attention, build trust, and deliver measurable results.
        </p>

        {/* 3 Curated Feature Cards with 3D Tilt Parallax & Glare Physics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-8 sm:pt-10 text-left items-stretch">
          
          {/* Card 1: What We Do */}
          <div className="h-full">
            <TiltParallaxCard
              delay={0.1}
              maxTilt={8}
              className="h-full"
            >
              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[260px] h-full relative overflow-hidden group">
                {/* Liquid Glass Meniscus Reflection */}
                <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-3xl" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] mb-5 shadow-md hover:scale-105 transition-all duration-300">
                    <Sparkles size={22} className="stroke-[1.75]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-jakarta">
                    What We Do
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal font-jakarta">
                    We combine creativity with strategy to build brands that stand out. From brand identity and website design to social media marketing, content creation, advertising, and performance campaigns, every solution is crafted with purpose and precision.
                  </p>
                </div>
              </div>
            </TiltParallaxCard>
          </div>

          {/* Card 2: Our Approach */}
          <div className="h-full">
            <TiltParallaxCard
              delay={0.22}
              maxTilt={8}
              className="h-full"
            >
              <div className="glass-card glass-card-hover border-2 border-[#85ff2d]/50 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[260px] h-full relative overflow-hidden group shadow-[0_0_30px_rgba(133,255,45,0.15)]">
                {/* Liquid Glass Meniscus Reflection */}
                <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-3xl" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.08] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] mb-5 shadow-md hover:scale-105 transition-all duration-300">
                    <Compass size={22} className="stroke-[1.75]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-jakarta">
                    Our Approach
                  </h3>
                  <div className="space-y-3 font-semibold text-xs sm:text-sm text-gray-200 font-jakarta">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="text-[#85ff2d] font-bold">• Strategy First</span>
                      <span>• Design with Purpose</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                      <span>• Marketing that Performs</span>
                      <span className="text-[#85ff2d] font-bold">• Long-Term Brand Growth</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltParallaxCard>
          </div>

          {/* Card 3: Our Mission & Vision */}
          <div className="h-full">
            <TiltParallaxCard
              delay={0.34}
              maxTilt={8}
              className="h-full"
            >
              <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[260px] h-full relative overflow-hidden group">
                {/* Liquid Glass Meniscus Reflection */}
                <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-3xl" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] mb-5 shadow-md hover:scale-105 transition-all duration-300">
                    <Target size={22} className="stroke-[1.75]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-jakarta">
                    Our Mission & Vision
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal font-jakarta">
                    To empower businesses with world-class branding, creative design, and digital marketing that drives sustainable growth. To become a globally recognised creative agency known for innovation, quality, and impactful brand experiences.
                  </p>
                </div>
              </div>
            </TiltParallaxCard>
          </div>

        </div>

        {/* Bottom Stats Row with Apple Card 6: "Number/Stat Count-Up" & SVG Stroke Draw-In */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full pt-12 sm:pt-16 border-t border-white/10 mt-8">
          <StatCountUpCard
            value={50}
            suffix="+"
            label="Happy Clients"
            sublabel="Worldwide & Local Brands"
            icon={Users}
            duration={2.0}
            delay={0.1}
          />
          <StatCountUpCard
            value={100}
            suffix="+"
            label="Projects Delivered"
            sublabel="End-to-End Execution"
            icon={CheckCircle2}
            duration={2.2}
            delay={0.2}
          />
          <StatCountUpCard
            value={5}
            suffix="X"
            label="Average ROI"
            sublabel="Across Client Campaigns"
            icon={TrendingUp}
            duration={1.8}
            delay={0.3}
          />
          <StatCountUpCard
            value={99.9}
            suffix="%"
            decimals={1}
            label="Client Retention"
            sublabel="Long-Term Partnerships"
            icon={Award}
            duration={2.4}
            delay={0.4}
          />
        </div>

      </div>
    </section>
  );
};

