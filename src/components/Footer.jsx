import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { scale: 0.7, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={containerRef} className="relative w-full h-screen bg-[#D00000] flex flex-col items-center justify-center overflow-hidden border-t-8 border-black z-10">
      
      {/* Background SVG Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000022_1px,transparent_1px),linear-gradient(to_bottom,#00000022_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Massive scaling text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden z-10 w-full h-full">
        <div ref={textRef} className="w-full text-center">
          <h2 className="font-sans font-black text-black uppercase leading-[0.8] tracking-tighter" style={{ fontSize: '12vw' }}>
            NO MORE EXCUSES.<br/>
            COMMENCE PROTOCOL.
          </h2>
        </div>
      </div>
      
      {/* Button overlaying the text */}
      <div className="z-20 mt-[30vh]">
        <Link 
          to="/vault"
          className="inline-block font-mono text-xl md:text-3xl tracking-[0.2em] font-black text-white bg-black px-12 py-8 uppercase border-4 border-black hover:bg-white hover:text-black hover:shadow-[16px_16px_0px_0px_#000] transition-none shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
        >
          [ INITIATE THE VAULT ]
        </Link>
      </div>

    </footer>
  );
}
