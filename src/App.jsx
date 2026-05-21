import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import LazySection from './components/LazySection';

// Implement React.lazy to enable JS code-splitting and drastically reduce initial bundle size
const CreativeSolutions = React.lazy(() => import('./sections/CreativeSolutions'));
const LayerCards = React.lazy(() => import('./sections/LayerCards'));
const ClientLogos = React.lazy(() => import('./sections/ClientLogos'));
const Industries = React.lazy(() => import('./sections/Industries'));
const ReelsShowcase = React.lazy(() => import('./sections/ReelsShowcase'));
const LongFormShowcase = React.lazy(() => import('./sections/LongFormShowcase'));
const Contact = React.lazy(() => import('./sections/Contact'));
const Footer = React.lazy(() => import('./sections/Footer'));

import { ReactLenis } from 'lenis/react';

function App() {
  return (
    <ReactLenis
      root
      autoRaf={true}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5
      }}
    >
      <main className="relative">
        <Navbar />
        <Hero />

        <LazySection placeholderHeight="300vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '300vh' }} />}>
            <CreativeSolutions />
          </Suspense>
        </LazySection>

        <LazySection placeholderHeight="300vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '300vh' }} />}>
            <LayerCards />
          </Suspense>
        </LazySection>

        <LazySection placeholderHeight="40vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '40vh' }} />}>
            <ClientLogos />
          </Suspense>
        </LazySection>

        <LazySection placeholderHeight="300vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '300vh' }} />}>
            <Industries />
          </Suspense>
        </LazySection>

        <LazySection placeholderHeight="100vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
            <ReelsShowcase />
          </Suspense>
        </LazySection>

        <LazySection placeholderHeight="150vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '150vh' }} />}>
            <LongFormShowcase />
          </Suspense>
        </LazySection>

        <LazySection placeholderHeight="80vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
            <Contact />
          </Suspense>
        </LazySection>

        <LazySection placeholderHeight="40vh" rootMargin="1000px">
          <Suspense fallback={<div style={{ minHeight: '40vh' }} />}>
            <Footer />
          </Suspense>
        </LazySection>
      </main>
    </ReactLenis>
  );
}

export default App;
