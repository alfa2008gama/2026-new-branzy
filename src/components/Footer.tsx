import React from 'react';
import { Instagram, Facebook, Twitter, ArrowUpRight, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenModal?: (title: string, type: 'contact' | 'services' | 'work' | 'info') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  const directoryLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Works', href: '#work' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#reviews' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-gray-300 border-t border-white/[0.08] relative z-20 overflow-hidden">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-16 sm:pt-20 pb-10">
        
        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 pb-12 sm:pb-16">
          
          {/* Column 1 — Brand Block (5 cols on lg) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Logo: Official Branzy Logo */}
              <a
                href="#hero"
                onClick={(e) => handleLinkClick(e, '#hero')}
                className="inline-flex items-center hover:opacity-90 transition-opacity group mb-4"
                aria-label="Branzy Home"
              >
                <img 
                  src="https://res.cloudinary.com/kbiolcw6/image/upload/e_trim/v1789691995/Add_a_heading-removebg-preview_vankaq.png"
                  alt="Branzy.in"
                  className="h-12 sm:h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_24px_rgba(133,255,45,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </a>

              {/* Tagline */}
              <p className="text-xs sm:text-sm text-gray-400 font-normal leading-relaxed font-jakarta max-w-md pt-1">
                branzy.in is an award-winning level digital marketing and creative assets engine. We design cinematic commercials, scalable social content, interactive platforms, and hyper-targeted conversion funnels.
              </p>
            </div>

            {/* 3 Social Icons in small dark rounded squares */}
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold font-jakarta mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/branzy.in.media?stkn=MW5iczFrMXdnc2xodw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Branzy Instagram"
                  className="w-10 h-10 rounded-xl btn-dark-glass text-gray-300 hover:text-[#7ed321] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                >
                  <Instagram size={18} />
                </a>

                <a
                  href="https://www.facebook.com/share/1CG6qk7GZD/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Branzy Facebook"
                  className="w-10 h-10 rounded-xl btn-dark-glass text-gray-300 hover:text-[#7ed321] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                >
                  <Facebook size={18} />
                </a>

                <a
                  href="https://x.com/branzy4731"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Branzy Twitter"
                  className="w-10 h-10 rounded-xl btn-dark-glass text-gray-300 hover:text-[#7ed321] flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 — AGENCY DIRECTORIES (3 cols on lg) */}
          <div className="md:col-span-6 lg:col-span-3">
            <h3 className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase font-jakarta mb-5">
              AGENCY DIRECTORIES
            </h3>
            <ul className="space-y-3">
              {directoryLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-gray-400 hover:text-white font-medium font-jakarta transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#7ed321] transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — REGIONAL OUTREACH (4 cols on lg) */}
          <div className="md:col-span-12 lg:col-span-4">
            <h3 className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase font-jakarta mb-5">
              REGIONAL OUTREACH
            </h3>
            
            {/* Liquid Glass Regional Outreach Card */}
            <div className="glass-card-solid glass-card-hover rounded-2xl p-6 relative overflow-hidden group">
              {/* Liquid Meniscus Reflection */}
              <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-2xl" />

              <div className="space-y-4">
                {/* Kolkata Head Office Title & Address */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin size={16} className="text-[#7ed321] shrink-0" />
                    <h4 className="text-white font-bold text-sm sm:text-base font-jakarta tracking-tight">
                      Kolkata Head Office:
                    </h4>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-jakarta pl-6">
                    207/45 B.T. Road, Baranagar, Kolkata - 700036, West Bengal, India
                  </p>
                </div>

                <div className="w-full h-[1px] bg-white/10" />

                {/* Direct Queries & Email Link in accent green */}
                <div>
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider font-jakarta mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-[#7ed321]" />
                    <span>Direct Queries:</span>
                  </p>
                  <a
                    href="mailto:branzy.in@gmail.com"
                    className="text-[#7ed321] hover:text-[#95f030] font-semibold text-sm sm:text-base font-jakarta transition-colors inline-flex items-center gap-1 hover:underline"
                  >
                    <span>branzy.in@gmail.com</span>
                    <ArrowUpRight size={14} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Thin Horizontal Divider */}
        <div className="w-full h-[1px] bg-white/10 mb-6 sm:mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-jakarta">
          {/* Left: © 2026 Branzy.in • Established Secure Intel */}
          <div className="text-center sm:text-left">
            <span className="text-gray-300">© 2026 Branzy.in</span>
            <span className="mx-2 text-gray-600">•</span>
            <span>Established Secure Intel</span>
          </div>

          {/* Right: Designed by Creative Experts 💚 Kolkata, West Bengal */}
          <div className="text-center sm:text-right flex items-center gap-1.5">
            <span>Designed by Creative Experts</span>
            <span className="inline-block text-[#7ed321]" role="img" aria-label="green heart">💚</span>
            <span>Kolkata, West Bengal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
