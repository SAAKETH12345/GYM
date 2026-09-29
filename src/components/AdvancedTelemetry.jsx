import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    id: '01',
    title: 'MUSCLE HEATMAP',
    description: 'BIOMETRIC SCANNING. IDENTIFY FATIGUE ZONES BEFORE FAILURE.',
  },
  {
    id: '02',
    title: 'PLATE CALCULATOR',
    description: 'MATHEMATICAL PRECISION. NEVER MISCALCULATE YOUR LOAD.',
  },
  {
    id: '03',
    title: 'BAR VELOCITY',
    description: 'TRACK EXPLOSIVE POWER. MEASURE SPEED IN METERS PER SECOND.',
  }
];

const MuscleHeatmapPanel = ({ panel }) => (
  <div 
    className="telemetry-panel w-screen h-full flex flex-col lg:flex-row justify-center items-center relative border-r-8 border-brand-red p-8 md:p-16 pt-32 lg:pt-16"
  >
    {/* Grid Background */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8A000033_1px,transparent_1px),linear-gradient(to_bottom,#8A000033_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
    
    {/* System Diagnostic Corner Text */}
    <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-50 font-mono text-white/50 text-sm md:text-base tracking-[0.2em] animate-pulse">
      [ SYS.DIAGNOSTIC... RUNNING ]
    </div>
    
    {/* SVG Torso Section */}
    <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center items-center z-10 relative">
      <svg viewBox="0 0 200 300" className="w-full h-full max-h-[50vh] lg:max-h-[70vh] drop-shadow-[0_0_15px_rgba(138,0,0,0.5)]">
        {/* Head / Neck */}
        <path d="M85 20 L115 20 L110 50 L90 50 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
        <path d="M70 50 L130 50 L140 70 L60 70 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
        {/* Shoulders */}
        <path d="M40 70 L160 70 L170 100 L30 100 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
        {/* Arms */}
        <path d="M20 100 L40 100 L30 180 L10 180 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
        <path d="M160 100 L180 100 L190 180 L170 180 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
        {/* Core */}
        <path d="M50 100 L150 100 L130 220 L70 220 Z" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
        {/* Abs Grid */}
        <path d="M100 100 L100 220 M70 140 L130 140 M70 180 L130 180" stroke="white" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
        
        {/* Pulse: Chest */}
        <motion.path 
          d="M55 100 L145 100 L135 135 L65 135 Z" 
          fill="rgba(255, 0, 0, 0.2)" 
          stroke="#ff0000" 
          strokeWidth="3"
          animate={{ 
            opacity: [0.4, 1, 0.4], 
            filter: ['drop-shadow(0px 0px 5px #ff0000)', 'drop-shadow(0px 0px 25px #ff0000)', 'drop-shadow(0px 0px 5px #ff0000)'] 
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Pulse: Triceps (Left) */}
        <motion.path 
          d="M15 110 L35 110 L25 160 L5 160 Z" 
          fill="rgba(255, 0, 0, 0.2)" 
          stroke="#ff0000" 
          strokeWidth="3"
          animate={{ 
            opacity: [0.4, 1, 0.4], 
            filter: ['drop-shadow(0px 0px 5px #ff0000)', 'drop-shadow(0px 0px 20px #ff0000)', 'drop-shadow(0px 0px 5px #ff0000)'] 
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        />
        
        {/* Pulse: Triceps (Right) */}
        <motion.path 
          d="M165 110 L185 110 L195 160 L175 160 Z" 
          fill="rgba(255, 0, 0, 0.2)" 
          stroke="#ff0000" 
          strokeWidth="3"
          animate={{ 
            opacity: [0.4, 1, 0.4], 
            filter: ['drop-shadow(0px 0px 5px #ff0000)', 'drop-shadow(0px 0px 20px #ff0000)', 'drop-shadow(0px 0px 5px #ff0000)'] 
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        />
      </svg>
    </div>

    {/* Typography Section */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 p-4 lg:p-12">
      <div className="font-mono text-brand-red text-2xl md:text-3xl font-black tracking-tighter mb-4 inline-block">
        [{panel.id}] {panel.title}
      </div>
      <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase font-display text-white leading-[0.9] drop-shadow-[4px_4px_0_#8A0000] mb-8">
        FATIGUE DETECTED. <br/>
        <span className="text-brand-red drop-shadow-[4px_4px_0_#ffffff]">CHEST & TRICEPS</span> COMPROMISED.
      </h3>
      <div className="bg-white border-4 border-brand-red p-6 shadow-[8px_8px_0px_0px_#8A0000] inline-block">
        <p className="font-sans text-xl md:text-2xl font-black uppercase text-black leading-tight">
          RE-ROUTING TO BACK & BICEPS PROTOCOL.
        </p>
      </div>
    </div>
  </div>
);

const PlateCalculatorPanel = ({ panel }) => {
  const leftPlatesRef = useRef(null);
  const rightPlatesRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to([leftPlatesRef.current, rightPlatesRef.current], {
      x: 0,
      opacity: 1,
      duration: 0.1,
      ease: 'power4.in',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(leftPlatesRef.current, { x: -100, opacity: 0, duration: 0.1, ease: 'none' });
    gsap.to(rightPlatesRef.current, { x: 100, opacity: 0, duration: 0.1, ease: 'none' });
  };

  return (
    <div 
      className="telemetry-panel w-screen h-full flex flex-col lg:flex-row justify-center items-center relative border-r-8 border-brand-red p-8 md:p-16 pt-32 lg:pt-16"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8A000033_1px,transparent_1px),linear-gradient(to_bottom,#8A000033_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-50 font-mono text-white/50 text-sm md:text-base tracking-[0.2em] animate-pulse">
        [ LOAD... AWAITING ENGAGEMENT ]
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 p-4 lg:p-12 order-2 lg:order-1">
        <div className="font-mono text-brand-red text-2xl md:text-3xl font-black tracking-tighter mb-4 inline-block">
          [{panel.id}] {panel.title}
        </div>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase font-display text-white leading-[0.9] drop-shadow-[4px_4px_0_#8A0000] mb-8">
          MATHEMATICAL PRECISION.
        </h3>
        <div className="bg-white border-4 border-brand-red p-6 shadow-[8px_8px_0px_0px_#8A0000] inline-block">
          <p className="font-sans text-xl md:text-2xl font-black uppercase text-black leading-tight">
            NEVER MISCALCULATE YOUR LOAD. HOVER TO ENGAGE.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center items-center z-10 relative order-1 lg:order-2">
        <div className="relative w-full max-w-lg h-32 flex items-center justify-center cursor-crosshair">
          {/* Steel Bar */}
          <div className="absolute w-full h-6 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 border-y-2 border-black rounded-sm shadow-[0_10px_20px_rgba(0,0,0,0.8)] z-10" />
          
          {/* Left Plates Container */}
          <div 
            ref={leftPlatesRef} 
            className="absolute left-10 md:left-20 flex items-center gap-1 opacity-0 translate-x-[-100px] z-20"
          >
            {/* 45lb */}
            <div className="w-8 h-32 bg-black border-2 border-gray-400 rounded flex items-center justify-center shadow-[-5px_0_15px_rgba(0,0,0,0.8)] relative overflow-hidden">
               <span className="text-gray-400 text-xs font-black rotate-90 absolute">45</span>
               <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
            </div>
            {/* 25lb */}
            <div className="w-6 h-24 bg-black border-2 border-gray-400 rounded flex items-center justify-center shadow-[-5px_0_15px_rgba(0,0,0,0.8)] relative overflow-hidden">
               <span className="text-gray-400 text-xs font-black rotate-90 absolute">25</span>
               <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Plates Container */}
          <div 
            ref={rightPlatesRef} 
            className="absolute right-10 md:right-20 flex items-center gap-1 opacity-0 translate-x-[100px] z-20 flex-row-reverse"
          >
            {/* 45lb */}
            <div className="w-8 h-32 bg-black border-2 border-gray-400 rounded flex items-center justify-center shadow-[5px_0_15px_rgba(0,0,0,0.8)] relative overflow-hidden">
               <span className="text-gray-400 text-xs font-black -rotate-90 absolute">45</span>
               <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
            </div>
            {/* 25lb */}
            <div className="w-6 h-24 bg-black border-2 border-gray-400 rounded flex items-center justify-center shadow-[5px_0_15px_rgba(0,0,0,0.8)] relative overflow-hidden">
               <span className="text-gray-400 text-xs font-black -rotate-90 absolute">25</span>
               <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BarVelocityPanel = ({ panel }) => {
  return (
    <div 
      className="telemetry-panel w-screen h-full flex flex-col lg:flex-row justify-center items-center relative border-r-8 border-brand-red p-8 md:p-16 pt-32 lg:pt-16 last:border-r-0 bg-[#050505]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8A000033_1px,transparent_1px),linear-gradient(to_bottom,#8A000033_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      
      <div className="absolute top-8 right-8 lg:top-12 lg:right-12 z-50 font-mono text-brand-red text-sm md:text-base tracking-[0.2em] animate-pulse font-bold">
        [ CRITICAL ALERT ]
      </div>

      <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center items-center z-10 relative">
        {/* Heartbeat Monitor SVG */}
        <div className="relative w-full max-w-2xl h-64 border-4 border-brand-red bg-black p-4 shadow-[0_0_30px_rgba(138,0,0,0.6)] overflow-hidden flex items-center">
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,0,0,1)]" preserveAspectRatio="none">
            {/* Grid inside monitor */}
            <path d="M0 50 L500 50 M0 100 L500 100 M0 150 L500 150 M100 0 L100 200 M200 0 L200 200 M300 0 L300 200 M400 0 L400 200" stroke="#8A0000" strokeWidth="1" opacity="0.3" />
            
            {/* The sharp jagged line chart */}
            <motion.path 
              d="M0 100 L50 100 L60 20 L80 180 L100 100 L200 100 L220 50 L240 150 L260 100 L350 100 L370 80 L390 120 L400 100 L420 180 L440 190 L450 180 L500 180" 
              fill="none" 
              stroke="#ff0000" 
              strokeWidth="4" 
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                pathLength: { duration: 1.5, repeat: Infinity, ease: 'linear' },
                opacity: { duration: 0.1 }
              }}
            />
          </svg>
          {/* Glitch overlay */}
          <div className="absolute inset-0 bg-brand-red opacity-10 mix-blend-color-burn animate-pulse pointer-events-none" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 p-4 lg:p-12">
        <div className="font-mono text-brand-red text-2xl md:text-3xl font-black tracking-tighter mb-4 inline-block">
          [{panel.id}] {panel.title}
        </div>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase font-display text-white leading-[0.9] drop-shadow-[4px_4px_0_#8A0000] mb-8">
          BAR SPEED DROPPING. <br/>
          <span className="text-brand-red drop-shadow-[4px_4px_0_#ffffff]">CNS FATIGUE EMINENT.</span>
        </h3>
        <motion.div 
          className="bg-brand-red border-4 border-white p-6 shadow-[8px_8px_0px_0px_#fff] inline-block"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
        >
          <p className="font-sans text-xl md:text-2xl font-black uppercase text-white leading-tight">
            TERMINATE SET.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default function AdvancedTelemetry() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.telemetry-panel');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + wrapperRef.current.offsetWidth
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden border-t-8 border-brand-red">
      {/* Fixed Title for the section */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-50">
        <h2 className="text-brand-red font-mono font-bold tracking-[0.4em] uppercase text-sm md:text-xl border-b-4 border-brand-red pb-2 bg-black px-4 shadow-[4px_4px_0px_0px_#8A0000]">
          ADVANCED TELEMETRY //
        </h2>
      </div>
      
      <div ref={wrapperRef} className="flex w-[300vw] h-full">
        {panels.map((panel) => {
          if (panel.id === '01') return <MuscleHeatmapPanel key={panel.id} panel={panel} />;
          if (panel.id === '02') return <PlateCalculatorPanel key={panel.id} panel={panel} />;
          if (panel.id === '03') return <BarVelocityPanel key={panel.id} panel={panel} />;
          return null;
        })}
      </div>
    </section>
  );
}
