'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquare, CornerDownLeft, Sparkles, Terminal } from 'lucide-react';
import { sounds } from '@/lib/sounds';

// Pre-defined conversational intelligence responses
const MOCK_AI_RESPONSES: Array<{ keywords: string[]; text: string; action?: { label: string; link: string; download?: boolean } }> = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'yo'],
    text: "Hello! I am Gokul AI v2.0, a virtual assistant configured to represent Gokul. You can ask me about his skills, internships, portfolio projects, contact details, or request to download his Resume!"
  },
  {
    keywords: ['skills', 'tech', 'stack', 'languages', 'databases', 'frontend'],
    text: "Gokul specializes in: \n\n• **AI / Machine Learning**: TensorFlow, Keras, Scikit-Learn, OpenCV, NLP, Deep Learning.\n• **Languages**: Python, Java, C, SQL, HTML, CSS, JavaScript.\n• **Frameworks**: FastAPI, Spring Boot, React, Next.js, TailwindCSS.\n• **Databases**: MongoDB, MySQL."
  },
  {
    keywords: ['projects', 'portfolio'],
    text: "Gokul's top active developments are:\n\n1. **Pest Detection Agent**: Two-stage TensorFlow pipeline for crop disease checkouts & Gemini advice.\n2. **BudgetWise AI**: Personal finance app powered by FastAPI and Gemini recommendations.\n3. **Online Auction Bazaar**: High-concurrency Java Spring Boot backend database bidding platform.\n\nQuery `pest` or `budgetwise` to get their direct deploy launch links!",
  },
  {
    keywords: ['budgetwise', 'finance', 'budgetwise ai'],
    text: "BudgetWise AI is an AI-powered personal finance assistant that creates personalized monthly budgets based on user income, expenses, and goals.\n\n• **Stack**: FastAPI, MongoDB, Gemini API, JWT, Python\n\nClick the button below to launch the live application on Render!",
    action: {
      label: 'Launch BudgetWise AI Live',
      link: 'https://budgetwise-ai-6pqv.onrender.com'
    }
  },
  {
    keywords: ['pest', 'disease', 'pest detection', 'crop'],
    text: "Pest Detection Agent is a two-stage AI pipeline that identifies plant diseases from uploaded leaf images and uses Google Gemini API to generate detailed treatment recommendations.\n\n• **Stack**: Python, FastAPI, TensorFlow, Gemini API, MongoDB\n\nClick the button below to launch the live application on Render!",
    action: {
      label: 'Launch Pest Detection Live',
      link: 'https://pest-detection-agent.onrender.com'
    }
  },
  {
    keywords: ['auction', 'bazaar'],
    text: "Online Auction Bazaar is a secure full-stack web auction platform built on Spring Boot and MySQL with user registration, role-based access control, and bidding validation logic.",
  },
  {
    keywords: ['experience', 'intern', 'work', 'job', 'timeline'],
    text: "Gokul's cyber timeline includes:\n\n• **Machine Learning Intern** (CodeAlpha): Engineered CNN models for image processing classification.\n• **Infosys Springboard** (Virtual): Gained enterprise foundation training in Java, SQL, and Agile processes."
  },
  {
    keywords: ['resume', 'download', 'cv'],
    text: "Understood. Click the button below to download Gokul's latest professional CV PDF directly onto your machine.",
    action: {
      label: 'Download Resume PDF',
      link: '/Gokulakrishnan_Resume.pdf',
      download: true
    }
  },
  {
    keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'location'],
    text: "You can reach Gokul at:\n\n• **Email**: gokuls.cse.work@gmail.com\n• **Phone**: +91 80159 39712\n• **Location**: Tamil Nadu, India\n\nOr drop him a message using the Contact section form at the bottom of the site!",
  },
  {
    keywords: ['hack', 'matrix', 'terminal', 'override'],
    text: "🚨 system alert: You have detected a console override phrase! Open the developer terminal at the bottom-right and type `hack` to execute diagnostics override systems.",
  }
];

const DEFAULT_FALLBACK = 
  "I've cataloged your inquiry. I can give detailed stats on Gokul's **Skills**, **Projects**, **Experience**, **Contact** links, or package his **Resume** file. Try querying one of these!";

