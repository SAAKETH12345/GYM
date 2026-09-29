import React from 'react';
import Hero from './Hero';
import Facilities from './Facilities';
import CoreProtocols from './CoreProtocols';
import AdvancedTelemetry from './AdvancedTelemetry';
import Footer from './Footer';
import SmoothScroll from './SmoothScroll';

export default function Home() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-brand-red-dark font-sans antialiased selection:bg-white selection:text-black">
        <Hero />
        <CoreProtocols />
        <AdvancedTelemetry />
        <Facilities />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
