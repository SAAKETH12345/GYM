import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [passcode, setPasscode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode.length > 0) onLogin();
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background brutalist accents */}
      <div className="absolute top-0 right-[-10vw] w-[50vw] h-full bg-brand-red border-l-8 border-white/10 skew-x-[-10deg]" />
      <div className="absolute top-0 left-0 w-8 h-full bg-white/5" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-lg p-12 border-4 border-white bg-[#050505] shadow-[16px_16px_0px_0px_rgba(138,0,0,1)]"
      >
        <div className="mb-12 border-b-2 border-white/20 pb-8">
          <h1 className="text-7xl font-black italic uppercase font-display text-transparent [-webkit-text-stroke:2px_white] leading-none">
            ACCESS
          </h1>
          <h2 className="text-5xl font-black italic uppercase font-display text-brand-red mt-[-10px] leading-none">
            THE VAULT
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <label className="font-mono text-sm tracking-[0.3em] text-white/50 font-bold">OPERATIVE ID / PASSCODE</label>
            <input 
              type="password" 
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-transparent border-b-4 border-white/20 p-4 font-mono text-2xl text-white outline-none focus:border-brand-red transition-colors rounded-none"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-6 w-full py-5 border-4 border-brand-red bg-transparent text-brand-red font-black tracking-[0.3em] text-xl uppercase hover:bg-black hover:text-brand-red hover:shadow-[8px_8px_0_#8A0000] active:shadow-none active:translate-x-2 active:translate-y-2 transition-none rounded-none"
          >
            [ AUTHENTICATE ]
          </button>
        </form>

        <div className="mt-12 pt-6 flex justify-between font-mono text-xs tracking-widest text-white/30 border-t-2 border-white/20">
          <Link to="/" className="hover:bg-black hover:text-brand-red hover:shadow-[4px_4px_0_#8A0000] px-2 py-1 transition-none">{'< ABORT / RETURN TO BASE'}</Link>
          <span>[ ENCRYPTED_CONNECTION ]</span>
        </div>
      </motion.div>
    </div>
  );
}
