import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import LazySection from './components/LazySection';

// Lazy load below-the-fold components
const CreativeSolutions = lazy(() => import('./sections/CreativeSolutions'));
const LayerCards = lazy(() => import('./sections/LayerCards'));
const ReelsShowcase = lazy(() => import('./sections/ReelsShowcase'));
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
        <Suspense fallback={<Fallback />}>
          <LazySection placeholderHeight="450vh" rootMargin="1000px">
            <CreativeSolutions />
          </LazySection>
          
          <LazySection placeholderHeight="300vh" rootMargin="1000px">
            <LayerCards />
          </LazySection>
          
          <LazySection placeholderHeight="100vh" rootMargin="1000px">
            <ReelsShowcase />
          </LazySection>
          
          <LazySection placeholderHeight="80vh" rootMargin="1000px">
            <Contact />
          </LazySection>
          
          <LazySection placeholderHeight="40vh" rootMargin="1000px">
            <Footer />
          </LazySection>
        </Suspense>
      </main>
    </ReactLenis>
  );
}

export default App;
