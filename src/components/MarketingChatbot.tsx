import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Trash2, 
  Minus, 
  Bot, 
  User, 
  Copy, 
  Check, 
  ArrowUpRight,
  Zap,
  Cpu,
  Brain
} from 'lucide-react';
import { ChatMessage, ChatModelMode } from '../types';

interface MarketingChatbotProps {
  onOpenContactModal?: () => void;
}

const QUICK_PROMPTS = [
  "Which Branzy package fits my startup?",
  "How can Branzy scale our ROAS on Meta & Google?",
  "What is included in cinematic video production?",
  "How do you approach Conversion Rate Optimization (CRO)?"
];

export const MarketingChatbot: React.FC<MarketingChatbotProps> = ({ onOpenContactModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ChatModelMode>('gemini-3.5-flash');
  const [showModelPicker, setShowModelPicker] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "👋 Welcome to **Branzy.in**! I'm your **AI Marketing Strategist**.\n\nWhether you need to scale your **Meta/Google ROAS**, revamp your **visual brand identity**, produce **cinematic video commercials**, or pick the right growth package—ask me anything!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Map messages for Gemini API
      const apiPayload = newMessages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: apiPayload,
          model: selectedModel
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get marketing consultation.');
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: data.reply || "I've analyzed your request. Let's engineer a winning marketing blueprint.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chatbot error:', err);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `⚠️ **Agency Strategist Alert**: ${err?.message || 'Unable to connect to Gemini AI services.'}\n\nYou can also contact our team directly via our [Contact Form](#contact) or on WhatsApp (+91 93630 19744).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        text: "Conversation refreshed. I'm ready to architect your brand's next growth sprint. What would you like to explore?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const modelLabels: Record<ChatModelMode, { name: string; tag: string; icon: any }> = {
    'gemini-3.5-flash': { name: 'Gemini 3.5 Flash', tag: 'Balanced & Strategic', icon: Zap },
    'gemini-3.1-flash-lite': { name: 'Gemini 3.1 Flash Lite', tag: 'Ultra-Fast Q&A', icon: Cpu },
    'gemini-3.1-pro-preview': { name: 'Gemini 3.1 Pro', tag: 'Deep Growth Reasoning', icon: Brain },
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex flex-col items-end pointer-events-auto">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="flex items-center gap-3"
            >
              {/* Optional Subtle Callout Pill on Hover / Desktop */}
              <div 
                onClick={() => setIsOpen(true)}
                className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/15 text-xs text-gray-200 shadow-xl cursor-pointer hover:border-[#85ff2d]/50 transition-all group"
              >
                <span className="w-2 h-2 rounded-full bg-[#85ff2d] animate-ping" />
                <span>Chat with <strong>Branzy AI Strategist</strong></span>
              </div>

              {/* Main Trigger Button */}
              <motion.button
                id="branzy-chat-launcher"
                onClick={() => {
                  setIsOpen(true);
                  setIsMinimized(false);
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#1a2315] via-[#0c120a] to-black border border-[#85ff2d]/60 text-white shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(133,255,45,0.35)] cursor-pointer overflow-hidden group"
                aria-label="Open Branzy Marketing Assistant"
              >
                {/* Glow ring */}
                <div className="absolute inset-0 bg-[#85ff2d]/10 rounded-full blur-md group-hover:bg-[#85ff2d]/25 transition-all" />
                
                <div className="relative z-10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#85ff2d] transition-transform duration-300 group-hover:rotate-12" />
                </div>

                {/* Status Dot */}
                <span className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-[#85ff2d] border-2 border-black" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '620px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[440px] max-w-[440px] bg-[#080b0f]/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(133,255,45,0.15)] flex flex-col overflow-hidden font-jakarta pointer-events-auto`}
          >
            {/* Top Gloss Reflection */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-3xl" />

            {/* HEADER */}
            <div className="relative z-10 px-4 py-3.5 sm:px-5 sm:py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/15 p-1.5 flex items-center justify-center shrink-0 shadow-md">
                  <img 
                    src="https://res.cloudinary.com/kbiolcw6/image/upload/e_trim/v1789691995/Add_a_heading-removebg-preview_vankaq.png"
                    alt="Branzy"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#85ff2d] border border-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">Branzy AI</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#85ff2d]/15 text-[#85ff2d] border border-[#85ff2d]/30">
                      Strategist
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">Digital Marketing & Growth Consultant</p>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? "Expand" : "Minimize"}
                  className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Minimize chat"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MODEL SELECTOR ACCORDION / BAR */}
            {!isMinimized && (
              <div className="relative z-10 px-4 py-2 bg-white/[0.02] border-b border-white/[0.08] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                  <span>Engine:</span>
                  <button 
                    onClick={() => setShowModelPicker(!showModelPicker)}
                    className="inline-flex items-center gap-1 text-gray-200 hover:text-[#85ff2d] font-medium transition-colors bg-white/5 hover:bg-white/10 px-2 py-0.5 rounded-lg cursor-pointer"
                  >
                    <span>{modelLabels[selectedModel].name}</span>
                    <span className="text-[9px] text-gray-400">▼</span>
                  </button>
                </div>
                <span className="text-[10px] text-gray-400">Powered by Gemini</span>
              </div>
            )}

            {/* MODEL PICKER DROPDOWN */}
            {showModelPicker && !isMinimized && (
              <div className="relative z-20 mx-4 mt-2 p-2 rounded-2xl bg-[#0f141c] border border-white/20 shadow-2xl text-xs space-y-1">
                {(Object.keys(modelLabels) as ChatModelMode[]).map((key) => {
                  const m = modelLabels[key];
                  const Icon = m.icon;
                  const isCur = selectedModel === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedModel(key);
                        setShowModelPicker(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all cursor-pointer ${
                        isCur ? 'bg-[#85ff2d]/15 text-[#85ff2d] border border-[#85ff2d]/30' : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="text-[10px] text-gray-400">{m.tag}</div>
                        </div>
                      </div>
                      {isCur && <Check className="w-4 h-4 text-[#85ff2d]" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* BODY & MESSAGES (Hidden when minimized) */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm no-scrollbar">
                  {messages.map((msg) => {
                    const isAssistant = msg.role === 'assistant';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-[88%] rounded-2xl p-3.5 relative group ${
                            isAssistant
                              ? msg.isError
                                ? 'bg-red-950/60 border border-red-500/40 text-red-200'
                                : 'bg-white/[0.06] border border-white/15 text-gray-100 shadow-md backdrop-blur-md'
                              : 'bg-gradient-to-r from-[#213511] to-[#122209] border border-[#85ff2d]/40 text-white shadow-lg'
                          }`}
                        >
                          {/* Role Icon and Timestamp Header */}
                          <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-white/10 text-[10px] text-gray-400">
                            <span className="font-semibold flex items-center gap-1">
                              {isAssistant ? (
                                <>
                                  <Bot className="w-3 h-3 text-[#85ff2d]" />
                                  <span>Branzy AI</span>
                                </>
                              ) : (
                                <>
                                  <User className="w-3 h-3 text-gray-300" />
                                  <span>You</span>
                                </>
                              )}
                            </span>
                            <span>{msg.timestamp}</span>
                          </div>

                          {/* Render Markdown Content */}
                          <div className="prose prose-invert prose-sm max-w-none leading-relaxed text-gray-200 text-xs sm:text-[13px] space-y-2">
                            <Markdown>{msg.text}</Markdown>
                          </div>

                          {/* Quick Copy Action */}
                          {isAssistant && (
                            <div className="mt-2 pt-1.5 flex items-center justify-between border-t border-white/10 text-[10px]">
                              <button
                                onClick={() => handleCopy(msg.id, msg.text)}
                                className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-[#85ff2d]" />
                                    <span className="text-[#85ff2d]">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copy Strategy</span>
                                  </>
                                )}
                              </button>

                              {onOpenContactModal && (
                                <button
                                  onClick={onOpenContactModal}
                                  className="flex items-center gap-1 text-[#85ff2d] hover:underline cursor-pointer"
                                >
                                  <span>Book Intro Call</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* LOADING TYPING INDICATOR */}
                  {isLoading && (
                    <div className="flex items-start">
                      <div className="bg-white/[0.05] border border-white/15 rounded-2xl p-3.5 flex items-center gap-2 text-xs text-gray-300">
                        <Sparkles className="w-4 h-4 text-[#85ff2d] animate-spin" />
                        <span className="text-[12px]">Formulating agency strategy...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* QUICK PROMPT SUGGESTIONS */}
                {messages.length <= 3 && !isLoading && (
                  <div className="px-4 py-2 border-t border-white/[0.08] bg-black/20">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1.5 font-semibold">
                      Recommended Topics:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_PROMPTS.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(prompt)}
                          className="text-[11px] text-left px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-[#85ff2d]/15 border border-white/10 hover:border-[#85ff2d]/40 text-gray-300 hover:text-white transition-all cursor-pointer truncate max-w-full"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* INPUT BAR */}
                <div className="p-3 sm:p-4 border-t border-white/10 bg-black/60">
                  <div className="relative flex items-end gap-2 bg-white/[0.06] border border-white/15 rounded-2xl p-1.5 focus-within:border-[#85ff2d]/60 focus-within:ring-1 focus-within:ring-[#85ff2d]/40 transition-all">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about marketing strategy, ROAS, packages..."
                      rows={1}
                      className="flex-1 bg-transparent text-white placeholder-gray-400 text-xs sm:text-sm px-2.5 py-1.5 resize-none focus:outline-none max-h-28 min-h-[38px]"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                        input.trim() && !isLoading
                          ? 'bg-[#85ff2d] text-black hover:bg-[#97ff4f] shadow-[0_0_15px_rgba(133,255,45,0.4)]'
                          : 'bg-white/10 text-gray-500 cursor-not-allowed'
                      }`}
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2 px-1">
                    <span>Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for newline</span>
                    <a 
                      href="https://wa.me/919363019744" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#85ff2d] hover:underline"
                    >
                      WhatsApp Us
                    </a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
