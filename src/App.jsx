import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';

// Lazy load below-the-fold components
const ClientLogos = lazy(() => import('./sections/ClientLogos'));
const LayerCards = lazy(() => import('./sections/LayerCards'));
const ReelsShowcase = lazy(() => import('./sections/ReelsShowcase'));
const Reviews = lazy(() => import('./sections/Reviews'));
const Contact = lazy(() => import('./sections/Contact'));
const Footer = lazy(() => import('./sections/Footer'));

import { ReactLenis } from 'lenis/react';

// A cinematic premium loading fallback
const Fallback = () => (
  <div className="w-full h-32 flex items-center justify-center bg-luxury-black/5">
    <div className="w-8 h-8 rounded-full border-t-2 border-luxury-gold animate-spin"></div>
  </div>
);

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true, syncTouch: true, wheelMultiplier: 1 }}>
      <main className="relative">
        <Navbar />
        <Hero />
        <Suspense fallback={<Fallback />}>
          <Reviews />
          <LayerCards />
          <ReelsShowcase />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </ReactLenis>
  );
}

export default App;