export default function GokulAIChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Array<{ id: string; sender: 'user' | 'ai'; text: string; action?: any }>>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "System Online. Welcome! I am Gokul's conversational digital replica. Ask me anything about his credentials, capabilities, or projects."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    sounds.playClick();
    
    // Add user message
    const userMsg = { id: Math.random().toString(), sender: 'user' as const, text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Play chirp scan sound
    setTimeout(() => {
      sounds.playSystemScan();
    }, 100);

    // Formulate AI response
    setTimeout(() => {
      const match = MOCK_AI_RESPONSES.find((r) =>
        r.keywords.some((k) => userText.toLowerCase().includes(k))
      );

      const aiText = match ? match.text : DEFAULT_FALLBACK;
      const aiAction = match?.action;

      setMessages((prev) => [
        ...prev,
        { id: Math.random().toString(), sender: 'ai' as const, text: aiText, action: aiAction }
      ]);
      setIsTyping(false);
      sounds.playChatMessage();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { sounds.playClick(); onClose(); }}
            className="fixed inset-0 z-[150] bg-[#050816]/70 backdrop-blur-md"
          />

          {/* Chat drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed bottom-0 right-0 top-0 z-[160] flex h-full w-full flex-col border-l border-white/10 bg-[#0c1223]/95 backdrop-blur-xl p-0 shadow-2xl shadow-cyan/20 sm:max-w-md"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 p-5">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 border border-cyan/25 text-cyan animate-pulse">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-white flex items-center gap-1.5">
                    Gokul AI Agent <Sparkles className="h-3 w-3 text-purple" />
                  </h3>
                  <p className="text-[10px] tracking-wide text-cyan/70 uppercase font-mono">v2.0 // Active Core</p>
                </div>
              </div>
              <button
                onClick={() => { sounds.playClick(); onClose(); }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-white/50 hover:text-white hover:border-white/15 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-5 scrollbar-hide space-y-4 relative"
            >
              {/* Scanline backdrop effect */}
              <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-[0.02]" />

              {messages.map((m) => {
                const isAI = m.sender === 'ai';
                return (
                  <div key={m.id} className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}>
                    {isAI && (
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple/10 border border-purple/20 text-purple-glow">
                        <Bot className="h-4.5 w-4.5" />
                      </span>
                    )}
                    <div className="flex flex-col gap-1 max-w-[80%]">
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          isAI
                            ? 'glass-light border border-white/5 text-foreground'
                            : 'bg-gradient-to-br from-cyan to-purple text-[#050816] font-medium shadow-md shadow-cyan/10'
                        }`}
                      >
                        {m.text.split('\n').map((line, idx) => (
                          <p key={idx} className={idx > 0 ? 'mt-2' : ''}>
                            {line.startsWith('•') || line.startsWith('1.') ? (
                              <span className="block pl-1">{line}</span>
                            ) : (
                              // Match markdown bold tags
                              line.split('**').map((seg, sIdx) => 
                                sIdx % 2 === 1 ? <strong key={sIdx} className="font-bold text-cyan-glow">{seg}</strong> : seg
                              )
                            )}
                          </p>
                        ))}

                        {/* Custom action attachment */}
                        {m.action && (
                          <div className="mt-3">
                            <a
                              href={m.action.link}
                              download={m.action.download}
                              onClick={() => sounds.playSuccess()}
                              className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-semibold text-white transition-all shadow-inner"
                            >
                              <Sparkles className="h-3.5 w-3.5 text-cyan animate-pulse" />
                              {m.action.label}
                            </a>
                          </div>
                        )}
                      </div>
                      <span className="text-[9px] text-muted-foreground/60 px-1 font-mono uppercase">
                        {isAI ? 'replica // system' : 'guest // client'}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Simulated typing status */}
              {isTyping && (
                <div className="flex gap-3 justify-start animate-pulse">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple/10 border border-purple/20 text-purple-glow">
                    <Bot className="h-4.5 w-4.5" />
                  </span>
                  <div className="flex flex-col gap-1.5 max-w-[80%]">
                    <div className="rounded-2xl glass-light border border-white/5 px-4 py-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-purple [animation-delay:0.2s]" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan [animation-delay:0.4s]" />
                      </div>
                      
                      {/* Audio visualizer spectrum bars */}
                      <div className="flex items-end gap-0.5 h-3 mt-1 px-1">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div
                            key={i}
                            className="w-0.7 bg-cyan/60 rounded-full"
                            style={{
                              height: `${20 + Math.random() * 80}%`,
                              animation: `soundBar 0.8s ease-in-out infinite alternate`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t border-white/10 p-4 bg-[#080d1a]/80">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  disabled={isTyping}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Gokul AI (e.g. skills, resume, timeline)..."
                  className="w-full rounded-xl border border-white/5 bg-[#050816]/90 p-4.5 pr-14 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan/40 focus:outline-none focus:glow-cyan transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-9.5 w-9.5 items-center justify-center rounded-lg bg-gradient-to-r from-cyan to-purple text-[#050816] transition-transform hover:scale-[1.05] disabled:opacity-40"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground/60 font-mono">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-cyan" /> Press Enter to transmit
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="h-3 w-3" /> return key
                </span>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
