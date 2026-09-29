import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiFormCoach() {
  const [state, setState] = useState('idle'); // 'idle' | 'scanning' | 'complete'
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    startScan();
  };

  const startScan = () => {
    setState('scanning');
    setTimeout(() => {
      setState('complete');
    }, 4000);
  };

  const resetScanner = () => {
    setState('idle');
  };

  return (
    <div className="border-4 border-white/10 bg-[#050505] relative p-6 md:p-12 mt-16 w-full flex flex-col">
      {/* Brutalist Title */}
      <div className="mb-8 border-b-4 border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase font-display text-white leading-none">
            AI Form <br/> <span className="text-brand-red">Coach</span>
          </h2>
        </div>
        <div className="font-mono text-sm tracking-widest text-brand-red border-2 border-brand-red/30 px-4 py-2 bg-brand-red/5">
          // TELEMETRY_SCANNER_V2
        </div>
      </div>

      {/* Main Scanner Zone */}
      <div 
        className={`relative w-full h-[450px] border-4 transition-colors duration-300 flex items-center justify-center cursor-pointer overflow-hidden ${
          isDragActive || state !== 'idle' ? 'border-brand-red bg-brand-red/5' : 'border-dashed border-white/20 bg-black'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => state === 'idle' && fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="video/*"
          onChange={(e) => { if(e.target.files.length > 0) startScan(); }}
        />

        {/* Telemetry Grid Accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-white/40" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-white/40" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-white/40" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-white/40" />
          
          <div className="absolute bottom-6 w-full flex justify-center font-mono text-[12px] tracking-[0.4em] text-white/50 gap-10 opacity-70">
            <div className="flex items-center gap-3"><span className="text-brand-red">+</span><span>TENSION</span></div>
            <div className="flex items-center gap-3"><span className="text-brand-red">+</span><span>IMMERSION</span></div>
            <div className="flex items-center gap-3"><span className="text-brand-red">+</span><span>IMPACT</span></div>
          </div>
        </div>

        {/* Idle State */}
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center z-10 p-6"
            >
              <div className="text-brand-red mb-6">
                <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-mono text-lg tracking-[0.3em] font-bold text-white uppercase mb-3">Initialize Upload Sequence</h3>
              <p className="font-mono text-sm tracking-widest text-white/40 border border-white/10 px-4 py-2 inline-block">DRAG VIDEO FILE OR CLICK TO BROWSE</p>
            </motion.div>
          )}

          {/* Scanning State */}
          {state === 'scanning' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              <div className="absolute inset-0 flex items-center justify-center z-10 flex-col bg-black/40">
                 <h3 className="text-4xl md:text-6xl font-black italic uppercase font-display text-transparent [-webkit-text-stroke:2px_white] tracking-widest animate-pulse leading-none">
                  ANALYZING <br/>KINEMATICS...
                </h3>
                <div className="font-mono text-sm text-brand-red font-bold tracking-[0.4em] mt-8 bg-brand-red/10 px-4 py-2 border border-brand-red/30">
                  SYS.CALCULATING TRAJECTORY
                </div>
              </div>
              
              {/* Aggressive Red Laser Overlay */}
              <motion.div 
                className="absolute left-0 w-full h-[4px] bg-brand-red shadow-[0_0_30px_10px_rgba(138,0,0,0.9)] z-20"
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Fake Brutalist Data Stream */}
              <div className="absolute left-10 top-16 font-mono text-[12px] font-bold text-brand-red/80 tracking-widest space-y-3 hidden md:block">
                <p>_HIP HINGE: PROCESSING</p>
                <p>_BAR PATH: ACQUIRING</p>
                <p>_VELOCITY: CALCULATING</p>
                <p>_ECCENTRIC LOAD: TRACING</p>
              </div>
            </motion.div>
          )}

          {/* Complete State - Brutalist Output */}
          {state === 'complete' && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center justify-center bg-[#050505] z-10 p-8"
            >
              <div className="text-center w-full max-w-4xl border-4 border-brand-red p-12 bg-brand-red/10 shadow-[16px_16px_0px_0px_rgba(138,0,0,1)]">
                <h3 className="text-5xl md:text-7xl font-black italic uppercase font-display text-white leading-none mb-8">
                  FIX YOUR <span className="text-brand-red block md:inline">BAR PATH.</span>
                </h3>
                <div className="border-t-4 border-white/20 pt-8 mb-10">
                  <h4 className="text-3xl md:text-5xl font-black italic uppercase font-display text-white/80 leading-none">
                    HIPS SHOOTING UP EARLY. <br/> DRIVE THROUGH THE FLOOR.
                  </h4>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); resetScanner(); }}
                  className="border-4 border-brand-red bg-black px-10 py-5 font-mono text-sm font-bold text-brand-red tracking-[0.3em] hover:bg-brand-red hover:text-white transition-colors rounded-none uppercase inline-flex items-center gap-4"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  RUN NEW ANALYSIS
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
