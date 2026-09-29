import React from 'react';
import { motion } from 'framer-motion';

const MacroBar = ({ label, current, target, unit }) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="flex justify-between items-end">
        <span className="font-mono text-lg font-bold tracking-[0.2em] text-white uppercase">{label}</span>
        <span className="font-display text-3xl font-black text-brand-red leading-none">
          {current} <span className="text-lg text-white/50">/ {target}{unit}</span>
        </span>
      </div>
      <div className="w-full h-10 bg-black border-2 border-white/20 relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-brand-red border-r-4 border-white"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
};

export default function SmartFuel() {
  return (
    <div className="border-4 border-white/10 bg-[#050505] p-6 md:p-12 mt-12 w-full flex flex-col xl:flex-row gap-16 xl:gap-24">
      
      {/* Title & Macros Section */}
      <div className="flex-1 flex flex-col">
        <div className="mb-12 border-b-4 border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <h2 className="text-5xl md:text-7xl font-black italic uppercase font-display text-white leading-none">
            Smart <span className="text-brand-red">Fuel</span>
          </h2>
          <div className="font-mono text-sm tracking-widest text-brand-red border-2 border-brand-red/30 px-4 py-2 bg-brand-red/5">
            // MACRO_TELEMETRY
          </div>
        </div>

        <div className="flex flex-col">
          <MacroBar label="Protein" current={160} target={200} unit="g" />
          <MacroBar label="Carbohydrates" current={250} target={300} unit="g" />
          <MacroBar label="Fats" current={50} target={70} unit="g" />
        </div>
      </div>

      {/* Coach's Alert Box */}
      <div className="w-full xl:w-1/3 flex flex-col justify-end pt-8 xl:pt-0">
        <div className="border-4 border-brand-red bg-brand-red/10 p-10 shadow-[16px_16px_0px_0px_rgba(138,0,0,1)] relative">
          
          {/* Brutalist Warning Icon Overlay */}
          <div className="absolute -top-8 -right-8 text-brand-red bg-black border-4 border-brand-red p-3 shadow-[-8px_8px_0px_0px_rgba(138,0,0,0.5)]">
             <svg className="w-10 h-10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="font-mono text-sm tracking-[0.3em] font-bold text-brand-red uppercase mb-6 border-b-2 border-brand-red/30 pb-3">
            Coach's Directive
          </h3>
          <p className="text-4xl md:text-5xl font-black italic uppercase font-display text-white leading-none">
            YOU ARE 40G SHORT ON PROTEIN. <br/> <br/> <span className="text-brand-red">CONSUME FUEL IMMEDIATELY.</span>
          </p>
        </div>
      </div>
      
    </div>
  );
}
