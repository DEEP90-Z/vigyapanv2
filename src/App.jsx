import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import LazySection from './components/LazySection';

// Import below-the-fold components statically to prevent Suspense layout collapses on scroll
import CreativeSolutions from './sections/CreativeSolutions';
import LayerCards from './sections/LayerCards';
import ClientLogos from './sections/ClientLogos';
import Industries from './sections/Industries';
import ReelsShowcase from './sections/ReelsShowcase';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

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
          <CreativeSolutions />
        </LazySection>

        <LazySection placeholderHeight="300vh" rootMargin="1000px">
          <LayerCards />
        </LazySection>

        <LazySection placeholderHeight="40vh" rootMargin="1000px">
          <ClientLogos />
        </LazySection>

        <LazySection placeholderHeight="300vh" rootMargin="1000px">
          <Industries />
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
      </main>
    </ReactLenis>
  );
}

export default App;
