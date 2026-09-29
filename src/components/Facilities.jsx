import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Facilities() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background transition (Deep Red -> Pitch Black)
      gsap.to(sectionRef.current, {
        backgroundColor: '#0a0a0a',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        }
      });

      // 2. Extreme horizontal text scroll
      gsap.to(textRef.current, {
        x: '-50%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // 3. Image Masking Effects (clip-path reveal)
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        const direction = i % 2 === 0 ? '100% 0%' : '0% 0%'; // Reveal from right or left depending on index
        
        gsap.fromTo(img, 
          { clipPath: `polygon(${direction}, ${direction}, ${direction.replace('0%','100%')}, ${direction.replace('0%','100%')})` },
          { 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              end: "top 40%",
              scrub: 1.5,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-brand-red-dark py-32 overflow-hidden flex flex-col z-20 border-t border-white/5">
      
      {/* Extreme Horizontal Scrolling Text */}
      <div className="w-[400vw] sm:w-[300vw] mt-10 pointer-events-none">
        <h2 ref={textRef} className="text-[15vw] font-black italic whitespace-nowrap text-transparent [-webkit-text-stroke:2px_white] opacity-60 uppercase leading-none font-display">
          FORGE YOUR LEGACY + DEFY THE WEAKNESS + EMBRACE THE PAIN + DOMINATE +
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 mt-40 space-y-48 relative z-10">
        
        {/* Facility 1: Iron Sanctuary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex flex-col gap-6">
            <h3 className="text-6xl md:text-8xl font-black italic uppercase text-white leading-none font-display">
              Iron <br/> Sanctuary
            </h3>
            <p className="text-xl text-white/70 max-w-md font-sans">
              Precision-engineered steel. Unrelenting atmosphere. Here, you don't just train—you construct a new reality.
            </p>
          </div>
          <div className="order-1 md:order-2 h-[60vh] md:h-[75vh] w-full overflow-hidden relative">
            {/* The mask is applied to this container via GSAP */}
            <div ref={el => imageRefs.current[0] = el} className="w-full h-full">
              <img 
                src="/facility_weights.jpg" 
                alt="Weights" 
                className="w-full h-full object-cover grayscale brightness-[0.6] contrast-[1.3] hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-out"
              />
            </div>
            {/* Edge highlights */}
            <div className="absolute inset-0 border border-white/10 pointer-events-none" />
          </div>
        </div>

        {/* Facility 2: Absolute Focus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="h-[60vh] md:h-[75vh] w-full overflow-hidden relative">
            <div ref={el => imageRefs.current[1] = el} className="w-full h-full">
              <img 
                src="/facility_studio.jpg" 
                alt="Studio" 
                className="w-full h-full object-cover grayscale brightness-[0.6] contrast-[1.3] hover:grayscale-0 hover:brightness-100 transition-all duration-1000 ease-out"
              />
            </div>
            <div className="absolute inset-0 border border-white/10 pointer-events-none" />
          </div>
          <div className="flex flex-col gap-6 items-end text-right">
            <h3 className="text-6xl md:text-8xl font-black italic uppercase text-white leading-none font-display">
              Absolute <br/> Focus
            </h3>
            <p className="text-xl text-white/70 max-w-md font-sans">
              Stripped down to the absolute essentials. Pitch-black shadows and stark neon guide your kinetic flow. 
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
