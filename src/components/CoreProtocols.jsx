import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = [
  {
    id: '01',
    title: 'AI FORM COACH',
    description: 'UPLOAD YOUR LIFT. OUR AI ANALYZES YOUR POSTURE IN REAL-TIME TO FIX YOUR FORM AND PREVENT INJURY.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop&grayscale=true'
  },
  {
    id: '02',
    title: 'SMART FUEL',
    description: 'LOG YOUR HEAVY DAYS. GET EXACT MACRO SUGGESTIONS TELLING YOU WHAT TO EAT TO RECOVER FASTER.',
    image: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=1600&auto=format&fit=crop&grayscale=true'
  },
  {
    id: '03',
    title: 'OPERATIVE VAULT',
    description: 'SECURE YOUR DATA. TRACK YOUR DAILY LIFTS AND WATCH YOUR STRENGTH CLIMB WITH PRIVATE, ENCRYPTED CHARTS.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop&grayscale=true'
  }
];

export default function CoreProtocols() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%', // 3 sections = 2 transitions = 200% scroll distance
          pin: true,
          scrub: 1,
        }
      });

      sectionsRef.current.forEach((section, i) => {
        if (i === 0) return; // First section is visible by default
        
        tl.fromTo(
          section,
          { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
          { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: 'none' }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-brand-red overflow-hidden border-t-8 border-black">
      {protocols.map((protocol, i) => (
        <div 
          key={protocol.id}
          ref={el => sectionsRef.current[i] = el}
          className="absolute inset-0 w-full h-full flex flex-col md:flex-row bg-brand-red"
          style={{ 
            zIndex: i + 1, 
            clipPath: i === 0 ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' 
          }}
        >
          {/* Deep Red Text Section */}
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 border-r-8 border-black">
            <div className="font-mono text-xl md:text-2xl tracking-[0.4em] text-black font-bold mb-6">
              PROTOCOL // {protocol.id}
            </div>
            
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black italic uppercase font-display text-white leading-[0.85] mb-12">
              {protocol.title.split(' ').map((word, wIdx) => (
                <React.Fragment key={wIdx}>
                  {word}<br/>
                </React.Fragment>
              ))}
            </h2>
            
            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl">
              <p className="font-sans text-lg md:text-xl font-bold uppercase text-black leading-snug">
                {protocol.description}
              </p>
            </div>
          </div>

          {/* High Contrast B&W Image Section */}
          <div className="w-full md:w-1/2 h-full relative bg-black border-l-8 border-black overflow-hidden hidden md:block">
            
            {/* The Image */}
            <div className="absolute inset-0 mix-blend-luminosity opacity-80">
              <img 
                src={protocol.image} 
                alt={protocol.title}
                className="w-full h-full object-cover filter grayscale contrast-[1.4] brightness-90"
              />
            </div>
            
            {/* Hard Vignette / Shadow Effects */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
            
            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-30 pointer-events-none" />
            
            {/* Brutalist Corner Numbering */}
            <div className="absolute bottom-12 right-12 text-brand-red font-mono text-6xl font-black tracking-tighter bg-black/80 px-4 py-2 border-2 border-brand-red">
              [{protocol.id}]
            </div>
          </div>
          
        </div>
      ))}
    </section>
  );
}
