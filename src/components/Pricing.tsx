import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { TiltParallaxCard } from './apple';
import { CountUp } from './CountUp';

interface PricingProps {
  onOpenModal: (title: string, type: 'contact' | 'services' | 'work' | 'info') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenModal }) => {
  // SVG Graphic for the Top-Right Arc Icon on each card (without neon glow)
  const ArcGraphic = () => (
    <div className="relative w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
      <svg className="w-7 h-7 text-[#85ff2d] relative z-10" viewBox="0 0 40 40" fill="none">
        <circle 
          cx="20" 
          cy="20" 
          r="14" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeDasharray="40 50" 
          strokeLinecap="round" 
        />
        <circle cx="20" cy="20" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      </svg>
    </div>
  );

  const handleGetStarted = (planName: string) => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
      const selectEl = document.getElementById('packagePlanSelect') as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = planName;
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      onOpenModal(`${planName} Inquiry`, 'contact');
    }
  };

  return (
    <section id="pricing" className="scroll-section w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 relative z-10 min-h-screen flex flex-col justify-center">
      
      {/* Top Capsule Badge */}
      <div className="reveal-headline flex flex-col items-center text-center mb-6">
        <div className="badge-dark-glass rounded-full px-6 py-1.5 inline-flex items-center justify-center shadow-md">
          <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide font-jakarta">
            Our Plans
          </span>
        </div>
      </div>

      {/* Subtitle Paragraph */}
      <div className="reveal-supporting max-w-3xl mx-auto text-center mb-14 sm:mb-16">
        <p className="text-gray-300 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal font-jakarta">
          Transparent, high-impact growth tiers designed for ambitious brands ready to lead their category.
        </p>
      </div>

      {/* 4 Plans Grid - All using Middle Fold Reveal Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
        
        {/* CARD 1: STARTER PLAN */}
        <div className="flex h-full">
          <TiltParallaxCard
            delay={0.08}
            maxTilt={8}
            className="w-full h-full"
          >
            <div className="rounded-3xl glass-card glass-card-hover p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl relative overflow-hidden group h-full border border-white/10">
              {/* Top Specular Meniscus Reflection */}
              <div className="glass-reflection-top absolute top-0 left-0 right-0 h-28 pointer-events-none rounded-t-3xl" />

              <div className="relative z-10">
                {/* Top Badge & Arc Icon */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold tracking-wider text-gray-200 font-jakarta uppercase pt-1">
                    STARTER PLAN
                  </span>
                  <ArcGraphic />
                </div>

                {/* Price */}
                <div className="mb-3 flex items-baseline gap-1">
                  <CountUp 
                    prefix="₹" 
                    to={5999} 
                    duration={2}
                    className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta" 
                  />
                  <span className="text-xs font-bold text-[#85ff2d] tracking-wide uppercase">
                    /MONTH
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed mb-6 font-jakarta min-h-[42px]">
                  Ideal for local studios looking to stabilize their organic social aesthetics.
                </p>

                {/* Button */}
                <button
                  onClick={() => handleGetStarted('Starter Plan (₹5,999)')}
                  className="w-full btn-dark-glass rounded-full py-2.5 px-4 border border-white/20 text-[#85ff2d] font-semibold text-xs sm:text-sm transition-all mb-6 cursor-pointer hover:border-[#85ff2d] hover:scale-[1.02]"
                >
                  Get Started
                </button>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {[
                    '10+2 High-End Digital Creatives',
                    '3-4 Pro AI Videos (25s length)',
                    '5 Cinematic Reel Edits',
                    'Social Media Management (2 Platforms)',
                    'Standard Copy Support',
                    'Regular Performance Tracking'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200 font-jakarta leading-tight">
                      <CheckCircle2 size={15} className="text-[#85ff2d] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltParallaxCard>
        </div>

        {/* CARD 2: FEATURED OFFER CARD - TRANSPARENT LIQUID GLASS WITH LIME CRYSTAL RIM */}
        <div className="flex h-full">
          <TiltParallaxCard
            delay={0.16}
            maxTilt={8}
            className="w-full h-full"
          >
            <div className="rounded-3xl glass-card glass-card-hover border-2 border-[#85ff2d]/80 text-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-full group shadow-[0_0_35px_rgba(133,255,45,0.25)]">
              {/* Top Specular Meniscus Reflection */}
              <div className="glass-reflection-top absolute top-0 left-0 right-0 h-28 pointer-events-none rounded-t-3xl" />

              <div className="relative z-10">
                {/* Top Badge & Arc Icon */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-extrabold tracking-wider text-black bg-[#85ff2d] px-3 py-1 rounded-full font-jakarta uppercase shadow-sm">
                    BEST OFFER • POPULAR
                  </span>
                  <div className="relative w-12 h-12 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    <svg className="w-7 h-7 text-[#85ff2d] relative z-10" viewBox="0 0 40 40" fill="none">
                      <circle 
                        cx="20" 
                        cy="20" 
                        r="14" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeDasharray="40 50" 
                        strokeLinecap="round" 
                      />
                      <circle cx="20" cy="20" r="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3 flex items-baseline gap-1">
                  <CountUp 
                    prefix="₹" 
                    to={15999} 
                    duration={2.2}
                    className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta" 
                  />
                  <span className="text-xs font-bold text-[#85ff2d] tracking-wide uppercase">
                    /MONTH
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed mb-6 font-jakarta min-h-[42px]">
                  Maximize brand conversion across multiple channels with active shoots.
                </p>

                {/* Button */}
                <button
                  onClick={() => handleGetStarted('Growth Plan (₹15,999)')}
                  className="w-full btn-green-glossy text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-full transition-all mb-6 cursor-pointer hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Get Started</span>
                </button>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {[
                    '15+2 Custom Premium Creatives',
                    '6 Advanced AI Videos (30–35s length)',
                    'Bulk Content Creation (20+ reels/month)',
                    '1 Day Professional Studio Shoot',
                    '2 Story-line Ad Copy Edits',
                    'Social Media Management (5 Platforms)',
                    'Paid Performance Ad Campaigns Setup',
                    'Priority Email & Slack Support',
                    'Full Competitor Strategy Analysis'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200 font-jakarta leading-tight font-medium">
                      <CheckCircle2 size={15} className="text-[#85ff2d] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltParallaxCard>
        </div>

        {/* CARD 3: PREMIUM PLAN */}
        <div className="flex h-full">
          <TiltParallaxCard
            delay={0.24}
            maxTilt={8}
            className="w-full h-full"
          >
            <div className="rounded-3xl glass-card glass-card-hover p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl relative overflow-hidden group h-full border border-white/10">
              {/* Top Specular Meniscus Reflection */}
              <div className="glass-reflection-top absolute top-0 left-0 right-0 h-28 pointer-events-none rounded-t-3xl" />

              <div className="relative z-10">
                {/* Top Badge & Arc Icon */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold tracking-wider text-gray-200 font-jakarta uppercase pt-1">
                    PREMIUM PLAN
                  </span>
                  <ArcGraphic />
                </div>

                {/* Price */}
                <div className="mb-3 flex items-baseline gap-1">
                  <CountUp 
                    prefix="₹" 
                    to={22999} 
                    duration={2.5}
                    className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta" 
                  />
                  <span className="text-xs font-bold text-[#85ff2d] tracking-wide uppercase">
                    /MONTH
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed mb-6 font-jakarta min-h-[42px]">
                  Complete enterprise dominance system with dedicated agency services.
                </p>

                {/* Button */}
                <button
                  onClick={() => handleGetStarted('Premium Plan (₹24,999)')}
                  className="w-full btn-dark-glass rounded-full py-2.5 px-4 border border-white/20 text-[#85ff2d] font-semibold text-xs sm:text-sm transition-all mb-6 cursor-pointer hover:border-[#85ff2d] hover:scale-[1.02]"
                >
                  Get Started
                </button>

                {/* Features */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {[
                    'Unlimited High-End Creative Assets',
                    '3 Days Professional Studio Shoots',
                    'Elite Content Creation (30+ reels/month)',
                    '5 Custom Story-line Ad Edits',
                    'Active Paid Advertising Campaigns',
                    'Bespoke High-End Content Production',
                    'Advanced Live Analytics Dashboard',
                    '24/7 Dedicated Account Lead Support',
                    'Full Corporate Brand Identity Package',
                    'Complete Technical SEO Strategy',
                    'Influencer Outreach & Sourcing Partnerships'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-200 font-jakarta leading-tight">
                      <CheckCircle2 size={15} className="text-[#85ff2d] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltParallaxCard>
        </div>

        {/* CARD 4: BESPOKE SOLUTION */}
        <div className="flex h-full">
          <TiltParallaxCard
            delay={0.32}
            maxTilt={8}
            className="w-full h-full"
          >
            <div className="rounded-3xl glass-card glass-card-hover p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl relative overflow-hidden group h-full border border-white/10">
              {/* Top Specular Meniscus Reflection */}
              <div className="glass-reflection-top absolute top-0 left-0 right-0 h-28 pointer-events-none rounded-t-3xl" />

              <div className="relative z-10">
                {/* Top Badge & Arc Icon */}
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-300 font-jakarta pt-1">
                    Bespoke Solution
                  </span>
                  <ArcGraphic />
                </div>

                {/* Price Title */}
                <div className="mb-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-jakarta">
                    Custom
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-300 font-normal leading-relaxed mb-6 font-jakarta min-h-[42px]">
                  Complete omni-channel dominance suite with custom brand blueprints.
                </p>

                {/* Button */}
                <button
                  onClick={() => handleGetStarted('Custom Bespoke Solution')}
                  className="w-full btn-dark-glass rounded-full py-2.5 px-4 border border-white/20 text-[#85ff2d] font-semibold text-xs sm:text-sm transition-all mb-6 cursor-pointer hover:border-[#85ff2d] hover:scale-[1.02]"
                >
                  Get Started
                </button>

                {/* Included Section */}
                <div className="space-y-2.5 pt-4 border-t border-white/10 mb-5">
                  <p className="text-[11px] font-bold tracking-wider text-gray-200 font-jakarta uppercase mb-2">
                    WHAT'S INCLUDED
                  </p>
                  {[
                    'Complete Brand Identity System',
                    'Logo Design + Brand Guidelines',
                    'Social Media Content & Management',
                    'Premium Website Design & Development',
                    'SEO & Local Search Optimization',
                    'Meta & Google Ads Management',
                    'Creative Ad Campaign Design',
                    'Reels, Video Editing & Motion Graphics',
                    'Dedicated Project Manager',
                    'Monthly Growth Reports',
                    'Priority Support & Faster Delivery',
                    'Multi-Platform Marketing Strategy'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-200 font-jakarta leading-tight">
                      <CheckCircle2 size={13} className="text-[#85ff2d] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Add-ons Section */}
                <div className="space-y-2.5 pt-3 border-t border-white/10">
                  <p className="text-[11px] font-bold tracking-wider text-[#85ff2d] font-jakarta uppercase mb-2">
                    PREMIUM ADD-ONS INCLUDED
                  </p>
                  {[
                    'AI Content Creation',
                    'Professional Photoshoot Direction',
                    'Branding Consultation',
                    'Marketing Automation Setup',
                    'WhatsApp Business Integration',
                    'Landing Page Funnel Creation'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-gray-200 font-jakarta leading-tight">
                      <CheckCircle2 size={13} className="text-[#85ff2d] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </TiltParallaxCard>
        </div>

      </div>
    </section>
  );
};



