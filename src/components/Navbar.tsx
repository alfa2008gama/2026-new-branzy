import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeNav: NavItem;
  setActiveNav: (nav: NavItem) => void;
  onOpenModal: (title: string, type: 'contact' | 'services' | 'work' | 'info') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeNav, setActiveNav, onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems: NavItem[] = ['Home', 'About us', 'Services', 'Work', 'Pricing', 'Review', 'Contact'];

  // Track scroll position to bring in the floating navigation bar when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      // Trigger floating nav when scrolling past the top hero header
      setScrolled(window.scrollY > 75);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer to auto-update active nav item as user scrolls through sections
  useEffect(() => {
    const sectionIds: { id: string; name: NavItem }[] = [
      { id: 'about', name: 'About us' },
      { id: 'services', name: 'Services' },
      { id: 'work', name: 'Work' },
      { id: 'pricing', name: 'Pricing' },
      { id: 'reviews', name: 'Review' },
      { id: 'contact', name: 'Contact' },
    ];

    const handleSpy = () => {
      if (window.scrollY < 200) {
        setActiveNav('Home');
        return;
      }

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const { id, name } = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveNav(name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleSpy);
  }, [setActiveNav]);

  const handleNavClick = (item: NavItem) => {
    setActiveNav(item);
    setMobileMenuOpen(false);

    const scrollToSection = (id: string, modalTitle: string, modalType: 'contact' | 'services' | 'work' | 'info') => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        onOpenModal(modalTitle, modalType);
      }
    };

    if (item === 'About us') scrollToSection('about', 'About Us', 'info');
    else if (item === 'Services') scrollToSection('services', 'Services', 'services');
    else if (item === 'Work') scrollToSection('work', 'Work', 'work');
    else if (item === 'Pricing') scrollToSection('pricing', 'Our Plans', 'info');
    else if (item === 'Review') scrollToSection('reviews', 'Reviews', 'info');
    else if (item === 'Contact') scrollToSection('contact', 'Contact Us', 'contact');
    else if (item === 'Home') window.scrollTo({ top: 0, behavior: 'smooth' });
    else onOpenModal(item, 'info');
  };

  return (
    <>
      {/* 1. HOME PAGE HEADER (Stays on home page, scrolls away naturally with logo & Let's Talk button) */}
      <motion.header 
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full z-40 bg-transparent py-5 sm:py-6"
      >
        <div className="max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex items-center justify-between">
            {/* Brand Logo - stays on home page */}
            <div className="flex items-center">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); handleNavClick('Home'); }}
                className="hover:opacity-90 transition-opacity flex items-center group py-1"
                aria-label="Branzy Home"
              >
                <img 
                  src="https://res.cloudinary.com/kbiolcw6/image/upload/e_trim/v1789691995/Add_a_heading-removebg-preview_vankaq.png"
                  alt="Branzy.in"
                  className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_24px_rgba(133,255,45,0.35)]"
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>

            {/* Center Glassmorphism Nav Pill on Home Page with Smooth Sliding Active Indicator */}
            <nav className="hidden md:flex items-center glass-nav-container rounded-full p-1.5 px-2 backdrop-blur-xl border border-white/15 bg-white/[0.03] shadow-lg relative">
              {navItems.map((item) => {
                const isActive = activeNav === item;
                return (
                  <motion.button
                    key={`top-${item}`}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="topActiveNavIndicator"
                        className="absolute inset-0 rounded-full glass-nav-item-active shadow-sm"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span 
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-black font-semibold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Right CTA Button ("Let's Talk ▶") - stays on home page */}
            <div className="hidden md:flex items-center">
              <motion.button
                onClick={() => handleNavClick('Contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-green-glossy rounded-full px-5 py-2.5 sm:px-6 sm:py-2.5 text-white font-bold text-sm tracking-wide flex items-center gap-2 cursor-pointer group transition-all shadow-md"
              >
                <span>Let's Talk</span>
                <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">▶</span>
              </motion.button>
            </div>

            {/* Mobile Menu Toggle on Home Page */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => handleNavClick('Contact')}
                className="btn-green-glossy rounded-full px-4 py-2 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <span>Let's Talk</span>
                <span className="text-[10px]">▶</span>
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full glass-nav-container text-gray-200 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown on Home Page */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-3 p-3 glass-nav-container rounded-2xl flex flex-col gap-1 shadow-2xl border border-white/15"
              >
                {navItems.map((item) => (
                  <button
                    key={`top-mob-${item}`}
                    onClick={() => handleNavClick(item)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      activeNav === item
                        ? 'glass-nav-item-active text-black font-semibold'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* 2. FLOATING TRAVELING NAVIGATION BAR (Animates down smoothly with gliding active pill as user travels between sections) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="floating-traveling-nav"
            initial={{ y: -60, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.92 }}
            transition={{ 
              type: 'spring', 
              stiffness: 320, 
              damping: 26,
              mass: 0.75 
            }}
            className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center items-center pointer-events-none px-3 sm:px-4"
          >
            <motion.nav 
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto flex items-center gap-1 glass-nav-container rounded-full p-1.5 px-2 backdrop-blur-2xl border border-white/20 shadow-[0_15px_45px_rgba(0,0,0,0.65),0_0_20px_rgba(133,255,45,0.18),0_0_1px_rgba(255,255,255,0.4)_inset] max-w-[95vw] overflow-x-auto no-scrollbar relative"
              aria-label="Floating Travel Navigation"
            >
              {/* Floating Mini Logo */}
              <button
                onClick={() => handleNavClick('Home')}
                className="pl-2 pr-2 py-0.5 flex items-center hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                aria-label="Scroll to Top"
              >
                <img 
                  src="https://res.cloudinary.com/kbiolcw6/image/upload/e_trim/v1789691995/Add_a_heading-removebg-preview_vankaq.png"
                  alt="Branzy"
                  className="h-6 sm:h-7 w-auto object-contain drop-shadow-[0_2px_10px_rgba(133,255,45,0.3)]"
                  referrerPolicy="no-referrer"
                />
              </button>
              <div className="h-5 w-[1px] bg-white/20 shrink-0 mr-1" />
              {navItems.map((item) => {
                const isActive = activeNav === item;
                return (
                  <motion.button
                    key={`floating-${item}`}
                    onClick={() => handleNavClick(item)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full cursor-pointer whitespace-nowrap transition-colors duration-200"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="floatingActiveNavIndicator"
                        className="absolute inset-0 rounded-full glass-nav-item-active shadow-sm"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span 
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? 'text-black font-semibold' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item}
                    </span>
                  </motion.button>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
