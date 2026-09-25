import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Star, Send } from 'lucide-react';
import { ModalState } from '../types';

interface ModalProps {
  modal: ModalState;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ modal, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!modal.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl glass-nav-container rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Liquid Meniscus Reflection */}
        <div className="glass-reflection-top absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-3xl" />
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#85ff2d]"></span>
            <h3 className="text-xl font-bold font-jakarta text-white">{modal.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content depending on type */}
        {modal.type === 'contact' && (
          <div>
            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle size={56} className="text-[#85ff2d] animate-bounce" />
                <h4 className="text-2xl font-bold">Message Sent!</h4>
                <p className="text-gray-300 text-sm max-w-sm">
                  Thanks for reaching out to Branzy.in. Our team will review your project and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-sm text-gray-300">
                  Ready to dominate your market? Fill out the form below and let's discuss your brand goals.
                </p>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#85ff2d] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#85ff2d] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Project Details</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your campaign goals, budget, or timeline..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#85ff2d] text-sm resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full btn-green-glossy rounded-xl py-3 text-black font-semibold text-sm flex items-center justify-center gap-2 mt-2"
                >
                  <span>Submit Inquiry</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        )}

        {modal.type === 'services' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              At <span className="font-bold text-white">Branzy.in</span>, we engineer high-performance marketing ecosystems tailored to deliver market leadership.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Performance Ads', desc: 'Meta & Google Ads targeted for maximum ROI & customer acquisition.' },
                { title: 'SEO & Content Dominance', desc: 'Rank #1 for high-intent buyer keywords organically.' },
                { title: 'Brand Identity & Design', desc: 'High-converting graphics, positioning & video creative.' },
                { title: 'Conversion Rate Optimization', desc: 'Transform traffic into loyal, repeat paying customers.' }
              ].map((service, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#85ff2d]/50 transition-colors">
                  <h4 className="font-bold text-sm text-[#85ff2d] mb-1">{service.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 flex justify-end">
              <button
                onClick={onClose}
                className="btn-green-glossy rounded-full px-6 py-2 text-black font-semibold text-xs"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {modal.type === 'work' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-300">
              A glimpse into our recent marketing breakthroughs for hyper-growth brands:
            </p>
            <div className="space-y-3 pt-1">
              {[
                { brand: 'FinTech Platform', result: '+340% User Growth in 90 Days', tag: 'Paid Acquisition' },
                { brand: 'E-Commerce Fashion', result: '7.8x ROAS on Meta & TikTok', tag: 'Creative Strategy' },
                { brand: 'SaaS Enterprise', result: '#1 Search Ranking for 12 Core Keywords', tag: 'SEO Dominance' }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold tracking-wider text-[#85ff2d] uppercase">{item.tag}</span>
                    <h5 className="font-bold text-white text-sm">{item.brand}</h5>
                    <p className="text-xs text-gray-300">{item.result}</p>
                  </div>
                  <ArrowRight size={18} className="text-gray-400" />
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="btn-green-glossy rounded-full px-6 py-2 text-black font-semibold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}

        {modal.type === 'info' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-bold text-white">Branzy.in</span> is a boutique digital marketing powerhouse. We combine data-driven strategy with relentless execution to elevate visionary companies into dominant industry leaders.
            </p>
            <div className="flex items-center gap-1 text-amber-400 pt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              <span className="text-xs text-gray-300 ml-2 font-medium">5.0 Star Rated by 50+ Global Clients</span>
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={onClose}
                className="btn-green-glossy rounded-full px-6 py-2 text-black font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
