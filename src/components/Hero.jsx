import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-brand-red-dark flex items-center justify-center overflow-hidden">
      {/* Background Deep Red Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#A00000] to-[#300000] z-0" />

      {/* Massive Typography - Behind Athlete */}
      <div className="absolute inset-0 flex items-center justify-center z-10 select-none">
        <motion.h1 
          className="text-[17vw] font-black tracking-tighter text-white leading-[0.8] whitespace-nowrap opacity-95 font-display"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          VELOCITY
        </motion.h1>
      </div>

      {/* Athlete Image - Center - Multiply Blend Mode */}
      {/* Using multiply blend mode makes the white background of the image transparent, while multiplying its color with the red background and white text. */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-multiply opacity-90 pt-10">
        <img 
          src="/athlete_cutout.jpg" 
          alt="Athlete" 
          className="h-[100vh] object-contain scale-110 object-bottom drop-shadow-2xl"
        />
      </div>

      {/* Extra Overlay for moody contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />

      {/* Technical UI Grid Accents */}
      <div className="absolute bottom-0 w-full z-30 p-8 pb-12 flex justify-between items-end border-t border-white/10 font-mono text-xs tracking-[0.25em] text-white/70">
        <div className="flex gap-8">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <span className="text-white">+</span>
            <span>TENSION</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <span className="text-white">+</span>
            <span>IMMERSION</span>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="text-white">+</span>
            <span>IMPACT</span>
          </motion.div>
        </div>
        <motion.div 
          className="flex flex-col items-end gap-1 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/40 tracking-[0.4em]">SYS.ON</span>
          <span>[ 00:00:01 ]</span>
        </motion.div>
      </div>
      
      {/* Corner Accents */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t-2 border-l-2 border-white/80 z-30" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t-2 border-r-2 border-white/80 z-30" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b-2 border-l-2 border-white/30 z-30" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b-2 border-r-2 border-white/30 z-30" />

      {/* Navigation Button */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 flex gap-6">
        <Link 
          to="/vault" 
          className="relative z-[100] font-mono text-sm tracking-[0.3em] font-black text-black bg-white px-8 py-4 uppercase hover:bg-black hover:text-brand-red hover:shadow-[8px_8px_0px_0px_#8A0000] transition-none border-2 border-transparent hover:border-black"
        >
          ENTER THE VAULT
        </Link>
      </div>
    </section>
  );
}
