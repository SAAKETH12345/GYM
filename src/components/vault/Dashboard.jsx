import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import AiFormCoach from './AiFormCoach';
import SmartFuel from './SmartFuel';
import SanctuaryAI from './SanctuaryAI';

const performanceData = [
  { week: 'W1', deadlift: 315, squat: 275 },
  { week: 'W2', deadlift: 330, squat: 285 },
  { week: 'W3', deadlift: 345, squat: 295 },
  { week: 'W4', deadlift: 365, squat: 315 },
  { week: 'W5', deadlift: 385, squat: 335 },
  { week: 'W6', deadlift: 405, squat: 350 },
];

const StatCard = ({ title, value, unit, subtitle }) => (
  <div className="border-l-8 border-brand-red p-8 bg-white/[0.03] border-b border-r border-t border-white/10 hover:bg-white/[0.06] transition-colors cursor-default">
    <h4 className="font-mono text-sm font-bold tracking-[0.2em] text-white/50 mb-4 uppercase">{title}</h4>
    <div className="flex items-end gap-3 leading-none">
      <span className="text-7xl md:text-9xl font-black font-display tracking-tighter">{value}</span>
      <span className="text-3xl font-black text-brand-red mb-2 md:mb-4">{unit}</span>
    </div>
    <p className="mt-6 text-sm font-mono text-white/40 tracking-widest uppercase border-t border-white/10 pt-4">{subtitle}</p>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border-2 border-brand-red bg-black p-4">
        <p className="font-mono text-white/50 mb-2">{label}</p>
        <p className="font-mono font-bold text-brand-red text-xl">DEADLIFT: {payload[0].value}</p>
        <p className="font-mono font-bold text-white text-xl">SQUAT: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard({ onLogout }) {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505] p-6 md:p-12 lg:p-20"
    >
      {/* Brutalist Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-white/10 pb-8 mb-16 gap-6">
        <div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase font-display text-white leading-none">
            Operative <br/> <span className="text-brand-red">Vault</span>
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <Link 
            to="/"
            className="font-mono text-sm font-bold tracking-[0.2em] text-white hover:text-black hover:bg-white transition-colors uppercase border-2 border-white/20 px-6 py-3 rounded-none text-center"
          >
            RETURN TO BASE
          </Link>
          <button 
            onClick={() => setIsAiOpen(true)}
            className="font-mono text-sm font-bold tracking-[0.2em] text-brand-red hover:text-white hover:bg-brand-red transition-colors uppercase border-2 border-brand-red px-6 py-3 rounded-none bg-brand-red/10 shadow-[4px_4px_0px_0px_rgba(138,0,0,0.5)]"
          >
            Init Sanctuary AI
          </button>
          <button 
            onClick={onLogout}
            className="font-mono text-sm font-bold tracking-[0.2em] text-white/50 hover:text-black hover:bg-white transition-colors uppercase border-2 border-white/20 px-6 py-3 rounded-none"
          >
            Terminate Session
          </button>
        </div>
      </header>

      {/* Massive Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <StatCard title="MAX DEADLIFT" value="405" unit="LBS" subtitle="+20 LBS FROM PREV CYCLE" />
        <StatCard title="TOTAL VOLUME" value="12.4" unit="K" subtitle="LAST 7 DAYS AVERAGE" />
        <StatCard title="CNS FATIGUE" value="LOW" unit="" subtitle="OPTIMAL FOR HYPERTROPHY" />
      </div>

      {/* Chart Section */}
      <div className="w-full h-[600px] border-4 border-white/10 p-8 bg-[#050505] relative">
        <div className="absolute top-8 right-8 font-mono text-sm tracking-widest text-brand-red border border-brand-red/30 px-4 py-2 bg-brand-red/5">
          // PROGRESSION_TRAJECTORY
        </div>
        <div className="absolute top-8 left-8">
          <h2 className="text-3xl font-black uppercase text-white tracking-widest font-display">Strength Curve</h2>
        </div>
        <div className="mt-20 h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="week" 
                stroke="#ffffff50" 
                tick={{ fill: '#ffffff50', fontFamily: 'monospace', fontSize: 14 }}
                axisLine={{ stroke: '#ffffff30', strokeWidth: 2 }}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#ffffff50" 
                tick={{ fill: '#ffffff50', fontFamily: 'monospace', fontSize: 14 }}
                axisLine={{ stroke: '#ffffff30', strokeWidth: 2 }}
                tickLine={false}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="linear" 
                dataKey="deadlift" 
                stroke="#8A0000" 
                strokeWidth={6} 
                dot={{ r: 6, fill: '#8A0000', strokeWidth: 0 }}
                activeDot={{ r: 10, fill: '#ffffff' }}
              />
              <Line 
                type="linear" 
                dataKey="squat" 
                stroke="#ffffff" 
                strokeWidth={4} 
                dot={{ r: 4, fill: '#ffffff', strokeWidth: 0 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Form Coach Module */}
      <AiFormCoach />

      {/* Smart Fuel Module */}
      <SmartFuel />

      {/* Sanctuary AI Terminal */}
      <SanctuaryAI isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </motion.div>
  );
}
