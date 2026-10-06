import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function SanctuaryAI({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'SYS', text: 'SANCTUARY NEURAL NET ONLINE. READY FOR INQUIRY.', timestamp: '[ 00:00:01 ]', isAi: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const now = new Date();
    const timestamp = `[ 00:00:${now.getSeconds().toString().padStart(2, '0')} ]`;
    
    const userMsg = {
      id: Date.now(),
      sender: 'OPR',
      text: input.toUpperCase(),
      timestamp,
      isAi: false
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    
    const payload = {
      message: userMsg.text,
      stats: {
        cnsFatigue: 'Low',
        maxDeadlift: 405,
        totalVolume: '12.4K'
      }
    };

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-3.8-flash",
        systemInstruction: "You are SANCTUARY AI, an aggressive, ultra-intense brutalist fitness coach AI. Your responses must be extremely concise (1-2 sentences max), entirely in UPPERCASE, and use robotic/telemetry phrasing (e.g. 'DIRECTIVE', 'PROTOCOL', 'SYSTEM'). Do not use any markdown formatting. Speak like a terminal interface commanding a soldier. Base your advice on the stats provided."
      });

      const prompt = `USER INPUT: ${payload.message}\nUSER STATS: ${JSON.stringify(payload.stats)}`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'SYS',
        text: responseText.toUpperCase().trim(),
        timestamp: `[ 00:00:${new Date().getSeconds().toString().padStart(2, '0')} ]`,
        isAi: true
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'SYS',
        text: 'API CONNECTION FAILED. INITIATING LOCAL OFFLINE DIRECTIVE: PUSH HARDER.',
        timestamp: `[ 00:00:${new Date().getSeconds().toString().padStart(2, '0')} ]`,
        isAi: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Heavy Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          
          {/* Brutalist Terminal Console */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed top-0 right-0 h-full w-full md:w-[600px] bg-black border-l-8 border-brand-red z-[110] flex flex-col shadow-[-30px_0px_0px_0px_rgba(138,0,0,0.5)]"
          >
            {/* Console Header */}
            <div className="border-b-4 border-white/20 p-8 flex justify-between items-end bg-[#050505]">
              <div>
                <h2 className="text-4xl font-black italic uppercase font-display text-white leading-none">
                  SANCTUARY <span className="text-brand-red">AI</span>
                </h2>
                <div className="font-mono text-sm tracking-[0.4em] font-bold text-brand-red mt-4 bg-brand-red/10 inline-block px-3 py-1 border border-brand-red/30">
                  // TERMINAL_ACCESS_GRANTED
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-white hover:text-black font-mono text-2xl leading-none border-2 border-white/20 px-4 py-2 hover:bg-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Chat Log */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-10">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-3">
                  <div className={`flex gap-6 font-mono text-[12px] font-bold tracking-[0.3em] ${msg.isAi ? 'text-brand-red' : 'text-white/40'}`}>
                    <span>{msg.timestamp}</span>
                    <span>{msg.sender}</span>
                  </div>
                  <div className={`text-2xl font-black uppercase ${msg.isAi ? 'text-white font-mono' : 'text-white/60 font-sans pl-6 border-l-4 border-white/20'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Command Input */}
            <form onSubmit={handleSend} className="p-8 border-t-4 border-white/20 bg-[#050505] flex flex-col gap-4">
              {isLoading && (
                <div className="font-mono text-sm text-brand-red font-bold tracking-[0.2em] animate-pulse">
                  // UPLINK_ESTABLISHED... AWAITING_DIRECTIVE_
                </div>
              )}
              <div className="flex gap-6 items-center w-full">
                <span className="font-mono text-brand-red text-3xl font-black leading-none">{'>'}</span>
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-transparent border-b-4 border-white/20 p-3 font-mono text-xl font-bold text-white outline-none focus:border-brand-red transition-colors rounded-none placeholder:text-white/20 uppercase disabled:opacity-50"
                  placeholder="AWAITING COMMAND..."
                  autoFocus
                />
                <button type="submit" className="hidden" disabled={isLoading}>Execute</button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
