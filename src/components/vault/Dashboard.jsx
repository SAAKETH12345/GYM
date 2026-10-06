import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { 
  LayoutDashboard, Dumbbell, Activity, LineChart as LineChartIcon, 
  Users, User, Search, Bell, Plus, PlayCircle, MoreHorizontal, 
  Apple, Droplet, Moon, Flame, Target, Crosshair, CheckCircle2, X
} from 'lucide-react';
import AiFormCoach from './AiFormCoach';
import SmartFuel from './SmartFuel';
import SanctuaryAI from './SanctuaryAI';
import AdvancedTelemetry from '../AdvancedTelemetry';

const performanceData = [
  { week: 'W1', volume: 8500, intensity: 60, strain: 40 },
  { week: 'W2', volume: 9200, intensity: 65, strain: 45 },
  { week: 'W3', volume: 10500, intensity: 75, strain: 55 },
  { week: 'W4', volume: 11200, intensity: 80, strain: 65 },
  { week: 'W5', volume: 12400, intensity: 85, strain: 70 },
  { week: 'W6', volume: 13000, intensity: 90, strain: 80 },
];

const sleepData = [
  { day: 'M', hours: 7.5 }, { day: 'T', hours: 6.2 }, { day: 'W', hours: 8.1 },
  { day: 'T', hours: 7.0 }, { day: 'F', hours: 6.5 }, { day: 'S', hours: 9.0 }, { day: 'S', hours: 8.5 }
];

