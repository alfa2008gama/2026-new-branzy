import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  PhoneCall, 
  MapPin, 
  Clock, 
  User, 
  MessageSquare, 
  Send, 
  Layers, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Card3D } from './Card3D';
import { TiltParallaxCard } from './apple';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packagePlan: 'Growth Plan (₹15,999)',
    brief: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Inquiry from Branzy.in*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Selected Package:* ${formData.packagePlan}\n*Campaign Brief:* ${formData.brief || 'N/A'}`;
    const encodedText = encodeURIComponent(text);
    
    // Open WhatsApp for number 1: +91 94775 39577
    window.open(`https://wa.me/919477539577?text=${encodedText}`, '_blank');
    
    // Open WhatsApp for number 2: +91 62918 55233
    setTimeout(() => {
      window.open(`https://wa.me/916291855233?text=${encodedText}`, '_blank');
    }, 300);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="scroll-section w-full max-w-[1700px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-24 relative z-10 min-h-screen flex flex-col justify-center">
      
      {/* Top Capsule Badge */}
      <div className="reveal-headline flex flex-col items-center text-center mb-6">
        <div className="badge-dark-glass rounded-full px-6 py-1.5 inline-flex items-center justify-center shadow-lg">
          <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide font-jakarta">
            Contact Us
          </span>
        </div>
      </div>

      {/* Main Headline & Paragraph */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 sm:mb-16">
        <p className="reveal-headline text-lg sm:text-xl font-semibold text-white tracking-widest uppercase font-jakarta">
          Let's Create
        </p>
        <h2 className="reveal-headline text-5xl sm:text-7xl lg:text-[84px] font-extrabold tracking-tight leading-none font-jakarta">
          <span className="text-white">Something </span>
          <span className="text-[#85ff2d] font-normal tracking-wide">Great</span>
        </h2>
        <p className="reveal-supporting text-gray-300 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal font-jakarta pt-2">
          Tell us what you're building, what you're aiming for, and where you want to go next. Let's turn your ideas into strategies that make your brand impossible to ignore.
        </p>
      </div>

      {/* Grid: Left Contact Info Box & Right Map + Form */}
      <div className="reveal-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Contact Details Card */}
        <div className="reveal-item lg:col-span-5 flex">
          <TiltParallaxCard delay={0.1} maxTilt={6} className="rounded-3xl w-full h-full">
            <div className="rounded-3xl glass-card-solid glass-card-hover p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl h-full group">
              {/* Liquid Meniscus Reflection */}
              <div className="glass-reflection-top absolute top-0 left-0 right-0 h-28 pointer-events-none rounded-t-3xl" />
              
              <div className="space-y-8 sm:space-y-10 relative z-10">
                
                {/* Block 1: EMAIL INBOUNDS */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] shadow-lg shadow-black/50 hover:bg-[#85ff2d]/15 hover:border-[#85ff2d]/60 hover:scale-105 transition-all duration-300">
                    <Mail size={22} className="stroke-[1.75]" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-bold tracking-wider text-[#85ff2d] uppercase font-jakarta">
                      EMAIL INBOUNDS
                    </p>
                    <a href="mailto:branzy.in@gmail.com" className="text-sm sm:text-base font-semibold text-white hover:text-[#85ff2d] transition-colors block font-jakarta">
                      branzy.in@gmail.com
                    </a>
                  </div>
                </div>

                {/* Block 2: HOTLINE CHANNELS */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] shadow-lg shadow-black/50 hover:bg-[#85ff2d]/15 hover:border-[#85ff2d]/60 hover:scale-105 transition-all duration-300">
                    <PhoneCall size={22} className="stroke-[1.75]" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-bold tracking-wider text-[#85ff2d] uppercase font-jakarta">
                      HOTLINE CHANNELS
                    </p>
                    <div className="text-sm sm:text-base font-semibold text-white space-y-1 font-jakarta">
                      <a href="https://wa.me/919477539577" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#85ff2d] transition-colors">
                        <span>+91 94775 39577</span>
                        <span className="text-[10px] bg-[#85ff2d]/20 text-[#85ff2d] border border-[#85ff2d]/40 px-2 py-0.5 rounded-full font-bold">WhatsApp</span>
                      </a>
                      <a href="https://wa.me/916291855233" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#85ff2d] transition-colors">
                        <span>+91 62918 55233</span>
                        <span className="text-[10px] bg-[#85ff2d]/20 text-[#85ff2d] border border-[#85ff2d]/40 px-2 py-0.5 rounded-full font-bold">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Block 3: PHYSICAL LOCATION */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] shadow-lg shadow-black/50 hover:bg-[#85ff2d]/15 hover:border-[#85ff2d]/60 hover:scale-105 transition-all duration-300">
                    <MapPin size={22} className="stroke-[1.75]" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-bold tracking-wider text-[#85ff2d] uppercase font-jakarta">
                      PHYSICAL LOCATION
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/NU4gyARydQredYS37" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-medium text-gray-200 leading-relaxed font-jakarta hover:text-[#85ff2d] transition-colors block group/loc"
                    >
                      <span>ADA Palace, Behala Para Lane, Kolkata - 700034, West Bengal, India</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#85ff2d] font-bold ml-1.5 underline">
                        <span>Open Map</span>
                        <ExternalLink size={12} />
                      </span>
                    </a>
                  </div>
                </div>

                {/* Block 4: BUSINESS OPERATIONS */}
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/[0.07] backdrop-blur-xl border border-white/20 flex items-center justify-center text-[#85ff2d] shadow-lg shadow-black/50 hover:bg-[#85ff2d]/15 hover:border-[#85ff2d]/60 hover:scale-105 transition-all duration-300">
                    <Clock size={22} className="stroke-[1.75]" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <p className="text-xs font-bold tracking-wider text-[#85ff2d] uppercase font-jakarta">
                      BUSINESS OPERATIONS
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white font-jakarta">
                      Mon - Sat
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 font-jakarta">
                      (9:00AM - 8:00 PM IST)
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </TiltParallaxCard>
        </div>

        {/* RIGHT COLUMN: Map + Inquiry Form */}
        <div className="reveal-item lg:col-span-7 space-y-6 flex flex-col justify-between">
          
          {/* Top Location Card with Live Google Maps Preview Embed & Direct Link */}
          <a
            href="https://maps.app.goo.gl/NU4gyARydQredYS37"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-3xl glass-card overflow-hidden relative min-h-[220px] sm:min-h-[240px] shadow-xl group border border-white/15 hover:border-[#85ff2d]/60 transition-all cursor-pointer"
            title="Click to open ADA Palace on Google Maps"
          >
            {/* Embedded Google Map iframe */}
            <iframe
              title="Branzy.in Location Map"
              src="https://maps.google.com/maps?q=ADA%20Palace%2C%20Behala%20Para%20Ln%2C%20Kolkata&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0 filter grayscale invert opacity-75 contrast-125 group-hover:opacity-90 group-hover:filter-none transition-all duration-500 pointer-events-none"
              loading="lazy"
            />

            {/* Dark glass overlay tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

            {/* Custom Location Pin Marker */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex flex-col items-center">
                <div className="bg-black/90 backdrop-blur-md border border-[#85ff2d] px-4 py-2 rounded-full text-white font-bold text-xs flex items-center gap-2 shadow-md group-hover:scale-105 transition-transform">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#85ff2d]"></span>
                  <span className="text-[#85ff2d]">ADA PALACE</span>
                  <span className="text-[10px] text-gray-300 font-normal">Behala Para Ln</span>
                </div>
                <div className="w-4 h-4 bg-[#85ff2d] rotate-45 -mt-2 shadow-lg"></div>
              </div>
            </div>

            {/* Top Left Label */}
            <div className="absolute top-4 left-6 text-[11px] font-bold text-white tracking-wider font-jakarta bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
              ADA PALACE <span className="text-[9px] text-[#85ff2d] block font-normal">প্যালেস, Behala Para Ln</span>
            </div>

            {/* Bottom Right Open in Maps Badge */}
            <div className="absolute bottom-4 right-6 text-xs font-bold text-black bg-[#85ff2d] hover:bg-[#a4ff5e] px-3.5 py-1.5 rounded-full shadow-md tracking-wide font-jakarta flex items-center gap-1.5 transition-all">
              <span>View On Google Maps</span>
              <ExternalLink size={13} />
            </div>
          </a>

          {/* Bottom Interactive Form Card */}
          <Card3D className="rounded-3xl">
            <div className="rounded-3xl glass-card-solid glass-card-hover p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
              {/* Liquid Meniscus Reflection */}
              <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-3xl" />
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1 font-jakarta">
                      YOUR NAME *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Full Name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#85ff2d] transition-colors font-jakarta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1 font-jakarta">
                      EMAIL ADDRESS *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#85ff2d] transition-colors font-jakarta"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone & Target Package */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1 font-jakarta">
                      PHONE NUMBER
                    </label>
                    <div className="relative">
                      <PhoneCall size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91XXXX XXXXXX"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#85ff2d] transition-colors font-jakarta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1 font-jakarta">
                      TARGET MODULE / PACKAGE
                    </label>
                    <div className="relative">
                      <Layers size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        id="packagePlanSelect"
                        value={formData.packagePlan}
                        onChange={(e) => setFormData({ ...formData, packagePlan: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm focus:outline-none focus:border-[#85ff2d] transition-colors font-jakarta appearance-none"
                      >
                        <option value="Starter Plan (₹5,999)">Starter Plan (₹5,999)</option>
                        <option value="Growth Plan (₹15,999)">Growth Plan (₹15,999)</option>
                        <option value="Premium Plan (₹24,999)">Premium Plan (₹24,999)</option>
                        <option value="Custom Bespoke Solution">Custom Bespoke Solution</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Row 3: Campaign Brief */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-gray-300 uppercase mb-1 font-jakarta">
                    CAMPAIGN BRIEF / QUERIES *
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-3 text-gray-400" />
                    <textarea
                      rows={3}
                      required
                      value={formData.brief}
                      onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                      placeholder="Describe your current platforms, social tags, and desired target outcomes..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-[#85ff2d] transition-colors font-jakarta resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Single Dispatch via WhatsApp Button (Dispatches to Both Numbers) */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full btn-green-glossy rounded-xl py-3.5 px-4 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-all cursor-pointer shadow-md"
                  >
                    <Send size={18} />
                    <span>DISPATCH BRIEF VIA WHATSAPP</span>
                  </button>
                </div>

                {submitted && (
                  <div className="p-3 rounded-xl bg-[#85ff2d]/15 border border-[#85ff2d] text-[#85ff2d] text-xs font-semibold text-center flex items-center justify-center gap-2 animate-in fade-in">
                    <CheckCircle2 size={16} />
                    <span>Opening WhatsApp to dispatch your campaign brief...</span>
                  </div>
                )}

              </form>
            </div>
          </Card3D>

        </div>

      </div>

    </section>
  );
};

