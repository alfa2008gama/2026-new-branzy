import React, { useState, useRef, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { Services } from './components/Services';
import { WorkSection } from './components/WorkSection';
import { Pricing } from './components/Pricing';
import { Reviews } from './components/Reviews';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { MarketingChatbot } from './components/MarketingChatbot';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { NavItem, ModalState } from './types';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('Home');
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    title: '',
    type: 'info'
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Activate agency scroll-driven Intersection Observer animation system
  useScrollAnimations();

  // Ensure background video plays smoothly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy handled with muted + playsInline
      });
    }
  }, []);

  const handleOpenModal = (title: string, type: 'contact' | 'services' | 'work' | 'info') => {
    setModal({
      isOpen: true,
      title,
      type
    });
  };

  const handleCloseModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden no-scrollbar font-jakarta selection:bg-[#85ff2d] selection:text-black">
      {/* Background Video - Zero Black Overlay */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          src="https://res.cloudinary.com/kbiolcw6/video/upload/v1789690999/lv_0_20260918054023_fftkih.mp4"
        />
      </div>

      {/* Scroll-Progress Indicator */}
      <ScrollProgressBar />

      {/* Navigation Header */}
      <Navbar 
        activeNav={activeNav} 
        setActiveNav={setActiveNav} 
        onOpenModal={handleOpenModal} 
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenModal={handleOpenModal} />
        <AboutUs />
        <Services onOpenModal={handleOpenModal} />
        <WorkSection onOpenModal={handleOpenModal} />
        <Pricing onOpenModal={handleOpenModal} />
        <Reviews />
        <Contact />
      </main>

      {/* Website Footer */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Interactive Modal */}
      <Modal modal={modal} onClose={handleCloseModal} />

      {/* Branzy AI Marketing Strategist Chatbot */}
      <MarketingChatbot onOpenContactModal={() => handleOpenModal('Book Strategy Session', 'contact')} />
    </div>
  );
}