const BrutalistCard = ({ children, className = "", delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-[#050505] border-4 border-white/10 rounded-none ${className}`}
  >
    {children}
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="border-4 border-brand-red bg-black p-3 shadow-[4px_4px_0_#8A0000] rounded-none">
        <p className="font-mono text-white/50 text-xs mb-2 uppercase tracking-widest">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="font-mono font-bold text-sm" style={{ color: entry.color }}>
            {entry.name.toUpperCase()}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard({ onLogout }) {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Command Center');
  const [waterIntake, setWaterIntake] = useState(5);
  const [toastMessage, setToastMessage] = useState(null);
  
  // External Sync State
  const [appleSync, setAppleSync] = useState(false);
  const [garminSync, setGarminSync] = useState(false);
  
  // Header Dropdown States
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const SidebarItem = ({ icon: Icon, label }) => {
    const isActive = activeTab === label;
    return (
      <button 
        onClick={() => { setActiveTab(label); showToast(`System routed to: ${label}`); window.scrollTo(0, 0); }}
        className={`w-full flex items-center gap-3 px-6 py-4 font-mono text-sm tracking-widest uppercase transition-none border-l-8 rounded-none ${isActive ? 'border-brand-red bg-black text-brand-red shadow-[inset_4px_0_0_#8A0000]' : 'border-transparent text-white/40 hover:bg-black hover:text-brand-red hover:shadow-[4px_4px_0_#8A0000] hover:border-brand-red'}`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-bold text-left">{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-brand-red selection:text-white">
      
      {/* Toast Notification System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="fixed top-24 left-8 z-[100] bg-black text-brand-red border-4 border-brand-red p-4 font-mono font-black text-sm tracking-widest uppercase flex items-center gap-3 shadow-[8px_8px_0_#8A0000] rounded-none"
          >
            <CheckCircle2 className="w-5 h-5" />
            {toastMessage}
            <button onClick={() => setToastMessage(null)} className="ml-4 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-72 border-r-4 border-white/10 bg-[#050505] hidden xl:flex flex-col flex-shrink-0 z-50 sticky top-0 h-screen rounded-none">
        <div className="p-8 border-b-4 border-white/10">
          <h1 className="text-3xl font-black italic uppercase font-display leading-none tracking-tighter cursor-pointer hover:text-brand-red transition-none" onClick={() => setActiveTab('Command Center')}>
            IRON<br/><span className="text-brand-red">SANCTUARY</span>
          </h1>
          <div className="font-mono text-[10px] text-white/40 tracking-[0.3em] mt-2">OPERATIVE_VAULT_V3</div>
        </div>
        
        <nav className="flex-1 mt-8 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Command Center" />
          <SidebarItem icon={Dumbbell} label="Training Regimen" />
          <SidebarItem icon={Activity} label="AI Form Analysis" />
          <SidebarItem icon={Apple} label="Nutritional Input" />
          <SidebarItem icon={Crosshair} label="Advanced Telemetry" />
          <SidebarItem icon={Users} label="Global Network" />
        </nav>

        <div className="p-8 border-t-4 border-white/10">
          <button 
            onClick={() => setIsAiOpen(true)}
            className="w-full mb-4 bg-transparent border-4 border-brand-red text-brand-red font-mono font-black text-sm p-4 tracking-widest uppercase hover:bg-black hover:text-brand-red hover:shadow-[8px_8px_0_#8A0000] active:shadow-none active:translate-x-2 active:translate-y-2 transition-none rounded-none"
          >
            [ INIT SANCTUARY_AI ]
          </button>
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 p-4 text-white/40 font-mono font-bold tracking-widest uppercase border-4 border-transparent hover:bg-black hover:text-brand-red hover:border-brand-red hover:shadow-[4px_4px_0_#8A0000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-none rounded-none">
            [ TERMINATE SESSION ]
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Top Header */}
        <header className="px-6 md:px-12 py-6 border-b-4 border-white/10 flex justify-between items-center bg-[#050505]/90 sticky top-0 z-[60] rounded-none">
          <div className="font-mono text-sm tracking-widest text-white/50 hidden md:block">
            SYSTEM READY <span className="text-white/20 mx-2">|</span> <span className="text-brand-red font-bold animate-pulse">AI COACH ACTIVE</span>
          </div>
          <div className="flex items-center gap-6">
            
            {/* Search */}
            <div className="relative hidden md:block group">
              <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-brand-red transition-none z-10 cursor-pointer">
                <Search className="w-4 h-4" />
              </button>
              <input 
                type="text" 
                placeholder="SEARCH EXERCISES & PROTOCOLS..." 
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={(e) => { if(e.key === 'Enter') showToast('Search query initiated...') }}
                className="bg-transparent border-4 border-white/20 p-3 pl-12 font-mono text-xs tracking-widest focus:outline-none focus:border-brand-red focus:bg-black focus:shadow-[4px_4px_0_#8A0000] w-[350px] transition-none text-white placeholder-white/30 rounded-none relative z-10" 
              />
              {/* Search Dropdown */}
              <AnimatePresence>
                {isSearchFocused && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full left-0 w-full mt-2 bg-black border-4 border-brand-red shadow-[8px_8px_0_#8A0000] z-50 rounded-none p-4"
                  >
                    <div className="font-mono text-[10px] text-brand-red tracking-widest font-black uppercase mb-4 border-b-2 border-brand-red/30 pb-2">Recent Searches</div>
                    <div className="flex flex-col gap-2">
                      <button onMouseDown={() => { showToast('Searching: DEADLIFT FORM'); setIsSearchFocused(false); }} className="font-display text-sm font-black tracking-wider text-left p-3 border-2 border-transparent hover:border-brand-red hover:bg-brand-red hover:text-black hover:shadow-[4px_4px_0_#fff] transition-none text-white/70">DEADLIFT FORM</button>
                      <button onMouseDown={() => { showToast('Searching: HYPERTROPHY DIET'); setIsSearchFocused(false); }} className="font-display text-sm font-black tracking-wider text-left p-3 border-2 border-transparent hover:border-brand-red hover:bg-brand-red hover:text-black hover:shadow-[4px_4px_0_#fff] transition-none text-white/70">HYPERTROPHY DIET</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
                className={`w-12 h-12 border-4 bg-transparent flex items-center justify-center hover:bg-black hover:border-brand-red hover:text-brand-red hover:shadow-[4px_4px_0_#8A0000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-none relative rounded-none ${isNotificationsOpen ? 'border-brand-red text-brand-red shadow-[4px_4px_0_#8A0000]' : 'border-white/20 text-white/50'}`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red border-2 border-[#050505] animate-pulse rounded-none"></span>
              </button>
              
              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full right-0 w-80 mt-4 bg-black border-4 border-brand-red shadow-[8px_8px_0_#8A0000] z-50 rounded-none flex flex-col"
                  >
                    <div className="font-mono text-[10px] font-black text-brand-red tracking-widest uppercase p-4 border-b-4 border-brand-red">System Alerts</div>
                    <button onClick={() => { showToast('Routing to Recovery Protocol...'); setIsNotificationsOpen(false); }} className="p-4 text-left border-b-2 border-white/10 hover:bg-brand-red hover:text-black hover:shadow-[inset_0_0_0_2px_#fff] transition-none group">
                      <div className="font-mono text-xs font-black mb-1 group-hover:text-black transition-none text-brand-red">RECOVERY AT 92%</div>
                      <div className="font-sans font-bold text-sm text-white/70 group-hover:text-black transition-none">Ready for heavy compound lifts.</div>
                    </button>
                    <button onClick={() => { showToast('Routing to Form Coach...'); setIsNotificationsOpen(false); }} className="p-4 text-left hover:bg-brand-red hover:text-black hover:shadow-[inset_0_0_0_2px_#fff] transition-none group">
                      <div className="font-mono text-xs font-black mb-1 group-hover:text-black transition-none text-brand-red">FORM CHECK COMPLETE</div>
                      <div className="font-sans font-bold text-sm text-white/70 group-hover:text-black transition-none">View your latest squat analysis.</div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Profile Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className={`w-12 h-12 border-4 p-1 bg-transparent hover:bg-black hover:border-brand-red hover:shadow-[4px_4px_0_#8A0000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-none rounded-none ${isProfileOpen ? 'border-brand-red shadow-[4px_4px_0_#8A0000]' : 'border-brand-red'}`}
              >
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover grayscale rounded-none mix-blend-screen" />
              </button>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1 }}
                    className="absolute top-full right-0 w-64 mt-4 bg-black border-4 border-brand-red shadow-[8px_8px_0_#8A0000] z-50 rounded-none flex flex-col"
                  >
                    <button onClick={() => { showToast('Accessing Profile...'); setIsProfileOpen(false); }} className="p-4 text-left font-display text-sm font-black tracking-widest uppercase hover:bg-brand-red hover:text-black transition-none border-b-2 border-brand-red/30 text-white/80">
                      MY PROFILE
                    </button>
                    <button onClick={() => { showToast('Scanning for Devices...'); setIsProfileOpen(false); }} className="p-4 text-left font-display text-sm font-black tracking-widest uppercase hover:bg-brand-red hover:text-black transition-none border-b-2 border-brand-red/30 text-white/80">
                      CONNECTED DEVICES
                    </button>
                    <button onClick={() => { showToast('Opening Settings...'); setIsProfileOpen(false); }} className="p-4 text-left font-display text-sm font-black tracking-widest uppercase hover:bg-brand-red hover:text-black transition-none border-b-2 border-brand-red/30 text-white/80">
                      ACCOUNT SETTINGS
                    </button>
                    <button onClick={onLogout} className="p-4 text-left font-display text-sm font-black tracking-widest uppercase hover:bg-brand-red hover:text-black transition-none text-brand-red">
                      LOG OUT
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-12 max-w-[1600px] mx-auto overflow-x-hidden min-h-[80vh]">
          
          {/* ALWAYS VISIBLE WELCOME BANNER WITH INCREASED BREATHING ROOM */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 border-b-4 border-white/10 pb-12">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-2 italic">
                WELCOME, <span className="text-brand-red">ALEX.</span>
              </h2>
              <p className="font-mono text-white/40 tracking-widest uppercase text-sm">Target: Hypertrophy Phase 3</p>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0 font-mono text-sm tracking-widest">
               <div className="text-right">
                 <div className="text-white/40 font-bold">RESTING HR</div>
                 <div className="text-2xl font-black text-white">48 <span className="text-brand-red text-base">BPM</span></div>
               </div>
               <div className="w-1 bg-white/10"></div>
               <div className="text-right">
                 <div className="text-white/40 font-bold">RECOVERY</div>
                 <div className="text-2xl font-black text-brand-red">92%</div>
               </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* TAB: COMMAND CENTER (Main Dashboard) */}
              {activeTab === 'Command Center' && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
                  <BrutalistCard className="lg:col-span-3 p-8 relative rounded-none hover:border-brand-red/50 hover:shadow-[8px_8px_0_#8A0000] transition-none" delay={0.1}>
                    <div className="absolute top-8 right-8 font-mono text-xs font-black tracking-widest text-brand-red border-2 border-brand-red px-3 py-1 bg-black uppercase">
                      Live Data
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                      <Activity className="w-8 h-8 text-brand-red animate-pulse" />
                      <h3 className="text-3xl font-black uppercase font-display tracking-wide">Work Capacity & Strain</h3>
                    </div>
                    
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8A0000" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8A0000" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="4 4" stroke="#ffffff20" vertical={false} />
                          <XAxis dataKey="week" stroke="#ffffff50" tick={{fill: '#ffffff50', fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold'}} axisLine={false} tickLine={false} dy={10} />
                          <YAxis yAxisId="left" stroke="#ffffff50" tick={{fill: '#ffffff50', fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold'}} axisLine={false} tickLine={false} dx={-10} />
                          <YAxis yAxisId="right" orientation="right" stroke="#8A0000" tick={{fill: '#8A0000', fontFamily: 'monospace', fontSize: 14, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#8A0000', strokeWidth: 2, strokeDasharray: '4 4' }} />
                          <Area yAxisId="left" type="step" dataKey="volume" stroke="#8A0000" strokeWidth={4} fillOpacity={1} fill="url(#colorVolume)" name="Volume (kg)" />
                          <Area yAxisId="right" type="linear" dataKey="strain" stroke="#ffffff" strokeWidth={3} fill="none" name="CNS Strain" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </BrutalistCard>

                  <BrutalistCard className="p-8 flex flex-col rounded-none hover:border-brand-red/50 hover:shadow-[8px_8px_0_#8A0000] transition-none" delay={0.2}>
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <Apple className="w-8 h-8 text-white" />
                        <h3 className="text-2xl font-black uppercase font-display tracking-wide">Nutrition</h3>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center gap-6">
                      <button onClick={() => showToast('Updating Protein Intake...')} className="group text-left rounded-none border-2 border-transparent hover:border-brand-red hover:bg-black p-2 transition-none">
                        <div className="flex justify-between font-mono text-xs font-bold uppercase mb-2">
                          <span className="text-white/50 group-hover:text-brand-red transition-none">Protein</span>
                          <span className="text-white">180g / 200g</span>
                        </div>
                        <div className="h-4 w-full bg-white/10 rounded-none relative overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: '90%' }} transition={{ duration: 1, delay: 0.5 }} className="absolute h-full bg-white"></motion.div>
                        </div>
                      </button>
                      <button onClick={() => showToast('Updating Carbs Intake...')} className="group text-left rounded-none border-2 border-transparent hover:border-brand-red hover:bg-black p-2 transition-none">
                        <div className="flex justify-between font-mono text-xs font-bold uppercase mb-2">
                          <span className="text-white/50 group-hover:text-brand-red transition-none">Carbs</span>
                          <span className="text-brand-red">350g / 400g</span>
                        </div>
                        <div className="h-4 w-full bg-white/10 rounded-none relative overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1, delay: 0.7 }} className="absolute h-full bg-brand-red shadow-[0_0_15px_#8A0000]"></motion.div>
                        </div>
                      </button>
                      <button onClick={() => showToast('Updating Fats Intake...')} className="group text-left rounded-none border-2 border-transparent hover:border-brand-red hover:bg-black p-2 transition-none">
                        <div className="flex justify-between font-mono text-xs font-bold uppercase mb-2">
                          <span className="text-white/50 group-hover:text-brand-red transition-none">Fats</span>
                          <span className="text-white">60g / 75g</span>
                        </div>
                        <div className="h-4 w-full bg-white/10 rounded-none relative overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: '80%' }} transition={{ duration: 1, delay: 0.9 }} className="absolute h-full bg-white/50"></motion.div>
                        </div>
                      </button>
                      <button onClick={() => showToast('Syncing MyFitnessPal data...')} className="mt-4 pt-6 border-t-4 border-white/10 text-center hover:bg-black hover:text-brand-red transition-none p-2 border-2 border-transparent hover:border-brand-red">
                        <div className="text-5xl font-black font-display">2,840</div>
                        <div className="font-mono text-xs text-white/40 tracking-[0.2em] font-bold uppercase mt-1">Calories Consumed</div>
                      </button>
                    </div>
                  </BrutalistCard>

                  {/* OPERATIVE ID CARD */}
                  <BrutalistCard className="p-8 flex flex-col justify-between hover:border-brand-red/50 hover:shadow-[8px_8px_0_#8A0000] transition-none" delay={0.6}>
                    <div>
                      <h3 className="text-2xl font-black uppercase font-display tracking-wide mb-6 text-brand-red">OPERATIVE ID</h3>
                      <button 
                        onClick={() => showToast('Generating temporary access token...')}
                        className="w-full aspect-square bg-white border-4 border-brand-red p-4 flex items-center justify-center hover:bg-gray-200 hover:shadow-[6px_6px_0_#8A0000] transition-none"
                      >
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=IRON_SANCTUARY_ALEX_1337&color=050505" alt="QR Code" className="w-full h-full object-contain" />
                      </button>
                    </div>
                    <div className="mt-6 font-mono text-sm text-center font-black tracking-widest text-white border-t-4 border-brand-red/30 pt-4">
                      [ SCAN AT SANCTUARY TERMINAL ]
                    </div>
                  </BrutalistCard>

                  {/* EXTERNAL SYNC CARD */}
                  <BrutalistCard className="p-8 flex flex-col justify-between hover:border-brand-red/50 hover:shadow-[8px_8px_0_#8A0000] transition-none" delay={0.7}>
                    <div>
                      <h3 className="text-2xl font-black uppercase font-display tracking-wide mb-6 text-brand-red">EXTERNAL SYNC</h3>
                      
                      <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm tracking-widest uppercase font-black text-white">APPLE HEALTH</span>
                          <button 
                            onClick={() => setAppleSync(!appleSync)}
                            className={`w-20 h-10 border-4 transition-none rounded-none flex items-center p-1 ${appleSync ? 'border-brand-red bg-brand-red justify-end shadow-[4px_4px_0_#8A0000]' : 'border-white/30 bg-transparent justify-start hover:border-white hover:bg-white/10'}`}
                          >
                            <div className={`w-6 h-6 ${appleSync ? 'bg-black' : 'bg-white/50'} border-2 border-transparent`} />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm tracking-widest uppercase font-black text-white">GARMIN FENIX</span>
                          <button 
                            onClick={() => setGarminSync(!garminSync)}
                            className={`w-20 h-10 border-4 transition-none rounded-none flex items-center p-1 ${garminSync ? 'border-brand-red bg-brand-red justify-end shadow-[4px_4px_0_#8A0000]' : 'border-white/30 bg-transparent justify-start hover:border-white hover:bg-white/10'}`}
                          >
                            <div className={`w-6 h-6 ${garminSync ? 'bg-black' : 'bg-white/50'} border-2 border-transparent`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-8 font-mono text-xs font-black tracking-widest uppercase p-4 border-4 transition-none ${appleSync || garminSync ? 'bg-brand-red text-black border-brand-red shadow-[4px_4px_0_#fff]' : 'bg-transparent text-white/20 border-white/10'}`}>
                      {appleSync || garminSync ? 'BIOMETRICS LINKED. CONTINUOUS HEART RATE MONITORING ACTIVE.' : 'NO EXTERNAL BIOMETRICS LINKED. WAITING FOR SIGNAL...'}
                    </div>
                  </BrutalistCard>

                  <BrutalistCard className="lg:col-span-2 p-0 overflow-hidden relative group rounded-none hover:border-brand-red hover:shadow-[12px_12px_0_#8A0000] transition-none border-4" delay={0.5}>
                    <div className="absolute inset-0 bg-black z-0 rounded-none">
                      <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 transition-transform duration-700 rounded-none" alt="Gym" />
                      <div className="absolute inset-0 bg-[#050505]/80 mix-blend-multiply rounded-none"></div>
                    </div>
                    
                    <div className="relative z-10 p-12 flex flex-col justify-between h-full min-h-[300px] rounded-none">
                      <div>
                        <div className="inline-block bg-brand-red text-black font-mono font-black text-xs tracking-widest uppercase px-3 py-1 mb-6 border-2 border-brand-red shadow-[4px_4px_0_#fff] animate-pulse rounded-none">
                          AI Analysis Active
                        </div>
                        <h3 className="text-4xl font-black uppercase font-display tracking-wide mb-4">Form Coach Module</h3>
                        <p className="font-mono text-base font-bold text-white max-w-lg leading-relaxed">
                          Real-time biometric tracking detects a 4° deviation in your lumbar spine during heavy deadlifts.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab('AI Form Analysis')}
                        className="self-start mt-8 flex items-center gap-4 font-mono text-sm font-black uppercase tracking-widest text-brand-red border-4 border-brand-red px-6 py-4 bg-black hover:bg-brand-red hover:text-black hover:shadow-[6px_6px_0_#fff] transition-none rounded-none"
                      >
                        <Target className="w-5 h-5" /> [ VIEW FORM CORRECTIONS ]
                      </button>
                    </div>
                  </BrutalistCard>
                  
                  <BrutalistCard className="lg:col-span-2 p-8 bg-[#0A0A0A] border-brand-red rounded-none hover:shadow-[8px_8px_0_#8A0000] transition-none border-4" delay={0.4}>
                    <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-3">
                        <Droplet className="w-8 h-8 text-brand-red" />
                        <h3 className="text-3xl font-black uppercase font-display tracking-wide text-brand-red">Hydration</h3>
                      </div>
                      <button onClick={() => { setWaterIntake(0); showToast('Hydration Reset'); }} className="text-sm font-mono font-black text-white/40 hover:text-brand-red hover:bg-black border-4 border-transparent hover:border-brand-red px-4 py-2 hover:shadow-[4px_4px_0_#8A0000] transition-none uppercase tracking-widest rounded-none">Reset</button>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      {[1,2,3,4,5,6,7,8].map(i => (
                        <button 
                          key={i} 
                          onClick={() => { setWaterIntake(i); showToast(`Logged ${i * 0.5}L of Water`); }}
                          className={`w-14 h-16 border-4 rounded-none ${i <= waterIntake ? 'border-brand-red bg-brand-red shadow-[4px_4px_0_#8A0000]' : 'border-white/20 bg-transparent hover:border-brand-red hover:bg-black hover:shadow-[4px_4px_0_#8A0000]'} transition-none cursor-pointer`} 
                        />
                      ))}
                    </div>
                    <div className="text-center font-mono text-xl font-black uppercase tracking-widest">
                      <span className="text-brand-red text-3xl">{waterIntake * 0.5}L</span> <span className="text-white/40">/ 4.0L Target</span>
                    </div>
                  </BrutalistCard>
                </div>
              )}

              {/* TAB: AI FORM ANALYSIS */}
              {activeTab === 'AI Form Analysis' && (
                <div className="pb-24">
                  <AiFormCoach />
                </div>
              )}

              {/* TAB: NUTRITIONAL INPUT */}
              {activeTab === 'Nutritional Input' && (
                <div className="pb-24">
                  <SmartFuel />
                </div>
              )}

              {/* TAB: ADVANCED TELEMETRY */}
              {activeTab === 'Advanced Telemetry' && (
                <div className="pb-24 -mx-6 md:-mx-12">
                  <AdvancedTelemetry />
                </div>
              )}

              {/* TAB: TRAINING REGIMEN (Protocol Scheduling) */}
              {activeTab === 'Training Regimen' && (
                <div className="w-full border-4 border-brand-red bg-[#050505] p-8 md:p-16 mb-24 hover:shadow-[16px_16px_0_#8A0000] transition-none">
                  <div className="mb-12 border-b-4 border-white/20 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-4">PROTOCOL SCHEDULING</h2>
                      <p className="font-mono text-brand-red tracking-[0.2em] uppercase font-black">SECURE YOUR LIFTING BLOCK. NO CANCELLATIONS.</p>
                    </div>
                    <div className="font-mono font-black text-3xl text-white bg-black border-4 border-white p-4 shadow-[6px_6px_0_#fff]">
                      OCT 2026
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-4 mb-16">
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                      <div key={day} className="text-center font-mono text-brand-red tracking-[0.2em] font-black text-xl pb-4 border-b-4 border-white/10">{day}</div>
                    ))}
                    {Array.from({length: 31}).map((_, i) => {
                      const day = i + 1;
                      const isAvailable = [3, 8, 14, 18, 22, 28].includes(day);
                      return (
                        <button 
                          key={day}
                          disabled={!isAvailable}
                          onClick={() => showToast(`Selected Block: 2026-10-${day.toString().padStart(2, '0')}`)}
                          className={`aspect-square flex flex-col items-center justify-center border-4 transition-none rounded-none p-2
                            ${isAvailable 
                              ? 'border-brand-red bg-brand-red/10 text-white hover:bg-brand-red hover:text-black hover:shadow-[8px_8px_0_#8A0000] cursor-pointer' 
                              : 'border-white/5 bg-transparent text-white/20 cursor-not-allowed hover:bg-white/5'
                            }
                          `}
                        >
                          <span className="text-4xl font-display font-black">{day}</span>
                          {isAvailable && <span className="font-mono text-[10px] font-black uppercase tracking-widest mt-2">Open</span>}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-end border-t-4 border-white/20 pt-8">
                    <button 
                      onClick={() => showToast('Protocol Deployed. See you on the platform.')}
                      className="px-12 py-6 border-4 border-brand-red bg-black text-brand-red font-black tracking-[0.3em] text-2xl uppercase hover:bg-brand-red hover:text-white hover:shadow-[12px_12px_0_#fff] active:shadow-none active:translate-x-2 active:translate-y-2 transition-none rounded-none"
                    >
                      [ DEPLOY PROTOCOL ]
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: GLOBAL Network (Placeholder) */}
              {activeTab === 'Global Network' && (
                <div className="flex flex-col items-center justify-center h-96 border-4 border-brand-red bg-black p-12 text-center rounded-none hover:shadow-[16px_16px_0_#8A0000] transition-none">
                  <Users className="w-24 h-24 text-brand-red mb-8 animate-pulse" />
                  <h2 className="text-5xl font-display font-black text-white uppercase tracking-tighter mb-6">GLOBAL NETWORK SYNC</h2>
                  <p className="font-mono text-brand-red tracking-[0.3em] font-black uppercase max-w-2xl text-xl">Establishing peer-to-peer connection with Iron Sanctuary operative network. Standby.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <SanctuaryAI isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}
