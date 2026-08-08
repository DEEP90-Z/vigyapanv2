import React, { useEffect, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import LazySection from './components/LazySection';
import WhatsAppButton from './components/WhatsAppButton';

// Implement React.lazy to enable JS code-splitting and drastically reduce initial bundle size
const FloatingBrandShowcase = React.lazy(() => import('./sections/FloatingBrandShowcase'));
const CreativeSolutions = React.lazy(() => import('./sections/CreativeSolutions'));
const ReelsShowcase = React.lazy(() => import('./sections/ReelsShowcase'));
const SelectedWork = React.lazy(() => import('./sections/SelectedWork'));
const LayerCards = React.lazy(() => import('./sections/LayerCards'));
const BrandSpeaks = React.lazy(() => import('./sections/BrandSpeaks'));
const Contact = React.lazy(() => import('./sections/Contact'));
const Footer = React.lazy(() => import('./sections/Footer'));

import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis
      root
      autoRaf={true}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        smoothTouch: false,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.0,
        prevent: () => typeof window !== 'undefined' && window.innerWidth < 768
      }}
    >
      <main className="relative">
        <Navbar />

        {/* 1. Hero */}
        <Hero />

        {/* 2. Logos Floating */}
        <LazySection id="showcase" placeholderHeight="100vh" rootMargin="300px" className="relative z-10 bg-[#FAF9F5]">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <FloatingBrandShowcase />
          </Suspense>
        </LazySection>

        {/* 3. Services */}
        <LazySection id="solutions" placeholderHeight="100vh" rootMargin="200px" className="relative z-10 bg-luxury-cream">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <CreativeSolutions />
          </Suspense>
        </LazySection>

        {/* 4. Our Work (Reels & Slideshow) */}
        <LazySection id="work" placeholderHeight="80vh" rootMargin="200px" className="relative z-10 bg-luxury-cream">
          <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
            <ReelsShowcase />
          </Suspense>
        </LazySection>

        {/* 4b. Selected Work (Minimalist Bento Showcase) */}
        <LazySection id="selected-work" placeholderHeight="100vh" rootMargin="300px" className="relative z-10 bg-[#FAF9F5]">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <SelectedWork />
          </Suspense>
        </LazySection>

        {/* 5. Campaign (Layer Cards) */}
        <LazySection id="campaign" placeholderHeight="100vh" rootMargin="200px" className="relative z-10 bg-luxury-cream">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <LayerCards />
          </Suspense>
        </LazySection>

        {/* 6. Reviews (Testimonials) */}
        <LazySection id="testimonials" placeholderHeight="60vh" rootMargin="200px" className="relative z-10 bg-[#F5F5F5]">
          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <BrandSpeaks />
          </Suspense>
        </LazySection>

        {/* 7. Map & Contact */}
        <LazySection id="contact" placeholderHeight="60vh" rootMargin="200px" className="relative z-10 bg-[#FAF9F5]">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <Contact />
          </Suspense>
        </LazySection>

        {/* 8. Footer */}
        <LazySection placeholderHeight="30vh" rootMargin="200px" className="relative z-10 bg-[#FAF9F5]">
          <Suspense fallback={<div style={{ minHeight: '30vh' }} />}>
            <Footer />
          </Suspense>
        </LazySection>

        <WhatsAppButton />
      </main>
    </ReactLenis>
  );
}

export default App;
